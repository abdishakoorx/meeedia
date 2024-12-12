import { db } from "@/db";
import { USER_TABLE } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { fullName, primaryEmailAddress } = await req.json();

    if (!primaryEmailAddress?.emailAddress) {
      return NextResponse.json(
        { error: 'Invalid user data' }, 
        { status: 400 }
      );
    }

    // Check for the user in db
    const existingUsers = await db
      .select()
      .from(USER_TABLE)
      .where(eq(USER_TABLE.email, primaryEmailAddress.emailAddress));

    // If user doesn't exist, create new user
    if (existingUsers.length === 0) {
      const [newUser] = await db
        .insert(USER_TABLE)
        .values({
          name: fullName || 'Unknown User',
          email: primaryEmailAddress.emailAddress,
        })
        .returning();

      return NextResponse.json({ user: newUser }, { status: 201 });
    }

    // User already exists
    return NextResponse.json({ user: existingUsers[0] });
  } catch (error) {
    console.error('User creation error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}