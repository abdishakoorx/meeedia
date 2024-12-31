'use client'

import { motion } from 'framer-motion'

export const CustomLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black backdrop-blur-sm z-50">
      <div className="relative w-32 h-32">
        {/* AI "processing" circles */}
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 border-4 border-primary rounded-full"
            initial={{ scale: 0, rotate: 0 }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Video frame */}
        <motion.div
          className="absolute inset-4 bg-secondary/20 rounded-md overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Scanning line */}
          <motion.div
            className="w-full h-1 bg-accent"
            initial={{ y: 0 }}
            animate={{ y: [0, 96, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>

        {/* AI "thinking" dots */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-primary rounded-full"
              initial={{ opacity: 0.5, y: 0 }}
              animate={{ opacity: 1, y: -10 }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: index * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

