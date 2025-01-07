"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(110vh-80px)] flex items-center py-20 overflow-hidden rounded-b-3xl">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background dark:from-darkBackground via-background dark:via-darkBackground to-primary/10 dark:to-primary/5" />
      
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left content section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mt-6 md:mt-0 bg-primary/10 dark:bg-primary/20 border border-primary/20 rounded-full px-4 py-2"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">AI-Powered Video Creation</span>
            </motion.div>

            <div className="space-y-6">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl/tight sm:text-5xl/tight lg:text-6xl/tight xl:text-7xl/tight font-bold text-foreground"
              >
                Create Videos That 
                <span className="block text-primary">Make an Impact</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-muted-foreground max-w-xl"
              >
                Choose your path: Design custom videos your way or let AI guide your creativity. Professional results, every time.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/in">
              <Button size="lg" className="rounded-full font-semibold text-lg p-6 group dark:text-white">
                Start Creating
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            </motion.div>
          </motion.div>

          {/* Right video section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative">
              {/* Gradient blob behind video */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-purple-500/30 blur-3xl opacity-20 rounded-full" />
              
              {/* Floating elements */}
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-primary/10 rounded-lg border border-primary/20 backdrop-blur-sm" />
              <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-purple-500/10 rounded-lg border border-purple-500/20 backdrop-blur-sm" />
              
              {/* Video container */}
              <div className="relative bg-gradient-to-br from-background to-primary/5 p-2 rounded-2xl border border-white/10 backdrop-blur-sm shadow-2xl">
                <video
                  className="w-full rounded-xl"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/hero-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Video overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-xl pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}