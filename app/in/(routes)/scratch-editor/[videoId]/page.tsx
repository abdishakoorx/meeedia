"use client";
import { Save, Pencil, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "../../../_components/HeaderNameProvider";
import EditingField from "../_components/EditingField";
import { useCallback, useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { useFramesList } from "@/app/_context/FramesListContext";
import { useParams } from "next/navigation";
import UpdateFrameList from "./_components/UpdateFrameList";
import { CustomLoader } from "@/components/CustomLoader";
import UpdatedRemotePlayer from "./_components/UpdateRemotionPlayer";

export default function ScratchVideoEditor() {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [videoTitle, setVideoTitle] = useState("Untitled");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState("");
  const { user } = useUser();
  const { videoFrame, setVideoFrame } = useFramesList();
  const params = useParams();
  const videoId = params.videoId as string;

 
  // Update the fetchVideo function in useEffect
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`/api/video/data?videoId=${videoId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch video");
        }

        const data = await response.json();
        if (data.result) {
          setVideoTitle(data.result.title || "Untitled");
          if (data.result.description) {
            setVideoFrame({
              frameList: data.result.description.frames || [],
              totalDuration: data.result.description.totalDuration || 0,
              selectedFrameIndex: 0,
              aspectRatio: data.result.description.aspectRatio || "16:9",
              audioTrack: data.result.description.audioTrack || "none",
            });
          }
        }
      } catch {
        toast.error("Failed to load video");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideo();
  }, [videoId, setVideoFrame]);

  // Update the handleUpdate function
  const handleUpdate = useCallback(
    async (newTitle?: string) => {
      try {
        if (!user?.primaryEmailAddress?.emailAddress) {
          toast.error("Please sign in to update your video");
          return;
        }

        if (!videoFrame?.frameList || videoFrame.frameList.length === 0) {
          toast.error("Add at least one frame before saving");
          return;
        }

        setIsSaving(true);

        const updateData = {
          video_id: videoId,
          user_email: user.primaryEmailAddress.emailAddress,
          video_type: "From scratch",
          title: newTitle || videoTitle,
          description: {
            frames: videoFrame.frameList,
            totalDuration: videoFrame.totalDuration,
            aspectRatio: videoFrame.aspectRatio,
            audioTrack: videoFrame.audioTrack,
          },
        };

        const response = await fetch("/api/video/data", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to update video");
        }

        toast.success("Video updated successfully");
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to update video"
        );
      } finally {
        setIsSaving(false);
      }
    },
    [user, videoFrame, videoId, videoTitle]
  );

  const handleStartEditTitle = () => {
    setTempTitle(videoTitle);
    setIsEditingTitle(true);
  };

  const handleSaveTitle = async () => {
    if (tempTitle.trim() === "") {
      toast.error("Title cannot be empty");
      return;
    }
    setIsEditingTitle(false);
    setVideoTitle(tempTitle);
    await handleUpdate(tempTitle);
  };

  if (isLoading) {
    return <CustomLoader />;
  }

  return (
    <div className="space-y-2">
      <Header headerName="Edit Video" />
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-4">
        <div className="mb-6 flex justify-between items-center">
          {/* Title Section */}
          <div className="">
            {isEditingTitle ? (
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={tempTitle}
                  onChange={(e) => setTempTitle(e.target.value)}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  placeholder="Enter video title"
                  autoFocus
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSaveTitle();
                    }
                  }}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSaveTitle}
                  className="h-10 w-10 bg-white text-black border border-gray-300 hover:bg-gray-100 hover:text-black"
                >
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div
                className="flex items-center gap-2 cursor-pointer group"
                onClick={handleStartEditTitle}
              >
                <h2 className="text-2xl font-semibold">{videoTitle}</h2>
                <Pencil className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="">
            <Button
              variant="outline"
              className="bg-white w-44 text-black border border-gray-300 hover:bg-gray-100 hover:text-black"
              onClick={() => handleUpdate()}
              disabled={isSaving || !user || !videoFrame?.frameList.length}
            >
              <Save className="w-5 h-5 mr-2" />
              {isSaving ? "Saving..." : "Update"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 h-auto md:h-[calc(100vh-12rem)]">
          <UpdateFrameList />
          <div className="md:col-span-7 space-y-4">
            <UpdatedRemotePlayer />
          </div>
          <div className="md:col-span-3">
            <EditingField />
          </div>
        </div>
      </div>
    </div>
  );
}
