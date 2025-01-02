"use client";

import React from "react";
import { Camera, Sparkles, Grid3x3, Info } from "lucide-react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Header from "./_components/HeaderNameProvider";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import RecentVideos from "./_components/RecentVideos";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header headerName="Dashboard" />
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-12 text-center">
          <motion.h1
            className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Video Generator
          </motion.h1>
          <motion.p
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Create stunning videos with AI or from scratch. Choose your path and
            bring your vision to life.
          </motion.p>
        </header>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Manual Creation Card */}
          <CreationCard
            href="/in/scratch-editor"
            icon={
              <Camera className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            }
            title="Create from Scratch"
            description="Upload your content, select templates, and fully customize your video."
            buttonText="Start from Scratch"
            buttonColor="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
            newUserTip="Best for users seeking full customization."
          />

          <CreationCard
            href=""
            icon={
              <Sparkles className="w-12 h-12 text-purple-600 dark:text-purple-400" />
            }
            title="AI-Powered Creation"
            description="Generate videos with AI using your descriptions and preferences."
            buttonText="Generate with AI"
            buttonColor="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
            newUserTip="Great for quick AI-generated videos."
          />

          <CreationCard
            href=""
            icon={
              <Grid3x3 className="w-12 h-12 text-green-600 dark:text-green-400" />
            }
            title="Projects"
            description="View and edit your previously saved videos easily."
            buttonText="Saved Videos"
            buttonColor="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
            newUserTip="Access and update your saved projects."
          />
        </div>

        {/* Recent Uploads / Quick Actions */}
        <RecentVideos />
      </main>
    </div>
  );
};

interface CreationCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonColor: string;
  newUserTip: string;
  href: string;
}

const CreationCard: React.FC<CreationCardProps> = ({
  icon,
  title,
  description,
  buttonText,
  buttonColor,
  newUserTip,
  href,
}) => {
  return (
    <motion.div
      className="bg-gray-200 dark:bg-gray-900 shadow-sm dark:shadow-xl rounded-2xl p-6 transition-all duration-200 hover:shadow-md dark:hover:shadow-2xl"
      whileHover={{ y: -5 }}
    >
      <Link href={href}>
        <div className="flex items-center justify-between mb-4">
          {icon}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-5 h-5 text-gray-400 dark:text-gray-600" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">{newUserTip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
          {description}
        </p>
        <Button
          className={`w-full ${buttonColor} text-white py-2 rounded-lg transition-colors duration-200 text-sm font-medium`}
        >
          {buttonText}
        </Button>
      </Link>
    </motion.div>
  );
};

export default Dashboard;
