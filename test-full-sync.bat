@echo off
echo.
echo =====================================================
echo    🔄 FULL INNGEST SYNC - ALL FUNCTIONS
echo =====================================================
echo.
echo 🔧 What I Fixed:
echo    - Restored all 6 Inngest functions to main route
echo    - Functions: hello, career-assessment, chat, resume, onboarding, ai-agent
echo    - Aligned with your event trigger API
echo.
echo 📋 Test Complete Setup:
echo.

echo 🧪 Step 1: Test Inngest endpoint
powershell -Command "try { Write-Host 'Testing full Inngest endpoint...' -ForegroundColor Yellow; $response = Invoke-WebRequest -Uri 'http://localhost:3000/api/inngest' -UseBasicParsing; Write-Host '✅ SUCCESS! Status:' $response.StatusCode -ForegroundColor Green; $content = $response.Content; if ($content -like '*hello-world*') { Write-Host '✅ Functions loaded correctly' -ForegroundColor Green } else { Write-Host '⚠️ Functions may not be loaded' -ForegroundColor Yellow } } catch { Write-Host '❌ Failed:' $_.Exception.Message -ForegroundColor Red }"

echo.
echo 🧪 Step 2: Test Event Trigger API  
powershell -Command "try { Write-Host 'Testing event trigger API...' -ForegroundColor Yellow; $response = Invoke-WebRequest -Uri 'http://localhost:3000/api/inngest-events' -UseBasicParsing; Write-Host '✅ Event API working!' -ForegroundColor Green } catch { Write-Host '❌ Event API failed:' $_.Exception.Message -ForegroundColor Red }"

echo.
echo 🚀 If both tests pass:
echo 1. Stop any running Inngest Dev Server (Ctrl+C)
echo 2. Start fresh: npx inngest-cli@latest dev
echo 3. Should see "Synced" with 6 functions
echo.
echo 🎯 Expected: All your AI chat and career features work
echo.

pause
