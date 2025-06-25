@echo off
echo.
echo =====================================================
echo    🔧 INNGEST ADVANCED DEBUGGING
echo =====================================================
echo.

echo 📋 Step 1: Test basic Next.js API
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:3000/api/test-basic' -UseBasicParsing; Write-Host '✅ Basic API works:' $response.StatusCode -ForegroundColor Green } catch { Write-Host '❌ Basic API failed:' $_.Exception.Message -ForegroundColor Red }"

echo.
echo 📋 Step 2: Test Inngest endpoint with detailed output
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:3000/api/inngest' -UseBasicParsing; Write-Host '✅ Inngest endpoint status:' $response.StatusCode -ForegroundColor Green; Write-Host 'Response length:' $response.Content.Length; Write-Host 'First 300 chars:'; Write-Host $response.Content.Substring(0, [Math]::Min(300, $response.Content.Length)) } catch { Write-Host '❌ Inngest endpoint failed:' $_.Exception.Message -ForegroundColor Red; Write-Host 'Full error:' $_.Exception -ForegroundColor Yellow }"

echo.
echo 📋 Step 3: Try Inngest Dev Server with explicit URL
echo Starting Inngest with explicit URL...
echo.
npx inngest-cli@latest dev --url=http://localhost:3000/api/inngest --verbose

pause
