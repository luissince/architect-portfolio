"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

type AnimationWrapperProps = {
  children: ReactNode
  delay?: number
  className?: string
}

export function FadeInAnimation({ children, delay = 0, className = "" }: AnimationWrapperProps) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  )
}

export function ScaleInAnimation({ children, delay = 0, className = "" }: AnimationWrapperProps) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  )
}
