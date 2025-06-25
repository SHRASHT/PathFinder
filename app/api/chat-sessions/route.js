import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";
import { currentUser } from "@clerk/nextjs/server";

// GET - Fetch all chat sessions for a user
export async function GET(request) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get the Supabase user ID from Clerk ID
    const { data: supabaseUser, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('clerk_id', user.id)
      .single();

    if (userError) {
      console.error('Error fetching user:', userError);
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const { data: sessions, error } = await supabase
      .from('chat_sessions')
      .select('*')
      .eq('user_id', supabaseUser.id)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching chat sessions:', error);
      return NextResponse.json(
        { error: "Failed to fetch chat sessions" },
        { status: 500 }
      );
    }

    return NextResponse.json({ sessions });
  } catch (error) {
    console.error('Error in chat sessions API:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create a new chat session
export async function POST(request) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { sessionId, title } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Get the Supabase user ID from Clerk ID
    const { data: supabaseUser, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('clerk_id', user.id)
      .single();

    if (userError) {
      console.error('Error fetching user:', userError);
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const { data: session, error } = await supabase
      .from('chat_sessions')
      .insert([
        {
          id: sessionId,
          user_id: supabaseUser.id,
          title: title || 'New Chat',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating chat session:', error);
      return NextResponse.json(
        { error: "Failed to create chat session" },
        { status: 500 }
      );
    }

    return NextResponse.json({ session });
  } catch (error) {
    console.error('Error in chat sessions API:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
