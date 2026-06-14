@echo off
title Namal Criko - Full Stack Setup and Launch
color 0E

echo ===================================================
echo  NAMAL CRIKO - Full Stack Starter and Database Setup
echo ===================================================
echo.

:: 0. Free up occupied ports
echo [Step 0/4] Cleaning up ports 3000 and 5000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000 ^| findstr LISTENING') do (
    echo Terminating old frontend process on port 3000 with PID %%a...
    taskkill /f /pid %%a >nul 2>&1
)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5000 ^| findstr LISTENING') do (
    echo Terminating old backend process on port 5000 with PID %%a...
    taskkill /f /pid %%a >nul 2>&1
)
echo Port cleanup complete.
echo.
echo ---------------------------------------------------
echo.

:: 1. Database Initialization
echo [Step 1/4] Attempting database schema restoration...
echo.

:: Detect mysql command path
where mysql >nul 2>nul
if %errorlevel% equ 0 (
    set MYSQL_CMD=mysql
) else (
    if exist "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" (
        set MYSQL_CMD="C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"
    ) else if exist "C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe" (
        set MYSQL_CMD="C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe"
    ) else if exist "C:\Program Files\MySQL\MySQL Server 9.0\bin\mysql.exe" (
        set MYSQL_CMD="C:\Program Files\MySQL\MySQL Server 9.0\bin\mysql.exe"
    ) else (
        set MYSQL_CMD=mysql
    )
)

:: Run dbddl.sql
echo Restoring database tables, procedures, views, and triggers...
%MYSQL_CMD% -u root -pJamal543@ < backend\dbddl.sql
if %errorlevel% neq 0 (
    echo.
    echo WARNING: Failed to automatically run dbddl.sql.
    echo Please make sure your MySQL server is running on localhost and your root password is "Jamal543@".
    echo You can also import 'backend/dbddl.sql' manually in MySQL Workbench.
    echo.
) else (
    echo Database schemas, procedures, and triggers restored successfully!
    echo.
)

echo.
echo ---------------------------------------------------

:: 2. Installing Backend Dependencies
echo [Step 2/4] Checking backend dependencies...
if not exist "backend\node_modules" (
    echo Node modules missing for backend. Installing now...
    cd backend
    call npm install
    cd ..
) else (
    echo Backend dependencies are already installed.
)

echo.
echo ---------------------------------------------------

:: 3. Installing Frontend Dependencies
echo [Step 3/4] Checking frontend dependencies...
if not exist "frontend\node_modules" (
    echo Node modules missing for frontend. Installing now...
    cd frontend
    call npm install
    cd ..
) else (
    echo Frontend dependencies are already installed.
)

echo.
echo ---------------------------------------------------

:: 4. Launching Servers
echo [Step 4/4] Starting servers...
echo.

:: Start Backend
echo Starting backend server in a new window...
start "Namal Criko Backend" cmd /c "cd backend && title Backend && node server.js"

:: Start Frontend
echo Starting frontend server in a new window...
start "Namal Criko Frontend" cmd /c "cd frontend && title Frontend && npm run dev"

echo.
echo ===================================================
echo  Namal Criko is launching!
echo  Frontend URL: http://localhost:3000
echo  Backend Port: 5000
echo ===================================================
echo.
echo  Opening browser...
ping 127.0.0.1 -n 6 >nul
start http://localhost:3000

pause
