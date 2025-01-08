"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Palette,
  Layout,
  Wand2,
  Layers,
  Cpu,
  Edit,
  Paintbrush,
  Zap,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

function FeatureItem({ icon, title, description, index }: FeatureItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="mb-4 p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full">
        {icon}
      </div>
      <h4 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
        {title}
      </h4>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
}

export default function KeyFeatures() {
  const features = [
    {
      icon: <Palette className="w-6 h-6 text-primary" />,
      title: "Rich Customization",
      description:
        "Tailor every aspect of your video to match your vision perfectly.",
    },
    {
      icon: <Layout className="w-6 h-6 text-primary" />,
      title: "Extensive Templates",
      description:
        "Start with professionally designed templates and make them your own.",
    },
    {
      icon: <Wand2 className="w-6 h-6 text-primary" />,
      title: "Precise Control",
      description:
        "Fine-tune every element with our intuitive design controls.",
    },
    {
      icon: <Layers className="w-6 h-6 text-primary" />,
      title: "Brand Personalization",
      description:
        "Easily incorporate your brand elements for consistent messaging.",
    },
    {
      icon: <Cpu className="w-6 h-6 text-accent" />,
      title: "AI Video Generation",
      description:
        "Transform your ideas into videos with powerful AI-driven creation tools.",
    },
    {
      icon: <Edit className="w-6 h-6 text-accent" />,
      title: "Smart Editing",
      description:
        "Receive intelligent editing recommendations to enhance your videos.",
    },
    {
      icon: <Paintbrush className="w-6 h-6 text-accent" />,
      title: "Style Transfer",
      description: "Apply artistic styles to your videos with a single click.",
    },
    {
      icon: <Zap className="w-6 h-6 text-accent" />,
      title: "One-Click Enhancement",
      description:
        "Instantly improve video quality with AI-powered enhancements.",
    },
  ];

  return (
    <div className="py-20 rounded-2xl mt-4 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
            Key Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the powerful tools that will revolutionize your video
            creation process.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-16 text-center"
      >
        <Link href="/in">
          <Button
            size="lg"
            className="font-mono bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white font-semibold py-6 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            Get Started Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
