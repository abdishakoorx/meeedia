"use client";
import { PlusCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Frame, useFramesList } from "@/app/_context/FramesListContext";

const defaultFrame: Frame = {
  image: "/film.png",
  text: "Hello",
  textColor: "blue",
  fontSize: "20",
  duration: 3,
  backgroundColor: "gray",
  fontFamily: "Inter",
  backgroundType: "solid", // Added missing property
};

function FrameList() {
  const [frameList, setFrameList] = useState<Frame[]>([defaultFrame]);
  const [selectedFrame, setSelectedFrame] = useState<number>(0);
  const { setVideoFrame } = useFramesList();

  const addNewFrame = () => {
    setFrameList((prev) => [...prev, defaultFrame]);
  };

  const deleteFrame = (indexToDelete: number) => {
    const updatedFrameList = frameList.filter((_, index) => index !== indexToDelete);
    setFrameList(updatedFrameList);
    if (selectedFrame === indexToDelete) {
      setSelectedFrame(Math.max(0, indexToDelete - 1));
    }
  };

  const updateVideoFrame = useCallback(() => {
    const totalDuration = frameList.reduce((total, frame) => total + frame.duration, 0);
    setVideoFrame({
      frameList,
      totalDuration,
      selectedFrameIndex: selectedFrame,
      aspectRatio: "16:9", 
      audioTrack: "none" 
    });
  }, [frameList, setVideoFrame, selectedFrame]);

  useEffect(() => {
    updateVideoFrame();
  }, [updateVideoFrame]);


  return (
    <div className="md:col-span-2 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl p-3 flex items-center justify-center transition-colors duration-200"
          onClick={addNewFrame}
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Frame
        </motion.button>
      </div>
      <div className="space-y-4 overflow-y-auto scrollbar-hide max-h-[calc(100vh-200px)]">
        <AnimatePresence>
          {frameList.map((frame, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className={`relative flex items-center bg-gray-50 dark:bg-gray-800 rounded-xl p-3 cursor-pointer transition-all duration-200 ease-in-out ${
                selectedFrame === index
                  ? "ring-2 ring-blue-500 dark:ring-blue-400 ring-inset shadow-md"
                  : "hover:shadow-md"
              }`}
              onClick={() => setSelectedFrame(index)}
            >
              <div className="relative mr-4">
                <Image
                  src={frame.image}
                  alt={frame.text}
                  width={50}
                  height={50}
                  className="rounded-md"
                />
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 line-clamp-2 mt-2">
                  {frame.text}
                </p>
              </div>
              {selectedFrame === index && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute right-4 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteFrame(index);
                  }}
                >
                  <Trash2 className="w-5 h-5" />
                </motion.button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default FrameList;