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
import { MdChair } from "react-icons/md"
import { GiFamilyHouse } from "react-icons/gi"

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
      image: "/services1.jpeg?height=600&width=800",
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
      image: "/services2.jpeg?height=600&width=800",
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
      image: "/services3.jpeg?height=600&width=800",
    },
    {
      id: 4,
      icon: <GiFamilyHouse className="h-10 w-10 text-accent" />,
      title: t("furnitureDesign").toString(),
      description:
        "El diseño de mobiliario, tanto para interiores como para exteriores, es un arte que combina funcionalidad y estética, transformando espacios en verdaderos hogares.",
      fullDescription:
        "El diseño de mobiliario, tanto para interiores como para exteriores, es un arte que combina funcionalidad y estética, transformando espacios en verdaderos hogares. En el interior, cada pieza de mobiliario se elige cuidadosamente para complementar el estilo de vida de los habitantes, desde sofás confortables que invitan a la relajación, hasta mesas de comedor que fomentan la convivencia familiar. Los materiales utilizados, como la madera natural, el metal y los textiles, no solo aportan belleza, sino también durabilidad y calidez al ambiente. Por otro lado, el diseño de mobiliario exterior busca crear un refugio en la naturaleza, donde los muebles resisten las inclemencias del tiempo sin perder su atractivo. Sillas, mesas y tumbonas están pensadas para disfrutar del aire libre, ofreciendo comodidad y estilo a jardines, terrazas y patios. En cada proyecto, la creatividad se fusiona con la ergonomía, garantizando que cada pieza no solo sea visualmente atractiva, sino que también mejore la calidad de vida de quienes la utilizan. Este enfoque holístico en el diseño de mobiliario busca crear espacios armónicos que reflejen la personalidad de sus dueños y se adapten a sus necesidades cotidianas.",
      benefits: [
        "Evaluación de viabilidad y análisis de sitio",
        "Asesoramiento en selección de materiales y tecnologías",
        "Optimización de presupuesto y recursos",
        "Soluciones para eficiencia energética y sostenibilidad",
        "Gestión de proyectos y coordinación con contratistas",
      ],
      image: "/services4.jpeg?height=600&width=800",
    },
    {
      id: 5,
      icon: <MdChair className="h-10 w-10 text-accent" />,
      title: t("artForYourHome").toString(),
      description:
        "En el mundo del arte, ofrecemos una amplia gama de opciones para transformar y embellecer tu vivienda.",
      fullDescription:
        `En el mundo del arte, ofrecemos una amplia gama de opciones para transformar y embellecer tu vivienda. Nuestra colección incluye esculturas únicas, que añaden un toque de elegancia y carácter a cualquier espacio. Cada pieza es cuidadosamente elaborada, reflejando la creatividad y el talento de los artistas, lo que permite que cada rincón de tu hogar cuente una historia a través del arte tridimensional. 
        Además, contamos con una selección de cuadros que abarcan diversos estilos, desde obras contemporáneas hasta clásicos atemporales. Estos cuadros no solo adornan las paredes, sino que también crean un ambiente acogedor y atractivo, invitando a la contemplación y al diálogo. Cada obra está diseñada para complementar la decoración de tu hogar, proporcionando un punto focal que captura la atención de tus visitantes.
        Por si fuera poco, también ofrecemos una variedad de suministros creativos para aquellos que desean explorar su propia creatividad. Desde lienzos de diferentes tamaños hasta pinturas, pinceles y herramientas especializadas, tenemos todo lo necesario para que puedas dar rienda suelta a tu talento artístico. Ya seas un artista experimentado o un principiante entusiasta, nuestros materiales de alta calidad te inspirarán a crear obras maestras en la comodidad de tu hogar.
        En resumen, nuestra oferta abarca desde esculturas y cuadros que realzan la estética de tu vivienda, hasta suministros artísticos que fomentan la creatividad. Invita el arte a tu vida y transforma tu hogar en un espacio lleno de inspiración y belleza.`,
      benefits: [
        "Evaluación de viabilidad y análisis de sitio",
        "Asesoramiento en selección de materiales y tecnologías",
        "Optimización de presupuesto y recursos",
        "Soluciones para eficiencia energética y sostenibilidad",
        "Gestión de proyectos y coordinación con contratistas",
      ],
      image: "/services5.jpeg?height=600&width=800",
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
                    {services.find((s) => s.id === selectedService)?.title}
                  </DialogTitle>
                  <DialogDescription className="text-accent">{t("professionalArchitecture").toString()}</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 gap-6 mt-4">
                  <div className="relative h-48 md:h-64 w-full rounded-lg overflow-hidden">
                    <Image
                      src={services.find((s) => s.id === selectedService)?.image || "/placeholder.svg"}
                      alt={services.find((s) => s.id === selectedService)?.title || "Service"}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-4">
                    <p className="text-muted-foreground text-sm md:text-base">
                      {services.find((s) => s.id === selectedService)?.fullDescription}
                    </p>

                    <div>
                      <h4 className="font-semibold mb-2">{t("benefits").toString()}</h4>
                      <ul className="space-y-2">
                        {services
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
