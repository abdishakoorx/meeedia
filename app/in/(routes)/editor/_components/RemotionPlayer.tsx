"use client";
import { Player } from "@remotion/player";
import RemotionComposition from "./RemotionComposition";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Expand } from "lucide-react";
import { useFramesList } from "@/app/_context/FramesListContext";

interface ScreenSize {
  width: number;
  height: number;
}

type AspectRatioType = keyof typeof aspectRatios;

const BASE_WIDTH = 1920;

const aspectRatios = {
  "16:9": { width: BASE_WIDTH, height: Math.round(BASE_WIDTH * (9/16)) },
  "4:3": { width: BASE_WIDTH, height: Math.round(BASE_WIDTH * (3/4)) },
  "1:1": { width: BASE_WIDTH, height: BASE_WIDTH },
  "9:16": { width: Math.round(BASE_WIDTH * (9/16)), height: BASE_WIDTH },
  "21:9": { width: BASE_WIDTH, height: Math.round(BASE_WIDTH * (9/21)) },
  "2.39:1": { width: BASE_WIDTH, height: Math.round(BASE_WIDTH / 2.39) },
  "5:4": { width: BASE_WIDTH, height: Math.round(BASE_WIDTH * (4/5)) },
  "3:2": { width: BASE_WIDTH, height: Math.round(BASE_WIDTH * (2/3)) },
} as const;

const scaleToFit = (dimensions: ScreenSize, maxWidth: number = 624): ScreenSize => {
  const scale = maxWidth / dimensions.width;
  return {
    width: Math.round(dimensions.width * scale),
    height: Math.round(dimensions.height * scale)
  };
};

function RemotePlayer() {
  const [aspectRatio, setAspectRatio] = useState<AspectRatioType>("16:9");
  const [screenSize, setScreenSize] = useState<ScreenSize>(scaleToFit(aspectRatios["16:9"]));
  const { videoFrame } = useFramesList();

  useEffect(() => {
    setScreenSize(scaleToFit(aspectRatios[aspectRatio]));
  }, [aspectRatio]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full max-w-3xl">
        <Player
          component={RemotionComposition}
          durationInFrames={videoFrame?.totalDuration ? Number(videoFrame.totalDuration * 30) : 150}
          compositionWidth={screenSize.width}
          compositionHeight={screenSize.height}
          fps={30}
          controls
          className="w-full aspect-auto"
          inputProps={{
            framelist: videoFrame?.frameList ?? []
          }}
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Expand className="w-5 h-5" />
        <Select value={aspectRatio} onValueChange={(value) => setAspectRatio(value as AspectRatioType)}>
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
    </div>
  );
}

export default RemotePlayer;