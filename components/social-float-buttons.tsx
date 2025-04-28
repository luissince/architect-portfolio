"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Instagram, Facebook, Linkedin, X, ChevronUp, Phone } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import Link from "next/link"
import { useRegion } from "@/context/region-context"

export default function SocialFloatButtons() {
  const [isOpen, setIsOpen] = useState(false)
  const { regionData } = useRegion()

  // Configurar el número de WhatsApp según la región
  const getWhatsAppNumber = () => {
    switch (regionData.region) {
      case "pe":
        return "+51912345678"
      case "us":
        return "+12125551234"
    }
  }

  const toggleOpen = () => setIsOpen(!isOpen)

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial="hidden" animate="visible" exit="hidden" custom={0} variants={buttonVariants}>
              <Link
                href={`https://wa.me/${getWhatsAppNumber()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-colors"
              >
                <FaWhatsapp size={24} />
              </Link>
            </motion.div>

            <motion.div initial="hidden" animate="visible" exit="hidden" custom={1} variants={buttonVariants}>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white shadow-lg hover:opacity-90 transition-opacity"
              >
                <Instagram size={24} />
              </Link>
            </motion.div>

            <motion.div initial="hidden" animate="visible" exit="hidden" custom={2} variants={buttonVariants}>
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors"
              >
                <Facebook size={24} />
              </Link>
            </motion.div>

            <motion.div initial="hidden" animate="visible" exit="hidden" custom={3} variants={buttonVariants}>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-700 text-white shadow-lg hover:bg-blue-800 transition-colors"
              >
                <Linkedin size={24} />
              </Link>
            </motion.div>

            <motion.div initial="hidden" animate="visible" exit="hidden" custom={4} variants={buttonVariants}>
              <Link
                href="tel:+123456789"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-accent text-white shadow-lg hover:bg-accent/90 transition-colors"
              >
                <Phone size={24} />
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleOpen}
        className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-colors ${
          isOpen ? "bg-red-500 hover:bg-red-600" : "bg-accent hover:bg-accent/90"
        } text-white`}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={24} /> : <ChevronUp size={24} />}
      </motion.button>
    </div>
  )
}
