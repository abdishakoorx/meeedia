"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
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

interface Frame {
  text: string;
  pattern?: string;
  gradient?: string;
  duration: number;
  fontSize: string | number;
  textColor: string;
  fontFamily: string;
  textAlign?: string;
  backgroundType?: string;
  backgroundColor: string;
  textCasing?: string;
  animation?: string;
  animationDelay?: number;
  isBold?: boolean;
  isItalic?: boolean;
  isUnderline?: boolean;
}

interface Video {
  videoID: string;
  title: string;
  videoType: string;
  description: {
    frames: Frame[];
    audioTrack?: string;
    aspectRatio: string;
    totalDuration: number;
  };
}

const getGradientStyle = (gradient: string): string => {
  const gradients: { [key: string]: string } = {
    sunset: "linear-gradient(135deg, #FF512F 0%, #DD2476 100%)",
    ocean: "linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)",
    forest: "linear-gradient(135deg, #134E5E 0%, #71B280 100%)",
    purpleHaze: "linear-gradient(135deg, #7303c0 0%, #ec38bc 100%)",
    desert: "linear-gradient(135deg, #FFB75E 0%, #ED8F03 100%)",
    northernLights: "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)",
    fire: "linear-gradient(135deg, #f12711 0%, #f5af19 100%)",
    coolBlues: "linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)",
    lavenderDream: "linear-gradient(135deg, #C04848 0%, #480048 100%)",
    peachMelba:
      "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
    aquaSplash: "linear-gradient(135deg, #13547a 0%, #80d0c7 100%)",
    citrusBurst: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)",
    berrySmoothie: "linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%)",
    mistyRose: "linear-gradient(135deg, #eecda3 0%, #ef629f 100%)",
    emeraldGlow: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    goldenHour: "linear-gradient(135deg, #fceabb 0%, #f8b500 100%)",
    royalFlush: "linear-gradient(135deg, #360033 0%, #0b8793 100%)",
    candyShop: "linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)",
    galaxy: "linear-gradient(135deg, #654ea3 0%, #eaafc8 100%)",
    deepSpace: "linear-gradient(135deg, #000428 0%, #004e92 100%)",
  };
  return gradients[gradient] || gradients.purpleHaze;
};

const getPatternStyle = (
  pattern: string,
  backgroundColor: string
): React.CSSProperties => {
  const patterns: { [key: string]: React.CSSProperties } = {
    dots: {
      backgroundColor,
      backgroundImage:
        "radial-gradient(circle at center, #000 2px, transparent 2px)",
      backgroundSize: "20px 20px",
    },
    zigzag: {
      backgroundColor,
      backgroundImage:
        "linear-gradient(135deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1) 75%, transparent 75%, transparent)",
      backgroundSize: "20px 20px",
    },
    lines: {
      backgroundColor,
      backgroundImage:
        "repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.1) 0px, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px)",
      backgroundSize: "20px 20px",
    },
    grid: {
      backgroundColor,
      backgroundImage:
        "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0px, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.1) 0px, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px)",
      backgroundSize: "20px 20px",
    },
    diagonalLines: {
      backgroundColor,
      backgroundImage:
        "repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0px, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 15px)",
      backgroundSize: "20px 20px",
    },
    waves: {
      backgroundColor,
      backgroundImage:
        "repeating-radial-gradient(circle at 0 0, transparent 0, rgba(0, 0, 0, 0.1) 2px, transparent 4px)",
      backgroundSize: "20px 20px",
    },
    stripes: {
      backgroundColor,
      backgroundImage:
        "repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) 10px, transparent 10px, transparent 20px)",
      backgroundSize: "20px 20px",
    },
    checkerboard: {
      backgroundColor,
      backgroundImage:
        "repeating-conic-gradient(rgba(0, 0, 0, 0.1) 0% 25%, transparent 0% 50%)",
      backgroundSize: "20px 20px",
    },
  };
  return patterns[pattern] || { backgroundColor };
};

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

  const getBackgroundStyle = (frame: Frame): React.CSSProperties => {
    if (frame.backgroundType === "gradient" && frame.gradient) {
      return {
        background: getGradientStyle(frame.gradient),
      };
    }
    if (frame.backgroundType === "pattern" && frame.pattern) {
      return getPatternStyle(frame.pattern, frame.backgroundColor);
    }
    return {
      backgroundColor: frame.backgroundColor,
    };
  };

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
      const response = await fetch(`/api/delete-video/${video.videoID}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Video deleted successfully.");
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
    console.log("Downloading video:", video.videoID);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const getFittedFontSize = (frame: Frame, containerWidth: number): number => {
    // Convert fontSize to number if it's a string
    const originalSize =
      typeof frame.fontSize === "string"
        ? parseInt(frame.fontSize, 10)
        : frame.fontSize;

    // Base the scaling on container width
    // Assuming original design was for 1920px width
    const scaleFactor = containerWidth / 1920;
    return Math.max(12, Math.floor(originalSize * scaleFactor)); // Minimum 12px font size
  };

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Card key={video.videoID} className="relative">
                <CardHeader>
                  <CardTitle>{video.title}</CardTitle>
                  <CardDescription>Type: {video.videoType}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-md overflow-hidden relative">
                    <div
                      className="w-full h-full flex items-center justify-center p-4 absolute inset-0"
                      style={{
                        ...getBackgroundStyle(video.description.frames[0]),
                      }}
                    >
                      <div
                        className="text-center w-full break-words overflow-hidden flex items-center justify-center"
                        style={{
                          color: video.description.frames[0].textColor,
                          fontFamily: video.description.frames[0].fontFamily,
                          fontSize: `${getFittedFontSize(
                            video.description.frames[0],
                            320
                          )}px`, // 320px is approximate card width
                          textAlign:
                            (video.description.frames[0]
                              .textAlign as React.CSSProperties["textAlign"]) ||
                            "center",
                          fontWeight: video.description.frames[0].isBold
                            ? "bold"
                            : "normal",
                          fontStyle: video.description.frames[0].isItalic
                            ? "italic"
                            : "normal",
                          textDecoration: video.description.frames[0]
                            .isUnderline
                            ? "underline"
                            : "none",
                          textTransform:
                            (video.description.frames[0]
                              .textCasing as React.CSSProperties["textTransform"]) ||
                            "none",
                          maxHeight: "100%",
                          maxWidth: "100%",
                          wordBreak: "break-word",
                          lineHeight: 1.2,
                          padding: "0.5rem",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {video.description.frames[0].text}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(video)}
                    className="flex-1 hover:bg-accent hover:scale-110 text-black hover:text-black dark:hover:bg-accent-dark dark:hover:text-white"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(video)}
                    className="flex-1 hover:bg-accent hover:scale-110 text-black hover:text-black dark:hover:bg-accent-dark dark:hover:text-white"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 hover:bg-accent hover:scale-110 text-black hover:text-black dark:hover:bg-accent-dark dark:hover:text-white"
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
                              onClick={() => setDeleteTitle("")}
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
