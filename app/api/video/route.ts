import { db } from '@/db';
import { VIDEO_RAW_TABLE } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { video_id, user_email } = await req.json();
        
        if (!video_id || !user_email) {
            return new NextResponse("Missing required fields", { status: 400 });
        }
   
        const result = await db.insert(VIDEO_RAW_TABLE)
            .values({
                videoID: video_id,
                title: "Untitled",
                createdBy: user_email,
                videoType: "From scratch"
            })
            .returning({
                id: VIDEO_RAW_TABLE.id,
                videoID: VIDEO_RAW_TABLE.videoID,
                title: VIDEO_RAW_TABLE.title,
                description: VIDEO_RAW_TABLE.description,
                videoType: VIDEO_RAW_TABLE.videoType,
                createdBy: VIDEO_RAW_TABLE.createdBy
            });

        return NextResponse.json({ result });
    } catch (error) {
        console.error('Error saving video:', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}