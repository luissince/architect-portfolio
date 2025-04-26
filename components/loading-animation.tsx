"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function LoadingAnimation() {
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  if (isComplete) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="relative w-64 h-64">
        <motion.svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Architectural line drawing animation */}
          <motion.path
            d="M10,90 L10,30 L50,10 L90,30 L90,90 Z"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M10,30 L50,50 L90,30"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.path
            d="M50,50 L50,90"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
          />
          <motion.path
            d="M30,70 L70,70"
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 1.5 }}
          />
        </motion.svg>
        <motion.div
          className="absolute bottom-0 left-0 right-0 text-center font-playfair text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          ESTUDIO
        </motion.div>
      </div>
    </div>
  )
}
