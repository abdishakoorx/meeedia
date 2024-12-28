import { AbsoluteFill, Sequence } from "remotion";
import { Frame } from "@/app/_context/FramesListContext";
import { fontOptions } from "./Fonts";

const patterns = {
  none: "none",
  dots: "radial-gradient(circle at 2px 2px, rgba(0, 0, 0, 0.1) 2px, transparent 0)",
  lines:
    "repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.1) 0px, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px)",
  grid: "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0px, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.1) 0px, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px)",
  diagonalLines:
    "repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0px, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 15px)",
  waves:
    "repeating-radial-gradient(circle at 0 0, transparent 0, rgba(0, 0, 0, 0.1) 2px, transparent 4px)",
  zigzag:
    "linear-gradient(45deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%) 0 15px, linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%) 0 15px, linear-gradient(45deg, transparent 75%, rgba(0, 0, 0, 0.1) 75%), linear-gradient(-45deg, transparent 75%, rgba(0, 0, 0, 0.1) 75%)",
  stripes:
    "repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) 10px, transparent 10px, transparent 20px)",
  checkerboard:
    "linear-gradient(45deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%) 0 0, linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%) 0 0, linear-gradient(45deg, transparent 75%, rgba(0, 0, 0, 0.1) 75%) 0 0, linear-gradient(-45deg, transparent 75%, rgba(0, 0, 0, 0.1) 75%) 0 0",
  honeycomb: `radial-gradient(circle farthest-side at 0% 50%, rgba(0, 0, 0, 0.1) 23.5%, rgba(240, 166, 17, 0) 0)21px 30px,
    radial-gradient(circle farthest-side at 0% 50%, rgba(0, 0, 0, 0.1) 24%, rgba(240, 166, 17, 0) 0)19px 30px,
    linear-gradient(rgba(0, 0, 0, 0.1) 14%, rgba(240, 166, 17, 0) 0, rgba(240, 166, 17, 0) 85%, rgba(0, 0, 0, 0.1) 0)0 0,
    linear-gradient(150deg, rgba(0, 0, 0, 0.1) 24%, rgba(240, 166, 17, 0) 0)19px 30px,
    linear-gradient(30deg, rgba(0, 0, 0, 0.1) 24%, rgba(240, 166, 17, 0) 0)19px 30px`,
};

interface RemotionCompositionProps {
  framelist: Frame[];
}

const RemotionComposition: React.FC<RemotionCompositionProps> = ({
  framelist,
}) => {
  let trackFrame = 0;
  // const { width, height } = useVideoConfig();

  const getFontFamily = (fontName: string) => {
    const fontOption = fontOptions.find((f) => f.name === fontName);
    return fontOption ? fontOption.font.style.fontFamily : "Inter";
  };

  return (
    <AbsoluteFill>
      <ul>
        {framelist.map((frame, index) => {
          const fromFrame = index === 0 ? 0 : trackFrame;
          trackFrame = trackFrame + frame.duration * 30;
          const duration = frame.duration * 30;

          return (
            <Sequence from={fromFrame} durationInFrames={duration} key={index}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: frame.backgroundColor,
                  backgroundImage: frame.pattern
                    ? patterns[frame.pattern as keyof typeof patterns]
                    : "none",
                  backgroundSize:
                    frame.pattern === "honeycomb" ? "40px 50px" : "20px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    color: frame.textColor,
                    fontSize: `${frame.fontSize}px`,
                    fontFamily: getFontFamily(frame.fontFamily),
                    textAlign: "center",
                    fontWeight: frame.isBold ? "bold" : "normal",
                    fontStyle: frame.isItalic ? "italic" : "normal",
                    textDecoration: frame.isUnderline ? "underline" : "none",
                  }}
                >
                  {frame.text}
                </div>
              </div>
            </Sequence>
          );
        })}
      </ul>
    </AbsoluteFill>
  );
};

export default RemotionComposition;
