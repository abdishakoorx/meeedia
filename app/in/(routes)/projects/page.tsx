"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "../../_components/HeaderNameProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Video {
  videoID: string;
  title: string;
  videoType: string;
  description: {
    frames: Frame[];
  };
}

interface Frame {
  backgroundColor: string;
  image?: string;
  text: string;
  textColor: string;
  fontFamily: string;
  fontSize: number;
  duration: number;
}

function Projects() {
  const { user } = useUser();
  const router = useRouter();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTitle, setDeleteTitle] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchVideos = useCallback(async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    try {
      const response = await fetch("/api/video/all", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.primaryEmailAddress.emailAddress,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setVideos(data.videos);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleEdit = (video: Video) => {
    const editorType =
      video.videoType === "From scratch" ? "scratch-editor" : "ai-editor";
    router.push(`/in/${editorType}/${video.videoID}`);
  };

  const handleDelete = async (video: Video) => {
    if (deleteTitle !== video.title) {
      alert("Video title doesn't match");
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/video/${video.videoID}`, {
        method: "DELETE",
      });

      toast.success("Video deleted successfully.");

      if (response.ok) {
        setVideos(videos.filter((v) => v.videoID !== video.videoID));
        setDeleteTitle("");
      } else {
        toast.error("Failed to delete video");
      }
    } catch {
      toast.error("Error deleting video");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDownload = async (video: Video) => {
    // Placeholder for download functionality
    console.log("Downloading video:", video.videoID);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header headerName="Your Projects" />
      <div className="container mx-auto px-4 py-8">
        {videos.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400">
              No videos found
            </h3>
            <p className="mt-2 text-gray-500 dark:text-gray-500">
              Start creating new videos to see them here
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {videos.map((video) => (
              <Card key={video.videoID} className="relative">
                <CardHeader>
                  <CardTitle>{video.title}</CardTitle>
                  <CardDescription>Type: {video.videoType}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className="aspect-video rounded-md overflow-hidden"
                    style={{
                      backgroundColor:
                        video.description.frames[0].backgroundColor,
                    }}
                  >
                    {video.description.frames[0].image ? (
                      <Image
                        src={video.description.frames[0].image}
                        alt={video.title}
                        width={300}
                        height={169}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{
                          color: video.description.frames[0].textColor,
                          fontFamily: video.description.frames[0].fontFamily,
                          fontSize: `${video.description.frames[0].fontSize}px`,
                        }}
                      >
                        {video.description.frames[0].text}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(video)}
                    className="hover:bg-accent hover:scale-110 text-black hover:text-black dark:hover:bg-accent-dark dark:hover:text-white"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(video)}
                    className="hover:bg-accent hover:scale-110 text-black hover:text-black dark:hover:bg-accent-dark dark:hover:text-white"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-accent hover:scale-110 text-black hover:text-black dark:hover:bg-accent-dark dark:hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">
                            Delete Video
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Type{" "}
                            <span className="font-semibold text-black dark:text-white">
                              &quot;{video.title}&quot;
                            </span>{" "}
                            to confirm deletion
                          </p>
                        </div>
                        <div className="grid gap-2">
                          <Input
                            placeholder="Enter video title"
                            value={deleteTitle}
                            onChange={(e) => setDeleteTitle(e.target.value)}
                          />
                          <div className="flex gap-2">
                            <Button
                              variant="destructive"
                              onClick={() => handleDelete(video)}
                              disabled={
                                isDeleting || deleteTitle !== video.title
                              }
                            >
                              {isDeleting && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              )}
                              Delete Permanently
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setDeleteTitle("");
                              }}
                              className="text-black hover:text-black bg-gray-200 hover:bg-gray-200 flex-1"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;
