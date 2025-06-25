@echo off
echo.
echo =====================================================
echo    🧪 COMPLETE INNGEST DIAGNOSTIC
echo =====================================================
echo.

echo 📋 Testing all endpoints to isolate the issue...
echo.

echo 🔸 Test 1: Basic Next.js API
powershell -Command "try { Invoke-WebRequest -Uri 'http://localhost:3000/api/test-basic' -UseBasicParsing | Out-Null; Write-Host '✅ Basic API: WORKING' -ForegroundColor Green } catch { Write-Host '❌ Basic API: FAILED' -ForegroundColor Red }"

echo.
echo 🔸 Test 2: Original Inngest endpoint  
powershell -Command "try { Invoke-WebRequest -Uri 'http://localhost:3000/api/inngest' -UseBasicParsing | Out-Null; Write-Host '✅ Original Inngest: WORKING' -ForegroundColor Green } catch { Write-Host '❌ Original Inngest: FAILED -' $_.Exception.Message -ForegroundColor Red }"

echo.
echo 🔸 Test 3: Alternative Inngest endpoint
powershell -Command "try { Invoke-WebRequest -Uri 'http://localhost:3000/api/inngest-v2' -UseBasicParsing | Out-Null; Write-Host '✅ Alternative Inngest: WORKING' -ForegroundColor Green } catch { Write-Host '❌ Alternative Inngest: FAILED -' $_.Exception.Message -ForegroundColor Red }"

echo.
echo 📋 If ANY endpoint works, try Inngest Dev Server with that URL:
echo.
echo For original: npx inngest-cli@latest dev --url=http://localhost:3000/api/inngest
echo For alternative: npx inngest-cli@latest dev --url=http://localhost:3000/api/inngest-v2
echo.
echo 🔧 If ALL fail, the issue is with Inngest package compatibility
echo.

pause
