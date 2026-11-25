@echo off
set "PATH=C:\Program Files\nodejs;%PATH%"
cd /d "%~dp0cloudnova-app"
echo ========================================================
echo   Menjalankan CloudNova Hosting Next.js App
echo   Buka browser di: http://localhost:3000
echo ========================================================
npm run dev
pause
