"use client";
import { Player, PlayerRef } from "@remotion/player";
import RemotionComposition from "./RemotionComposition";
import { useRef, useCallback, useEffect } from "react";
import { useFramesList } from "@/app/_context/FramesListContext";

const BASE_WIDTH = 1920;
const BASE_HEIGHT = 1080; // 16:9 aspect ratio fixed

function RemotionPlayer() {
  const { videoFrame } = useFramesList();
  const playerRef = useRef<PlayerRef>(null);

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
          compositionWidth={BASE_WIDTH}
          compositionHeight={BASE_HEIGHT}
          fps={30}
          controls
          style={{
            borderRadius: 16,
            width: "100%",
          }}
          inputProps={{
            framelist: videoFrame?.frameList ?? [],
            audioTrack: "",
          }}
        />
      </div>
    </div>
  );
}

export default RemotionPlayer;