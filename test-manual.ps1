# Manual testing script for Inngest setup
Write-Host "🚀 Manual Inngest Testing Script" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green

# Check if Next.js is running
Write-Host "`n📋 Step 1: Testing Next.js connection..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 5
    Write-Host "✅ Next.js is running (Status: $($response.StatusCode))" -ForegroundColor Green
} catch {
    Write-Host "❌ Next.js not running. Please start it first:" -ForegroundColor Red
    Write-Host "   npm run dev" -ForegroundColor Cyan
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test Inngest endpoint
Write-Host "`n📋 Step 2: Testing Inngest endpoint..." -ForegroundColor Yellow
try {
    $inngestResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/inngest" -UseBasicParsing -TimeoutSec 10
    Write-Host "✅ Inngest endpoint accessible (Status: $($inngestResponse.StatusCode))" -ForegroundColor Green
    
    # Parse response to count functions
    $responseContent = $inngestResponse.Content
    Write-Host "`n📋 Step 3: Analyzing response..." -ForegroundColor Yellow
    
    # Check for function indicators
    $functionPatterns = @(
        "hello-world",
        "process-career-assessment", 
        "process-ai-chat-message",
        "process-resume-analysis",
        "process-user-onboarding",
        "ai-career-agent"
    )
    
    $foundFunctions = @()
    foreach ($pattern in $functionPatterns) {
        if ($responseContent -match $pattern) {
            $foundFunctions += $pattern
            Write-Host "✅ Found: $pattern" -ForegroundColor Green
        } else {
            Write-Host "❌ Missing: $pattern" -ForegroundColor Red
        }
    }
    
    Write-Host "`n🎯 Summary:" -ForegroundColor Yellow
    Write-Host "Found $($foundFunctions.Count) of 6 expected functions" -ForegroundColor Cyan
    
    if ($foundFunctions.Count -eq 6) {
        Write-Host "`n✅ ALL FUNCTIONS LOADED SUCCESSFULLY!" -ForegroundColor Green
        Write-Host "🚀 Next step: Start Inngest Dev Server" -ForegroundColor Yellow
        Write-Host "   npx inngest-cli@latest dev" -ForegroundColor Cyan
    } else {
        Write-Host "`n❌ Some functions are missing. Check Next.js console for errors." -ForegroundColor Red
    }
    
} catch {
    Write-Host "❌ Inngest endpoint error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "`nResponse preview (if any):" -ForegroundColor Yellow
    if ($_.Exception.Response) {
        $reader = [System.IO.StreamReader]::new($_.Exception.Response.GetResponseStream())
        $responseText = $reader.ReadToEnd()
        Write-Host $responseText -ForegroundColor Gray
    }
}

Write-Host "`n=================================" -ForegroundColor Green
Write-Host "Test complete. Review results above." -ForegroundColor Green
