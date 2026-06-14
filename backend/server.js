const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { query, initializeDatabase } = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretcriko123!';

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));
const path = require('path');
app.use('/Simulations', express.static(path.join(__dirname, '../Simulations')));

// Logger Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Authentication Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Authorization token required' });
  
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = decoded;
    next();
  });
}

// Admin Check Middleware
function requireAdmin(req, res, next) {
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Admin role required' });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTHENTICATION API
// ─────────────────────────────────────────────────────────────────────────────

// Player Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password, ip } = req.body;
  const clientIp = ip || req.ip || '0.0.0.0';

  try {
    // 1. Fetch user by email to get hash
    const users = await query('SELECT user_id, first_name, last_name, password_hash, is_Deleted FROM USER WHERE email = ?', [email]);
    
    if (users.length === 0) {
      // Run procedure with failure to log attempt
      await query('CALL sp_login_attempt(?, ?, FALSE, @p_user_id, @p_role, @p_status, @p_message)', [email, clientIp]);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = users[0];

    if (user.is_Deleted) {
      return res.status(403).json({ message: 'Account has been deleted' });
    }

    // 2. Verify password
    const isMatch = await bcrypt.compare(password, user.password_hash);

    // 3. Call sp_login_attempt to process streak and get results
    // We execute inside a transaction or single connection session using helper
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Jamal543@',
      database: process.env.DB_NAME || 'namalcriko'
    });

    try {
      await conn.query('CALL sp_login_attempt(?, ?, ?, @p_user_id, @p_role, @p_status, @p_message)', [email, clientIp, isMatch]);
      const [output] = await conn.query('SELECT @p_user_id AS userId, @p_role AS role, @p_status AS status, @p_message AS message');
      
      const result = output[0];
      
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      if (result.message !== 'SUCCESS') {
        if (result.message === 'INACTIVE') {
          return res.status(403).json({ message: `Your account is ${result.status}. Awaiting Admin verification.` });
        }
        return res.status(403).json({ message: result.message });
      }

      // Generate token
      const token = jwt.sign(
        { userId: result.userId, role: result.role, status: result.status },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        token,
        user: {
          userId: result.userId,
          name: `${user.first_name} ${user.last_name}`,
          email: email,
          role: result.role,
          status: result.status
        }
      });

    } finally {
      await conn.end();
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Admin Login
app.post('/api/auth/admin/login', async (req, res) => {
  const { email, password } = req.body;
  const clientIp = req.ip || '127.0.0.1';

  try {
    const users = await query('SELECT user_id, first_name, last_name, password_hash, is_Deleted FROM USER WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid admin ID or credentials' });
    }

    const user = users[0];

    // Check if is admin in ADMIN table
    const admins = await query('SELECT admin_id FROM ADMIN WHERE admin_id = ?', [user.user_id]);
    if (admins.length === 0) {
      return res.status(403).json({ message: 'Access denied: User is not an administrator' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid admin ID or credentials' });
    }

    // Call stored procedure to log success
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection({
      host: poolConfig = { host: process.env.DB_HOST || 'localhost', user: process.env.DB_USER || 'root', password: process.env.DB_PASSWORD || 'Jamal543@', database: process.env.DB_NAME || 'namalcriko' }.host,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Jamal543@',
      database: process.env.DB_NAME || 'namalcriko'
    });

    try {
      await conn.query('CALL sp_login_attempt(?, ?, TRUE, @p_user_id, @p_role, @p_status, @p_message)', [email, clientIp]);
      const [output] = await conn.query('SELECT @p_user_id AS userId, @p_role AS role, @p_status AS status, @p_message AS message');
      
      const result = output[0];
      
      const token = jwt.sign(
        { userId: result.userId, role: 'Admin', status: 'Active' },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        token,
        user: {
          userId: result.userId,
          name: `${user.first_name} ${user.last_name}`,
          email: email,
          role: 'Admin',
          status: 'Active'
        }
      });
    } finally {
      await conn.end();
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Player Registration
app.post('/api/auth/register', async (req, res) => {
  const { firstName, lastName, email, phone, password, userType, orgId, regNumber, designation } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Jamal543@',
      database: process.env.DB_NAME || 'namalcriko'
    });

    try {
      await conn.query(
        'CALL sp_register_user(?, ?, ?, ?, ?, ?, ?, ?, ?, @p_new_user_id, @p_message)',
        [firstName, lastName, email, phone, passwordHash, userType, orgId || null, regNumber || null, designation || null]
      );
      const [output] = await conn.query('SELECT @p_new_user_id AS new_user_id, @p_message AS message');
      
      const result = output[0];

      if (result.message !== 'SUCCESS') {
        return res.status(400).json({ message: result.message });
      }

      res.json({
        message: 'SUCCESS',
        userId: result.new_user_id
      });
    } finally {
      await conn.end();
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Forgot Password (Generate token)
app.post('/api/auth/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const users = await query('SELECT user_id FROM USER WHERE email = ? AND is_Deleted = FALSE', [email]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'Email not found' });
    }

    const userId = users[0].user_id;
    const rawToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const hashedToken = await bcrypt.hash(rawToken, 5); // simple quick hash for search
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour

    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Jamal543@',
      database: process.env.DB_NAME || 'namalcriko'
    });

    try {
      await conn.query('CALL sp_create_password_reset_token(?, ?, ?, @p_token_id)', [userId, hashedToken, expiresAt]);
      
      // Print token to server console for testing!
      console.log(`\n🔑 PASSWORD RESET REQUESTED\nEmail: ${email}\nToken: ${rawToken}\n`);
      
      res.json({
        message: 'SUCCESS',
        // In local/testing mode, we can return the token to make it easy for user
        token: rawToken
      });
    } finally {
      await conn.end();
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Reset Password
app.post('/api/auth/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // We need to verify which token hash matches
    const tokens = await query('SELECT token_hash FROM PASSWORD_RESET_TOKEN WHERE is_used = FALSE AND expires_at > NOW()');
    let matchingHash = null;

    for (const t of tokens) {
      const isMatch = await bcrypt.compare(token, t.token_hash);
      if (isMatch) {
        matchingHash = t.token_hash;
        break;
      }
    }

    if (!matchingHash) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    const newHash = await bcrypt.hash(newPassword, 10);
    
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Jamal543@',
      database: process.env.DB_NAME || 'namalcriko'
    });

    try {
      await conn.query('CALL sp_use_password_reset_token(?, ?, @p_message)', [matchingHash, newHash]);
      const [output] = await conn.query('SELECT @p_message AS message');
      
      const result = output[0];
      if (result.message !== 'SUCCESS') {
        return res.status(400).json({ message: result.message });
      }

      res.json({ message: 'SUCCESS' });
    } finally {
      await conn.end();
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Get Organizations list
app.get('/api/auth/organizations', async (req, res) => {
  try {
    const orgs = await query('SELECT ORGID, Name, Province, City, Country FROM Organization');
    res.json({ data: orgs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ─────────────────────────────────────────────────────────────────────────────
// PLAYER API (Requires Authentication)
// ─────────────────────────────────────────────────────────────────────────────

// Profile Details
app.get('/api/player/profile', authenticateToken, async (req, res) => {
  try {
    const rows = await query(`
      SELECT u.user_id, u.first_name, u.last_name, CONCAT(u.first_name, ' ', u.last_name) AS full_name, 
             u.email, u.phone_number, u.Created_at, p.status, p.Is_Student, p.Is_Other, 
             sp.registration_number, o1.Name AS institute_name, op.designation, o2.Name AS org_name
      FROM USER u
      JOIN PLAYER p ON p.player_id = u.user_id
      LEFT JOIN STUDENT_PLAYER sp ON sp.player_id = p.player_id
      LEFT JOIN Organization o1 ON o1.ORGID = sp.InstituteId
      LEFT JOIN OTHER_PLAYER op ON op.player_id = p.player_id
      LEFT JOIN Organization o2 ON o2.ORGID = op.OrgID
      WHERE u.user_id = ? AND u.is_Deleted = FALSE
    `, [req.user.userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    res.json({ data: rows[0] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Profile
app.put('/api/player/profile', authenticateToken, async (req, res) => {
  const { firstName, lastName, phone, password } = req.body;
  try {
    let passwordHash = null;
    if (password) {
      passwordHash = await bcrypt.hash(password, 10);
    }
    await query('CALL sp_update_profile(?, ?, ?, ?, ?)', [
      req.user.userId,
      firstName || null,
      lastName || null,
      phone || null,
      passwordHash
    ]);
    res.json({ message: 'SUCCESS' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Request Account Deletion
app.delete('/api/player/profile', authenticateToken, async (req, res) => {
  try {
    await query('CALL sp_request_account_deletion(?)', [req.user.userId]);
    res.json({ message: 'SUCCESS' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Player Dashboard Stats
app.get('/api/player/dashboard', authenticateToken, async (req, res) => {
  try {
    const rows = await query('SELECT * FROM vw_player_dashboard WHERE user_id = ?', [req.user.userId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Dashboard data not found' });
    }
    res.json({ data: rows[0] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Analytics (Sessions & Streaks)
app.get('/api/player/analytics', authenticateToken, async (req, res) => {
  try {
    const dashboardRows = await query('SELECT * FROM vw_player_dashboard WHERE user_id = ?', [req.user.userId]);
    const logs = await query('SELECT * FROM SIMULATION_LOG WHERE player_id = ? ORDER BY view_time DESC LIMIT 20', [req.user.userId]);
    
    res.json({
      data: {
        summary: dashboardRows[0] || null,
        recentSessions: logs
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Daily Quote
app.get('/api/player/quote', authenticateToken, async (req, res) => {
  try {
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Jamal543@',
      database: process.env.DB_NAME || 'namalcriko'
    });

    try {
      await conn.query('CALL sp_get_daily_quote(?, @p_quote_id)', [req.user.userId]);
      const [output] = await conn.query('SELECT @p_quote_id AS quote_id');
      const quoteId = output[0].quote_id;

      if (!quoteId) {
        return res.json({ data: null });
      }

      const quotes = await query('SELECT * FROM QUOTE WHERE quote_id = ?', [quoteId]);
      res.json({ data: quotes[0] || null });
    } finally {
      await conn.end();
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Drill Simulations Browser Catalog
app.get('/api/player/simulations', authenticateToken, async (req, res) => {
  try {
    const catalog = await query('SELECT * FROM vw_simulation_catalog');
    
    // Map catalog view data to also include their assets and mistakes
    const results = [];
    for (const sim of catalog) {
      // Get text assets containing frames & description if stored in DB
      const assets = await query('SELECT * FROM Asset WHERE Simulation_id = ?', [sim.simulation_id]);
      const mistakes = await query(`
        SELECT sm.mistake_desc, c.correction_desc 
        FROM SPECIFIC_MISTAKE sm 
        LEFT JOIN CORRECTION c ON c.mistake_id = sm.mistakeid
        WHERE sm.simulation_id = ?
      `, [sim.simulation_id]);
      
      let description = '';
      let frames = [];
      
      // Parse serialized assets
      const descAsset = assets.find(a => a.Asset_Type === 'Text' && a.Asset_Url.startsWith('{'));
      if (descAsset) {
        try {
          const parsed = JSON.parse(descAsset.Asset_Url);
          description = parsed.description || '';
          frames = parsed.frames || [];
        } catch(e) {}
      }

      // Find media asset (non-Text)
      const mediaAsset = assets.find(a => a.Asset_Type !== 'Text');
      const assetUrl = mediaAsset ? mediaAsset.Asset_Url : '';
      const assetType = mediaAsset ? mediaAsset.Asset_Type : 'Video';

      // Fallbacks if frames are empty
      if (frames.length === 0) {
        // Generate placeholder frame sequence
        frames = [
          { id: `f-${sim.simulation_id}-1`, description: 'Initial Stance & Preparation', keyPoints: ['Keep eyes level', 'Align shoulders'] },
          { id: `f-${sim.simulation_id}-2`, description: 'Ball Tracking & Execution', keyPoints: ['Watch ball contact', 'Maintain solid base'] }
        ];
      }

      results.push({
        ...sim,
        description,
        frames,
        commonMistakes: mistakes.map(m => ({ desc: m.mistake_desc, correction: m.correction_desc || '' })),
        assetUrl,
        assetType,
        videoUrl: assetType === 'Video' ? assetUrl : ''
      });
    }

    res.json({ data: results });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Single Drill Detail
app.get('/api/player/simulations/:id', authenticateToken, async (req, res) => {
  const simId = Number(req.params.id);
  try {
    const catalog = await query('SELECT * FROM vw_simulation_catalog WHERE simulation_id = ?', [simId]);
    if (catalog.length === 0) {
      return res.status(404).json({ message: 'Simulation not found' });
    }

    const assets = await query('SELECT * FROM Asset WHERE Simulation_id = ?', [simId]);
    const mistakes = await query(`
      SELECT sm.mistakeid, sm.mistake_desc, c.correction_desc 
      FROM SPECIFIC_MISTAKE sm 
      LEFT JOIN CORRECTION c ON c.mistake_id = sm.mistakeid
      WHERE sm.simulation_id = ?
    `, [simId]);

    let description = '';
    let frames = [];
    
    // Parse serialized assets
    const descAsset = assets.find(a => a.Asset_Type === 'Text' && a.Asset_Url.startsWith('{'));
    if (descAsset) {
      try {
        const parsed = JSON.parse(descAsset.Asset_Url);
        description = parsed.description || '';
        frames = parsed.frames || [];
      } catch(e) {}
    }

    if (frames.length === 0) {
      frames = [
        { id: `f-${simId}-1`, description: 'Preparation Stance', keyPoints: ['Balance weight', 'Watch bowler release'] },
        { id: `f-${simId}-2`, description: 'Execution Point', keyPoints: ['Watch ball onto bat', 'Control flow-through'] }
      ];
    }

    res.json({
      data: {
        ...catalog[0],
        description,
        frames,
        assets: assets.filter(a => a.Asset_Type !== 'Text'), // return normal media assets (videos, images)
        mistakes
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Log Simulation Session
app.post('/api/player/simulations/log', authenticateToken, async (req, res) => {
  const { simulationId, timeSpent, completed } = req.body;
  try {
    await query('CALL sp_log_simulation(?, ?, ?, ?)', [
      req.user.userId,
      simulationId,
      timeSpent,
      completed ? 1 : 0
    ]);
    res.json({ message: 'SUCCESS' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get My Simulation Logs
app.get('/api/player/simulations/logs/mine', authenticateToken, async (req, res) => {
  try {
    const rows = await query(`
      SELECT sl.log_id, sl.view_time, sl.is_completed, sl.Time_Spend_sec, 
             cs.simulation_name, cs.simulation_id, c.Name as category_name
      FROM SIMULATION_LOG sl
      JOIN CRICKET_SIMULATION cs ON cs.simulation_id = sl.Simulation_id
      JOIN Category c ON c.Category_id = cs.CategoryID
      WHERE sl.player_id = ?
      ORDER BY sl.view_time DESC
    `, [req.user.userId]);
    res.json({ data: rows });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get My Support Tickets
app.get('/api/player/tickets', authenticateToken, async (req, res) => {
  try {
    const rows = await query(`
      SELECT t.ticket_id, t.subject, t.status, t.Submission_Date, t.Attachment_URL, t.Description as description,
             tc.Name AS category_name, tc.Priority_Level,
             (SELECT tr.description FROM Ticket_RESPONSE tr WHERE tr.ticket_id = t.ticket_id ORDER BY tr.response_id DESC LIMIT 1) AS admin_response
      FROM TICKETS t
      JOIN Ticket_Category tc ON tc.Cat_id = t.Category_id
      WHERE t.player_id = ?
      ORDER BY t.Submission_Date DESC
    `, [req.user.userId]);
    res.json({ data: rows });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Submit Support Ticket
app.post('/api/player/tickets', authenticateToken, async (req, res) => {
  const { subject, description, categoryId, attachmentUrl } = req.body;
  try {
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Jamal543@',
      database: process.env.DB_NAME || 'namalcriko'
    });

    try {
      await conn.query('CALL sp_submit_ticket(?, ?, ?, ?, ?, @p_ticket_id)', [
        req.user.userId,
        subject,
        description,
        categoryId,
        attachmentUrl || null
      ]);
      const [output] = await conn.query('SELECT @p_ticket_id AS ticket_id');
      
      res.json({
        message: 'SUCCESS',
        ticketId: output[0].ticket_id
      });
    } finally {
      await conn.end();
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Ticket Categories
app.get('/api/player/ticket-categories', authenticateToken, async (req, res) => {
  try {
    const cats = await query('SELECT Cat_id, Name, Priority_Level FROM Ticket_Category');
    res.json({ data: cats });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get FAQs
app.get('/api/player/faqs', authenticateToken, async (req, res) => {
  try {
    const faqs = await query('SELECT faq_id, question, answer FROM FAQS');
    res.json({ data: faqs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Events
app.get('/api/player/events', authenticateToken, async (req, res) => {
  try {
    const events = await query('SELECT event_id, event_name, event_date, venue, Description, Image_Url, Regestraion_Link FROM CRICKET_EVENT WHERE archived_flag = FALSE');
    res.json({ data: events });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Leaderboard Top Players
app.get('/api/player/top-players', authenticateToken, async (req, res) => {
  try {
    const proPlayers = await query('SELECT * FROM vw_pro_players');
    res.json({ data: proPlayers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ─────────────────────────────────────────────────────────────────────────────
// ADMIN API (Requires Admin Authentication Token)
// ─────────────────────────────────────────────────────────────────────────────

// Overview Stats Cards
app.get('/api/admin/overview', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const rows = await query('SELECT * FROM vw_admin_overview');
    res.json({ data: rows[0] || null });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Analytics Reports
app.get('/api/admin/reports', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const userOverview = await query('SELECT status, COUNT(*) as count FROM PLAYER GROUP BY status');
    const simulationSessions = await query('SELECT simulation_name, COUNT(*) as completions FROM vw_simulation_logs WHERE is_completed = TRUE GROUP BY simulation_name');
    const ticketStats = await query('SELECT status, COUNT(*) as count FROM TICKETS GROUP BY status');
    
    res.json({
      data: {
        users: userOverview,
        simulations: simulationSessions,
        tickets: ticketStats
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Action logs
app.get('/api/admin/action-log', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const logs = await query('SELECT * FROM vw_admin_action_log');
    res.json({ data: logs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// All Players Directory
app.get('/api/admin/players', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const players = await query('SELECT * FROM vw_all_players');
    res.json({ data: players });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Pending Approvals
app.get('/api/admin/players/pending', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const players = await query('SELECT * FROM vw_pending_players');
    res.json({ data: players });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Approve/Reject/Suspend Player
app.put('/api/admin/players/status', authenticateToken, requireAdmin, async (req, res) => {
  const { playerId, action } = req.body; // action: Approve, Reject, Suspend, Restore
  try {
    await query('CALL sp_approve_player(?, ?, ?)', [
      req.user.userId,
      playerId,
      action
    ]);
    res.json({ message: 'SUCCESS' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Soft Delete User Account
app.delete('/api/admin/players/:userId', authenticateToken, requireAdmin, async (req, res) => {
  const targetId = Number(req.params.userId);
  try {
    await query('CALL sp_delete_user(?, ?)', [
      req.user.userId,
      targetId
    ]);
    res.json({ message: 'SUCCESS' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get All Tickets
app.get('/api/admin/tickets', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const tickets = await query(`
      SELECT t.ticket_id, t.subject, t.status, t.Submission_Date, t.Attachment_URL, t.Description as description,
             tc.Name AS category_name, tc.Priority_Level,
             CONCAT(u.first_name, ' ', u.last_name) as player_name, u.email as player_email
      FROM TICKETS t
      JOIN PLAYER p ON p.player_id = t.player_id
      JOIN USER u ON u.user_id = p.player_id
      JOIN Ticket_Category tc ON tc.Cat_id = t.Category_id
      ORDER BY t.Submission_Date DESC
    `);
    res.json({ data: tickets });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Respond & Resolve Ticket
app.put('/api/admin/tickets/respond', authenticateToken, requireAdmin, async (req, res) => {
  const { ticketId, description, newStatus, attachmentUrl } = req.body;
  try {
    await query('CALL sp_respond_ticket(?, ?, ?, ?, ?)', [
      req.user.userId,
      ticketId,
      description,
      newStatus,
      attachmentUrl || null
    ]);
    res.json({ message: 'SUCCESS' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// FAQS CRUD
app.post('/api/admin/faqs', authenticateToken, requireAdmin, async (req, res) => {
  const { question, answer } = req.body;
  try {
    await query('CALL sp_manage_faq(NULL, ?, ?, ?)', [
      req.user.userId,
      question,
      answer
    ]);
    res.json({ message: 'SUCCESS' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/api/admin/faqs', authenticateToken, requireAdmin, async (req, res) => {
  const { faqId, question, answer } = req.body;
  try {
    await query('CALL sp_manage_faq(?, ?, ?, ?)', [
      faqId,
      req.user.userId,
      question,
      answer
    ]);
    res.json({ message: 'SUCCESS' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/api/admin/faqs/:id', authenticateToken, requireAdmin, async (req, res) => {
  const faqId = Number(req.params.id);
  try {
    await query('DELETE FROM FAQS WHERE faq_id = ?', [faqId]);
    res.json({ message: 'SUCCESS' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Notice Board events
app.post('/api/admin/events', authenticateToken, requireAdmin, async (req, res) => {
  const { event_name, event_date, venue, Description, Image_Url, Regestraion_Link } = req.body;
  // If keys are sent in title/description format, handle mapping
  const name = event_name || req.body.title || '';
  const desc = Description || req.body.description || '';
  const date = event_date || req.body.date || new Date().toISOString();
  const v = venue || req.body.venue || 'Namal Campus';
  const img = Image_Url || req.body.imageUrl || null;
  const link = Regestraion_Link || req.body.registrationLink || '#';

  try {
    await query('CALL sp_manage_event(?, NULL, ?, ?, ?, ?, ?, ?)', [
      req.user.userId,
      name,
      date,
      v,
      desc,
      img,
      link
    ]);
    res.json({ message: 'SUCCESS' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/api/admin/events', authenticateToken, requireAdmin, async (req, res) => {
  const { eventId, event_name, event_date, venue, Description, Image_Url, Regestraion_Link } = req.body;
  const id = eventId || req.body.id;
  const name = event_name || req.body.title;
  const desc = Description || req.body.description;
  const date = event_date || req.body.date;
  const v = venue || req.body.venue;
  const img = Image_Url || req.body.imageUrl;
  const link = Regestraion_Link || req.body.registrationLink;

  try {
    await query('CALL sp_manage_event(?, ?, ?, ?, ?, ?, ?, ?)', [
      req.user.userId,
      id,
      name,
      date,
      v,
      desc,
      img,
      link
    ]);
    res.json({ message: 'SUCCESS' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.patch('/api/admin/events/:id/archive', authenticateToken, requireAdmin, async (req, res) => {
  const eventId = Number(req.params.id);
  try {
    await query('CALL sp_archive_event(?, ?)', [
      req.user.userId,
      eventId
    ]);
    res.json({ message: 'SUCCESS' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Drill Simulation CRUD
app.post('/api/admin/simulations', authenticateToken, requireAdmin, async (req, res) => {
  const { name, duration, categoryId, description, frames, mistakes, videoUrl, assetUrl, assetType } = req.body;
  const vUrl = videoUrl || assetUrl;
  const aType = assetType || 'Video';
  try {
    // 1. Create simulation
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Jamal543@',
      database: process.env.DB_NAME || 'namalcriko'
    });
 
    try {
      await conn.query('CALL sp_manage_simulation(?, NULL, ?, ?, ?)', [
        req.user.userId,
        name,
        duration || 120,
        categoryId || 1
      ]);
      
      // Fetch the simulation ID by searching the name
      const [simRows] = await conn.query('SELECT simulation_id FROM CRICKET_SIMULATION WHERE simulation_name = ?', [name]);
      const simId = simRows[0]?.simulation_id;
 
      if (simId) {
        // 2. Save description & frames inside Asset table as Text type
        const textPayload = JSON.stringify({ description: description || '', frames: frames || [] });
        await conn.query('INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (?, "Text", ?)', [simId, textPayload]);
        
        // Save media asset if provided
        if (vUrl) {
          await conn.query('INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (?, ?, ?)', [simId, aType, vUrl]);
        }

        // 3. Save mistakes if provided
        if (mistakes && Array.isArray(mistakes)) {
          for (let i = 0; i < mistakes.length; i++) {
            const mId = simId * 1000 + i; // unique mistake id
            await conn.query('INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (?, ?, ?)', [simId, mId, mistakes[i].desc || mistakes[i]]);
            if (mistakes[i].correction) {
              await conn.query('INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (?, ?)', [mId, mistakes[i].correction]);
            }
          }
        }
      }
 
      res.json({ message: 'SUCCESS' });
    } finally {
      await conn.end();
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
 
app.put('/api/admin/simulations', authenticateToken, requireAdmin, async (req, res) => {
  const { simId, name, duration, categoryId, description, frames, mistakes, videoUrl, assetUrl, assetType } = req.body;
  const vUrl = videoUrl || assetUrl;
  const aType = assetType || 'Video';
  try {
    // 1. Update simulation info
    await query('CALL sp_manage_simulation(?, ?, ?, ?, ?)', [
      req.user.userId,
      simId,
      name,
      duration || 120,
      categoryId || 1
    ]);
 
    // 2. Clear old text assets containing frames/description and write new ones
    await query('DELETE FROM Asset WHERE Simulation_id = ? AND Asset_Type = "Text"', [simId]);
    const textPayload = JSON.stringify({ description: description || '', frames: frames || [] });
    await query('INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (?, "Text", ?)', [simId, textPayload]);
 
    // Clear old media assets (non-Text) and write new one if provided
    await query('DELETE FROM Asset WHERE Simulation_id = ? AND Asset_Type != "Text"', [simId]);
    if (vUrl) {
      await query('INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (?, ?, ?)', [simId, aType, vUrl]);
    }

    // 3. Update mistakes
    if (mistakes && Array.isArray(mistakes)) {
      await query('DELETE FROM SPECIFIC_MISTAKE WHERE simulation_id = ?', [simId]);
      for (let i = 0; i < mistakes.length; i++) {
        const mId = simId * 1000 + i; // unique mistake id
        await query('INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (?, ?, ?)', [simId, mId, mistakes[i].desc || mistakes[i]]);
        if (mistakes[i].correction) {
          await query('INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (?, ?)', [mId, mistakes[i].correction]);
        }
      }
    }
 
    res.json({ message: 'SUCCESS' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/api/admin/simulations/:id', authenticateToken, requireAdmin, async (req, res) => {
  const simId = Number(req.params.id);
  try {
    await query('CALL sp_soft_delete_simulation(?, ?)', [
      req.user.userId,
      simId
    ]);
    res.json({ message: 'SUCCESS' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Drill simulation assets & mistakes APIs
app.get('/api/admin/simulations/:id/assets', authenticateToken, requireAdmin, async (req, res) => {
  const simId = Number(req.params.id);
  try {
    const assets = await query('SELECT * FROM Asset WHERE Simulation_id = ?', [simId]);
    res.json({ data: assets });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/admin/simulations/assets', authenticateToken, requireAdmin, async (req, res) => {
  const { simulationId, assetType, assetUrl } = req.body;
  try {
    await query('INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (?, ?, ?)', [
      simulationId,
      assetType,
      assetUrl
    ]);
    res.json({ message: 'SUCCESS' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/admin/simulations/mistakes', authenticateToken, requireAdmin, async (req, res) => {
  const { simulationId, mistakeDesc, correctionDesc } = req.body;
  try {
    const mId = Math.floor(Math.random() * 1000000); // random unique ID
    await query('INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (?, ?, ?)', [
      simulationId,
      mId,
      mistakeDesc
    ]);
    await query('INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (?, ?)', [
      mId,
      correctionDesc
    ]);
    res.json({ message: 'SUCCESS' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Quotes CRUD
app.get('/api/admin/quotes', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const quotes = await query('SELECT quote_id, quote_text, category, active_flag, Author FROM QUOTE');
    res.json({ data: quotes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/admin/quotes', authenticateToken, requireAdmin, async (req, res) => {
  const { quote_text, Author, category, active_flag } = req.body;
  const text = quote_text || req.body.text || '';
  const author = Author || req.body.author || '';
  const cat = category || 'General';
  const active = active_flag !== undefined ? active_flag : true;
  
  try {
    await query('CALL sp_manage_quote(?, NULL, ?, ?, ?, ?)', [
      req.user.userId,
      text,
      author,
      cat,
      active ? 1 : 0
    ]);
    res.json({ message: 'SUCCESS' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/api/admin/quotes', authenticateToken, requireAdmin, async (req, res) => {
  const { quoteId, quote_text, Author, category, active_flag } = req.body;
  const id = quoteId || req.body.id;
  const text = quote_text || req.body.text;
  const author = Author || req.body.author;
  const cat = category || 'General';
  const active = active_flag !== undefined ? active_flag : true;

  try {
    await query('CALL sp_manage_quote(?, ?, ?, ?, ?, ?)', [
      req.user.userId,
      id,
      text,
      author,
      cat,
      active ? 1 : 0
    ]);
    res.json({ message: 'SUCCESS' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/api/admin/quotes/:id', authenticateToken, requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  try {
    await query('CALL sp_delete_quote(?)', [id]);
    res.json({ message: 'SUCCESS' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Professional Players CRUD
app.get('/api/admin/pro-players', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const players = await query('SELECT * FROM vw_pro_players');
    res.json({ data: players });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/admin/pro-players', authenticateToken, requireAdmin, async (req, res) => {
  const { name, nationality, role, style, biography } = req.body;
  try {
    await query('CALL sp_manage_pro_player(?, NULL, ?, ?, ?, ?, ?)', [
      req.user.userId,
      name,
      nationality,
      role || 'Batsman',
      style || 'Right_Hand',
      biography || ''
    ]);
    res.json({ message: 'SUCCESS' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/api/admin/pro-players', authenticateToken, requireAdmin, async (req, res) => {
  const { playerId, name, nationality, role, style, biography } = req.body;
  const id = playerId || req.body.id;
  try {
    await query('CALL sp_manage_pro_player(?, ?, ?, ?, ?, ?, ?)', [
      req.user.userId,
      id,
      name,
      nationality,
      role || 'Batsman',
      style || 'Right_Hand',
      biography || ''
    ]);
    res.json({ message: 'SUCCESS' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/api/admin/pro-players/:id', authenticateToken, requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  try {
    await query('CALL sp_delete_pro_player(?)', [id]);
    res.json({ message: 'SUCCESS' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/admin/pro-players/stats', authenticateToken, requireAdmin, async (req, res) => {
  const { playerId, format, matchesPlayed, runsScored, fifties, centuries, wicketsTaken, averageWicketTaken } = req.body;
  try {
    // 1. Create or update statistics
    const stats = await query('SELECT stat_id FROM PLAYER_STATISTICS WHERE player_id = ? AND format = ?', [playerId, format]);
    let statId;
    if (stats.length > 0) {
      statId = stats[0].stat_id;
      await query('UPDATE PLAYER_STATISTICS SET Matches_Played = ? WHERE stat_id = ?', [matchesPlayed, statId]);
    } else {
      const [insertResult] = await query('INSERT INTO PLAYER_STATISTICS (player_id, format, Matches_Played) VALUES (?, ?, ?)', [playerId, format, matchesPlayed]);
      statId = insertResult.insertId;
    }

    // 2. Insert/update batting and bowling stats
    const roleRows = await query('SELECT role FROM Professional_PLAYER WHERE player_id = ?', [playerId]);
    const role = roleRows[0]?.role;

    if (role === 'Batsman' || role === 'All-Rounder' || role === 'Wicket-Keeper') {
      await query('INSERT INTO Batting_STATISTICS (stat_id, runs_scored, fifties, Centuries) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE runs_scored = ?, fifties = ?, Centuries = ?', [
        statId, runsScored || 0, fifties || 0, centuries || 0,
        runsScored || 0, fifties || 0, centuries || 0
      ]);
    } 
    if (role === 'Bowler' || role === 'All-Rounder') {
      await query('INSERT INTO Bowling_STATISTICS (stat_id, average_Wicket_Taken, wickets_taken) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE average_Wicket_Taken = ?, wickets_taken = ?', [
        statId, averageWicketTaken || 0, wicketsTaken || 0,
        averageWicketTaken || 0, wicketsTaken || 0
      ]);
    }

    res.json({ message: 'SUCCESS' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// All Simulation Logs (Access logs)
app.get('/api/admin/simulation-logs', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const logs = await query('SELECT * FROM vw_simulation_logs');
    // Map to client expected keys
    const result = logs.map(l => ({
      id: 'log-' + l.log_id,
      userId: String(l.player_name || 'Player'),
      techniqueId: String(l.log_id),
      techniqueName: l.simulation_name,
      startedAt: new Date(l.view_time).getTime() - l.Time_Spend_sec * 1000,
      durationSeconds: l.Time_Spend_sec,
      completed: Boolean(l.is_completed)
    }));
    res.json({ data: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Organizations list management
app.get('/api/admin/organizations', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const orgs = await query('SELECT ORGID, Name, Province, City, Country FROM Organization');
    res.json({ data: orgs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/admin/organizations', authenticateToken, requireAdmin, async (req, res) => {
  const { Name, Province, City, Country } = req.body;
  try {
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Jamal543@',
      database: process.env.DB_NAME || 'namalcriko'
    });

    try {
      await conn.query('CALL sp_create_organization(?, ?, ?, ?, @p_org_id)', [
        Name,
        Province || 'Punjab',
        City || 'Mianwali',
        Country || 'Pakistan'
      ]);
      const [output] = await conn.query('SELECT @p_org_id AS org_id');
      res.json({ message: 'SUCCESS', orgId: output[0].org_id });
    } finally {
      await conn.end();
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/api/admin/organizations', authenticateToken, requireAdmin, async (req, res) => {
  const { ORGID, Name } = req.body;
  const id = ORGID || req.body.id;
  try {
    await query('CALL sp_update_organization(?, ?)', [id, Name]);
    res.json({ message: 'SUCCESS' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/api/admin/organizations/:id', authenticateToken, requireAdmin, async (req, res) => {
  const orgId = Number(req.params.id);
  try {
    await query('CALL sp_delete_organization(?)', [orgId]);
    res.json({ message: 'SUCCESS' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Categories list
app.get('/api/admin/categories', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const categories = await query('SELECT Category_id, Name, Difficulty_Level FROM Category');
    res.json({ data: categories });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// START SERVER & AUTO-INIT
// ─────────────────────────────────────────────────────────────────────────────

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`===================================================`);
      console.log(` NAMAL CRIKO BACKEND v2 RUNNING ON PORT ${PORT}`);
      console.log(` Database: ${process.env.DB_NAME || 'namalcriko'}`);
      console.log(` URL: http://localhost:${PORT}`);
      console.log(`===================================================`);
    });
  })
  .catch(err => {
    console.error('Failed to initialize database. Server shutdown.', err);
    process.exit(1);
  });
