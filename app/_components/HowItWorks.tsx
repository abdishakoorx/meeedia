'use client'

import { Upload, Wand2, Share2, FileType, MonitorSmartphone, Check, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const steps = [
  {
    icon: <Upload className="w-12 h-12 text-primary" />,
    title: "Upload Your Content",
    description: "Start by uploading your raw footage or selecting from our curated stock library."
  },
  {
    icon: <Wand2 className="w-12 h-12 text-primary" />,
    title: "Edit & Enhance",
    description: "Use our intuitive tools or AI assistance to edit and enhance your video effortlessly."
  },
  {
    icon: <Share2 className="w-12 h-12 text-primary" />,
    title: "Export & Share",
    description: "Export your masterpiece in various formats and share directly to your favorite platforms."
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
}

export default function HowItWorks() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Create stunning videos in three simple steps
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {steps.map((step, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300">
                <div className="mb-4 p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full">
                  {step.icon}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-semibold">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <h3 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Integration & Compatibility
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white dark:bg-gray-800 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <FileType className="w-6 h-6 text-primary" />
                  <span>Supported Formats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="grid grid-cols-2 gap-2">
                  {['MP4', 'MOV', 'AVI', 'GIF', 'WebM', 'JPG', 'PNG'].map((format) => (
                    <li key={format} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-600 dark:text-gray-300">{format}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-800 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <MonitorSmartphone className="w-6 h-6 text-accent" />
                  <span>Platform Integration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="grid grid-cols-2 gap-2">
                  {['YouTube', 'Facebook', 'Instagram', 'TikTok', 'Twitter', 'LinkedIn'].map((platform) => (
                    <li key={platform} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-600 dark:text-gray-300">{platform}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Link href="/in">
            <Button size="lg" className="font-mono bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white font-semibold py-6 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}