"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/context/language-context"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import SocialFloatButtons from "@/components/social-float-buttons"

export default function PortfolioPage() {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState("all")

  type Project = {
    id: number
    title: string
    description: string
    category: string
    location: string
    year: string
    images: string[]
    client: string
  }

  const projects: Project[] = [
    {
      id: 1,
      title: "Casa Moderna Pinar",
      description:
        "Residencia minimalista con amplios espacios abiertos y luz natural. Diseñada para una familia joven que buscaba un espacio contemporáneo pero acogedor, esta casa incorpora materiales sostenibles y un diseño bioclimático que reduce el consumo energético.",
      category: "residential",
      location: "Madrid, España",
      year: "2022",
      images: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
      client: "Familia Rodríguez",
    },
    {
      id: 2,
      title: "Oficinas Creativas Nexus",
      description:
        "Espacio de trabajo colaborativo diseñado para fomentar la creatividad y el bienestar. Este proyecto transforma un antiguo almacén industrial en un entorno de trabajo dinámico con áreas flexibles, zonas de descanso y elementos naturales integrados.",
      category: "commercial",
      location: "Barcelona, España",
      year: "2021",
      images: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
      client: "Nexus Innovations",
    },
    {
      id: 3,
      title: "Restaurante Botánico",
      description:
        "Concepto gastronómico donde la naturaleza es protagonista. El diseño integra un jardín vertical interior, materiales naturales y una paleta de colores terrosos para crear una experiencia inmersiva que complementa la propuesta culinaria orgánica del restaurante.",
      category: "commercial",
      location: "Valencia, España",
      year: "2023",
      images: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
      client: "Grupo Gastronómico Mediterráneo",
    },
    {
      id: 4,
      title: "Renovación Apartamento Histórico",
      description:
        "Rehabilitación de un apartamento en un edificio histórico del siglo XIX, preservando elementos arquitectónicos originales mientras se incorporan comodidades modernas. El proyecto equilibra el respeto por el patrimonio con las necesidades contemporáneas.",
      category: "renovation",
      location: "Sevilla, España",
      year: "2020",
      images: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
      client: "Sr. y Sra. Martín",
    },
    {
      id: 5,
      title: "Centro Cultural La Cúpula",
      description:
        "Espacio multifuncional para eventos culturales con un diseño acústico innovador. La estructura incorpora una cúpula geodésica que optimiza la distribución del sonido y crea un espacio visualmente impactante para conciertos, exposiciones y conferencias.",
      category: "public",
      location: "Bilbao, España",
      year: "2022",
      images: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
      client: "Ayuntamiento de Bilbao",
    },
    {
      id: 6,
      title: "Villa Mediterránea",
      description:
        "Residencia de lujo inspirada en la arquitectura mediterránea tradicional con un enfoque contemporáneo. Espacios abiertos que se integran con el paisaje, patios interiores y una cuidadosa orientación que aprovecha las vistas al mar y la ventilación natural.",
      category: "residential",
      location: "Málaga, España",
      year: "2021",
      images: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
      client: "Familia Navarro",
    },
    {
      id: 7,
      title: "Biblioteca Municipal",
      description:
        "Diseño de una biblioteca pública que combina funcionalidad y estética. El proyecto incorpora espacios de lectura acogedores, zonas de estudio, áreas multimedia y un auditorio para eventos culturales, todo ello con un enfoque en la accesibilidad y la sostenibilidad.",
      category: "public",
      location: "Zaragoza, España",
      year: "2023",
      images: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
      client: "Ayuntamiento de Zaragoza",
    },
    {
      id: 8,
      title: "Hotel Boutique Alameda",
      description:
        "Conversión de una antigua mansión en un hotel boutique de lujo. El diseño preserva la fachada histórica mientras transforma el interior en un espacio contemporáneo con 20 habitaciones únicas, un restaurante gourmet y un spa exclusivo.",
      category: "commercial",
      location: "Granada, España",
      year: "2022",
      images: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
      client: "Grupo Hotelero Alameda",
    },
    {
      id: 9,
      title: "Casa Sostenible Sierra",
      description:
        "Vivienda unifamiliar diseñada con criterios de sostenibilidad y eficiencia energética. Utiliza materiales locales, sistemas de energía renovable y aprovechamiento de agua de lluvia, logrando una huella de carbono mínima sin sacrificar el confort.",
      category: "residential",
      location: "Asturias, España",
      year: "2023",
      images: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
      client: "Familia Álvarez",
    },
    {
      id: 10,
      title: "Renovación Loft Industrial",
      description:
        "Transformación de un antiguo espacio industrial en un loft contemporáneo. El proyecto mantiene elementos originales como vigas de acero y paredes de ladrillo, combinándolos con acabados modernos y soluciones de diseño innovadoras.",
      category: "renovation",
      location: "Madrid, España",
      year: "2021",
      images: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
      client: "Sr. García",
    },
    {
      id: 11,
      title: "Centro Deportivo Urbano",
      description:
        "Complejo deportivo que integra piscina cubierta, gimnasio, pistas polideportivas y áreas de bienestar. El diseño prioriza la luz natural, la ventilación cruzada y la conexión visual entre espacios para crear un ambiente dinámico y saludable.",
      category: "public",
      location: "Valencia, España",
      year: "2022",
      images: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
      client: "Ayuntamiento de Valencia",
    },
    {
      id: 12,
      title: "Showroom Mobiliario de Diseño",
      description:
        "Espacio expositivo para una marca de mobiliario de diseño. El proyecto crea ambientes diferenciados que permiten mostrar las piezas en contextos realistas, con un cuidado especial en la iluminación y los acabados para resaltar cada producto.",
      category: "commercial",
      location: "Barcelona, España",
      year: "2023",
      images: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
      client: "Diseño Contemporáneo S.L.",
    },
  ]

  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12 mt-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestro Portafolio</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubre nuestra selección de proyectos arquitectónicos, desde residencias privadas hasta espacios
            comerciales y públicos, cada uno con su propia historia y desafíos únicos.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full mb-12" onValueChange={setActiveCategory}>
          <div className="flex justify-center">
            <TabsList className="grid grid-cols-5 w-full max-w-2xl">
              <TabsTrigger value="all">{t("allProjects")}</TabsTrigger>
              <TabsTrigger value="residential">{t("residential")}</TabsTrigger>
              <TabsTrigger value="commercial">{t("commercial")}</TabsTrigger>
              <TabsTrigger value="renovation">{t("renovation")}</TabsTrigger>
              <TabsTrigger value="public">{t("public")}</TabsTrigger>
            </TabsList>
          </div>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <Link href={`/proyecto/${project.id}`}>
                <div className="relative overflow-hidden rounded-lg shadow-md">
                  <div className="relative h-64 w-full">
                    <Image
                      src={project.images[0] || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                    <p className="text-sm opacity-90">
                      {project.category === "residential"
                        ? t("residential")
                        : project.category === "commercial"
                          ? t("commercial")
                          : project.category === "renovation"
                            ? t("renovation")
                            : t("public")}{" "}
                      | {project.year}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-8">
            ¿Interesado en trabajar con nosotros en tu próximo proyecto? Contáctanos para discutir tus ideas y
            necesidades.
          </p>
          <Link href="/#contact">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Contactar ahora</Button>
          </Link>
        </div>
      </div>

      <Footer />
      <SocialFloatButtons />
    </main>
  )
}
