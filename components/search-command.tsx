"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Home, Compass, Palette, Building, Calculator, Phone, Sun, Moon, Monitor } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export function SearchCommand() {
  const { t } = useLanguage()
  const router = useRouter()
  const { setTheme } = useTheme()
  const [open, setOpen] = React.useState(false)

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

  const services = [
    {
      id: "1",
      name: t("interiorDesign"),
      keywords: ["diseño", "interior", "espacios", "decoración"],
    },
    {
      id: "2",
      name: t("architecturalPlans"),
      keywords: ["planos", "arquitectónicos", "diseño", "construcción"],
    },
    {
      id: "3",
      name: t("consulting"),
      keywords: ["consultoría", "asesoramiento", "consejo", "experto"],
    },
  ]

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    // Ejecutar el comando inmediatamente después de cerrar el modal
    requestAnimationFrame(() => {
      command()
    })
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-full justify-start rounded-[0.5rem] bg-background text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Buscar en la página...</span>
        <span className="inline-flex lg:hidden">Buscar...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Escribe para buscar..." />
        <CommandList>
          <CommandEmpty>No se encontraron resultados.</CommandEmpty>
          <CommandGroup heading="Secciones">
            {sections.map((section) => (
              <CommandItem
                key={section.id}
                onSelect={() => runCommand(() => scrollToSection(section.id))}
                className="cursor-pointer"
              >
                {section.icon}
                <span>{section.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Proyectos">
            {projects.map((project) => (
              <CommandItem
                key={project.id}
                onSelect={() => runCommand(() => router.push(`/proyecto/${project.id}`))}
                className="cursor-pointer"
              >
                <Building className="mr-2 h-4 w-4" />
                <span>{project.name}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {project.category === "residential"
                    ? "Residencial"
                    : project.category === "commercial"
                      ? "Comercial"
                      : project.category === "renovation"
                        ? "Renovación"
                        : "Público"}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Productos">
            {products.map((product) => (
              <CommandItem
                key={product.id}
                onSelect={() => runCommand(() => router.push(`/producto/${product.id}`))}
                className="cursor-pointer"
              >
                <Palette className="mr-2 h-4 w-4" />
                <span>{product.name}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {product.category === "furniture"
                    ? "Mobiliario"
                    : product.category === "decoration"
                      ? "Decoración"
                      : "Materiales"}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Servicios">
            {services.map((service) => (
              <CommandItem
                key={service.id}
                onSelect={() =>
                  runCommand(() => router.push(`/solicitar-proyecto/1?type=service&serviceId=${service.id}`))
                }
                className="cursor-pointer"
              >
                <Compass className="mr-2 h-4 w-4" />
                <span>{service.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Tema">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))} className="cursor-pointer">
              <Sun className="mr-2 h-4 w-4" />
              <span>Claro</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))} className="cursor-pointer">
              <Moon className="mr-2 h-4 w-4" />
              <span>Oscuro</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))} className="cursor-pointer">
              <Monitor className="mr-2 h-4 w-4" />
              <span>Sistema</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
