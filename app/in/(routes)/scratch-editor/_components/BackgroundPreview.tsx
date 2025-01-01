import React from 'react';
import { patterns } from './RemotionComposition';
import { GRADIENT_OPTIONS } from './Gradients';
import { ScrollArea } from "@/components/ui/scroll-area";

interface PreviewBoxProps {
  style: React.CSSProperties;
  label: string;
  selected?: boolean;
  onClick: () => void;
}

const PreviewBox: React.FC<PreviewBoxProps> = ({ style, label, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`
      relative w-full aspect-video rounded-lg overflow-hidden 
      border-2 transition-all
      ${selected ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'}
    `}
  >
    <div style={style} className="w-full h-full" />
    <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1">
      <span className="text-white text-sm truncate block">{label}</span>
    </div>
  </button>
);

interface BackgroundPreviewSectionProps {
  type: 'solid' | 'pattern' | 'gradient';
  currentPattern?: string;
  currentGradient?: string;
  currentColor: string;
  onSelectPattern?: (pattern: string) => void;
  onSelectGradient?: (gradient: string) => void;
}

export const BackgroundPreviewSection: React.FC<BackgroundPreviewSectionProps> = ({
  type,
  currentPattern,
  currentGradient,
  currentColor,
  onSelectPattern,
  onSelectGradient,
}) => {
  const renderContent = () => {
    if (type === 'pattern') {
      return (
        <div className="grid grid-cols-2 gap-2 pr-4">
          {Object.entries(patterns).map(([key, value]) => (
            <PreviewBox
              key={key}
              style={{
                backgroundColor: currentColor,
                backgroundImage: value,
                backgroundSize: key === "checkerboard" ? "25px 25px" : 
                              key === "zigzag" ? "40px 40px" : "20px 20px",
                backgroundRepeat: "repeat",
              }}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              selected={currentPattern === key}
              onClick={() => onSelectPattern?.(key)}
            />
          ))}
        </div>
      );
    }

    if (type === 'gradient') {
      return (
        <div className="grid grid-cols-2 gap-2 pr-4">
          {GRADIENT_OPTIONS.map((gradient) => (
            <PreviewBox
              key={gradient.value}
              style={{
                backgroundImage: gradient.style,
              }}
              label={gradient.name}
              selected={currentGradient === gradient.value}
              onClick={() => onSelectGradient?.(gradient.value)}
            />
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <ScrollArea className="h-[200px] rounded-md">
      {renderContent()}
    </ScrollArea>
  );
};