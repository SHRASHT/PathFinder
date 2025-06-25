@echo off
echo.
echo =====================================================
echo    🔍 FINDING NEXT.JS PORT
echo =====================================================
echo.

echo 📋 Checking common Next.js ports...

for %%p in (3000 3001 3002 3003) do (
    echo Testing port %%p...
    powershell -Command "try { Invoke-WebRequest -Uri 'http://localhost:%%p' -UseBasicParsing -TimeoutSec 3 | Out-Null; Write-Host '✅ Next.js found on port %%p' -ForegroundColor Green; echo 'Test Inngest endpoint: http://localhost:%%p/api/inngest' } catch { Write-Host '❌ Port %%p: No response' -ForegroundColor Red }"
)

echo.
echo 📋 If Next.js is found on a different port than 3000:
echo 1. Stop Inngest Dev Server (Ctrl+C)
echo 2. Start with correct port:
echo    npx inngest-cli@latest dev --url=http://localhost:[PORT]/api/inngest
echo.

pause
