"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, notFound, useRouter } from "next/navigation"
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
import { Service, useLanguage } from "@/context/language-context"
import SocialFloatButtons from "@/components/social-float-buttons"

export default function RequestProjectPage() {
  const router = useRouter()
  const { t, language } = useLanguage()
  // const params = useParams()
  // const projectId = params?.id as string

  const [dataService, setDataService] = useState<Service | null>(null)

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "")
    const serviceId = searchParams.get("serviceId") as string
    const service = (t("servicesList") as Service[]).find((s) => s.id.toString() === serviceId);
    setDataService(service!)
  }, [language])

  const { regionData } = useRegion()

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

  if (!mounted) {
    return null
  }

  if (!dataService) {
    return notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12 mt-20">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-accent hover:text-accent/80 mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("goBack").toString()}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {/* {isServiceRequest ? "Solicitar servicio" : "Solicitar un proyecto similar"} */}
              {language === "es" ? "Solicitar servicio de " + dataService?.title : "Request service" + dataService?.title}
            </h1>
            <p className="text-muted-foreground mb-8">
              {language === "es" ?
                "Complete el siguiente formulario para solicitar nuestro servicio. Nos pondremos en contacto con usted para discutir los detalles." :
                "Complete the following form to request our service. We will contact you to discuss the details."}
              {/* {isServiceRequest ? (
                <>
                  {language === "es" ? "Complete el siguiente formulario para solicitar nuestro servicio. Nos pondremos en contacto con usted para discutir los detalles." : "Complete the following form to request our service. We will contact you to discuss the details."}
                </>
              ) : (
                <>
                  {language === "es" ? "Complete el siguiente formulario para solicitar un proyecto inspirado en" : "Complete the following form to request a project inspired by"} <span className="font-medium text-foreground">{project.title}</span>. {language === "es" ? "Nos pondremos en contacto con usted para discutir los detalles." : "We will contact you to discuss the details."}
                </>
              )} */}
            </p>

            {isSubmitted ? (
              <div className="bg-card rounded-lg shadow-md p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold mb-4"> {language === "es" ? "¡Solicitud enviada con éxito!" : "Request submitted successfully!"}</h2>
                <p className="text-muted-foreground mb-6">
                  {language === "es" ? "Gracias por su interés en nuestros servicios. Hemos recibido su solicitud y nos pondremos en contacto con usted en las próximas 24-48 horas para discutir los detalles de su proyecto." : "Thank you for your interest in our services. We have received your request and will contact you in the next 24-48 hours to discuss the details of your project."}
                </p>
                <Link href="/">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground"> {language === "es" ? "Volver al inicio" : "Back to home"}</Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("fullName").toString()} *</Label>
                    <Input id="name" name="name" value={formState.name} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{t("email").toString()} *</Label>
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
                    <Label htmlFor="phone">{t("phone").toString()} *</Label>
                    <Input id="phone" name="phone" value={formState.phone} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">{t("location").toString()} *</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formState.location}
                      onChange={handleChange}
                      required
                      placeholder={language === "es" ? "Ciudad, País" : "City, Country"}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">{t("budget").toString()}</Label>
                    <Input
                      id="budget"
                      name="budget"
                      value={formState.budget}
                      onChange={handleChange}
                      placeholder={`${regionData.currencySymbol}50,000 - ${regionData.currencySymbol}100,000`}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeframe">{t("timeframe").toString()}</Label>
                    <Select
                      value={formState.timeframe}
                      onValueChange={(value) => handleSelectChange("timeframe", value)}
                    >
                      <SelectTrigger id="timeframe">
                        <SelectValue placeholder="Seleccione un plazo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">{language === "es" ? "Urgente (1-3 meses)" : "Urgent (1-3 months)"}</SelectItem>
                        <SelectItem value="short">{language === "es" ? "Corto plazo (3-6 meses)" : "Short (3-6 months)"}</SelectItem>
                        <SelectItem value="medium">{language === "es" ? "Medio plazo (6-12 meses)" : "Medium (6-12 months)"}</SelectItem>
                        <SelectItem value="long">{language === "es" ? "Largo plazo (más de 12 meses)" : "Long (more than 12 months)"}</SelectItem>
                        <SelectItem value="flexible">{language === "es" ? "Flexible" : "Flexible"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t("detailAditional").toString()} *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder={language === "es" ? "Describa su proyecto, necesidades específicas, preferencias de diseño, etc." : "Describe your project, specific needs, design preferences, etc."}
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
                    {t("acceptTerms").toString()}
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  disabled={!formState.acceptTerms}
                >
                  {t("sendRequest").toString()}
                </Button>
              </form>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-card rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">{language === "es" ? "Proyecto de referencia" : "Project reference"}</h3>

                <div className="relative h-48 w-full rounded-lg overflow-hidden mb-4">
                  <Image
                    src={dataService?.image || "/placeholder.svg"}
                    alt={dataService?.title!}
                    fill
                    className="object-cover"
                  />
                </div>

                <h4 className="font-semibold text-lg mb-2">{dataService?.title}</h4>
                <p className="text-muted-foreground mb-4">{dataService?.description}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex flex-col">
                    {/* <span className="text-muted-foreground">{language === "es" ? "Categoría:" : "Category:"}</span> */}
                    {/* <span>
                      {project.category === "residential"
                        ? "Residencial"
                        : project.category === "commercial"
                          ? "Comercial"
                          : project.category === "renovation"
                            ? "Renovación"
                            : "Público"}
                    </span> */}
                  </div>

                  {/* <div className="flex justify-between">
                    <span className="text-muted-foreground">{language === "es" ? "Ubicación:" : "Location:"}</span>
                    <span>{project.location}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{language === "es" ? "Año:" : "Year:"}</span>
                    <span>{project.year}</span>
                  </div> */}
                </div>
              </div>

              <div className="bg-secondary/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4"> {language === "es" ? "¿Por qué trabajar con nosotros?" : "Why work with us?"}</h3>

                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span> {language === "es" ? "Más de 10 años de experiencia en arquitectura" : "More than 10 years of experience in architecture"}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span> {language === "es" ? "Enfoque personalizado para cada cliente" : "Customized focus for each client"}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span> {language === "es" ? "Diseños sostenibles y eficientes" : "Sustainable and efficient designs"}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span> {language === "es" ? "Atención al detalle en cada proyecto" : "Attention to detail in each project"}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span> {language === "es" ? "Comunicación clara durante todo el proceso" : "Clear communication throughout the process"}</span>
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
