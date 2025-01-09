import { db } from "@/db";
import { VIDEO_RAW_TABLE } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    // Get videoId from searchParams
    const url = new URL(req.url);
    const videoId = url.searchParams.get('videoId');

    if (!videoId) {
      return NextResponse.json({ message: "Video ID is required" }, { status: 400 });
    }

    const result = await db
      .select()
      .from(VIDEO_RAW_TABLE)
      .where(eq(VIDEO_RAW_TABLE.videoID, videoId))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json({ message: "Video not found" }, { status: 404 });
    }

    // Parse the description if it's a string
    const video = result[0];
    if (typeof video.description === "string") {
      try {
        video.description = JSON.parse(video.description);
      } catch (e) {
        console.error("Error parsing description:", e);
        console.log("Raw description:", video.description);
      }
    }
    return NextResponse.json({ result: video });
  } catch (error) {
    console.error("Error fetching video:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { video_id, user_email, video_type, title, description } = await req.json();

    // Validation
    if (!user_email || !video_id) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!description?.frames || description.frames.length === 0) {
      return NextResponse.json(
        { message: "No frames provided" },
        { status: 400 }
      );
    }

    const result = await db
      .update(VIDEO_RAW_TABLE)
      .set({
        title: title || "Untitled",
        videoType: video_type,
        description: description,
      })
      .where(eq(VIDEO_RAW_TABLE.videoID, video_id))
      .returning({
        id: VIDEO_RAW_TABLE.id,
        videoID: VIDEO_RAW_TABLE.videoID,
        title: VIDEO_RAW_TABLE.title,
        description: VIDEO_RAW_TABLE.description,
        videoType: VIDEO_RAW_TABLE.videoType,
        createdBy: VIDEO_RAW_TABLE.createdBy,
      });

    if (result.length === 0) {
      return NextResponse.json({ message: "Video not found" }, { status: 404 });
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error updating video:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}