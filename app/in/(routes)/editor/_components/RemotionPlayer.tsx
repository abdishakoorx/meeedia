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

type ScreenSize = {
  width: number;
  height: number;
};

// Base width for consistent scaling
const BASE_WIDTH = 1920;

// Calculate precise aspect ratios based on standard formats
const aspectRatios: { [key: string]: ScreenSize } = {
  "16:9": { width: BASE_WIDTH, height: Math.round(BASE_WIDTH * (9/16)) },
  "4:3": { width: BASE_WIDTH, height: Math.round(BASE_WIDTH * (3/4)) },
  "1:1": { width: BASE_WIDTH, height: BASE_WIDTH },
  "9:16": { width: Math.round(BASE_WIDTH * (9/16)), height: BASE_WIDTH },
  "21:9": { width: BASE_WIDTH, height: Math.round(BASE_WIDTH * (9/21)) },
  "2.39:1": { width: BASE_WIDTH, height: Math.round(BASE_WIDTH / 2.39) },
  "5:4": { width: BASE_WIDTH, height: Math.round(BASE_WIDTH * (4/5)) },
  "3:2": { width: BASE_WIDTH, height: Math.round(BASE_WIDTH * (2/3)) },
};

// Scale dimensions to fit the viewport while maintaining aspect ratio
const scaleToFit = (dimensions: ScreenSize, maxWidth: number = 624): ScreenSize => {
  const scale = maxWidth / dimensions.width;
  return {
    width: Math.round(dimensions.width * scale),
    height: Math.round(dimensions.height * scale)
  };
};

function RemotePlayer() {
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [screenSize, setScreenSize] = useState(scaleToFit(aspectRatios["16:9"]));

  useEffect(() => {
    setScreenSize(scaleToFit(aspectRatios[aspectRatio]));
  }, [aspectRatio]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full max-w-3xl">
        <Player
          component={RemotionComposition}
          durationInFrames={150}
          compositionWidth={screenSize.width}
          compositionHeight={screenSize.height}
          fps={30}
          controls
          className="w-full aspect-auto"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Expand className="w-5 h-5" />
        <Select value={aspectRatio} onValueChange={setAspectRatio}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Aspect Ratio" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(aspectRatios).map((ratio) => (
              <SelectItem key={ratio} value={ratio}>
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