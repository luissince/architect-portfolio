"use client"

import { useState, useEffect } from "react"
import { PromoModalContent, useLanguage } from "@/context/language-context"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function PromoModal() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

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

  const promoModal = t("promoModal") as PromoModalContent

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{promoModal.title}</DialogTitle>
          {/* Eliminamos el botón de cierre duplicado aquí, ya que DialogContent ya incluye uno */}
        </DialogHeader>

        <div className="relative h-48 w-full mb-4 overflow-hidden rounded-md">
          <Image src={promoModal.image || "/placeholder.svg"} alt="Promotional image" fill className="object-cover" />
        </div>

        <DialogDescription className="text-center mb-4">{promoModal.description}</DialogDescription>

        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" onClick={closeModal}>
          {promoModal.cta}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
