import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";
import { currentUser } from "@clerk/nextjs/server";

// POST - Create or update a user in Supabase
export async function POST() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user already exists
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("clerk_id", user.id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error fetching user:", fetchError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    let userData;

    if (existingUser) {
      // Update existing user
      const { data: updatedUser, error: updateError } = await supabase
        .from("users")
        .update({
          email: user.emailAddresses?.[0]?.emailAddress,
          name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
          avatar_url: user.imageUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("clerk_id", user.id)
        .select()
        .single();

      if (updateError) {
        console.error("Error updating user:", updateError);
        return NextResponse.json(
          { error: "Failed to update user" },
          { status: 500 }
        );
      }

      userData = updatedUser;
    } else {
      // Create new user
      const { data: newUser, error: createError } = await supabase
        .from("users")
        .insert([
          {
            clerk_id: user.id,
            email: user.emailAddresses?.[0]?.emailAddress,
            name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
            avatar_url: user.imageUrl,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (createError) {
        console.error("Error creating user:", createError);
        return NextResponse.json(
          { error: "Failed to create user" },
          { status: 500 }
        );
      }

      userData = newUser;
    }

    return NextResponse.json({
      user: userData,
      message: existingUser
        ? "User updated successfully"
        : "User created successfully",
    });
  } catch (error) {
    console.error("Error in user API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET - Get current user information
export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: userData, error } = await supabase
      .from("users")
      .select("*")
      .eq("clerk_id", user.id)
      .single();

    if (error) {
      console.error("Error fetching user:", error);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: userData });
  } catch (error) {
    console.error("Error in user API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
