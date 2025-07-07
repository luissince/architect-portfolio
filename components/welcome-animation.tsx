"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import Image from "next/image"

export default function WelcomeAnimation() {
  const [isVisible, setIsVisible] = useState(true)
  const [showLightLogo, setShowLightLogo] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    // Comprobar si ya se mostró la animación en esta sesión
    const hasSeenAnimation = sessionStorage.getItem("hasSeenWelcomeAnimation")

    if (hasSeenAnimation) {
      setIsVisible(false)
      return
    }

    // Cambiar al logo claro cuando las cortinas empiecen a abrirse
    const logoTimer = setTimeout(() => {
      setShowLightLogo(true)
    }, 2800) // Un poco antes de que las cortinas se abran

    // Ocultar la animación después de 5 segundos
    const hideTimer = setTimeout(() => {
      setIsVisible(false)
      // Guardar en sessionStorage para no mostrarla de nuevo en esta sesión
      sessionStorage.setItem("hasSeenWelcomeAnimation", "true")
    }, 5000)

    return () => {
      clearTimeout(logoTimer)
      clearTimeout(hideTimer)
    }
  }, [])

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
                {/* Logo con transición entre oscuro y claro */}
                <div className="relative">
                  <AnimatePresence mode="wait">
                    {!showLightLogo ? (
                      <motion.div
                        key="dark-logo"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Image src="/logo-dark.png" alt="Logo Dark" width={400} height={400} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="light-logo"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Image src="/logo.png" alt="Logo Light" width={400} height={400} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Texto de bienvenida con animación de revelación */}
                <div className="text-center overflow-hidden">
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