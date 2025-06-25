# AI Career Recommendation Platform

This is a [Next.js](https://nextjs.org) project that provides AI-powered career recommendations through an intelligent chat interface.

## Features

- 🤖 **AI-Powered Chat**: Integration with Google Generative AI (Gemini) for intelligent career recommendations
- 👤 **User Authentication**: Secure authentication using Clerk
- 💾 **Persistent Chat History**: Chat sessions and messages stored in Supabase PostgreSQL database
- ⚡ **Background Jobs**: Event-driven workflows using Inngest for processing
- 📱 **Responsive Design**: Modern UI built with Tailwind CSS and Radix UI components
- 🔒 **Security**: Row Level Security (RLS) policies and protected API routes

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - Component-based UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible headless components
- **Lucide React** - Modern icon library

### Backend & Database
- **Next.js API Routes** - Server-side API endpoints
- **Supabase** - PostgreSQL database with real-time capabilities
- **Clerk** - Authentication and user management
- **Google Generative AI** - AI integration for chat responses
- **Inngest** - Background job processing and event workflows

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Supabase account and project
- Clerk account for authentication
- Google AI API key

### Environment Setup

Create a `.env.local` file with the following variables:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Google AI
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key

# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_API_KEY=your_supabase_anon_key

# Inngest (for background jobs)
INNGEST_SIGNING_KEY=local
INNGEST_EVENT_KEY=local
INNGEST_DEV=true
INNGEST_BASE_URL=http://127.0.0.1:8288

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### Database Setup

1. Create the following tables in your Supabase database:

```sql
-- Users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat sessions table
CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT DEFAULT 'New Chat',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat messages table
CREATE TABLE chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Installation & Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
