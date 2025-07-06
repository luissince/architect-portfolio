"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getCookie } from "cookies-next"

type Language = "es" | "en"

export type PromoModalContent = {
  title: string
  description: string
  image: string
  cta: string
}

type Translations = {
  [key: string]: {
    es: string | string[] | PromoModalContent
    en: string | string[] | PromoModalContent
  }
}

// Common translations
const translations: Translations = {
  // Navbar
  home: { es: "Inicio", en: "Home" },
  about: { es: "Sobre Mí", en: "About Me" },
  services: { es: "Servicios", en: "Services" },
  portfolio: { es: "Portafolio", en: "Portfolio" },
  products: { es: "Productos", en: "Products" },
  calculator: { es: "Calculadora", en: "Calculator" },
  contact: { es: "Contacto", en: "Contact" },

  // Hero
  heroTitle: { es: "Arquitectura que Inspira", en: "Architecture that Inspires" },
  heroSubtitle: { es: "Diseños innovadores que transforman espacios", en: "Innovative designs that transform spaces" },

  // About
  aboutTitle: { es: "Sobre Mí", en: "About Me" },
  aboutFullName: { es: "Ana Martínez", en: "Ana Martínez" },
  aboutProfession: { es: "Arquitecta", en: "Architect" },
  aboutEducation: { es: "Educación", en: "Education" },
  aboutEducationList: {
    es: [
      "Universidad Politécnica de Madrid",
      "Master en Diseño Sostenible",
      "Certificación en Diseño Biofílico",
    ], en: [
      "University of Madrid",
      "Master in Sustainable Design",
      "Certification in Biophilic Design",
    ]
  },
  aboutExperience: { es: "Experiencia", en: "Experience" },
  aboutExperienceList: {
    es: [
      "10+ años de experiencia",
      "50+ proyectos completados",
      "Premios de diseño internacional",
    ], en: [
      "10+ years of experience",
      "50+ completed projects",
      "International design awards",
    ]
  },
  aboutText: {
    es: "Soy una arquitecta apasionada con más de 10 años de experiencia en el diseño de espacios únicos y funcionales. Mi filosofía se basa en la armonía entre estética, funcionalidad y sostenibilidad, creando proyectos que reflejan la personalidad y necesidades de cada cliente.",
    en: "I am a passionate architect with over 10 years of experience designing unique and functional spaces. My philosophy is based on the harmony between aesthetics, functionality, and sustainability, creating projects that reflect each client's personality and needs.",
  },

  // Services
  servicesTitle: { es: "Servicios", en: "Services" },
  interiorDesign: { es: "Diseño de Interiores", en: "Interior Design" },
  architecturalPlans: { es: "Planos Arquitectónicos", en: "Architectural Plans" },
  consulting: { es: "Consultoría", en: "Consulting" },

  // Portfolio
  portfolioTitle: { es: "Portafolio", en: "Portfolio" },
  allProjects: { es: "Todos", en: "All" },
  residential: { es: "Residencial", en: "Residential" },
  commercial: { es: "Comercial", en: "Commercial" },
  renovation: { es: "Renovación", en: "Renovation" },
  public: { es: "Público", en: "Public" },

  // Products
  productsTitle: { es: "Productos", en: "Products" },
  furniture: { es: "Mobiliario", en: "Furniture" },
  decoration: { es: "Decoración", en: "Decoration" },
  materials: { es: "Materiales", en: "Materials" },

  // Calculator
  calculatorTitle: { es: "Calculadora de Precios", en: "Price Calculator" },
  squareMeters: { es: "Metros Cuadrados", en: "Square Meters" },
  projectType: { es: "Tipo de Proyecto", en: "Project Type" },
  calculate: { es: "Calcular", en: "Calculate" },
  estimatedPrice: { es: "Precio Estimado", en: "Estimated Price" },

  // Contact
  contactTitle: { 
    es: "Hablemos sobre su proyecto", 
    en: "Let's talk about your project"
  },
  contactDescription: { 
    es: "Estamos aquí para ayudarle a dar vida a sus ideas. Contáctenos para discutir su proyecto y descubrir cómo podemos colaborar para crear espacios excepcionales.", 
    en: "We are here to help you bring your ideas to life. Contact us to discuss your project and discover how we can collaborate to create exceptional spaces.",
  },
  contactFormTitle: { es: "Contacto", en: "Contact" },
  contactFormSubTitle: { 
    es: "Envíenos un mensaje y nos pondremos en contacto con usted lo antes posible.",
    en: "Send us a message and we will get back to you as soon as possible.",
  },
  name: { es: "Nombre", en: "Name" },
  email: { es: "Correo Electrónico", en: "Email" },
  message: { es: "Mensaje", en: "Message" },
  send: { es: "Enviar", en: "Send" },

  // Footer
  followUs: { es: "Síguenos", en: "Follow Us" },
  footerDescription: {
    es: "Creamos espacios que inspiran, transforman y perduran. Nuestro enfoque combina estética, funcionalidad y sostenibilidad para crear proyectos arquitectónicos excepcionales.",
    en: "We create spaces that inspire, transform and last. Our approach combines aesthetics, functionality, and sustainability to create exceptional architectural projects.",
  },
  businnesHours: { es: "Horario", en: "Business Hours" },
  allRightsReserved: { es: "Todos los derechos reservados", en: "All rights reserved" },

  // About tabs
  myStory: { es: "Mi Historia", en: "My Story" },
  achievements: { es: "Logros", en: "Achievements" },
  background: { es: "Formación", en: "Background" },

  // Region specific
  officeLocation: { es: "Ubicación de la Oficina", en: "Office Location" },
  contactPhone: { es: "Teléfono de Contacto", en: "Contact Phone" },
  emailAddress: { es: "Dirección de Correo", en: "Email Address" },
  localCurrency: { es: "Moneda Local", en: "Local Currency" },

  // Promo modal
  promoModal: {
    es: 
      {
        title: "Oferta Especial para Perú",
        description: "Obtén un 20% de descuento en tu primera consulta arquitectónica. Válido hasta fin de mes.",
        image: "/placeholder.svg?height=300&width=500",
        cta: "Aprovechar oferta",
      }
    ,
    en: 
      {
        title: "Promoción Exclusiva para México",
        description: "Diseño de interiores con 15% de descuento para proyectos residenciales.",
        image: "/placeholder.svg?height=300&width=500",
        cta: "Ver detalles",
      }
    ,
  }
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string | string[] | PromoModalContent
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")

  useEffect(() => {
    // Obtener el idioma del usuario desde la cookie establecida por el middleware
    const userLocale = getCookie("user-locale")?.toString() as Language
    if (userLocale && (userLocale === "es" || userLocale === "en")) {
      setLanguage(userLocale)
    }
  }, [])

  const t = (key: string): string | string[] | PromoModalContent => {
    if (!translations[key]) {
      console.warn(`Translation key "${key}" not found.`)
      return key
    }
    return translations[key][language]
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
