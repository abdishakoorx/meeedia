import { db } from '@/db';
import { VIDEO_RAW_TABLE } from '@/db/schema';
import { NextResponse } from 'next/server';
import { eq, desc } from 'drizzle-orm';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();
        
        if (!email) {
            return NextResponse.json(
                { message: "Email is required" },
                { status: 400 }
            );
        }

        const videos = await db
            .select()
            .from(VIDEO_RAW_TABLE)
            .where(eq(VIDEO_RAW_TABLE.createdBy, email))
            .orderBy(desc(VIDEO_RAW_TABLE.id))
            .limit(3);

        return NextResponse.json({ videos });
    } catch (error) {
        console.error('Error fetching recent videos:', error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}