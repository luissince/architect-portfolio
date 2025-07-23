"use client"

import { Service, useLanguage } from "@/context/language-context"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Compass, Home, Lightbulb } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FadeInAnimation } from "./animation-wrapper"
import { MdChair } from "react-icons/md"
import { GiFamilyHouse } from "react-icons/gi"

export default function ServicesSection() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const router = useRouter()

  const handleRequestService = (serviceId: number) => {
    // Cerrar el diálogo
    setSelectedService(null)

    // Redirigir a la página de solicitud de proyecto usando un ID existente
    // Usamos el ID 1 que corresponde a un proyecto existente, pero añadimos un query param para indicar que es un servicio
    router.push(`/solicitar-proyecto/1?type=service&serviceId=${serviceId}`)
  }

  return (
    <section id="services" className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          {t("servicesTitle").toString()}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(t("servicesList") as Service[]).map((service, index) => (
            <FadeInAnimation key={index} delay={index * 0.1}>
              <Card
                className="h-full border-2 hover:border-accent transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedService(service.id)}
              >
                <CardHeader className="flex flex-col items-center text-center">
                  {service.icon}
                  <CardTitle className="mt-4">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">{service.description}</CardDescription>
                  <div className="flex justify-center mt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-primary hover:text-accent-foreground hover:bg-accent bg-transparent"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedService(service.id)
                      }}
                    >
                      {t("buttonDetails").toString()}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </FadeInAnimation>
          ))}
        </div>

        {/* Service Detail Dialog */}
        <Dialog open={selectedService !== null} onOpenChange={(open) => !open && setSelectedService(null)}>
          <DialogContent className="max-w-[95vw] md:max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedService && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl md:text-2xl">
                    {(t("servicesList") as Service[]).find((s) => s.id === selectedService)?.title}
                  </DialogTitle>
                  <DialogDescription className="text-accent">{t("professionalArchitecture").toString()}</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 gap-6 mt-4">
                  <div className="relative h-48 md:h-64 w-full rounded-lg overflow-hidden">
                    <Image
                      src={(t("servicesList") as Service[]).find((s) => s.id === selectedService)?.image || "/placeholder.svg"}
                      alt={(t("servicesList") as Service[]).find((s) => s.id === selectedService)?.title || "Service"}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-4">
                    <p className="text-muted-foreground text-sm md:text-base">
                      {(t("servicesList") as Service[]).find((s) => s.id === selectedService)?.fullDescription}
                    </p>

                    <div>
                      <h4 className="font-semibold mb-2">{t("benefits").toString()}</h4>
                      <ul className="space-y-2">
                        {(t("servicesList") as Service[])
                          .find((s) => s.id === selectedService)
                          ?.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-accent mr-2 mt-1 flex-shrink-0">•</span>
                              <span className="text-sm text-muted-foreground">{benefit}</span>
                            </li>
                          ))}
                      </ul>
                    </div>

                    <Button
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-6"
                      onClick={() => handleRequestService(selectedService)}
                    >
                      {t("buttonRequest").toString()}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
