import { AbsoluteFill, Sequence } from "remotion";
import { Frame } from "@/app/_context/FramesListContext";
import { fontOptions } from "./Fonts";
import { AnimationWrapper } from "./Animations";

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
    "repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0px, transparent 10px, transparent 20px), repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 0px, transparent 10px, transparent 20px)",
  stripes:
    "repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) 10px, transparent 10px, transparent 20px)",
  checkerboard:
    "repeating-conic-gradient(rgba(0, 0, 0, 0.1) 0% 25%, transparent 0% 50%)",
};

type TextTransform = "none" | "capitalize" | "uppercase" | "lowercase";

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
                  backgroundSize: (() => {
                    switch (frame.pattern) {
                      case "checkerboard":
                        return "25px 25px";
                      case "zigzag":
                        return "40px 40px";
                      default:
                        return "20px 20px";
                    }
                  })(),
                  backgroundRepeat: "repeat",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AnimationWrapper
                  animationType={frame.animation || "none"}
                  delay={frame.animationDelay || 0}
                >
                  <div
                    style={{
                      color: frame.textColor,
                      fontSize: `${frame.fontSize}px`,
                      fontFamily: getFontFamily(frame.fontFamily),
                      textAlign: frame.textAlign || "center", 
                      fontWeight: frame.isBold ? "bold" : "normal",
                      fontStyle: frame.isItalic ? "italic" : "normal",
                      textDecoration: frame.isUnderline ? "underline" : "none",
                      textTransform:
                        frame.textCasing === "none"
                          ? "none"
                          : (frame.textCasing as TextTransform),
                      width: "100%",
                    }}
                  >
                    {frame.text}
                  </div>
                </AnimationWrapper>
              </div>
            </Sequence>
          );
        })}
      </ul>
    </AbsoluteFill>
  );
};

export default RemotionComposition;
