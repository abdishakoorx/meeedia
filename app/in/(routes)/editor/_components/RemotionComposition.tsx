import { AbsoluteFill, Sequence } from 'remotion';
import { Frame } from '@/app/_context/FramesListContext';

interface RemotionCompositionProps {
  framelist: Frame[];
}

const RemotionComposition: React.FC<RemotionCompositionProps> = ({ framelist }) => {
  let trackFrame = 0
  return (
    <AbsoluteFill style={{ backgroundColor: 'chocolate' }}>
      <ul>
        {framelist.map((frame, index) => {
          const fromFrame = index==0 ? 0 : trackFrame
          trackFrame = trackFrame + frame.duration*30
          const duration = frame.duration*30
          return(
            <Sequence from={fromFrame} durationInFrames={duration} key={index} style={{ 
              color: frame.textColor,
              fontSize: frame.fontSize 
            }}>
              {index}
              {frame.text}
            </Sequence>
          )})}
      </ul>
    </AbsoluteFill>
  );
};

export default RemotionComposition;