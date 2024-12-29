import { interpolate, useCurrentFrame } from "remotion";
import React from "react";

// Animation wrapper component
interface AnimationWrapperProps {
  children: React.ReactNode;
  animationType: string;
  delay?: number;
}

export const ANIMATION_OPTIONS = [
  { name: "None", value: "none" },
  { name: "Fade In", value: "fadeIn" },
  { name: "Slide Up", value: "slideUp" },
  { name: "Slide Down", value: "slideDown" },
  { name: "Slide Left", value: "slideLeft" },
  { name: "Slide Right", value: "slideRight" },
  { name: "Scale Up", value: "scaleUp" },
  { name: "Scale Down", value: "scaleDown" },
  { name: "Rotate In", value: "rotateIn" },
  { name: "Bounce In", value: "bounceIn" },
  { name: "Flip In", value: "flipIn" },
  { name: "Pop In", value: "popIn" },
] as const;

export type AnimationType = typeof ANIMATION_OPTIONS[number]["value"];

export const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  children,
  animationType,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = frame - delay;

  if (animationType === "none" || adjustedFrame < 0) {
    return <>{children}</>;
  }

  const getAnimationStyle = () => {
    const progress = adjustedFrame / 30; // 30 frames = 1 second
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 2);
    const bounce = (t: number) => {
      const n1 = 7.5625;
      const d1 = 2.75;
      if (t < 1 / d1) {
        return n1 * t * t;
      } else if (t < 2 / d1) {
        return n1 * (t -= 1.5 / d1) * t + 0.75;
      } else if (t < 2.5 / d1) {
        return n1 * (t -= 2.25 / d1) * t + 0.9375;
      } else {
        return n1 * (t -= 2.625 / d1) * t + 0.984375;
      }
    };

    const baseStyles = {
      opacity: 1,
      transform: "none",
    };

    switch (animationType) {
      case "fadeIn":
        return {
          ...baseStyles,
          opacity: interpolate(progress, [0, 1], [0, 1], {
            extrapolateRight: "clamp",
          }),
        };

      case "slideUp":
        return {
          ...baseStyles,
          transform: `translateY(${interpolate(
            progress,
            [0, 1],
            [100, 0],
            { extrapolateRight: "clamp" }
          )}px)`,
        };

      case "slideDown":
        return {
          ...baseStyles,
          transform: `translateY(${interpolate(
            progress,
            [0, 1],
            [-100, 0],
            { extrapolateRight: "clamp" }
          )}px)`,
        };

      case "slideLeft":
        return {
          ...baseStyles,
          transform: `translateX(${interpolate(
            progress,
            [0, 1],
            [100, 0],
            { extrapolateRight: "clamp" }
          )}px)`,
        };

      case "slideRight":
        return {
          ...baseStyles,
          transform: `translateX(${interpolate(
            progress,
            [0, 1],
            [-100, 0],
            { extrapolateRight: "clamp" }
          )}px)`,
        };

      case "scaleUp":
        return {
          ...baseStyles,
          transform: `scale(${interpolate(progress, [0, 1], [0, 1], {
            extrapolateRight: "clamp",
          })})`,
        };

      case "scaleDown":
        return {
          ...baseStyles,
          transform: `scale(${interpolate(progress, [0, 1], [1.5, 1], {
            extrapolateRight: "clamp",
          })})`,
        };

      case "rotateIn":
        return {
          ...baseStyles,
          transform: `rotate(${interpolate(
            progress,
            [0, 1],
            [180, 0],
            { extrapolateRight: "clamp" }
          )}deg)`,
        };

      case "bounceIn":
        return {
          ...baseStyles,
          transform: `scale(${interpolate(
            bounce(Math.min(progress, 1)),
            [0, 1],
            [0.3, 1],
            { extrapolateRight: "clamp" }
          )})`,
        };

      case "flipIn":
        return {
          ...baseStyles,
          transform: `perspective(400px) rotateX(${interpolate(
            progress,
            [0, 1],
            [90, 0],
            { extrapolateRight: "clamp" }
          )}deg)`,
        };

      case "popIn":
        const popProgress = easeOut(Math.min(progress, 1));
        return {
          ...baseStyles,
          transform: `scale(${interpolate(
            popProgress,
            [0, 0.5, 1],
            [0, 1.2, 1],
            { extrapolateRight: "clamp" }
          )})`,
        };

      default:
        return baseStyles;
    }
  };

  return <div style={getAnimationStyle()}>{children}</div>;
};