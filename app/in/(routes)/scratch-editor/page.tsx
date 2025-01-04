"use client";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "../../_components/HeaderNameProvider";
import FrameList from "./_components/FrameList";
import RemotePlayer from "./_components/RemotionPlayer";
import { useCallback, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { useFramesList } from "@/app/_context/FramesListContext";
import { useRouter } from "next/navigation";

export default function ScratchEditor() {
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useUser();
  const { videoFrame } = useFramesList();
  const router = useRouter();

  const handleSave = useCallback(async () => {
    try {
      // Validation checks
      if (!user?.primaryEmailAddress?.emailAddress) {
        toast.error("Please sign in to save your video");
        return;
      }

      if (!videoFrame?.frameList || videoFrame.frameList.length === 0) {
        toast.error("Add at least one frame before saving");
        return;
      }

      setIsSaving(true);

      // Prepare video data with all required fields
      const videoData = {
        video_id: uuidv4(),
        user_email: user.primaryEmailAddress.emailAddress,
        video_type: "From scratch",
        title: "Untitled",
        description: {
          frames: videoFrame.frameList,
          totalDuration: videoFrame.totalDuration,
          aspectRatio: "16:9",
        },
      };

      const response = await fetch("/api/video/scratch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(videoData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save video");
      }

      const result = await response.json();

      toast.success("Video saved successfully");

      // Redirect to the video edit page
      router.push(`/in/scratch-editor/${result.result[0].videoID}`);
    } catch (error) {
      // console.error('Error saving video:', error);
      toast.error(
        error instanceof Error ? error.message : "Failed to save video"
      );
    } finally {
      setIsSaving(false);
      toast.success("Finishing up...");
    }
  }, [user, videoFrame, router]);

  return (
    <div className="space-y-2">
      <Header headerName="Create Video" />
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-4">
        <div className="mb-6 flex justify-end px-2">
          <Button
            variant={"outline"}
            className="bg-white w-44 text-black border border-gray-300 hover:bg-gray-100 hover:text-black"
            onClick={handleSave}
            disabled={isSaving || !user || !videoFrame?.frameList.length}
          >
            <Save className="w-5 h-5 mr-2" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-9 gap-4 md:gap-6 h-auto md:h-[calc(100vh-12rem)]">
          <FrameList />
          <div className="md:col-span-7 space-y-4">
            <RemotePlayer />
          </div>
        </div>
      </div>
    </div>
  );
}
