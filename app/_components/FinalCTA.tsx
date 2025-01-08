'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, PenToolIcon as Tool } from 'lucide-react'
import { motion } from 'framer-motion'

export default function FinalCTA() {
  return (
    <section className="py-20 px-4 my-16 bg-gradient-to-br from-primary to-primary/50 rounded-3xl text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto relative z-10"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading leading-tight">
            Ready to Create <span className="text-gray-800 font-heading">Amazing Videos?</span>
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/80">
            Start your free trial today and experience the power of our video creation platform.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
          <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl">
            <Link href="/in" className="flex items-center text-black font-heading tracking-wide">
              Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="border-white text-black font-mono hover:bg-white/10 transition-all duration-300">
            <Link href="/in">Watch Demo</Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div 
            className="flex items-start bg-white/10 p-6 rounded-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Zap className="w-10 h-10 mr-4 flex-shrink-0 text-accent" />
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-2">Quick Start Guide</h3>
              <p className="text-white/80">Get up and running in minutes with our easy-to-follow quick start guide.</p>
            </div>
          </motion.div>
          <motion.div 
            className="flex items-start bg-white/10 p-6 rounded-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Tool className="w-10 h-10 mr-4 flex-shrink-0 text-accent" />
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-2">Integration with Existing Tools</h3>
              <p className="text-white/80">Seamlessly integrate our platform with your favorite design and productivity tools.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}