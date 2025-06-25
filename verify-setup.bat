@echo off
echo.
echo =====================================================
echo    ✅ VERIFY INNGEST SETUP
echo =====================================================
echo.

echo 📋 Step 1: Testing Next.js is running...
powershell -Command "try { Invoke-WebRequest -Uri 'http://localhost:3000' -Method GET -UseBasicParsing -TimeoutSec 5 | Out-Null; Write-Host '✅ Next.js is running' -ForegroundColor Green } catch { Write-Host '❌ Next.js is NOT running - start it first!' -ForegroundColor Red; exit 1 }"

echo.
echo 📋 Step 2: Testing Inngest endpoint...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:3000/api/inngest' -Method GET -UseBasicParsing -TimeoutSec 10; Write-Host '✅ Inngest endpoint working!' -ForegroundColor Green; Write-Host 'Status:' $response.StatusCode; if ($response.Content -like '*simple-test*') { Write-Host '✅ Test function found in response' -ForegroundColor Green } else { Write-Host '⚠️ Test function not found in response' -ForegroundColor Yellow } } catch { Write-Host '❌ Inngest endpoint failed:' $_.Exception.Message -ForegroundColor Red }"

echo.
echo 📋 Step 3: Ready for Inngest Dev Server
echo If both tests above are ✅, run:
echo npx inngest-cli@latest dev
echo.

pause
