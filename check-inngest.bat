@echo off
echo 🔍 Checking Inngest Integration Status...
echo.

echo 📋 Step 1: Checking if Next.js is running on port 3000...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:3000' -Method Get -TimeoutSec 5; Write-Host '✅ Next.js is running on port 3000' -ForegroundColor Green } catch { Write-Host '❌ Next.js is NOT running on port 3000' -ForegroundColor Red; Write-Host 'Please start Next.js first with: npm run dev' -ForegroundColor Yellow }"
echo.

echo 📋 Step 2: Checking Inngest API endpoint...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:3000/api/inngest' -Method Get -TimeoutSec 5; Write-Host '✅ Inngest API endpoint is accessible' -ForegroundColor Green; Write-Host 'Response status:' $response.StatusCode } catch { Write-Host '❌ Inngest API endpoint is NOT accessible' -ForegroundColor Red; Write-Host 'Error:' $_.Exception.Message -ForegroundColor Yellow }"
echo.

echo 📋 Step 3: Instructions for Inngest Dev Server...
echo 🔧 If both checks above are ✅, start Inngest Dev Server:
echo    npx inngest-cli@latest dev
echo.
echo 🔧 If checks fail:
echo    1. Start Next.js: npm run dev
echo    2. Wait for "Ready - started server on http://localhost:3000"
echo    3. Run this script again
echo    4. Only then start Inngest Dev Server
echo.

pause
