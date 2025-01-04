import React from "react";
import { Sparkles, Camera, ChevronDown } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CreateButton = () => {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-center bg-transparent hover:bg-transparent text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50">
          <span className="mr-2">🦌 Create Video</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CreateButton;