@echo off
echo.
echo =====================================================
echo    🔧 COMPREHENSIVE INNGEST DIAGNOSTICS
echo =====================================================
echo.

echo 📋 Step 1: Testing if Next.js is running...
curl -s -o nul -w "%%{http_code}" http://localhost:3000 > temp_status.txt
set /p STATUS=<temp_status.txt
if "%STATUS%"=="200" (
    echo ✅ Next.js is running ^(Status: %STATUS%^)
) else (
    echo ❌ Next.js issue ^(Status: %STATUS%^)
    del temp_status.txt
    goto :end
)
del temp_status.txt

echo.
echo 📋 Step 2: Testing Inngest endpoint...
curl -s -w "HTTP Status: %%{http_code}" http://localhost:3000/api/inngest > inngest_test.json
echo.

echo 📋 Step 3: Checking response content...
findstr /c:"functions" inngest_test.json > nul
if %errorlevel%==0 (
    echo ✅ Inngest endpoint returns function data
    echo.
    echo 📋 Step 4: Counting functions...
    for /f %%i in ('findstr /c:""""id"""" inngest_test.json') do set FUNC_COUNT=%%i
    echo Found functions in response
    echo.
    echo 📋 Step 5: Checking for specific functions...
    findstr /c:"hello-world" inngest_test.json > nul && echo ✅ hello-world found || echo ❌ hello-world missing
    findstr /c:"process-career-assessment" inngest_test.json > nul && echo ✅ process-career-assessment found || echo ❌ process-career-assessment missing
    findstr /c:"process-ai-chat-message" inngest_test.json > nul && echo ✅ process-ai-chat-message found || echo ❌ process-ai-chat-message missing
    findstr /c:"ai-career-agent" inngest_test.json > nul && echo ✅ ai-career-agent found || echo ❌ ai-career-agent missing
) else (
    echo ❌ Inngest endpoint not returning proper function data
    echo.
    echo Response preview:
    type inngest_test.json | more
)

echo.
echo 📋 Cleanup...
del inngest_test.json 2>nul

echo.
echo 🚀 If all functions found: Start Inngest Dev Server
echo    npx inngest-cli@latest dev
echo.

:end
pause
