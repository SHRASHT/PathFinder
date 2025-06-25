@echo off
echo.
echo =====================================================
echo    🔍 DETAILED INNGEST FUNCTION DIAGNOSIS
echo =====================================================
echo.

echo 📋 Checking what functions are actually loaded...
powershell -Command "try { Write-Host 'Fetching Inngest endpoint response...' -ForegroundColor Yellow; $response = Invoke-WebRequest -Uri 'http://localhost:3000/api/inngest' -UseBasicParsing; Write-Host 'Response received, parsing...' -ForegroundColor Yellow; $content = $response.Content | ConvertFrom-Json; Write-Host ''; Write-Host 'FUNCTION COUNT:' $content.functions.Count -ForegroundColor Cyan; Write-Host ''; Write-Host 'LOADED FUNCTIONS:' -ForegroundColor Cyan; $content.functions | ForEach-Object { Write-Host '  ✅' $_.id -ForegroundColor Green }; Write-Host ''; if ($content.functions.Count -ge 6) { Write-Host 'SUCCESS: All functions loaded!' -ForegroundColor Green } else { Write-Host 'WARNING: Only' $content.functions.Count 'of 6 functions loaded' -ForegroundColor Yellow } } catch { Write-Host 'ERROR:' $_.Exception.Message -ForegroundColor Red }"

echo.
echo 📋 Expected Functions:
echo   - hello-world
echo   - process-career-assessment  
echo   - process-ai-chat-message
echo   - process-resume-analysis
echo   - process-user-onboarding
echo   - ai-career-agent
echo.

pause
