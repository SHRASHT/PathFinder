@echo off
echo.
echo =====================================================
echo    🔄 INNGEST RESTART PROCEDURE
echo =====================================================
echo.
echo ❗ IMPORTANT: We changed the Inngest client config
echo    Next.js needs to restart to pick up the changes
echo.
echo 📋 STEPS TO FIX SYNC ISSUE:
echo.
echo 1. STOP Next.js (in current terminal):
echo    Press Ctrl+C to stop the dev server
echo.
echo 2. RESTART Next.js:
echo    npm run dev
echo.
echo 3. WAIT for "Ready - started server" message
echo.
echo 4. TEST endpoint (in NEW terminal):
echo    curl http://localhost:3000/api/inngest
echo.
echo 5. START Inngest Dev Server (in NEW terminal):
echo    npx inngest-cli@latest dev
echo.
echo 🎯 WHAT CHANGED:
echo    - Event key: "local" (simplified)
echo    - isDev: true (forced)
echo    - Removed environment variable complexity
echo.
echo ✅ Expected: Inngest should show "Synced" status
echo.

pause
