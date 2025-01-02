import React, { useState } from "react";
import { Sparkles, Camera, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const CreateButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const creationOptions = [
    {
      icon: <Camera className="w-5 h-5 text-blue-600" />,
      label: "Create from Scratch",
      description: "Full control over your video",
      href: "/in/scratch-editor",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-purple-600" />,
      label: "AI-Powered Creation",
      description: "Generate videos using advanced AI",
      href: "/in/ai-editor",
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center bg-accent-dark hover:bg-accent-dark dark:bg-accent dark:hover:bg-accent text-white dark:text-black font-bold  py-2  px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50"
      >
        <span className="mr-2">🦌 Create Video</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50overflow-hidden"
          >
            {creationOptions.map((option) => (
              <Link
                key={option.label}
                href={option.href}
                className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group"
              >
                <div className="mr-3">{option.icon}</div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {option.label}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {option.description}
                  </p>
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateButton;
