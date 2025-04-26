"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X, Maximize, Minimize, Play } from "lucide-react"

type ImageGalleryProps = {
  images: string[]
  videos?: string[]
  alt: string
}

export default function ImageGallery({ images, videos = [], alt }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const [isVideo, setIsVideo] = useState(false)

  // Combinar imágenes y videos en un solo array de medios
  const allMedia = [...images.map((src) => ({ type: "image", src })), ...videos.map((src) => ({ type: "video", src }))]

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % allMedia.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + allMedia.length) % allMedia.length)
  }

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen)
  }

  // Actualizar el estado de isVideo cuando cambia el índice
  useEffect(() => {
    setIsVideo(allMedia[currentIndex]?.type === "video")
  }, [currentIndex])

  // Manejar teclas para navegación
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (fullscreen) {
        if (e.key === "ArrowRight") goToNext()
        else if (e.key === "ArrowLeft") goToPrevious()
        else if (e.key === "Escape") setFullscreen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [fullscreen])

  // Renderizar la galería en modo normal o pantalla completa
  const renderGalleryContent = () => (
    <>
      <div className="relative w-full h-full">
        {/* Medio actual (imagen o video) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {isVideo ? (
              <video
                src={allMedia[currentIndex].src}
                className="w-full h-full object-contain"
                controls
                autoPlay={fullscreen}
                loop
              />
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={allMedia[currentIndex].src || "/placeholder.svg"}
                  alt={`${alt} - ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes={fullscreen ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                  priority={currentIndex === 0}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Controles de navegación */}
        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity">
          <Button variant="secondary" size="icon" onClick={goToPrevious} className="bg-background/80 backdrop-blur-sm">
            <ChevronLeft />
          </Button>
          <Button variant="secondary" size="icon" onClick={goToNext} className="bg-background/80 backdrop-blur-sm">
            <ChevronRight />
          </Button>
        </div>
      </div>

      {/* Miniaturas */}
      <div className="flex overflow-x-auto gap-2 p-2 bg-muted/30 rounded-md mt-2">
        {allMedia.map((media, index) => (
          <div
            key={index}
            className={`relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
              index === currentIndex ? "border-accent" : "border-transparent"
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            {media.type === "video" ? (
              <div className="relative w-full h-full bg-black">
                <Play className="absolute inset-0 m-auto text-white w-6 h-6" />
                <video src={media.src} className="w-full h-full object-cover opacity-70" />
              </div>
            ) : (
              <Image
                src={media.src || "/placeholder.svg"}
                alt={`Miniatura ${index + 1}`}
                fill
                className="object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </>
  )

  // Modo pantalla completa
  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col">
        <div className="flex justify-between items-center p-4">
          <h3 className="text-lg font-medium">{alt}</h3>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
              <Minimize className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setFullscreen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="flex-1 flex flex-col p-4">{renderGalleryContent()}</div>
      </div>
    )
  }

  // Modo normal
  return (
    <div className="relative">
      <div className="relative h-[500px] rounded-lg overflow-hidden">{renderGalleryContent()}</div>
      <Button
        variant="secondary"
        size="icon"
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm z-10"
      >
        <Maximize className="h-5 w-5" />
      </Button>
    </div>
  )
}
