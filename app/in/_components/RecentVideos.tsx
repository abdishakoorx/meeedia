import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Upload } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

const RecentVideos = () => {
  const { user } = useUser();
  const router = useRouter();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentVideos = async () => {
      if (!user?.primaryEmailAddress?.emailAddress) return;

      try {
        const response = await fetch("/api/video/recent", {
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
          console.log("the videos are:", data.videos);
        }
      } catch (error) {
        console.error("Error fetching recent videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentVideos();
  }, [user]);

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

  const handleVideoClick = (video: Video) => {
    const editorType = video.videoType === "From scratch" 
      ? "scratch-editor" 
      : "ai-editor";
    router.push(`/in/${editorType}/${video.videoID}`);
  };

  const renderVideoPreview = (video: Video) => {
    const firstFrame = video.description.frames[0];

    return (
      <div
        key={video.videoID}
        onClick={() => handleVideoClick(video)}
        className="bg-gray-200 dark:bg-gray-800 rounded-lg aspect-video relative overflow-hidden group cursor-pointer transition-transform duration-200 hover:scale-105"
        style={{ backgroundColor: firstFrame.backgroundColor }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {firstFrame.image ? (
            <Image
              height={260}
              width={260}
              src={firstFrame.image}
              alt={video.title}
              className="object-cover w-full h-full"
            />
          ) : (
            <div
              className="flex items-center justify-center w-full h-full"
              style={{
                color: firstFrame.textColor,
                fontFamily: firstFrame.fontFamily,
                fontSize: `${firstFrame.fontSize}px`,
              }}
            >
              {firstFrame.text}
            </div>
          )}
        </div>

        {/* Overlay with video details */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="text-white text-center p-4">
            <h4 className="font-semibold">{video.title}</h4>
            <p className="text-sm">{firstFrame.duration}s</p>
            <p className="text-xs mt-1 text-gray-300">
              {video.videoType || "Unknown Type"}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.section
      className="mt-12 bg-gray-100 dark:bg-gray-900 shadow-sm dark:shadow-xl rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Recent Videos
        </h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {loading
          ? // Loading skeleton
            [...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-300 dark:bg-gray-700 rounded-lg aspect-video animate-pulse"
              />
            ))
          : videos.length > 0
          ? // Show actual videos
            videos.map((video) => renderVideoPreview(video))
          : // Empty state
            [...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 dark:bg-gray-800 rounded-lg aspect-video flex items-center justify-center"
              >
                <Upload className="text-gray-400 dark:text-gray-500 w-6 h-6" />
                <span className="ml-2 text-gray-500 dark:text-gray-400 text-sm">
                  Empty Slot
                </span>
              </div>
            ))}
      </div>
    </motion.section>
  );
};

export default RecentVideos;