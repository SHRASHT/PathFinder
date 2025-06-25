@echo off
echo.
echo =====================================================
echo    ✅ CLEAN INNGEST SETUP - READY TO TEST
echo =====================================================
echo.
echo 🔧 Fixed Issues:
echo    - Removed malformed try-catch export
echo    - Clean, simple route structure
echo    - Proper module exports
echo.
echo 📋 Next.js should now compile without errors
echo.
echo 🧪 Test the endpoint:
powershell -Command "try { Write-Host 'Testing clean endpoint...' -ForegroundColor Yellow; $response = Invoke-WebRequest -Uri 'http://localhost:3000/api/inngest' -UseBasicParsing; Write-Host '✅ SUCCESS! Status:' $response.StatusCode -ForegroundColor Green; Write-Host 'Response contains hello function:' ($response.Content -like '*hello*') } catch { Write-Host '❌ Failed:' $_.Exception.Message -ForegroundColor Red }"

echo.
echo 🚀 If test passes, start Inngest Dev Server:
echo    npx inngest-cli@latest dev
echo.
echo 🎯 Expected: "Synced" status with 1 function
echo.

pause
