import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Upload } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

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
    peachMelba:"linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
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
    iceberg: "linear-gradient(135deg, #76b852 0%, #8DC26F 100%)",
    midnightCity: "linear-gradient(135deg, #232526 0%, #414345 100%)",
    pinkLemonade: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    blueLagoon: "linear-gradient(135deg, #43c6ac 0%, #191654 100%)",
    velvet: "linear-gradient(135deg, #DA4453 0%, #89216B 100%)",
    sunriseGlow: "linear-gradient(135deg, #FF5F6D 0%, #FFC371 100%)",
    arcticDawn:"linear-gradient(135deg, #3A1C71 0%, #D76D77 50%, #FFAF7B 100%)",
    seaBreeze: "linear-gradient(135deg, #00B4DB 0%, #0083B0 100%)",
    tropicalSunset: "linear-gradient(135deg, #FA709A 0%, #FEE140 100%)",
    mocha: "linear-gradient(135deg, #4e342e 0%, #8d6e63 100%)",
    neonDreams: "linear-gradient(135deg, #FF4E50 0%, #F9D423 100%)",
    frostedGlass: "linear-gradient(135deg, #FFFFFF 0%, #E4E5E6 100%)",
    auroraBorealis: "linear-gradient(135deg, #5C258D 0%, #4389A2 100%)",
    goldenSand: "linear-gradient(135deg, #F4E2D8 0%, #BA5370 100%)",
    peacock: "linear-gradient(135deg, #6190E8 0%, #A7BFE8 100%)",
    cobaltDreams: "linear-gradient(135deg, #00416A 0%, #E4E5E6 100%)",
    citrusGrove: "linear-gradient(135deg, #FF8008 0%, #FFC837 100%)",
    berryDelight: "linear-gradient(135deg, #FF512F 0%, #DD2476 100%)",
    rainforest: "linear-gradient(135deg, #11998E 0%, #38EF7D 100%)",
    etherealGlow: "linear-gradient(135deg, #fff1eb 0%, #ace0f9 100%)",
    roseGold: "linear-gradient(135deg, #F4C4F3 0%, #FC67FA 100%)",
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
    triangles: {
      backgroundColor,
      backgroundImage:
        "repeating-linear-gradient(60deg, rgba(0, 0, 0, 0.1) 0px, rgba(0, 0, 0, 0.1) 15px, transparent 15px, transparent 30px)",
      backgroundSize: "20px 20px",
    },
    crosshatch: {
      backgroundColor,
      backgroundImage:
        "repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0px, transparent 15px), repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 0px, transparent 15px)",
      backgroundSize: "20px 20px",
    },
    plaid: {
      backgroundColor,
      backgroundImage:
        "repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.1) 0px, rgba(0, 0, 0, 0.1) 5px, transparent 5px, transparent 10px), repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0px, rgba(0, 0, 0, 0.1) 5px, transparent 5px, transparent 10px)",
      backgroundSize: "20px 20px",
    },
    diagonalStripesWide: {
      backgroundColor,
      backgroundImage:
        "repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0px, rgba(0, 0, 0, 0.1) 1px, transparent 2px, transparent 20px)",
      backgroundSize: "20px 20px",
    },
    concentricCircles: {
      backgroundColor,
      backgroundImage:
        "radial-gradient(circle, rgba(0, 0, 0, 0.1) 10px, transparent 1px, transparent 10px)",
      backgroundSize: "20px 20px",
    },
    spiral: {
      backgroundColor,
      backgroundImage:
        "conic-gradient(rgba(0, 0, 0, 0.1) 10%, transparent 10%)",
      backgroundSize: "20px 20px",
    },
    starburst: {
      backgroundColor,
      backgroundImage:
        "repeating-conic-gradient(rgba(0, 0, 0, 0.1) 0% 10%, transparent 10% 20%)",
      backgroundSize: "20px 20px",
    },
    brushedMetal: {
      backgroundColor,
      backgroundImage:
        "linear-gradient(135deg, rgba(0, 0, 0, 0.05) 25%, transparent 25%, transparent 50%, rgba(0, 0, 0, 0.05) 50%, rgba(0, 0, 0, 0.05) 75%, transparent 75%, transparent 100%)",
      backgroundSize: "20px 20px",
    },
    lattice: {
      backgroundColor,
      backgroundImage:
        "repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.1) 0px, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 10px), repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0px, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 10px)",
      backgroundSize: "20px 20px",
    },
  };
  return patterns[pattern] || { backgroundColor };
};

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

const getFittedFontSize = (frame: Frame, containerWidth: number): number => {
  const originalSize =
    typeof frame.fontSize === "string"
      ? parseInt(frame.fontSize, 10)
      : frame.fontSize;
  const scaleFactor = containerWidth / 1920;
  return Math.max(12, Math.floor(originalSize * scaleFactor));
};

const RecentVideos = () => {
  const { user } = useUser();
  const router = useRouter();
  const [videos, setVideos] = useState<Video[]>([]);
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
        }
      } catch (error) {
        console.error("Error fetching recent videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentVideos();
  }, [user]);

  const handleVideoClick = (video: Video) => {
    const editorType =
      video.videoType === "From scratch" ? "scratch-editor" : "ai-editor";
    router.push(`/in/${editorType}/${video.videoID}`);
  };

  const renderVideoPreview = (video: Video) => {
    const firstFrame = video.description.frames[0];

    return (
      <div
        key={video.videoID}
        onClick={() => handleVideoClick(video)}
        className="rounded-lg aspect-video relative overflow-hidden group cursor-pointer transition-transform duration-200 hover:scale-105"
      >
        <div className="absolute inset-0">
          <div
            className="w-full h-full flex items-center justify-center p-4"
            style={{
              ...getBackgroundStyle(firstFrame),
            }}
          >
            <div
              className="text-center w-full break-words overflow-hidden flex items-center justify-center"
              style={{
                color: firstFrame.textColor,
                fontFamily: firstFrame.fontFamily,
                fontSize: `${getFittedFontSize(firstFrame, 320)}px`,
                textAlign:
                  (firstFrame.textAlign as React.CSSProperties["textAlign"]) ||
                  "center",
                fontWeight: firstFrame.isBold ? "bold" : "normal",
                fontStyle: firstFrame.isItalic ? "italic" : "normal",
                textDecoration: firstFrame.isUnderline ? "underline" : "none",
                textTransform:
                  (firstFrame.textCasing as React.CSSProperties["textTransform"]) ||
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
              {firstFrame.text}
            </div>
          </div>
        </div>

        {/* Overlay with video details */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="text-white text-center p-4">
            <h4 className="font-semibold">{video.title}</h4>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading
          ? [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-300 dark:bg-gray-700 rounded-lg aspect-video animate-pulse"
              />
            ))
          : videos.length > 0
          ? videos.map((video) => renderVideoPreview(video))
          : [...Array(4)].map((_, i) => (
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
