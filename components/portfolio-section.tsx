"use client"
import { Project, useLanguage } from "@/context/language-context"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
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

  const projects = (t("projectsList") as Project[]) || []
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
          {t("portfolioTitle").toString()}
        </motion.h2>
        <Tabs defaultValue="all" className="w-full mb-12" onValueChange={setActiveCategory}>
          <div className="flex justify-center">
            <TabsList className="grid grid-cols-5 w-full max-w-2xl">
              <TabsTrigger value="all">{t("allProjects").toString()}</TabsTrigger>
              <TabsTrigger value="residential">{t("residential").toString()}</TabsTrigger>
              <TabsTrigger value="commercial">{t("commercial").toString()}</TabsTrigger>
              <TabsTrigger value="renovation">{t("renovation").toString()}</TabsTrigger>
              <TabsTrigger value="public">{t("public").toString()}</TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <FadeInAnimation key={project.id} delay={index * 0.1}>
              <Link href={`/proyecto/${project.id}`}>
                <div className="relative overflow-hidden rounded-lg shadow-md">
                  <div className="relative h-64 w-full">
                    <video
                      src={project.video}
                      className="object-cover w-full h-full"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                    <p className="text-sm opacity-90">
                      {project.category === "residential"
                        ? t("residential").toString()
                        : project.category === "commercial"
                          ? t("commercial").toString()
                          : project.category === "renovation"
                            ? t("renovation").toString()
                            : t("public").toString()}{" "}
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
              setActiveCategory("all")
              const hiddenProjects = projects.filter((p) => !filteredProjects.includes(p))
              if (hiddenProjects.length > 0) {
                setShowAllProjects(true)
              } else {
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
