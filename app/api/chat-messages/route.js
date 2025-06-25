import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

// GET - Fetch messages for a specific chat session
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    const { data: messages, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching chat messages:', error);
      return NextResponse.json(
        { error: "Failed to fetch chat messages" },
        { status: 500 }
      );
    }

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Error in chat messages API:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Save a new message
export async function POST(request) {
  try {
    const { messageId, sessionId, userId, type, content } = await request.json();

    if (!messageId || !sessionId || !userId || !type || !content) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const { data: message, error } = await supabase
      .from('chat_messages')
      .insert([
        {
          id: messageId,
          session_id: sessionId,
          user_id: userId,
          type: type,
          content: content,
          created_at: new Date().toISOString(),
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error saving chat message:', error);
      return NextResponse.json(
        { error: "Failed to save chat message" },
        { status: 500 }
      );
    }

    // Update session's updated_at timestamp
    await supabase
      .from('chat_sessions')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', sessionId);

    return NextResponse.json({ message });
  } catch (error) {
    console.error('Error in chat messages API:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
