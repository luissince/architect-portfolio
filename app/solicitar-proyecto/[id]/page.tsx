"use client"

import type React from "react"

import { useState } from "react"
import { useParams, notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Check } from "lucide-react"
import { useRegion } from "@/context/region-context"
import { useLanguage } from "@/context/language-context"
import SocialFloatButtons from "@/components/social-float-buttons"

// Datos simulados de proyectos (mismos que en la página de detalle)
const projects = [
  {
    id: "1",
    title: "Casa Moderna Pinar",
    description: "Residencia minimalista con amplios espacios abiertos y luz natural.",
    category: "residential",
    location: "Madrid, España",
    year: "2022",
    images: ["/placeholder.svg?height=600&width=800"],
    client: "Familia Rodríguez",
  },
  {
    id: "2",
    title: "Oficinas Creativas Nexus",
    description: "Espacio de trabajo colaborativo diseñado para fomentar la creatividad y el bienestar.",
    category: "commercial",
    location: "Barcelona, España",
    year: "2021",
    images: ["/placeholder.svg?height=600&width=800"],
    client: "Nexus Innovations",
  },
  // Más proyectos...
]

export default function RequestProjectPage() {
  const params = useParams()
  const projectId = params?.id as string

  const [isServiceRequest, setIsServiceRequest] = useState(false)
  const [serviceId, setServiceId] = useState(null)

  useState(() => {
    const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "")
    setIsServiceRequest(searchParams.get("type") === "service")
    setServiceId(searchParams.get("serviceId"))
  }, [])

  // Verificar si tenemos un ID válido
  if (!projectId) {
    return notFound()
  }

  const project = projects.find((p) => p.id === projectId)

  // Si no se encuentra el proyecto, mostrar la página 404
  if (!project) {
    return notFound()
  }

  const { regionData } = useRegion()
  const { t } = useLanguage()

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    timeframe: "flexible",
    location: "",
    message: "",
    acceptTerms: false,
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormState((prev) => ({ ...prev, acceptTerms: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    console.log("Form submitted:", formState)

    // Simular envío exitoso
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12 mt-20">
        <Link
          href={`/proyecto/${project.id}`}
          className="inline-flex items-center text-accent hover:text-accent/80 mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al proyecto
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {isServiceRequest ? "Solicitar servicio" : "Solicitar un proyecto similar"}
            </h1>
            <p className="text-muted-foreground mb-8">
              {isServiceRequest ? (
                <>
                  Complete el siguiente formulario para solicitar nuestro servicio. Nos pondremos en contacto con usted
                  para discutir los detalles.
                </>
              ) : (
                <>
                  Complete el siguiente formulario para solicitar un proyecto inspirado en{" "}
                  <span className="font-medium text-foreground">{project.title}</span>. Nos pondremos en contacto con
                  usted para discutir los detalles.
                </>
              )}
            </p>

            {isSubmitted ? (
              <div className="bg-card rounded-lg shadow-md p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold mb-4">¡Solicitud enviada con éxito!</h2>
                <p className="text-muted-foreground mb-6">
                  Gracias por su interés en nuestros servicios. Hemos recibido su solicitud y nos pondremos en contacto
                  con usted en las próximas 24-48 horas para discutir los detalles de su proyecto.
                </p>
                <Link href="/">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Volver al inicio</Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo *</Label>
                    <Input id="name" name="name" value={formState.name} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input id="phone" name="phone" value={formState.phone} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Ubicación del proyecto *</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formState.location}
                      onChange={handleChange}
                      required
                      placeholder="Ciudad, País"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">Presupuesto estimado</Label>
                    <Input
                      id="budget"
                      name="budget"
                      value={formState.budget}
                      onChange={handleChange}
                      placeholder={`${regionData.currencySymbol}50,000 - ${regionData.currencySymbol}100,000`}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeframe">Plazo deseado</Label>
                    <Select
                      value={formState.timeframe}
                      onValueChange={(value) => handleSelectChange("timeframe", value)}
                    >
                      <SelectTrigger id="timeframe">
                        <SelectValue placeholder="Seleccione un plazo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">Urgente (1-3 meses)</SelectItem>
                        <SelectItem value="short">Corto plazo (3-6 meses)</SelectItem>
                        <SelectItem value="medium">Medio plazo (6-12 meses)</SelectItem>
                        <SelectItem value="long">Largo plazo (más de 12 meses)</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Detalles adicionales *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Describa su proyecto, necesidades específicas, preferencias de diseño, etc."
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formState.acceptTerms}
                    onCheckedChange={handleCheckboxChange}
                    required
                  />
                  <Label htmlFor="terms" className="text-sm leading-tight">
                    Acepto que mis datos sean procesados de acuerdo con la política de privacidad para recibir
                    comunicaciones relacionadas con mi solicitud. *
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  disabled={!formState.acceptTerms}
                >
                  Enviar solicitud
                </Button>
              </form>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-card rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">Proyecto de referencia</h3>

                <div className="relative h-48 w-full rounded-lg overflow-hidden mb-4">
                  <Image
                    src={project.images[0] || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <h4 className="font-semibold text-lg mb-2">{project.title}</h4>
                <p className="text-muted-foreground mb-4">{project.description}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Categoría:</span>
                    <span>
                      {project.category === "residential"
                        ? "Residencial"
                        : project.category === "commercial"
                          ? "Comercial"
                          : project.category === "renovation"
                            ? "Renovación"
                            : "Público"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ubicación:</span>
                    <span>{project.location}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Año:</span>
                    <span>{project.year}</span>
                  </div>
                </div>
              </div>

              <div className="bg-secondary/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">¿Por qué trabajar con nosotros?</h3>

                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span>Más de 10 años de experiencia en arquitectura</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span>Enfoque personalizado para cada cliente</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span>Diseños sostenibles y eficientes</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span>Atención al detalle en cada proyecto</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span>Comunicación clara durante todo el proceso</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <SocialFloatButtons />
    </main>
  )
}
