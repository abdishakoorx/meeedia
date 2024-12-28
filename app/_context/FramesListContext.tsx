import { createContext, useContext } from 'react';

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
}

export interface VideoFrameState {
  frameList: Frame[];
  totalDuration: number;
  selectedFrameIndex: number;
}

interface FramesListContextType {
  videoFrame: VideoFrameState | null;
  setVideoFrame: React.Dispatch<React.SetStateAction<VideoFrameState | null>>;
}

const defaultState: FramesListContextType = {
  videoFrame: null,
  setVideoFrame: () => {}
};

export const FramesListContext = createContext<FramesListContextType>(defaultState);

export const useFramesList = () => {
  const context = useContext(FramesListContext);
  if (!context) {
    throw new Error('useFramesList must be used within a FramesListProvider');
  }
  return context;
};