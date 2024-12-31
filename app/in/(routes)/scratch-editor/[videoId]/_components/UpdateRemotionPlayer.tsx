"use client";
import { Player, PlayerRef } from "@remotion/player";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Expand } from "lucide-react";
import { useFramesList } from "@/app/_context/FramesListContext";
import RemotionComposition from "../../_components/RemotionComposition";
import AudioSelector from "../../_components/Audios";

interface ScreenSize {
  width: number;
  height: number;
}

type AspectRatioType = keyof typeof aspectRatios;
type AudioType = keyof typeof audioFiles;

const BASE_WIDTH = 1920;

const aspectRatios = {
  "16:9": { width: BASE_WIDTH, height: Math.round(BASE_WIDTH * (9 / 16)) },
  "4:3": { width: BASE_WIDTH, height: Math.round(BASE_WIDTH * (3 / 4)) },
  "1:1": { width: BASE_WIDTH, height: BASE_WIDTH },
  "9:16": { width: Math.round(BASE_WIDTH * (9 / 16)), height: BASE_WIDTH },
  "21:9": { width: BASE_WIDTH, height: Math.round(BASE_WIDTH * (9 / 21)) },
  "2.39:1": { width: BASE_WIDTH, height: Math.round(BASE_WIDTH / 2.39) },
  "5:4": { width: BASE_WIDTH, height: Math.round(BASE_WIDTH * (4 / 5)) },
  "3:2": { width: BASE_WIDTH, height: Math.round(BASE_WIDTH * (2 / 3)) },
} as const;

const audioFiles = {
  none: "",
  siren: "/videos/siren.mp3",
  choir: "/videos/choir.mp3",
  swoosh: "/videos/swoosh.mp3",
  impact: "/videos/impact.mp3",
  laugh: "/videos/laugh.mp3",
  horses: "/videos/horses.mp3",
  pulse: "/videos/pulse.mp3",
  wind: "/videos/wind.mp3",
  applause: "/videos/applause.mp3",
  stadium: "/videos/stadium.mp3",
  guitar: "/videos/guitar.mp3",
};

const scaleToFit = (
  dimensions: ScreenSize,
  maxWidth: number = 624
): ScreenSize => {
  const scale = maxWidth / dimensions.width;
  return {
    width: Math.round(dimensions.width * scale),
    height: Math.round(dimensions.height * scale),
  };
};

function UpdatedRemotePlayer() {
  const { videoFrame, setVideoFrame } = useFramesList();
  const [screenSize, setScreenSize] = useState<ScreenSize>(
    scaleToFit(aspectRatios[videoFrame?.aspectRatio as AspectRatioType || "16:9"])
  );
  const playerRef = useRef<PlayerRef>(null);

  // Update screen size when aspect ratio changes in context
  useEffect(() => {
    if (videoFrame?.aspectRatio) {
      setScreenSize(scaleToFit(aspectRatios[videoFrame.aspectRatio as AspectRatioType]));
    }
  }, [videoFrame?.aspectRatio]);

  const handleAspectRatioChange = (value: AspectRatioType) => {
    setVideoFrame(prev => {
      if (!prev) return null;
      return {
        ...prev,
        aspectRatio: value
      };
    });
  };

  const handleAudioChange = (value: AudioType) => {
    setVideoFrame(prev => {
      if (!prev) return null;
      return {
        ...prev,
        audioTrack: value
      };
    });
  };

  const seekToFrame = useCallback(() => {
    if (
      !videoFrame?.frameList ||
      !playerRef.current ||
      typeof videoFrame.selectedFrameIndex !== "number"
    ) {
      return;
    }

    const frameStart = videoFrame.frameList.reduce((total, frame, index) => {
      if (index < videoFrame.selectedFrameIndex) {
        return total + frame.duration * 30;
      }
      return total;
    }, 0);

    playerRef.current.seekTo(frameStart);
  }, [videoFrame?.frameList, videoFrame?.selectedFrameIndex]);

  useEffect(() => {
    seekToFrame();
  }, [seekToFrame]);

  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      <div className="w-full max-w-3xl">
        <Player
          ref={playerRef}
          component={RemotionComposition}
          durationInFrames={
            videoFrame?.totalDuration
              ? Number(videoFrame.totalDuration * 30)
              : 150
          }
          compositionWidth={screenSize.width}
          compositionHeight={screenSize.height}
          fps={30}
          controls
          style={{
            borderRadius: 16,
            width: "100%",
          }}
          inputProps={{
            framelist: videoFrame?.frameList ?? [],
            audioTrack: audioFiles[videoFrame?.audioTrack as AudioType || "none"],
          }}
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Expand className="w-5 h-5" />
          <Select
            value={videoFrame?.aspectRatio || "16:9"}
            onValueChange={handleAspectRatioChange}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Aspect Ratio" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(aspectRatios).map((ratio) => (
                <SelectItem key={ratio} value={ratio as AspectRatioType}>
                  {ratio}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <AudioSelector
          value={videoFrame?.audioTrack as AudioType || "none"}
          onValueChange={handleAudioChange}
        />
      </div>
    </div>
  );
}

export default UpdatedRemotePlayer;