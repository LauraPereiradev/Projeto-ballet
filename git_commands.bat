@echo off
cd /d C:\Users\defaultuser0\Downloads\ballet\Ballet

REM Initialize git repository
"C:\Program Files\Git\cmd\git.exe" init

REM Configure git user (if not already configured)
"C:\Program Files\Git\cmd\git.exe" config user.name "Laura Pereira"
"C:\Program Files\Git\cmd\git.exe" config user.email "laura@example.com"

REM Add remote
"C:\Program Files\Git\cmd\git.exe" remote add origin https://github.com/LauraPereiradev/Projeto-ballet.git

REM Stage all changes
"C:\Program Files\Git\cmd\git.exe" add .

REM Commit changes
"C:\Program Files\Git\cmd\git.exe" commit -m "Fix TypeScript configuration and build errors - exclude spec files from build"

REM Push to remote
"C:\Program Files\Git\cmd\git.exe" push -u origin main

pause
