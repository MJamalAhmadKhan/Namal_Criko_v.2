# Namal Criko - Cricket Simulation Trainer

Namal Criko is a full-stack web application designed for cricket training, performance analysis, and simulation exercises. The application provides an interactive, gamified simulation viewer, notice board announcements, support helpdesk ticketing, and professional player profiles.

---

## 🛠️ Technology Stack
- **Frontend (GUI Client)**: React (TypeScript) built with Vite, styled with vanilla CSS.
- **Backend (API Server)**: Node.js & Express, listening on port `5000`.
- **Database Layer**: MySQL Server, storing schema tables and handling database programmability.

---

## 📂 Consolidated Database Scripts

For better project aesthetics and directory organization, the database scripts have been consolidated into two principal files inside the `backend/` directory:

1. **`backend/dbddl.sql` (Data Definition Language)**:
   - Combines table creation schemas (`Creation.sql`) and database logic (`Procedures.sql`).
   - Automatically drops and rebuilds all views, stored procedures, triggers, and functions on database rebuilds.
   - Structured with the comment separator `-- ################# PROCEDURES_START #################` to guide safe parsing during backend boots.

2. **`backend/dbdml.sql` (Data Manipulation Language)**:
   - Combines simulation metadata seedings (`InsertSimulations.sql`) and main database populating scripts (`PopulateData.sql`).
   - Inserts the 15 default cricket simulation drills (incorporating video overlays, description instructions, and frames).
   - Populates tables with original data including 20 players (with real Muslim names), 20 notice board events, 20 FAQs, 20 quotes, and 20 pro player profiles with ODI batting & bowling career statistics.

---

## 🚀 How to Run the Application

The project includes an automated setup batch file that handles port cleanups, schema restoration, dependencies checks, and launches both frontend and backend servers.

### Using the Batch Script (Recommended)
Double-click the runner file in the workspace root directory:
```bash
▶ RUN APP.bat
```
This script will:
1. Free up ports `3000` (frontend) and `5000` (backend) if occupied.
2. Restore database tables, stored procedures, views, triggers, and functions by executing `backend/dbddl.sql`.
3. Check and install backend and frontend node dependencies if they are missing.
4. Launch the Express server and Vite development server in new terminal windows.
5. Open your default web browser to the frontend dashboard: `http://localhost:3000`.

### Manual Database Import
If you prefer to load or restore schemas manually (via MySQL CLI or MySQL Workbench):

1. **Restore Schema and Procedures (DDL)**:
   ```bash
   mysql -u root -pJamal543@ < backend/dbddl.sql
   ```
2. **Seed Simulations and Default Data (DML)**:
   ```bash
   mysql -u root -pJamal543@ < backend/dbdml.sql
   ```

---

## 🔑 Default Authentication Accounts

Use these credentials to sign in and test the application features:

### 1. Administrator Portal
- **Username / Admin ID**: `admin`
- **Password**: `admin`
- **Capabilities**: Approve/suspend player registrations, add notice board events, configure daily quotes and FAQs, view simulation logs, delete users, and respond to support tickets.

### 2. Player Dashboard
- **Username / Email**: `test@namal.edu.pk`
- **Password**: `dummy`
- **Capabilities**: Access video simulation drills, master techniques, check leaderboard ranks, create helpdesk tickets, and view active events.
