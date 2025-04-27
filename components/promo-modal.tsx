"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/context/language-context"
import { useRegion } from "@/context/region-context"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function PromoModal() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()
  const { region, regionData } = useRegion()

  useEffect(() => {
    // Verificar si el modal ya se mostró anteriormente (en las últimas 24 horas)
    const lastShown = localStorage.getItem("promo-modal-last-shown")
    const twentyFourHoursAgo = new Date().getTime() - 24 * 60 * 60 * 1000

    if (!lastShown || Number.parseInt(lastShown) < twentyFourHoursAgo) {
      // Mostrar el modal después de un breve retraso para permitir que la página se cargue
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [])

  const closeModal = () => {
    setIsOpen(false)
    // Guardar la marca de tiempo actual
    localStorage.setItem("promo-modal-last-shown", new Date().getTime().toString())
  }

  // Contenido específico por región
  const getPromoContent = () => {
    // Promociones específicas por región
    switch (region) {
      case "pe":
        return {
          title: "Oferta Especial para Perú",
          description: "Obtén un 20% de descuento en tu primera consulta arquitectónica. Válido hasta fin de mes.",
          image: "/placeholder.svg?height=300&width=500",
          cta: "Aprovechar oferta",
        }
      case "mx":
        return {
          title: "Promoción Exclusiva para México",
          description: "Diseño de interiores con 15% de descuento para proyectos residenciales.",
          image: "/placeholder.svg?height=300&width=500",
          cta: "Ver detalles",
        }
      case "us":
      case "gb":
        return {
          title: "Special Offer",
          description: "Get a free initial consultation for any architectural project.",
          image: "/placeholder.svg?height=300&width=500",
          cta: "Learn More",
        }
      default:
        return {
          title: "Bienvenido a nuestro Estudio",
          description: "Descubre nuestros servicios de arquitectura y diseño de interiores.",
          image: "/placeholder.svg?height=300&width=500",
          cta: "Explorar servicios",
        }
    }
  }

  const promoContent = getPromoContent()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{promoContent.title}</DialogTitle>
          {/* Eliminamos el botón de cierre duplicado aquí, ya que DialogContent ya incluye uno */}
        </DialogHeader>

        <div className="relative h-48 w-full mb-4 overflow-hidden rounded-md">
          <Image src={promoContent.image || "/placeholder.svg"} alt="Promotional image" fill className="object-cover" />
        </div>

        <DialogDescription className="text-center mb-4">{promoContent.description}</DialogDescription>

        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" onClick={closeModal}>
          {promoContent.cta}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
