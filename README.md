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
- [Team](#team)
- [Course Information](#course-information)

---

## Overview

**Namal Criko** is a web-based cricket simulation trainer developed at Namal University, Mianwali. It enables players to learn batting and bowling techniques through interactive browser simulations and provides administrators with tools to manage users and platform content.

This repository — **Version 2** — focuses on designing and implementing the complete **relational database layer** for the platform as part of CSC-271 – Database Systems (Spring 2026). The database will support user management, simulation delivery, performance tracking, help-desk support, administrative reporting, a Top Players leaderboard, and a motivational Quote of the Day. A lightweight local web application using React and Node.js/Express will also be developed to demonstrate the database visually through a browser interface.

> 📄 The full project proposal is available in the Namal_Criko_v.2/ProposalDoc/ folder.

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

The schema will be fully normalised to **3NF** and implemented in **MySQL 8.x**, covering the following entities:
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
- **Reporting Views** — 5 analytical views for administrative dashboards
- **Seed Data** — 15+ player profiles, 10+ simulation techniques, 20+ motivational quotes
- **Web Demo** — local React + Node.js/Express app connected via `mysql2`

---

## Technology Stack

| Component | Technology |
|---|---|
| DBMS | MySQL 8.x |
| Query Language | SQL (MySQL) |
| Back-end | Node.js + Express |
| Front-end | React.js |
| DB Driver | mysql2 |
| Schema Design | MySQL Workbench |
| Version Control | Git / GitHub |
| Dev Environment | VS Code + XAMPP |

### Planned Architecture
```
React   ──►  Express API )  ──►  MySQL
```

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
