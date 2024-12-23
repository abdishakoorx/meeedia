import { createContext, useContext } from 'react';

export interface Frame {
  image: string;
  text: string;
  textColor: string;
  fontSize: string;
  duration: number;
}

export interface VideoFrameState {
  frameList: Frame[];
  totalDuration: number;
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