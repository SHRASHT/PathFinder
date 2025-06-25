@echo off
echo.
echo =====================================================
echo    🔍 SIMPLE FUNCTION CHECK
echo =====================================================
echo.

echo Testing Inngest endpoint...
curl -s http://localhost:3000/api/inngest > inngest_response.json

echo.
echo Checking if response contains functions...
findstr /i "functions" inngest_response.json > nul
if %errorlevel%==0 (
    echo ✅ Functions found in response
    echo.
    echo Function count check:
    findstr /c:"id" inngest_response.json | find /c ":"
) else (
    echo ❌ No functions found in response
    echo.
    echo Response content:
    type inngest_response.json
)

echo.
echo Cleaning up...
del inngest_response.json 2>nul

echo.
echo 📋 Next steps:
echo 1. If functions are found: Start Inngest Dev Server
echo 2. If no functions: Check Next.js console for errors
echo.

pause
