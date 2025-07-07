"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import Image from "next/image"

export default function WelcomeAnimation() {
  const [isVisible, setIsVisible] = useState(true)
  const { t } = useLanguage()

  // useEffect(() => {
  //   // Comprobar si ya se mostró la animación en esta sesión
  //   const hasSeenAnimation = sessionStorage.getItem("hasSeenWelcomeAnimation")

  //   if (hasSeenAnimation) {
  //     setIsVisible(false)
  //     return
  //   }

  //   // Ocultar la animación después de 5 segundos
  //   const timer = setTimeout(() => {
  //     setIsVisible(false)
  //     // Guardar en sessionStorage para no mostrarla de nuevo en esta sesión
  //     sessionStorage.setItem("hasSeenWelcomeAnimation", "true")
  //   }, 5000)

  //   return () => clearTimeout(timer)
  // }, [])

  // Si no es visible, no renderizar nada
  if (!isVisible) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 4.5 }}
        >
          {/* Contenedor principal */}
          <div className="relative w-full h-full overflow-hidden">
            {/* Cortina izquierda */}
            <motion.div
              className="absolute top-0 bottom-0 left-0 w-1/2 bg-primary"
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              transition={{ duration: 1.5, delay: 3, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflowX: "hidden" }}
            >
              <div className="absolute top-0 right-0 w-[1px] h-full bg-accent/30"></div>

              {/* Patrón decorativo en la cortina izquierda */}
              <div className="absolute inset-0 opacity-5">
                <div className="grid grid-cols-4 h-full">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={`left-${i}`} className="border border-accent/20"></div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Cortina derecha */}
            <motion.div
              className="absolute top-0 bottom-0 right-0 w-1/2 bg-primary"
              initial={{ x: 0 }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.5, delay: 3, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflowX: "hidden" }}
            >
              <div className="absolute top-0 left-0 w-[1px] h-full bg-accent/30"></div>

              {/* Patrón decorativo en la cortina derecha */}
              <div className="absolute inset-0 opacity-5">
                <div className="grid grid-cols-4 h-full">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={`right-${i}`} className="border border-accent/20"></div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Líneas decorativas horizontales */}
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={`line-${i}`}
                className="absolute left-0 right-0 h-[1px] bg-accent/10"
                style={{ top: `${(i + 1) * 20}%` }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.3 + i * 0.1 }}
              />
            ))}

            {/* Contenido central */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Logo o símbolo */}
                <div className="relative">
                  {/* <motion.div
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="w-full h-full"
                  >
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <motion.path
                        d="M10,90 L10,30 L50,10 L90,30 L90,90 Z"
                        stroke="hsl(var(--accent))"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                      />
                      <motion.path
                        d="M10,30 L50,50 L90,30"
                        stroke="hsl(var(--accent))"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                      />
                      <motion.path
                        d="M50,50 L50,90"
                        stroke="hsl(var(--accent))"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
                      />
                      <motion.path
                        d="M30,70 L70,70"
                        stroke="hsl(var(--accent))"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, ease: "easeInOut", delay: 1.5 }}
                      />

                      <motion.circle
                        cx="50"
                        cy="30"
                        r="3"
                        fill="hsl(var(--accent))"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 2 }}
                      />
                    </svg>
                  </motion.div> */}
                   <Image src="/logo.png" alt="Logo" width={400} height={400} />
                </div>

                {/* Texto de bienvenida con animación de revelación */}
                <div className="text-center overflow-hidden">
                  {/* <motion.h1
                    className="text-4xl md:text-6xl font-playfair font-bold mb-4 relative"
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  >
                    <span className="text-primary">DECORGANIKA</span>
                    <span className="text-accent">.</span>
                  </motion.h1> */}

                  <motion.div
                    className="overflow-hidden"
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    transition={{ duration: 0.8, delay: 1.8 }}
                  >
                    <p className="text-lg md:text-xl text-muted-foreground">{t("heroSubtitle").toString()}</p>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Línea decorativa inferior */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 1.5 }}
              style={{ transformOrigin: "left" }}
            />

            {/* Elementos decorativos en las esquinas */}
            {[
              { top: 0, left: 0 },
              { top: 0, right: 0 },
              { bottom: 0, left: 0 },
              { bottom: 0, right: 0 },
            ].map((pos, i) => (
              <motion.div
                key={`corner-${i}`}
                className="absolute w-16 h-16 border-accent"
                style={{
                  ...pos,
                  borderTopWidth: pos.top === 0 ? "2px" : "0",
                  borderBottomWidth: pos.bottom === 0 ? "2px" : "0",
                  borderLeftWidth: pos.left === 0 ? "2px" : "0",
                  borderRightWidth: pos.right === 0 ? "2px" : "0",
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 2 + i * 0.1 }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
