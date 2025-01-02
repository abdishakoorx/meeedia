// app/api/video/[videoId]/route.ts
import { db } from '@/db';
import { VIDEO_RAW_TABLE } from '@/db/schema';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

export async function DELETE(
  request: Request,
  { params }: { params: { videoId: string } }
) {
  try {
    const videoId = params.videoId;

    if (!videoId) {
      return NextResponse.json(
        { message: "Video ID is required" },
        { status: 400 }
      );
    }

    await db
      .delete(VIDEO_RAW_TABLE)
      .where(eq(VIDEO_RAW_TABLE.videoID, videoId));

    return NextResponse.json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error('Error deleting video:', error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}