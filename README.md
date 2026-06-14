# 🏏 Namal Criko – Cricket Simulation Trainer
### Database Layer · CSC-271 Database Systems · Namal University, Mianwali

![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?style=flat&logo=mysql&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=flat&logo=react&logoColor=black)
![Version](https://img.shields.io/badge/Version-2.0-brightgreen?style=flat)
![Status](https://img.shields.io/badge/Status-In%20Development-yellow?style=flat)
![Semester](https://img.shields.io/badge/Semester-Spring%202026-orange?style=flat)

> **🔁 Previous Version (v1):** The original Namal Criko documentaion CSC-225 – Software Engineering (Fall 2025) is available at:
> 👉 [https://github.com/MJamalAhmadKhan/Namal-Criko](https://github.com/MJamalAhmadKhan/Namal-Criko)

---

## 📋 Table of Contents

- [Overview](#overview)
- [What's New in v2](#whats-new-in-v2)
- [Planned Features](#planned-features)
- [Database Scope](#database-scope)
- [Technology Stack](#technology-stack)
- [Consolidated Database Scripts](#consolidated-database-scripts)
- [How to Run the Application](#how-to-run-the-application)
- [Default Authentication Accounts](#default-authentication-accounts)
- [Team](#team)
- [Course Information](#course-information)

---

## Overview

**Namal Criko** is a full-stack web application designed for cricket training, performance analysis, and simulation exercises. The application provides an interactive, gamified simulation viewer, notice board announcements, support helpdesk ticketing, and professional player profiles.

This repository — **Version 2** — focuses on designing and implementing the complete **relational database layer** for the platform as part of CSC-271 – Database Systems (Spring 2026). The database will support user management, simulation delivery, performance tracking, help-desk support, administrative reporting, a Top Players leaderboard, and a motivational Quote of the Day. A lightweight local web application using React and Node.js/Express demonstrates the database visually through a browser interface.

> 📄 The full project proposal is available in the (Namal_Criko_v.2/ProposalDoc/) folder.

---

## What's New in v2

| | v1 — CSC-225 · Fall 2025 | v2 — CSC-271 · Spring 2026 |
|---|---|---|
| **Repository** | [Namal-Criko](https://github.com/MJamalAhmadKhan/Namal-Criko) | [Namal-Criko-Database](https://github.com/MJamalAhmadKhan/Namal_Criko_v.2) *(this repo)* |
| **Focus** | Prototype and documentation | Full relational database layer |
| **Storage** |No storage concept |MySQL 8.x normalised schema (3NF) |
| **Backend** | None | Node.js + Express REST API |
| **Data** | None | Persistent: users, logs, tickets, stats |
| **New Modules** | — | Top Players, Quote of the Day, Help Desk, Audit Logs, Reporting Views |
| **Demo App** |Figma Prototype | Full-stack local web app (React + Express + MySQL) |

---

## Planned Features

| Module | Description |
|---|---|
| 👤 **User Management** | Registration, admin approval workflow, profile management, suspension & deletion |
| 🎮 **Simulation Catalogue** | 3-level category hierarchy, 10+ techniques with steps, assets & difficulty ratings |
| 📊 **Performance Tracking** | Session logs, learning streaks, completion flags & progress summaries |
| 🎫 **Help Desk** | Full ticket lifecycle with status history and admin response tracking |
| 📅 **Events & Announcements** | Cricket event management with archiving and chronological display |
| 🏆 **Top Players Leaderboard** | Professional player profiles with format-specific career statistics |
| 💬 **Quote of the Day** | Curated motivational quotes with 7-day non-repeat window per player |
| 🔐 **Audit & Security** | Login attempt logs, admin action logs, password-reset token management |
| 📈 **Reporting Views** | Six pre-built analytical views for administrative insights |

---

## Database Scope

The schema is fully normalised to **3NF** and implemented in **MySQL 8.x**, covering the following entities:
```
users               roles               simulation_categories
players             admin_actions       techniques
tickets             ticket_history      simulation
events              top_players         player_statistics
quotes              performance_logs
login_attempts      
```

Key deliverables across milestones:
- **ER Diagram** — conceptual model for all entities and relationships
- **DDL Scripts** — all tables, constraints, primary keys, foreign keys, and indexes
- **Reporting Views** — 6 analytical views for administrative dashboards
- **Seed Data** — player profiles, simulation techniques, and motivational quotes
- **Web Demo** — local React + Node.js/Express app connected via `mysql2`

---

## 🛠️ Technology Stack

| Component | Technology | Description |
|---|---|---|
| **DBMS** | MySQL 8.x | Database server storing schema tables and handling database programmability. |
| **Back-end** | Node.js + Express | API Server listening on port `5000`. |
| **Front-end** | React (TypeScript) | GUI Client built with Vite, styled with vanilla CSS. |
| **DB Driver** | mysql2 | Driver connecting backend to MySQL. |
| **Schema Design** | MySQL Workbench | Visual ERD design tool. |
| **Version Control** | Git / GitHub | Code collaboration and history tracking. |
| **Dev Environment**| VS Code + XAMPP | Development tools. |

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
   mysql -u root -p[your_password] < backend/dbddl.sql
   ```
2. **Seed Simulations and Default Data (DML)**:
   ```bash
   mysql -u root -p[your_password] < backend/dbdml.sql
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

---

## Team

| Name | Roll No. | Email |
|---|---|---|
| **M. Jamal Ahmad Khan** | BSCS-2024-51 | bscs24f51@namal.edu.pk |
| **Qazi M. Auon Farooqi** | BSCS-2024-64 | bscs24f64@namal.edu.pk |
| **Breera Ijaz** | BSCS-2024-20 | bscs24f20@namal.edu.pk |

### Contribution Summary

| Deliverable | M. Jamal | Qazi Auon | Breera Ijaz |
|---|---|---|---|
| Proposal | Introduction, Objectives, Scope | Tech Stack, System Functionality | Data Collection, User Classes, Conclusion |
| ER Diagram | User Management & Help Desk entities | Simulation Catalogue & Performance Tracking | Top Players, Quotes, Events & Audit entities |
| DDL Scripts | User, Roles, Audit & Ticket tables | Simulation, Category & Performance Log tables | Top Players, Stats, Quotes & Events tables |
| Stored Procedures | `sp_get_top_players`, `sp_bulk_status` | `sp_get_performance`, `sp_get_streak` | `sp_get_quote_of_day`, all six reporting views |
| Web Demo | Express REST API layer | React Admin Panel & Reporting Dashboard | React Player Dashboard & Quote of the Day |

> All three members contribute equally across every phase — Group Lead also act as passive reviewers.
> **Meeting cadence:** Weekly sync via Zoom or on-campus, with progress tracked on the GitHub Projects board.

---

## Course Information

| Field | Details |
|---|---|
| **Course Code** | CSC-271 |
| **Course Title** | Database Systems |
| **Semester** | Spring 2026 |
| **Institution** | Namal University, Mianwali |
| **Department** | Computer Science |
| **Instructor** | Asiya Batool |
| **Milestone** | 1 — Submitted 12th March, 2026 |
| **v1 Repository** | [Namal-Criko (Original)](https://github.com/MJamalAhmadKhan/Namal-Criko) |
| **v2 Repository** | [Namal-Criko-Database (This Repo)](https://github.com/MJamalAhmadKhan/Namal_Criko_v.2) |

---

> *This project is Version 2 of Namal Criko, developed for academic purposes as part of CSC-271 – Database Systems, Spring 2026, Namal University, Mianwali.*
