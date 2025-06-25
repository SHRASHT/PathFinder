# Database Schema Documentation

This document outlines the required database tables for the Career Recommendation application.

## Required Tables

### 1. users
```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_users_clerk_id ON users(clerk_id);
```

### 2. chat_sessions
```sql
CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT DEFAULT 'New Chat',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_chat_sessions_user_id ON chat_sessions(user_id);
CREATE INDEX idx_chat_sessions_updated_at ON chat_sessions(updated_at);
```

### 3. chat_messages
```sql
CREATE TABLE chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX idx_chat_messages_created_at ON chat_messages(created_at);
```

## How to Set Up

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Run each of the CREATE TABLE statements above
4. Verify the tables are created in the Table Editor

## Row Level Security (RLS)

After creating the tables, you should enable RLS and set up policies:

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid()::text = clerk_id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid()::text = clerk_id);

CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT WITH CHECK (auth.uid()::text = clerk_id);

-- Users can only see their own chat sessions
CREATE POLICY "Users can view own chat sessions" ON chat_sessions
  FOR SELECT USING (user_id IN (SELECT id FROM users WHERE clerk_id = auth.uid()::text));

CREATE POLICY "Users can create own chat sessions" ON chat_sessions
  FOR INSERT WITH CHECK (user_id IN (SELECT id FROM users WHERE clerk_id = auth.uid()::text));

CREATE POLICY "Users can update own chat sessions" ON chat_sessions
  FOR UPDATE USING (user_id IN (SELECT id FROM users WHERE clerk_id = auth.uid()::text));

-- Users can only see messages from their own chat sessions
CREATE POLICY "Users can view own chat messages" ON chat_messages
  FOR SELECT USING (
    session_id IN (
      SELECT cs.id FROM chat_sessions cs 
      JOIN users u ON cs.user_id = u.id 
      WHERE u.clerk_id = auth.uid()::text
    )
  );

CREATE POLICY "Users can create own chat messages" ON chat_messages
  FOR INSERT WITH CHECK (
    session_id IN (
      SELECT cs.id FROM chat_sessions cs 
      JOIN users u ON cs.user_id = u.id 
      WHERE u.clerk_id = auth.uid()::text
    )
  );
```
