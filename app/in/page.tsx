"use client";

import React from "react";
import {
  Camera,
  Upload,
  Sparkles,
  Grid3x3,
  ChevronRight,
  Info,
} from "lucide-react";
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
            href="/in/editor"
            icon={
              <Camera className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            }
            title="Create from Scratch"
            description="Take full control. Upload your own content, select templates, and craft your video manually."
            buttonText="Start from Scratch"
            buttonColor="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
            newUserTip="Ideal for users who want complete control over their video creation process."
          />

          {/* AI-Powered Creation Card */}
          <CreationCard
            href=""
            icon={
              <Sparkles className="w-12 h-12 text-purple-600 dark:text-purple-400" />
            }
            title="AI-Powered Creation"
            description="Let our advanced AI generate a video based on your description, style preferences, and goals."
            buttonText="Generate with AI"
            buttonColor="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
            newUserTip="Perfect for quick, AI-generated videos based on your ideas."
          />

          {/* Templates Card */}
          <CreationCard
            href=""
            icon={
              <Grid3x3 className="w-12 h-12 text-green-600 dark:text-green-400" />
            }
            title="Video Templates"
            description="Browse our collection of pre-designed templates to jumpstart your video creation process."
            buttonText="Explore Templates"
            buttonColor="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
            newUserTip="Great for beginners or those looking for a quick start with professional designs."
          />
        </div>

        {/* Recent Uploads / Quick Actions */}
        <motion.section
          className="mt-12 bg-gray-100 dark:bg-gray-900 shadow-sm dark:shadow-xl rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Recent Uploads
            </h3>
            <Button
              variant={"ghost"}
              className="text-blue-600 dark:text-blue-400 hover:bg-transparent hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 flex items-center"
            >
              Upload New
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-gray-200 dark:bg-gray-800 rounded-lg aspect-video flex items-center justify-center transition-all duration-200 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
              >
                <Upload className="text-gray-400 dark:text-gray-500 w-6 h-6" />
                <span className="ml-2 text-gray-500 dark:text-gray-400 text-sm">
                  Empty Slot
                </span>
              </div>
            ))}
          </div>
        </motion.section>
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
