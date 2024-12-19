"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "../../_components/HeaderNameProvider";
import FrameList from "./_components/FrameList";

export default function Editor() {
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const aspectRatios = [
    "16:9",
    "4:3",
    "1:1",
    "9:16",
    "21:9",
    "2.39:1",
    "5:4",
    "3:2",
  ];
  const filters = [
    "None",
    "Grayscale",
    "Sepia",
    "Vintage",
    "High Contrast",
    "Warm",
    "Cool",
    "Vignette",
  ];
  const transitions = ["None", "Fade", "Dissolve", "Wipe", "Slide", "Zoom"];

  return (
    <div className="space-y-2">
      <Header headerName="Editor" />
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
        <div className="mb-6 flex items-end">
          <Button className="ml-auto w-full sm:w-auto text-white">
            <Download className="w-5 h-5 mr-2" />
            Export
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 h-auto md:h-[calc(100vh-12rem)]">
          {/* Frames */}
          <FrameList />

          {/* Video Player */}
          <div className="md:col-span-7 space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md aspect-video">
              <div className="h-full bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">
                  Video Player
                </span>
              </div>
            </div>
            <Select value={aspectRatio} onValueChange={setAspectRatio}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select aspect ratio" />
              </SelectTrigger>
              <SelectContent>
                {aspectRatios.map((ratio) => (
                  <SelectItem key={ratio} value={ratio}>
                    {ratio}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Video Editing Fields */}
          <div className="md:col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 overflow-y-auto max-h-96 md:max-h-full">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Editing Tools
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="trim"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Trim
                </label>
                <input
                  type="range"
                  id="trim"
                  min="0"
                  max="100"
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <label
                  htmlFor="filters"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Filters
                </label>
                <Select defaultValue={filters[0].toLowerCase()}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select filter" />
                  </SelectTrigger>
                  <SelectContent>
                    {filters.map((filter) => (
                      <SelectItem key={filter} value={filter.toLowerCase()}>
                        {filter}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label
                  htmlFor="transitions"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Transitions
                </label>
                <Select defaultValue={transitions[0].toLowerCase()}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transition" />
                  </SelectTrigger>
                  <SelectContent>
                    {transitions.map((transition) => (
                      <SelectItem
                        key={transition}
                        value={transition.toLowerCase()}
                      >
                        {transition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label
                  htmlFor="text"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Add Text
                </label>
                <input
                  type="text"
                  id="text"
                  placeholder="Enter text overlay"
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-800 dark:text-gray-100"
                />
              </div>
              <div>
                <label
                  htmlFor="speed"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Playback Speed
                </label>
                <input
                  type="range"
                  id="speed"
                  min="0.5"
                  max="2"
                  step="0.1"
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <label
                  htmlFor="volume"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Volume
                </label>
                <input
                  type="range"
                  id="volume"
                  min="0"
                  max="100"
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
