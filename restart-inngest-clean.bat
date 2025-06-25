@echo off
echo.
echo =====================================================
echo    🔄 RESTART INNGEST WITH CLEAN FUNCTIONS
echo =====================================================
echo.
echo 🔧 What I cleaned up:
echo    - Removed commented createAgent code that might cause issues
echo    - All 6 functions should now load properly
echo.
echo 📋 Steps to restart Inngest:
echo.
echo 1. Stop Inngest Dev Server (Ctrl+C in Inngest terminal)
echo 2. Start fresh: npx inngest-cli@latest dev
echo 3. Check for "Synced" status
echo.
echo 🧪 After restart, test functions:
powershell -Command "Write-Host 'Run this after Inngest restart:' -ForegroundColor Yellow; Write-Host '.\diagnose-functions.bat' -ForegroundColor Cyan"

echo.
echo 🎯 Expected: 6 functions synced successfully
echo.

pause
