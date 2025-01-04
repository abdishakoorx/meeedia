import { db } from '@/db';
import { VIDEO_RAW_TABLE } from '@/db/schema';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { checkUserTokens, deductTokens } from '../token-management/route';

export async function POST(req: Request) {
    try {
        const { video_id, user_email, video_type, title, description } = await req.json();
       
        // Validation
        if (!video_id || !user_email) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check if user has enough tokens
        const tokenCheck = await checkUserTokens(user_email);
        if (!tokenCheck.hasEnoughTokens) {
            return NextResponse.json({
                message: `Insufficient tokens. Required: ${tokenCheck.requiredTokens}, Available: ${tokenCheck.currentTokens}`,
                tokenCheck
            }, { status: 403 });
        }

        if (!description?.frames || description.frames.length === 0) {
            return NextResponse.json(
                { message: "No frames provided" },
                { status: 400 }
            );
        }

        // Check if video already exists
        const existingVideo = await db.select()
            .from(VIDEO_RAW_TABLE)
            .where(eq(VIDEO_RAW_TABLE.videoID, video_id))
            .limit(1);

        if (existingVideo.length > 0) {
            return NextResponse.json(
                { message: "Video already exists" },
                { status: 409 }
            );
        }
   
        // First, deduct tokens
        const newTokenBalance = await deductTokens(user_email);

        // Then create video
        const videoResult = await db.insert(VIDEO_RAW_TABLE)
            .values({
                videoID: video_id,
                title: title || "Untitled",
                createdBy: user_email,
                videoType: video_type,
                description: description
            })
            .returning({
                id: VIDEO_RAW_TABLE.id,
                videoID: VIDEO_RAW_TABLE.videoID,
                title: VIDEO_RAW_TABLE.title,
                description: VIDEO_RAW_TABLE.description,
                videoType: VIDEO_RAW_TABLE.videoType,
                createdBy: VIDEO_RAW_TABLE.createdBy
            });

        return NextResponse.json({ 
            result: videoResult[0],
            tokenBalance: newTokenBalance 
        });
    } catch (error) {
        console.error('Error saving video:', error);
        // If this is a token-related error, we might want to handle it specifically
        if (error instanceof Error && error.message.includes('tokens')) {
            return NextResponse.json(
                { message: error.message },
                { status: 403 }
            );
        }
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}