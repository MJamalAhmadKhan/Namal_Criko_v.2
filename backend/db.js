const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const poolConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Jamal543@',
  database: process.env.DB_NAME || 'namalcriko',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let pool;

async function getPool() {
  if (!pool) {
    pool = mysql.createPool(poolConfig);
  }
  return pool;
}

// Execute a SQL statement or procedure
async function query(sql, params = []) {
  const connectionPool = await getPool();
  const [results] = await connectionPool.execute(sql, params);
  return results;
}

// Clean and split SQL commands from file
function parseSqlFile(content) {
  // Strip comments
  let cleaned = content.replace(/\/\*[\s\S]*?\*\//g, ''); // strip block comments
  cleaned = cleaned.split('\n')
    .map(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('--')) return ''; // strip line comments
      return line;
    })
    .join('\n');
  
  return cleaned;
}

async function initializeDatabase() {
  console.log('Initializing database setup...');
  
  // Step 1: Connect without database specified to create database
  const initConfig = {
    host: poolConfig.host,
    user: poolConfig.user,
    password: poolConfig.password
  };
  
  let connection;
  try {
    connection = await mysql.createConnection(initConfig);
  } catch (err) {
    console.error('CRITICAL: Cannot connect to MySQL server. Check credentials in backend/.env', err.message);
    throw err;
  }

  // Create database
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${poolConfig.database}\``);
  await connection.end();
  console.log(`Database "${poolConfig.database}" verified/created.`);

  // Step 2: Run Creation.sql if user table doesn't exist
  const tempPool = mysql.createPool(poolConfig);
  let tableExists = false;
  try {
    const [rows] = await tempPool.execute("SHOW TABLES LIKE 'USER'");
    tableExists = rows.length > 0;
  } catch (e) {
    // Database might not have tables
  }

  const ddlPath = path.join(__dirname, 'dbddl.sql');
  if (fs.existsSync(ddlPath)) {
    const ddlContent = fs.readFileSync(ddlPath, 'utf8');
    const parts = ddlContent.split('-- ################# PROCEDURES_START #################');
    const tablesPart = parts[0];
    const proceduresPart = parts[1] || '';

    if (!tableExists) {
      console.log('Database tables not found. Running dbddl.sql table creations...');
      const creationSql = parseSqlFile(tablesPart);
      // Split by semicolon
      const statements = creationSql.split(';').map(s => s.trim()).filter(s => s.length > 0);
      for (const statement of statements) {
        if (statement.toLowerCase().startsWith('use ')) continue;
        try {
          await tempPool.execute(statement);
        } catch (err) {
          console.error(`Error executing statement: ${statement.substring(0, 50)}...`, err.message);
        }
      }
      console.log('Table schemas created successfully from dbddl.sql.');
    } else {
      console.log('Database tables already exist.');
    }

    // Run procedures, views, triggers
    console.log('Updating stored procedures, views, and triggers from dbddl.sql...');
    const blocks = proceduresPart.split('$$').map(b => b.trim()).filter(b => b.length > 0);
    
    for (const block of blocks) {
      let cleanBlock = block;
      // Remove DELIMITER lines
      cleanBlock = cleanBlock.split('\n')
        .filter(line => !line.trim().toLowerCase().startsWith('delimiter'))
        .join('\n')
        .trim();
        
      if (!cleanBlock || cleanBlock.toLowerCase().startsWith('use ')) continue;
      
      try {
        const match = cleanBlock.match(/CREATE\s+(FUNCTION|PROCEDURE|VIEW|TRIGGER)\s+(\`?\w+\`?)/i);
        if (match) {
          const type = match[1].toUpperCase();
          const name = match[2];
          await tempPool.query(`DROP ${type} IF EXISTS ${name}`);
        }
        await tempPool.query(cleanBlock);
      } catch (err) {
        console.error(`Error compiling block starting with: "${cleanBlock.substring(0, 50)}..."`, err.message);
      }
    }
    console.log('Procedures, views, and triggers updated successfully from dbddl.sql.');
  } else {
    console.error('dbddl.sql file not found in backend directory!');
  }

  // Step 4: Seeding default data if no users exist
  const [userRows] = await tempPool.execute('SELECT COUNT(*) as count FROM USER');
  if (userRows[0].count === 0) {
    console.log('No users found. Seeding initial default data...');

    // 1. Seed Organizations
    const orgs = [
      ['Namal University', 'Punjab', 'Mianwali', 'Pakistan'],
      ['COMSATS University', 'Federal', 'Islamabad', 'Pakistan'],
      ['UET Lahore', 'Punjab', 'Lahore', 'Pakistan'],
      ['LUMS', 'Punjab', 'Lahore', 'Pakistan'],
      ['NUST', 'Federal', 'Islamabad', 'Pakistan'],
      ['Punjab University', 'Punjab', 'Lahore', 'Pakistan'],
      ['Bahria University', 'Federal', 'Islamabad', 'Pakistan'],
      ['Air University', 'Federal', 'Islamabad', 'Pakistan']
    ];
    for (const org of orgs) {
      await tempPool.execute(
        'INSERT INTO Organization (Name, Province, City, Country) VALUES (?, ?, ?, ?)',
        org
      );
    }
    console.log('Organizations seeded.');

    // 2. Seed Categories
    // Difficulty: 1 (Beginner), 2 (Intermediate), 3 (Advanced)
    const categories = [
      [1, null, 1, 'Batting'],
      [2, null, 1, 'Bowling'],
      [3, null, 1, 'General'],
      [4, null, 1, 'Mindset']
    ];
    for (const cat of categories) {
      await tempPool.execute(
        'INSERT INTO Category (Category_id, Parent_Category, Difficulty_Level, Name) VALUES (?, ?, ?, ?)',
        cat
      );
    }
    console.log('Categories seeded.');

    // 3. Seed Admin User: admin / admin
    const adminHash = await bcrypt.hash('admin', 10);
    const [adminUserResult] = await tempPool.execute(
      'INSERT INTO USER (first_name, last_name, email, phone_number, password_hash, Created_at) VALUES (?, ?, ?, ?, ?, CURDATE())',
      ['System', 'Admin', 'admin', '+923001234567', adminHash]
    );
    const adminId = adminUserResult.insertId;
    await tempPool.execute('INSERT INTO ADMIN (admin_id) VALUES (?)', [adminId]);
    console.log('Admin account created (email: "admin", password: "admin").');

    // 4. Seed Player User: test@namal.edu.pk / dummy
    const playerHash = await bcrypt.hash('dummy', 10);
    const [playerUserResult] = await tempPool.execute(
      'INSERT INTO USER (first_name, last_name, email, phone_number, password_hash, Created_at) VALUES (?, ?, ?, ?, ?, CURDATE())',
      ['Jamal', 'Ahmad', 'test@namal.edu.pk', '+923007654321', playerHash]
    );
    const playerId = playerUserResult.insertId;
    await tempPool.execute(
      "INSERT INTO PLAYER (player_id, status, Is_Student, Is_Other, Approved_BY, Approve_Date) VALUES (?, 'Active', TRUE, FALSE, ?, NOW())",
      [playerId, adminId]
    );
    // Associate with Namal University (OrgID = 1)
    await tempPool.execute(
      'INSERT INTO STUDENT_PLAYER (player_id, InstituteId, registration_number) VALUES (?, 1, ?)',
      [playerId, 'NUM-BSCS-2024-TEST']
    );
    await tempPool.execute(
      'INSERT INTO Learnig_Streak (Player_Id, Last_Login, Current_Streak, Max_Streak) VALUES (?, NULL, 0, 0)',
      [playerId]
    );
    console.log('Test student account created (email: "test@namal.edu.pk", password: "dummy").');

    // 5. Seed FAQs
    const faqs = [
      ["How do I mark a simulation as mastered?", "To master a technique, you must view every frame in the Simulation Viewer and click the 'Mark as Mastered' button."],
      ["Why is my account status 'Pending'?", "All student registrations must be verified by the Admin Department. This usually takes 24-48 business hours."]
    ];
    for (const faq of faqs) {
      await tempPool.execute('INSERT INTO FAQS (question, answer, admin_id) VALUES (?, ?, ?)', [...faq, adminId]);
    }
    console.log('FAQs seeded.');

    // 6. Seed Quotes
    const quotes = [
      ["Cricket is a game of glorious uncertainties.", "Neville Cardus", 'General'],
      ["To be a great batsman, you need courage, technique and a willingness to learn.", "Sachin Tendulkar", 'Batting'],
      ["Fast bowling is an art. You have to bowl with your head as much as your body.", "Wasim Akram", 'Bowling'],
      ["The mind is the strongest tool a cricketer has.", "Imran Khan", 'Mindset'],
      ["Winning is a habit. Watch your thoughts, they become your actions.", "MS Dhoni", 'Mindset'],
      ["Batting is 80 percent mental and 20 percent technical.", "Don Bradman", 'Batting'],
      ["A good spinner can take wickets on any pitch.", "Shane Warne", 'Bowling']
    ];
    for (const quote of quotes) {
      await tempPool.execute(
        "INSERT INTO QUOTE (quote_text, Author, category, active_flag) VALUES (?, ?, ?, TRUE)",
        quote
      );
    }
    console.log('Quotes seeded.');

    // 7. Seed Events
    const events = [
      ['NPL Trials 2025', '2025-12-15 09:00:00', 'Namal Oval', 'Selection trials for the Namal Premier League. All students registered on Criko are eligible.', '#'],
      ['New CA Batting Gear', '2026-06-30 18:00:00', 'Sports Store', 'Authentic CA equipment now available at discounted rates for Criko members.', '#']
    ];
    for (const ev of events) {
      await tempPool.execute(
        'INSERT INTO CRICKET_EVENT (event_name, event_date, venue, Description, Regestraion_Link, Created_By_Admin_id) VALUES (?, ?, ?, ?, ?, ?)',
        [...ev, adminId]
      );
    }
    console.log('Cricket events seeded.');

    // 8. Seed Professional Players (Leaderboard)
    const proPlayers = [
      ['Babar Azam', 'Pakistan', 'Batsman', 'Right_Hand', 'Biography info of Babar Azam', 130],
      ['Shaheen Afridi', 'Pakistan', 'Bowler', 'Left_Hand', 'Biography info of Shaheen Afridi', 60],
      ['Virat Kohli', 'India', 'Batsman', 'Right_Hand', 'Biography info of Virat Kohli', 295]
    ];
    for (const pro of proPlayers) {
      const [proResult] = await tempPool.execute(
        'INSERT INTO Professional_PLAYER (Name, Nationality, role, style, Biography, Matches_Played) VALUES (?, ?, ?, ?, ?, ?)',
        pro.slice(0, 6)
      );
      const proPlayerId = proResult.insertId;

      // Add statistics format = 'ODI'
      const format = 'ODI';
      const [statsResult] = await tempPool.execute(
        'INSERT INTO PLAYER_STATISTICS (player_id, format, Matches_Played) VALUES (?, ?, ?)',
        [proPlayerId, format, pro[5]]
      );
      const statId = statsResult.insertId;

      if (pro[2] === 'Batsman') {
        const runs = pro[0] === 'Babar Azam' ? 6033 : 13906;
        const centuries = pro[0] === 'Babar Azam' ? 20 : 50;
        const fifties = pro[0] === 'Babar Azam' ? 30 : 72;
        await tempPool.execute(
          'INSERT INTO Batting_STATISTICS (stat_id, runs_scored, fifties, Centuries) VALUES (?, ?, ?, ?)',
          [statId, runs, fifties, centuries]
        );
      } else {
        await tempPool.execute(
          'INSERT INTO Bowling_STATISTICS (stat_id, wickets_taken, average_Wicket_Taken) VALUES (?, 120, 4.4)',
          [statId]
        );
      }
    }
    console.log('Pro players seeded.');

    // 9. Seed Simulations (Drills)
    // Forward Defense (CategoryID = 1)
    const [sim1] = await tempPool.execute(
      'INSERT INTO CRICKET_SIMULATION (simulation_name, duration, CategoryID) VALUES (?, 120, 1)',
      ['Forward Defense']
    );
    // Cover Drive (CategoryID = 1)
    const [sim2] = await tempPool.execute(
      'INSERT INTO CRICKET_SIMULATION (simulation_name, duration, CategoryID) VALUES (?, 120, 1)',
      ['Cover Drive']
    );
    // Yorker (CategoryID = 2)
    const [sim3] = await tempPool.execute(
      'INSERT INTO CRICKET_SIMULATION (simulation_name, duration, CategoryID) VALUES (?, 120, 2)',
      ['Fast: Yorker']
    );

    const s1Id = sim1.insertId;
    const s2Id = sim2.insertId;
    const s3Id = sim3.insertId;

    // Assets
    await tempPool.execute("INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (?, 'Video', 'https://www.youtube.com/embed/n4fC5r08D80')", [s1Id]);
    await tempPool.execute("INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (?, 'Video', 'https://www.youtube.com/embed/5_mco2rI6xI')", [s2Id]);
    await tempPool.execute("INSERT INTO Asset (Simulation_id, Asset_Type, Asset_Url) VALUES (?, 'Video', 'https://www.youtube.com/embed/eXb9h7GZz3s')", [s3Id]);
    
    // Mistakes & Corrections
    // For s1 (Forward Defense)
    await tempPool.execute("INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (?, 101, 'Hard hands at impact')", [s1Id]);
    await tempPool.execute("INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (101, 'Keep your hands soft and let the ball hit the bat.')");

    await tempPool.execute("INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (?, 102, 'Moving head away from line')", [s1Id]);
    await tempPool.execute("INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (102, 'Keep your head still and eyes level, aligned with the ball.')");

    // For s2 (Cover Drive)
    await tempPool.execute("INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (?, 201, 'Reaching for the ball')", [s2Id]);
    await tempPool.execute("INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (201, 'Step closer to the pitch of the ball before playing the shot.')");

    await tempPool.execute("INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (?, 202, 'Closed bat face')", [s2Id]);
    await tempPool.execute("INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (202, 'Keep your bat face open and elbow high.')");

    // For s3 (Yorker)
    await tempPool.execute("INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (?, 301, 'Dropping arm speed')", [s3Id]);
    await tempPool.execute("INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (301, 'Maintain arm speed through delivery.')");

    await tempPool.execute("INSERT INTO SPECIFIC_MISTAKE (simulation_id, mistakeid, mistake_desc) VALUES (?, 302, 'Over-stretching')", [s3Id]);
    await tempPool.execute("INSERT INTO CORRECTION (mistake_id, correction_desc) VALUES (302, 'Maintain a stable delivery stride.')");

    console.log('Simulations, assets, and mistakes seeded.');
    console.log('Seeding process completed successfully!');
  } else {
    console.log('Database already has seeded data.');
  }

  await tempPool.end();
}

module.exports = {
  query,
  initializeDatabase
};
