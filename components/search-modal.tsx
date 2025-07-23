"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, Compass, Palette, Building, Calculator, Phone, Sun, Moon, Monitor, Search } from "lucide-react"
import { Service, useLanguage } from "@/context/language-context"

export function SearchModal() {
  const { t } = useLanguage()
  const router = useRouter()
  const { setTheme } = useTheme()
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeTab, setActiveTab] = React.useState("all")
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  React.useEffect(() => {
    if (open && inputRef.current) {
      // Focus the input when the modal opens
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [open])

  // Datos para la búsqueda
  const sections = [
    {
      id: "home",
      name: t("home"),
      icon: <Home className="mr-2 h-4 w-4" />,
      keywords: ["inicio", "home", "principal"],
    },
    {
      id: "about",
      name: t("about"),
      icon: <Compass className="mr-2 h-4 w-4" />,
      keywords: ["sobre mi", "about", "acerca", "historia", "experiencia"],
    },
    {
      id: "services",
      name: t("services"),
      icon: <Palette className="mr-2 h-4 w-4" />,
      keywords: ["servicios", "diseño", "planos", "consultoría"],
    },
    {
      id: "portfolio",
      name: "Portfolio",
      icon: <Building className="mr-2 h-4 w-4" />,
      keywords: ["portfolio", "proyectos", "trabajos", "obras"],
    },
    {
      id: "products",
      name: t("products"),
      icon: <Palette className="mr-2 h-4 w-4" />,
      keywords: ["productos", "muebles", "decoración", "materiales"],
    },
    {
      id: "calculator",
      name: t("calculator"),
      icon: <Calculator className="mr-2 h-4 w-4" />,
      keywords: ["calculadora", "precios", "presupuesto", "costos"],
    },
    {
      id: "contact",
      name: t("contact"),
      icon: <Phone className="mr-2 h-4 w-4" />,
      keywords: ["contacto", "email", "teléfono", "ubicación"],
    },
  ]

  const projects = [
    {
      id: "1",
      name: "Casa Moderna Pinar",
      category: "residential",
      keywords: ["casa", "residencial", "moderna", "pinar"],
    },
    {
      id: "2",
      name: "Oficinas Creativas Nexus",
      category: "commercial",
      keywords: ["oficina", "comercial", "creativa", "nexus"],
    },
    {
      id: "3",
      name: "Restaurante Botánico",
      category: "commercial",
      keywords: ["restaurante", "comercial", "botánico", "gastronomía"],
    },
    {
      id: "4",
      name: "Renovación Apartamento Histórico",
      category: "renovation",
      keywords: ["apartamento", "renovación", "histórico", "rehabilitación"],
    },
    {
      id: "5",
      name: "Centro Cultural La Cúpula",
      category: "public",
      keywords: ["centro", "cultural", "cúpula", "público"],
    },
  ]

  const products = [
    {
      id: "f1",
      name: "Silla Minimalista",
      category: "furniture",
      keywords: ["silla", "mueble", "minimalista"],
    },
    {
      id: "f2",
      name: "Mesa de Centro",
      category: "furniture",
      keywords: ["mesa", "centro", "mueble"],
    },
    {
      id: "d1",
      name: "Lámpara Geométrica",
      category: "decoration",
      keywords: ["lámpara", "decoración", "geométrica", "luz"],
    },
    {
      id: "m1",
      name: "Mármol Carrara",
      category: "materials",
      keywords: ["mármol", "material", "carrara", "piedra"],
    },
  ]

  // const services = [
  //   {
  //     id: "1",
  //     name: t("interiorDesign"),
  //     keywords: ["diseño", "interior", "espacios", "decoración"],
  //   },
  //   {
  //     id: "2",
  //     name: t("architecturalPlans"),
  //     keywords: ["planos", "arquitectónicos", "diseño", "construcción"],
  //   },
  //   {
  //     id: "3",
  //     name: t("consulting"),
  //     keywords: ["consultoría", "asesoramiento", "consejo", "experto"],
  //   },
  // ]

  const services = (t("servicesList") as Service[]).map((service, index) => ({
    id: index + 1,
    name: service.title,
    keywords: service.benefits
  }));

  const themes = [
    {
      id: "light",
      name: "Claro",
      icon: <Sun className="mr-2 h-4 w-4" />,
    },
    {
      id: "dark",
      name: "Oscuro",
      icon: <Moon className="mr-2 h-4 w-4" />,
    },
    {
      id: "system",
      name: "Sistema",
      icon: <Monitor className="mr-2 h-4 w-4" />,
    },
  ]

  // Función para filtrar resultados basados en la búsqueda
  const filterResults = (items: any[], query: string) => {
    if (!query) return items

    const lowerQuery = query.toLowerCase()
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerQuery) ||
        (item.keywords && item.keywords.some((keyword: string) => keyword.toLowerCase().includes(lowerQuery))),
    )
  }

  // Filtrar resultados basados en la búsqueda
  const filteredSections = filterResults(sections, searchQuery)
  const filteredProjects = filterResults(projects, searchQuery)
  const filteredProducts = filterResults(products, searchQuery)
  const filteredServices = filterResults(services, searchQuery)

  // Determinar si hay resultados para mostrar
  const hasResults =
    filteredSections.length > 0 ||
    filteredProjects.length > 0 ||
    filteredProducts.length > 0 ||
    filteredServices.length > 0

  // Manejar la navegación a una sección
  const handleNavigateToSection = (sectionId: string) => {
    setOpen(false)
    const section = document.getElementById(sectionId)
    if (section) {
      setTimeout(() => {
        section.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }

  // Manejar la navegación a una página
  const handleNavigateToPage = (url: string) => {
    setOpen(false)
    setTimeout(() => {
      router.push(url)
    }, 100)
  }

  // Manejar el cambio de tema
  const handleChangeTheme = (theme: string) => {
    setOpen(false)
    setTimeout(() => {
      setTheme(theme)
    }, 100)
  }

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-full justify-start rounded-[0.5rem] bg-background text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-48"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden md:inline-flex">Buscar...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[550px] p-0">
          <div className="p-4 border-b">
            <div className="flex items-center px-3 py-2 border rounded-md focus-within:ring-1 focus-within:ring-ring">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <Input
                ref={inputRef}
                className="flex w-full border-0 bg-transparent p-0 text-sm outline-none placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Escribe para buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <div className="px-4 py-2 border-b">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="sections">Secciones</TabsTrigger>
                <TabsTrigger value="projects">Proyectos</TabsTrigger>
                <TabsTrigger value="products">Productos</TabsTrigger>
                <TabsTrigger value="services">Servicios</TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="h-[300px]">
              {!hasResults && (
                <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                  No se encontraron resultados.
                </div>
              )}

              <TabsContent value="all" className="p-0 m-0">
                {filteredSections.length > 0 && (
                  <div className="p-2">
                    <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Secciones</div>
                    <div className="space-y-1">
                      {filteredSections.map((section) => (
                        <button
                          key={section.id}
                          className="w-full flex items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                          onClick={() => handleNavigateToSection(section.id)}
                        >
                          {section.icon}
                          <span>{section.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {filteredProjects.length > 0 && (
                  <div className="p-2">
                    <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Proyectos</div>
                    <div className="space-y-1">
                      {filteredProjects.map((project) => (
                        <button
                          key={project.id}
                          className="w-full flex items-center justify-between rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                          onClick={() => handleNavigateToPage(`/proyecto/${project.id}`)}
                        >
                          <div className="flex items-center">
                            <Building className="mr-2 h-4 w-4" />
                            <span>{project.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {project.category === "residential"
                              ? "Residencial"
                              : project.category === "commercial"
                                ? "Comercial"
                                : project.category === "renovation"
                                  ? "Renovación"
                                  : "Público"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {filteredProducts.length > 0 && (
                  <div className="p-2">
                    <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Productos</div>
                    <div className="space-y-1">
                      {filteredProducts.map((product) => (
                        <button
                          key={product.id}
                          className="w-full flex items-center justify-between rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                          onClick={() => handleNavigateToPage(`/producto/${product.id}`)}
                        >
                          <div className="flex items-center">
                            <Palette className="mr-2 h-4 w-4" />
                            <span>{product.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {product.category === "furniture"
                              ? "Mobiliario"
                              : product.category === "decoration"
                                ? "Decoración"
                                : "Materiales"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {filteredServices.length > 0 && (
                  <div className="p-2">
                    <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Servicios</div>
                    <div className="space-y-1">
                      {filteredServices.map((service) => (
                        <button
                          key={service.id}
                          className="w-full flex items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                          onClick={() =>
                            handleNavigateToPage(`/solicitar-proyecto/1?type=service&serviceId=${service.id}`)
                          }
                        >
                          <Compass className="mr-2 h-4 w-4" />
                          <span>{service.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-2">
                  <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Tema</div>
                  <div className="space-y-1">
                    {themes.map((theme) => (
                      <button
                        key={theme.id}
                        className="w-full flex items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                        onClick={() => handleChangeTheme(theme.id)}
                      >
                        {theme.icon}
                        <span>{theme.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="sections" className="p-0 m-0">
                <div className="p-2">
                  <div className="space-y-1">
                    {filteredSections.map((section) => (
                      <button
                        key={section.id}
                        className="w-full flex items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                        onClick={() => handleNavigateToSection(section.id)}
                      >
                        {section.icon}
                        <span>{section.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="projects" className="p-0 m-0">
                <div className="p-2">
                  <div className="space-y-1">
                    {filteredProjects.map((project) => (
                      <button
                        key={project.id}
                        className="w-full flex items-center justify-between rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                        onClick={() => handleNavigateToPage(`/proyecto/${project.id}`)}
                      >
                        <div className="flex items-center">
                          <Building className="mr-2 h-4 w-4" />
                          <span>{project.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {project.category === "residential"
                            ? "Residencial"
                            : project.category === "commercial"
                              ? "Comercial"
                              : project.category === "renovation"
                                ? "Renovación"
                                : "Público"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="products" className="p-0 m-0">
                <div className="p-2">
                  <div className="space-y-1">
                    {filteredProducts.map((product) => (
                      <button
                        key={product.id}
                        className="w-full flex items-center justify-between rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                        onClick={() => handleNavigateToPage(`/producto/${product.id}`)}
                      >
                        <div className="flex items-center">
                          <Palette className="mr-2 h-4 w-4" />
                          <span>{product.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {product.category === "furniture"
                            ? "Mobiliario"
                            : product.category === "decoration"
                              ? "Decoración"
                              : "Materiales"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="services" className="p-0 m-0">
                <div className="p-2">
                  <div className="space-y-1">
                    {filteredServices.map((service) => (
                      <button
                        key={service.id}
                        className="w-full flex items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                        onClick={() =>
                          handleNavigateToPage(`/solicitar-proyecto/1?type=service&serviceId=${service.id}`)
                        }
                      >
                        <Compass className="mr-2 h-4 w-4" />
                        <span>{service.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  )
}
