import { db } from '@/db';
import { USER_TABLE } from '@/db/schema';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

const REFRESH_INTERVAL = 5 * 60 * 60 * 1000; // 5 hours in milliseconds
const MAX_TOKENS = 10;
const MIN_TOKENS_THRESHOLD = 3;

// Define the user type based on your schema
// type User = typeof USER_TABLE.$inferSelect;

interface RefreshResponse {
  result?: {
    id: number;
    name: string;
    email: string;
    credits: number;
    lastTokenRefresh: Date;
    image?: string | null;
  }[];
  message?: string;
  timeRemaining?: number;
}

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json<RefreshResponse>(
                { message: "Email is required" },
                { status: 400 }
            );
        }

        const users = await db.select()
            .from(USER_TABLE)
            .where(eq(USER_TABLE.email, email))
            .limit(1);

        const user = users[0];

        if (!user) {
            return NextResponse.json<RefreshResponse>(
                { message: "User not found" },
                { status: 404 }
            );
        }

        const lastRefresh = user.lastTokenRefresh ?? new Date(0);
        const now = new Date();
        const timeSinceRefresh = now.getTime() - lastRefresh.getTime();

        // Check if credits is non-null before comparison
        const currentCredits = user.credits ?? 0;

        // Only refresh if enough time has passed AND tokens are below threshold
        if (timeSinceRefresh >= REFRESH_INTERVAL && currentCredits < MIN_TOKENS_THRESHOLD) {
            const updatedUsers = await db.update(USER_TABLE)
                .set({
                    credits: MAX_TOKENS,
                    lastTokenRefresh: now
                })
                .where(eq(USER_TABLE.email, email))
                .returning();

            const sanitizedUsers = updatedUsers.map(user => ({
                ...user,
                credits: user.credits ?? 0,
                lastTokenRefresh: user.lastTokenRefresh ?? new Date(0)
            }));

            return NextResponse.json<RefreshResponse>({ 
                result: sanitizedUsers,
                message: "Tokens refreshed successfully" 
            });
        }

        return NextResponse.json<RefreshResponse>({
            message: "Not eligible for refresh",
            timeRemaining: Math.max(0, REFRESH_INTERVAL - timeSinceRefresh)
        });

    } catch (error) {
        console.error('Token refresh error:', error);
        return NextResponse.json<RefreshResponse>(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}