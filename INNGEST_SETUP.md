# Inngest Setup Guide - Enhanced Version

## 1. Complete Installation ✅

✅ Inngest package installed  
✅ Client configured with enhanced settings  
✅ Comprehensive functions created  
✅ API routes with batch processing  
✅ Event triggers with templates  
✅ Error handling and monitoring

## 2. Quick Start Guide

### Step-by-Step Sync Instructions

1. **Install Inngest CLI:**

   ```bash
   npm install -g inngest-cli
   ```

2. **Start the Inngest Dev Server FIRST:**

   ```bash
   npx inngest-cli@latest dev
   ```

   - This will start the dashboard at http://localhost:8288
   - **Keep this terminal window open**

3. **In a NEW terminal, start your Next.js app:**

   ```bash
   npm run dev
   ```

   - This will start your app at http://localhost:3000
   - **Keep this terminal window open too**

4. **Visit the Inngest dashboard:**

   - Open http://localhost:8288 in your browser
   - You should see "PathFinder AI Career Recommendation System" listed

5. **Test the connection:**

   ```powershell
   # For Windows PowerShell, use Invoke-RestMethod:
   Invoke-RestMethod -Uri "http://localhost:3000/api/inngest-events" -Method POST -ContentType "application/json" -Body '{"type": "hello", "data": {"email": "test@example.com"}}'

   # OR use curl with proper Windows syntax:
   curl -X POST "http://localhost:3000/api/inngest-events" -H "Content-Type: application/json" --data "{\"type\": \"hello\", \"data\": {\"email\": \"test@example.com\"}}"
   ```

### 🚨 IMPORTANT: Order Matters!

- Start Inngest dev server BEFORE your Next.js app
- Both must be running simultaneously
- If you see connection errors, restart both in the correct order

## 3. Enhanced Functions Available

### 🎯 Career Assessment (Enhanced)

- **Event:** `career/assessment.submitted`
- **Features:** Advanced recommendation logic, learning paths, salary ranges
- **Trigger:** `InngestEventTrigger.triggerCareerAssessment(userId, assessmentData)`

### 💬 AI Chat Messages (Enhanced)

- **Event:** `chat/message.received`
- **Features:** AI agent integration, conversation history, metrics
- **Trigger:** `InngestEventTrigger.triggerAiChatMessage(userId, message, sessionId)`

### 🤖 Direct AI Career Query (New)

- **Event:** `ai/career.query`
- **Features:** Direct AI consultation, quick responses
- **Trigger:** `InngestEventTrigger.triggerAiCareerQuery(userId, userInput, sessionId)`

### 📄 Resume Analysis (Enhanced)

- **Event:** `resume/analysis.requested`
- **Features:** Comprehensive scoring, ATS compatibility, industry comparison
- **Trigger:** `InngestEventTrigger.triggerResumeAnalysis(userId, resumeData)`

### 👋 User Onboarding (Enhanced)

- **Event:** `user/onboarded`
- **Features:** Multi-step sequence, follow-up scheduling, engagement tracking
- **Trigger:** `InngestEventTrigger.triggerUserOnboarding(userId, email, name)`

## 4. Testing Your Enhanced Functions

### Single Event Testing

1. **Test Hello World:**

   ```powershell
   # PowerShell method:
   Invoke-RestMethod -Uri "http://localhost:3000/api/inngest-events" -Method POST -ContentType "application/json" -Body '{"type": "hello", "data": {"email": "test@example.com"}}'

   # OR curl method for Windows:
   curl -X POST "http://localhost:3000/api/inngest-events" -H "Content-Type: application/json" --data "{\"type\": \"hello\", \"data\": {\"email\": \"test@example.com\"}}"
   ```

2. **Test Enhanced Career Assessment:**

   ```powershell
   $body = @{
     type = "career-assessment"
     data = @{
       userId = "user123"
       assessmentData = @{
         skills = @("programming", "analytics")
         interests = @("technology", "data")
         workStyle = @("remote", "collaborative")
         experience = "entry-level"
       }
     }
   } | ConvertTo-Json -Depth 5

   Invoke-RestMethod -Uri "http://localhost:3000/api/inngest-events" -Method POST -ContentType "application/json" -Body $body
   ```

3. **Test AI Career Query:**

   ```powershell
   $aiQuery = @{
     type = "ai-career-query"
     data = @{
       userId = "user123"
       userInput = "I want to transition from marketing to tech. What should I do?"
       sessionId = "session_123"
     }
   } | ConvertTo-Json

   Invoke-RestMethod -Uri "http://localhost:3000/api/inngest-events" -Method POST -ContentType "application/json" -Body $aiQuery
   ```

### Batch Processing (New Feature)

```powershell
# PowerShell batch processing:
$batchData = @{
  batch = $true
  data = @(
    @{
      type = "user-onboarding"
      data = @{
        userId = "user1"
        userEmail = "user1@example.com"
        userName = "John"
      }
    },
    @{
      type = "career-assessment"
      data = @{
        userId = "user1"
        responses = @("answer1", "answer2")
      }
    }
  )
} | ConvertTo-Json -Depth 5

Invoke-RestMethod -Uri "http://localhost:3000/api/inngest-events" -Method POST -ContentType "application/json" -Body $batchData
```

### Check Event Status

```powershell
# Check event status:
Invoke-RestMethod -Uri "http://localhost:3000/api/inngest-events?eventId=your_event_id" -Method GET
```

## 5. Using in Your Components

### Basic Usage

```javascript
import { InngestEventTrigger } from "@/lib/inngest-events";

// In your career assessment component
const handleAssessmentSubmit = async (assessmentData) => {
  const result = await InngestEventTrigger.triggerCareerAssessment(
    userId,
    assessmentData
  );

  if (result.success) {
    console.log("Assessment processing started:", result.eventId);
    // Show success message to user
  } else {
    console.error("Failed to process assessment:", result.error);
    // Show error message to user
  }
};

// In your chat component
const handleChatMessage = async (message) => {
  const result = await InngestEventTrigger.triggerAiChatMessage(
    userId,
    message,
    sessionId
  );

  if (result.success) {
    // Show typing indicator
    console.log("AI processing message:", result.eventId);
  }
};
```

### Using Event Templates (New)

```javascript
import { InngestEventTrigger, EventTemplates } from "@/lib/inngest-events";

// Quick user signup flow
const handleNewUserSignup = async (user) => {
  const event = EventTemplates.newUserSignup(user.id, user.email, user.name);
  const result = await inngest.send(event);
};

// Batch processing for multiple users
const handleBulkOnboarding = async (users) => {
  const events = users.map((user) =>
    EventTemplates.newUserSignup(user.id, user.email, user.name)
  );

  const result = await InngestEventTrigger.triggerBatch(events);
  console.log(`Onboarded ${result.totalEvents} users`);
};
```

## 6. Production Deployment

1. **Create Inngest account:** https://app.inngest.com/
2. **Get your production keys from the dashboard**
3. **Update your environment variables:**
   ```bash INNGEST_EVENT_KEY=your_production_event_key
   INNGEST_SIGNING_KEY=your_production_signing_key
   INNGEST_DEV=false
   INNGEST_BASE_URL=https://your-app.vercel.app
   GEMINI_API_KEY=your_gemini_api_key
   ```

## 7. Monitoring and Debugging

1. **View function runs:** Visit your Inngest dashboard
2. **Check logs:** Each step logs its progress
3. **Error tracking:** Failed events are automatically retried
4. **Event status:** Use the GET endpoint to check event status

### 🔧 Troubleshooting Connection Issues

If your app is not syncing with Inngest, try these steps:

1. **Check Inngest Dev Server:**

   ```bash
   npx inngest-cli@latest dev
   ```

   Make sure it's running on http://localhost:8288

2. **Verify Environment Variables:**
   Check your `.env.local` file has:

   ```bash
   INNGEST_SIGNING_KEY=local.dev
   INNGEST_EVENT_KEY=local.dev
   INNGEST_DEV=true
   INNGEST_BASE_URL=http://localhost:3000
   ```

3. **Test Basic Connection:**

   ```powershell
   # Test the simple endpoint first
   Invoke-RestMethod -Uri "http://localhost:3000/api/inngest-test" -Method GET
   ```

4. **Check Next.js App:**
   Make sure your app is running on http://localhost:3000

   ```bash
   npm run dev
   ```

5. **Test Simple Event:**

   ```powershell
   Invoke-RestMethod -Uri "http://localhost:3000/api/inngest-events" -Method POST -ContentType "application/json" -Body '{"type": "hello", "data": {"email": "test@example.com"}}'
   ```

6. **Check Console Logs:**
   Look for error messages in both:
   - Your Next.js terminal
   - Inngest dashboard logs

## 8. Advanced Features

- ✅ **Error Handling:** Automatic retries and fallback responses
- ✅ **Batch Processing:** Handle multiple events efficiently
- ✅ **Event Templates:** Predefined event structures
- ✅ **Status Monitoring:** Track event processing status
- ✅ **AI Integration:** Google Gemini 2.0 Flash powered career advice
- ✅ **Streaming Support:** Better performance for real-time responses

## 9. Next Steps

1. Set up your Gemini API key for AI features (already configured!)
2. Configure your database for persistent storage
3. Customize the AI agent responses for your brand
4. Add webhook endpoints for external integrations
5. Implement user notification preferences

Your Inngest setup is now production-ready with enhanced Gemini AI features! 🚀
