import { createContext, useContext } from "react";

export interface Frame {
  image: string;
  text: string;
  textColor: string;
  fontSize: string;
  duration: number;
  backgroundColor: string;
  pattern?: string;
  fontFamily: string;
  isBold?: boolean;
  isItalic?: boolean;
  isUnderline?: boolean;
  textCasing?: string;
  animation?: string;
  animationDelay?: number;
  textAlign?: "left" | "center" | "right";
}

export interface VideoState {
  frameList: Frame[];
  totalDuration: number;
  selectedFrameIndex: number;
  aspectRatio: string;
  audioTrack: string;
}

export const FramesListContext = createContext<{
  videoFrame: VideoState | null;
  setVideoFrame: React.Dispatch<React.SetStateAction<VideoState | null>>;
}>({
  videoFrame: null,
  setVideoFrame: () => {},
});

export const useFramesList = () => {
  const context = useContext(FramesListContext);
  if (!context) {
    throw new Error("useFramesList must be used within a FramesListProvider");
  }
  return context;
};
