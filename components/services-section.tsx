"use client"

import { useLanguage } from "@/context/language-context"
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

export default function ServicesSection() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const router = useRouter()

  const services = [
    {
      id: 1,
      icon: <Home className="h-10 w-10 text-accent" />,
      title: t("interiorDesign").toString(),
      description:
        "Transformamos espacios interiores para crear ambientes funcionales y estéticamente atractivos que reflejen su personalidad y estilo de vida.",
      fullDescription:
        "Nuestro servicio de diseño de interiores abarca desde la conceptualización inicial hasta la implementación final. Trabajamos estrechamente con cada cliente para entender sus necesidades, preferencias y estilo de vida, creando espacios que no solo son hermosos sino también funcionales y personalizados. Utilizamos las últimas tendencias en diseño, materiales sostenibles y soluciones innovadoras para transformar cualquier espacio en un ambiente que inspire y mejore la calidad de vida.",
      benefits: [
        "Diseño personalizado adaptado a sus necesidades y estilo",
        "Selección de materiales, mobiliario y accesorios",
        "Optimización del espacio y la funcionalidad",
        "Asesoramiento en iluminación y paletas de colores",
        "Supervisión de la implementación del diseño",
      ],
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      id: 2,
      icon: <Compass className="h-10 w-10 text-accent" />,
      title: t("architecturalPlans").toString(),
      description:
        "Desarrollamos planos arquitectónicos detallados y precisos para proyectos residenciales, comerciales e institucionales.",
      fullDescription:
        "Nuestros planos arquitectónicos son el resultado de un proceso meticuloso que combina creatividad, precisión técnica y cumplimiento normativo. Utilizamos software de diseño avanzado para crear representaciones detalladas que sirven como guía clara para la construcción. Cada plano se desarrolla considerando aspectos estructurales, funcionales, estéticos y sostenibles, asegurando que el proyecto final cumpla con todas las expectativas y requisitos.",
      benefits: [
        "Planos detallados y a escala con especificaciones técnicas",
        "Diseños que cumplen con normativas y códigos de construcción",
        "Representaciones 3D y visualizaciones realistas",
        "Documentación completa para permisos de construcción",
        "Asesoramiento durante el proceso de construcción",
      ],
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      id: 3,
      icon: <Lightbulb className="h-10 w-10 text-accent" />,
      title: t("consulting").toString(),
      description:
        "Ofrecemos asesoramiento experto en todas las etapas de su proyecto, desde la conceptualización inicial hasta la finalización.",
      fullDescription:
        "Nuestro servicio de consultoría arquitectónica proporciona orientación profesional para ayudarle a tomar decisiones informadas en cada fase de su proyecto. Ya sea que esté considerando una renovación, una construcción nueva o simplemente necesite asesoramiento sobre aspectos específicos, nuestro equipo de expertos le brindará soluciones prácticas y creativas. Analizamos cada situación desde múltiples perspectivas, considerando factores como presupuesto, cronograma, sostenibilidad y valor a largo plazo.",
      benefits: [
        "Evaluación de viabilidad y análisis de sitio",
        "Asesoramiento en selección de materiales y tecnologías",
        "Optimización de presupuesto y recursos",
        "Soluciones para eficiencia energética y sostenibilidad",
        "Gestión de proyectos y coordinación con contratistas",
      ],
      image: "/placeholder.svg?height=600&width=800",
    },
  ]

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
          {services.map((service, index) => (
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
                      className="text-primary dark:text-accent hover:text-accent-foreground hover:bg-accent dark:hover:text-primary"
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
          <DialogContent className="max-w-4xl">
            {selectedService && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">
                    {services.find((s) => s.id === selectedService)?.title}
                  </DialogTitle>
                  <DialogDescription className="text-accent">{t("professionalArchitecture").toString()}</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="relative h-64 w-full rounded-lg overflow-hidden">
                    <Image
                      src={services.find((s) => s.id === selectedService)?.image || "/placeholder.svg"}
                      alt={services.find((s) => s.id === selectedService)?.title || "Service"}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      {services.find((s) => s.id === selectedService)?.fullDescription}
                    </p>

                    <div>
                      <h4 className="font-semibold mb-2">{t("benefits").toString()}</h4>
                      <ul className="space-y-1">
                        {services
                          .find((s) => s.id === selectedService)
                          ?.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-accent mr-2">•</span>
                              <span className="text-sm text-muted-foreground">{benefit}</span>
                            </li>
                          ))}
                      </ul>
                    </div>

                    <Button
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-4"
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
