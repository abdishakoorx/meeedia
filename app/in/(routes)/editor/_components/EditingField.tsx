import { useState, useEffect } from "react";
import { useFramesList } from "@/app/_context/FramesListContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fontOptions } from "./Fonts";
import { ANIMATION_OPTIONS } from "./Animations";

const patterns = [
  { name: "None", value: "none" },
  { name: "Dots", value: "dots" },
  { name: "Lines", value: "lines" },
  { name: "Grid", value: "grid" },
  { name: "Diagonal Lines", value: "diagonalLines" },
  { name: "Waves", value: "waves" },
  { name: "Zigzag", value: "zigzag" },
  { name: "Stripes", value: "stripes" },
  { name: "Checkerboard", value: "checkerboard" },
];

const textCasingOptions = [
  { name: "Default", value: "default" },
  { name: "Uppercase", value: "uppercase" },
  { name: "Lowercase", value: "lowercase" },
  { name: "Capitalize", value: "capitalize" },
];

export default function EditingField() {
  const { videoFrame, setVideoFrame } = useFramesList();
  const [editValues, setEditValues] = useState({
    text: "",
    textColor: "#000000",
    fontSize: "20",
    duration: 3,
    backgroundColor: "#ffffff",
    pattern: "",
    fontFamily: "Inter",
    isBold: false,
    isItalic: false,
    isUnderline: false,
    textCasing: "default",
    animation: "none",
    animationDelay: 0,
  });

  useEffect(() => {
    if (
      !videoFrame?.frameList ||
      typeof videoFrame.selectedFrameIndex !== "number"
    )
      return;

    const currentFrame = videoFrame.frameList[videoFrame.selectedFrameIndex];
    if (currentFrame) {
      setEditValues({
        text: currentFrame.text,
        textColor: currentFrame.textColor,
        fontSize: currentFrame.fontSize,
        duration: currentFrame.duration,
        backgroundColor: currentFrame.backgroundColor || "#ffffff",
        pattern: currentFrame.pattern || "",
        fontFamily: currentFrame.fontFamily || "Inter",
        isBold: currentFrame.isBold || false,
        isItalic: currentFrame.isItalic || false,
        isUnderline: currentFrame.isUnderline || false,
        textCasing: currentFrame.textCasing || "default",
        animation: currentFrame.animation || "none",
        animationDelay: currentFrame.animationDelay || 0,
      });
    }
  }, [videoFrame?.selectedFrameIndex, videoFrame?.frameList]);

  const handleUpdate = () => {
    if (
      !videoFrame?.frameList ||
      typeof videoFrame.selectedFrameIndex !== "number"
    )
      return;

    const updatedFrames = [...videoFrame.frameList];
    updatedFrames[videoFrame.selectedFrameIndex] = {
      ...updatedFrames[videoFrame.selectedFrameIndex],
      ...editValues,
    };

    const newTotalDuration = updatedFrames.reduce(
      (total, frame) => total + frame.duration,
      0
    );

    setVideoFrame({
      frameList: updatedFrames,
      totalDuration: newTotalDuration,
      selectedFrameIndex: videoFrame.selectedFrameIndex,
    });
  };

  if (
    !videoFrame?.frameList ||
    typeof videoFrame.selectedFrameIndex !== "number"
  ) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
        <p className="text-center text-gray-500">Select a frame to edit</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 space-y-6">
      <h3 className="text-xl font-semibold mb-4">Edit Frame</h3>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {/* Text Content Section */}
        <AccordionItem value="text-content">
          <AccordionTrigger className="text-base font-semibold">
            Text Content
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="text">Text</Label>
                <Input
                  id="text"
                  value={editValues.text}
                  onChange={(e) =>
                    setEditValues((prev) => ({ ...prev, text: e.target.value }))
                  }
                  placeholder="Enter text"
                />
              </div>

              <div className="flex space-x-2">
                <Button
                  variant={editValues.isBold ? "default" : "outline"}
                  size="sm"
                  className="text-black hover:text-black font-bold text-lg"
                  onClick={() =>
                    setEditValues((prev) => ({ ...prev, isBold: !prev.isBold }))
                  }
                >
                  <span className="font-bold">B</span>
                </Button>
                <Button
                  variant={editValues.isItalic ? "default" : "outline"}
                  size="sm"
                  className="text-black hover:text-black font-bold text-lg"
                  onClick={() =>
                    setEditValues((prev) => ({
                      ...prev,
                      isItalic: !prev.isItalic,
                    }))
                  }
                >
                  <span className="italic">I</span>
                </Button>
                <Button
                  variant={editValues.isUnderline ? "default" : "outline"}
                  size="sm"
                  className="text-black hover:text-black font-bold text-lg"
                  onClick={() =>
                    setEditValues((prev) => ({
                      ...prev,
                      isUnderline: !prev.isUnderline,
                    }))
                  }
                >
                  <span className="underline">U</span>
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="textCasing">Text Casing</Label>
                <Select
                  value={editValues.textCasing}
                  onValueChange={(value) =>
                    setEditValues((prev) => ({ ...prev, textCasing: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select text casing" />
                  </SelectTrigger>
                  <SelectContent>
                    {textCasingOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Typography Section */}
        <AccordionItem value="typography">
          <AccordionTrigger className="text-base font-semibold">
            Typography
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fontFamily">Font Style</Label>
                <Select
                  value={editValues.fontFamily}
                  onValueChange={(value) =>
                    setEditValues((prev) => ({ ...prev, fontFamily: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((font) => (
                      <SelectItem key={font.name} value={font.name}>
                        <span className={font.font.className}>{font.name}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fontSize">
                  Font Size: {editValues.fontSize}px
                </Label>
                <Slider
                  id="fontSize"
                  min={12}
                  max={144}
                  step={1}
                  value={[parseInt(editValues.fontSize)]}
                  onValueChange={(value) =>
                    setEditValues((prev) => ({
                      ...prev,
                      fontSize: value[0].toString(),
                    }))
                  }
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Colors Section */}
        <AccordionItem value="colors">
          <AccordionTrigger className="text-base font-semibold">
            Colors
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="textColor">Text Color</Label>
                <Input
                  id="textColor"
                  type="color"
                  value={editValues.textColor}
                  onChange={(e) =>
                    setEditValues((prev) => ({
                      ...prev,
                      textColor: e.target.value,
                    }))
                  }
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="backgroundColor">Background Color</Label>
                <Input
                  id="backgroundColor"
                  type="color"
                  value={editValues.backgroundColor}
                  onChange={(e) =>
                    setEditValues((prev) => ({
                      ...prev,
                      backgroundColor: e.target.value,
                    }))
                  }
                  className="h-10"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Background Section */}
        <AccordionItem value="background">
          <AccordionTrigger className="text-base font-semibold">
            Background Pattern
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <Select
                value={editValues.pattern}
                onValueChange={(value) =>
                  setEditValues((prev) => ({ ...prev, pattern: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select pattern" />
                </SelectTrigger>
                <SelectContent>
                  {patterns.map((pattern) => (
                    <SelectItem key={pattern.value} value={pattern.value}>
                      {pattern.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Timing Section */}
        <AccordionItem value="timing">
          <AccordionTrigger className="text-base font-semibold">
            Duration
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration: {editValues.duration}s</Label>
              <Slider
                id="duration"
                min={1}
                max={10}
                step={0.5}
                value={[editValues.duration]}
                onValueChange={(value) =>
                  setEditValues((prev) => ({ ...prev, duration: value[0] }))
                }
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Animations */}
        <AccordionItem value="animation">
          <AccordionTrigger className="text-base font-semibold">
            Animation
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="animation">Animation Type</Label>
                <Select
                  value={editValues.animation || "none"}
                  onValueChange={(value) =>
                    setEditValues((prev) => ({ ...prev, animation: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select animation" />
                  </SelectTrigger>
                  <SelectContent>
                    {ANIMATION_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {editValues.animation && editValues.animation !== "none" && (
                <div className="space-y-2">
                  <Label htmlFor="animationDelay">
                    Animation Delay: {editValues.animationDelay || 0}s
                  </Label>
                  <Slider
                    id="animationDelay"
                    min={0}
                    max={5}
                    step={0.1}
                    value={[editValues.animationDelay || 0]}
                    onValueChange={(value) =>
                      setEditValues((prev) => ({
                        ...prev,
                        animationDelay: value[0],
                      }))
                    }
                  />
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button
        className="w-full bg-blue-500 hover:bg-blue-600 mt-4"
        onClick={handleUpdate}
      >
        <Check className="w-4 h-4 mr-2" />
        Apply Changes
      </Button>
    </div>
  );
}
