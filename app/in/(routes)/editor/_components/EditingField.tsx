import { useState, useEffect } from "react";
import { useFramesList } from "@/app/_context/FramesListContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fontOptions } from "./Fonts";

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
  { name: "Honeycomb", value: "honeycomb" },
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
      <h3 className="text-lg font-semibold mb-4">Edit Frame</h3>

      <div className="space-y-4">
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

        <div className="flex space-x-2 mt-2">
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
              setEditValues((prev) => ({ ...prev, isItalic: !prev.isItalic }))
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
          <Label htmlFor="textColor">Text Color</Label>
          <Input
            id="textColor"
            type="color"
            value={editValues.textColor}
            onChange={(e) =>
              setEditValues((prev) => ({ ...prev, textColor: e.target.value }))
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

        <div className="space-y-2">
          <Label htmlFor="pattern">Background Pattern</Label>
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

        <div className="space-y-2">
          <Label htmlFor="fontSize">Font Size: {editValues.fontSize}px</Label>
          <Slider
            id="fontSize"
            min={12}
            max={72}
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

        <Button
          className="w-full bg-blue-500 hover:bg-blue-600 mt-4"
          onClick={handleUpdate}
        >
          <Check className="w-4 h-4 mr-2" />
          Apply Changes
        </Button>
      </div>
    </div>
  );
}
