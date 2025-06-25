@echo off
echo.
echo ================================================
echo    🧪 TESTING INNGEST ENDPOINTS 
echo ================================================
echo.

echo 📋 Testing if Next.js is running...
powershell -Command "try { $r = Invoke-WebRequest -Uri 'http://localhost:3000' -UseBasicParsing -TimeoutSec 5; Write-Host 'Next.js Status:' $r.StatusCode -ForegroundColor Green } catch { Write-Host 'Next.js Error:' $_.Exception.Message -ForegroundColor Red; exit 1 }"

echo.
echo 📋 Testing Inngest endpoint...
powershell -Command "try { $r = Invoke-WebRequest -Uri 'http://localhost:3000/api/inngest' -UseBasicParsing -TimeoutSec 10; Write-Host 'Inngest Status:' $r.StatusCode -ForegroundColor Green; $content = $r.Content; @('hello-world', 'process-career-assessment', 'process-ai-chat-message', 'process-resume-analysis', 'process-user-onboarding', 'ai-career-agent') | ForEach-Object { if ($content -match $_) { Write-Host 'Found:' $_ -ForegroundColor Green } else { Write-Host 'Missing:' $_ -ForegroundColor Red } } } catch { Write-Host 'Inngest Error:' $_.Exception.Message -ForegroundColor Red }"

echo.
pause
