@echo off
echo.
echo =====================================================
echo    🧪 TESTING INNGEST ENDPOINT
echo =====================================================
echo.

echo 📋 Testing http://localhost:3000/api/inngest
echo.

powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:3000/api/inngest' -Method Get -TimeoutSec 10; Write-Host 'SUCCESS: Inngest endpoint is working!' -ForegroundColor Green; Write-Host 'Status Code:' $response.StatusCode; Write-Host 'Content preview:' $response.Content.Substring(0, [Math]::Min(200, $response.Content.Length)) } catch { Write-Host 'ERROR: Inngest endpoint failed!' -ForegroundColor Red; Write-Host 'Error details:' $_.Exception.Message }"

echo.
echo =====================================================
echo.

pause
