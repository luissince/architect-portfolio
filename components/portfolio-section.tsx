"use client"

import { useLanguage } from "@/context/language-context"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { FadeInAnimation } from "./animation-wrapper"

export default function PortfolioSection() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activeCategory, setActiveCategory] = useState("all")
  const [showAllProjects, setShowAllProjects] = useState(false)

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
  ]

  const filteredProjects = showAllProjects
    ? projects
    : activeCategory === "all"
      ? projects.slice(0, 6)
      : projects.filter((project) => project.category === activeCategory).slice(0, 6)

  return (
    <section id="portfolio" className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          {t("portfolioTitle")}
        </motion.h2>

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
            <FadeInAnimation key={project.id} delay={index * 0.1}>
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
            </FadeInAnimation>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              // Mostrar todos los proyectos
              setActiveCategory("all")

              // Desplegar más proyectos si están ocultos
              const hiddenProjects = projects.filter((p) => !filteredProjects.includes(p))
              if (hiddenProjects.length > 0) {
                // Si hay proyectos ocultos, mostrarlos todos
                setShowAllProjects(true)
              } else {
                // Si ya se muestran todos, redirigir a una página con más proyectos
                window.location.href = "/portfolio"
              }
            }}
          >
            Ver más proyectos
          </Button>
        </div>
      </div>
    </section>
  )
}
