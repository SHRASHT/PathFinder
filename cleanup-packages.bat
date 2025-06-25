@echo off
echo.
echo =====================================================
echo    🧹 CLEANING UP PROBLEMATIC PACKAGES
echo =====================================================
echo.

echo 🗑️  Removing @inngest/agent-kit package...
npm uninstall @inngest/agent-kit

echo.
echo ✅ Package cleanup complete!
echo.
echo 📋 Now test the endpoint:
echo .\test-endpoint.bat
echo.

pause
