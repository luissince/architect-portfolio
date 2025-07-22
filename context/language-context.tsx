"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getCookie } from "cookies-next"
import { es } from "date-fns/locale"

type Language = "es" | "en"

export type AboutPersonal = {
  period?: string
  year?: string
  title?: string
  company?: string
  description?: string
  institution?: string
}

export type PromoModalContent = {
  title: string
  description: string
  image: string
  cta: string
}

type Translations = {
  [key: string]: {
    es: string | string[] | PromoModalContent | AboutPersonal[]
    en: string | string[] | PromoModalContent | AboutPersonal[]
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
  aboutFullName: { es: "Sheila Ramos Díaz", en: "Sheila Ramos Díaz" },
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
      "7+ años de experiencia",
      "50+ proyectos completados",
      "Certificación en Diseño Arquitectónico",
    ], en: [
      "7+ years of experience",
      "50+ completed projects",
      "Certification in Architecture Design",
    ]
  },
  aboutText: {
    es: "Soy arquitecta Apasionada con más de 7 años de experiencia en el diseño y desarrollo de espacios únicos, funcionales y sostenibles. Mi enfoque combina la estética con la funcionalidad, priorizando siempre las necesidades y estilo de vida de cada cliente. Creo firmemente en una arquitectura que inspire, respete el entorno y mejore la calidad de vida. Cada proyecto que desarrollo es el resultado de un proceso personalizado, donde escucho, analizo y transformo ideas en espacios que cuentan historias, transmiten identidad y generan bienestar.",
    en: "I am a passionate architect with over 7 years of experience in designing and developing unique, functional, and sustainable spaces. My approach combines aesthetics with functionality, always prioritizing the needs and lifestyle of each client. I firmly believe in architecture that inspires, respects the environment, and enhances quality of life. Every project I develop is the result of a personalized process, where I listen, analyze, and transform ideas into spaces that tell stories, convey identity, and promote well-being."
  },
  aboutPersonalTabOne: {
    es: "Mi historia",
    en: "My Story"
  },
  aboutPersonalTabTwo: {
    es: "Logros",
    en: "Achievements"
  },
  aboutPersonalTabThree: {
    es: "Formación",
    en: "Background"
  },
  aboutPersonalTitle: {
    es: "Mi camino en la arquitectura",
    en: "My journey in architecture"
  },
  aboutPersonalStory: {
    es: [
      `Desde niña me fascinaban los espacios: cómo una habitación podía hacerte sentir
      cómodo, inspirado o en casa. Esa curiosidad fue creciendo hasta convertirse en
      vocación. En 2018 me gradué como arquitecta en la Universidad César Vallejo, con una
      tesis enfocada en cómo el diseño puede mejorar la enseñanza y el aprendizaje en
      entornos educativos.`,

      `Mi carrera inició con fuerza: en los primeros años trabajé en MC Architects, donde tuve
      la oportunidad de participar en proyectos de vivienda y comercio en distritos clave de
      Lima como San Isidro y Miraflores. Fue ahí donde descubrí mi pasión por remodelar
      espacios comerciales y ver cómo una idea bien ejecutada podía transformar por
      completo la experiencia de los usuarios y clientes. `,

      `Luego, mi trabajo me llevó al sector salud. En Inversiones Megavisión, lideré el diseño
      de centros médicos, policlínicos y salas de tomografía, enfrentándome al reto de
      combinar funcionalidad, normativa técnica y sensibilidad humana. Fue una etapa
      intensa que fortaleció mi disciplina y compromiso con la excelencia técnica.`,

      `En los últimos años, como arquitecta independiente en DECORGANIKA.SKS, consolidé
      mi experiencia: más de 50 proyectos desarrollados en Cajamarca y Lima, desde
      viviendas familiares hasta restobares, hoteles, spas, clínicas y departamentos Airbnb.
      Cada proyecto fue una nueva historia, una nueva oportunidad de interpretar lo que mis
      clientes soñaban y convertirlo en un espacio funcional, estético y con identidad.`
    ],
    en: [
      `Since I was a child, I was fascinated by spaces—how a room could make you feel comfortable, inspired, or at home. 
      That curiosity grew into a calling. In 2018, I graduated as an architect from César Vallejo University, 
      with a thesis focused on how design can enhance teaching and learning in educational environments.`,

      `My career started off strong: in the first few years, I worked at MC Architects, 
      where I had the opportunity to participate in residential and commercial projects in key districts 
      of Lima such as San Isidro and Miraflores. 
      It was there that I discovered my passion for remodeling commercial spaces and saw how a well-executed 
      idea could completely transform the experience of users and customers.`,

      `Later, my work led me to the healthcare sector. At Inversiones Megavisión, 
      I led the design of medical centers, polyclinics, and tomography rooms, facing the challenge of combining functionality, 
      technical regulations, and human sensitivity. It was an intense stage that 
      strengthened my discipline and commitment to technical excellence.`,

      `In recent years, as an independent architect at DECORGANIKA.SKS, I have consolidated my experience: over 50 projects 
      developed in Cajamarca and Lima, ranging from family homes to restobars, hotels, spas, clinics, and Airbnb apartments. 
      Each project was a new story, a new opportunity to interpret what my clients dreamed of and turn it into a functional, 
      aesthetic space with identity.`
    ]
  },
  aboutAchievementsTitle: {
    es: "Reconocimientos y premios",
    en: "Achievements and Awards"
  },
  aboutAchievements: {
    es: [
      {
        year: "2023",
        title: "Premio Nacional de Arquitectura Sostenible",
        description: `Más de 50 proyectos arquitectónicos liderados en Lima y Cajamarca, incluyendo viviendas, espacios comerciales, restaurantes, hoteles, spas, clínicas y centros dentales.`,
      },
      {
        year: "2021",
        title: "Finalista en los World Architecture Awards",
        description: `Participación en el diseño, ejecución y supervisión de remodelaciones comerciales como:
        Restobar “Wing Star Sport Bar” (Miraflores)
        Hotel y Restobar “Huerta de Hierro” (Miraflores)
        Frito Restobar y Dojo Restobar (Cajamarca y Lima)`,
      },
      {
        year: "2019",
        title: "Premio a la Innovación en Diseño Interior",
        description: `Trabajo con normativas técnicas especializadas, como la Norma Técnica de Salud del MINSA, en proyectos hospitalarios.`,
      },
      {
        year: "2017",
        title: "Reconocimiento por Arquitectura Bioclimática",
        description: `Capacidad demostrada en todas las etapas del diseño: desde el asesoramiento conceptual hasta la entrega final.`
      },
    ],
    en: [
      {
        year: "2023",
        title: "National Sustainable Architecture Award",
        description: `Led over 50 architectural projects in Lima and Cajamarca, including homes, commercial spaces, restaurants, hotels, spas, clinics, and dental centers.`,
      },
      {
        year: "2021",
        title: "Finalist at the World Architecture Awards",
        description: `Participated in the design, execution, and supervision of commercial renovations such as:
        Wing Star Sport Bar (Miraflores)
        Huerta de Hierro Hotel & Restobar (Miraflores)
        Frito Restobar and Dojo Restobar (Cajamarca and Lima)`,
      },
      {
        year: "2019",
        title: "Interior Design Innovation Award",
        description: `Worked with specialized technical regulations, such as the MINSA Health Technical Standard, in healthcare facility projects.`,
      },
      {
        year: "2017",
        title: "Recognition for Bioclimatic Architecture",
        description: `Demonstrated ability across all design stages, from conceptual advising to final project delivery.`
      },
    ]
  },

  aboutEducationsTitle: {
    es: "Educación",
    en: "Education"
  },
  aboutEducations: {
    es: [
      {
        year: "2018",
        title: "Arquitecta Colegiada",
        institution: "Universidad César Vallejo – Facultad de Arquitectura",
      },
      {
        year: "2023",
        title: "Certificación Modulo I “Saneamiento Físico Legal de Predios Urbanos”",
        institution: "Colegio de Arquitectos del Perú",
      },
      {
        year: "2023",
        title: "Certificación Modulo I “Diseño y construcción en edificaciones -BIM”",
        institution: "Colegio de Arquitectos del Perú",
      },
      {
        year: "2023",
        title: "Certificación Modulo II “Diseño y construcción en edificaciones -BIM”",
        institution: "Colegio de Arquitectos del Perú",
      },
    ],
    en: [
      {
        year: "2018",
        title: "Licensed Architect",
        institution: "César Vallejo University – Faculty of Architecture",
      },
      {
        year: "2023",
        title: "Certification Module I: Legal Physical Sanitation of Urban Properties",
        institution: "College of Architects of Peru",
      },
      {
        year: "2023",
        title: "Certification Module I: Design and Construction in Buildings – BIM",
        institution: "College of Architects of Peru",
      },
      {
        year: "2023",
        title: "Certification Module II: Design and Construction in Buildings – BIM",
        institution: "College of Architects of Peru",
      },
    ]
  },

  aboutExperiencesTitle: {
    es: "Experiencia Profesional",
    en: "Professional Experience"
  },
  aboutExperiences: {
    es: [
      {
        period: "2019-2020",
        title: "Arquitecta Consultora y Supervisora Técnica",
        company: "INVERSIONES MEGAVISIÓN S.A.C",
        description: "Diseño de centros médicos y áreas especializadas",
      },
      {
        period: "2018-2019",
        title: "Arquitecta Consultora y Supervisora de Proyecto",
        company: "MC ARCHITECTS",
        description: "Diseño arquitectónico, regularización de planos y documentación normativa",
      },
    ],
    en: [
      {
        period: "2019–2020",
        title: "Architect Consultant and Technical Supervisor",
        company: "INVERSIONES MEGAVISIÓN S.A.C",
        description: "Design of medical centers and specialized areas",
      },
      {
        period: "2018–2019",
        title: "Architect Consultant and Project Supervisor",
        company: "MC ARCHITECTS",
        description: "Architectural design, plan regularization, and regulatory documentation",
      },
    ]
  },

  // Services
  servicesTitle: { es: "Servicios", en: "Services" },
  interiorDesign: {
    es: "Diseño y Remodelación de Interiores",
    en: "Interior Design and Remodeling"
  },
  architecturalPlans: { es: "Planos Arquitectónicos", en: "Architectural Plans" },
  consulting: { es: "Consultoría", en: "Consulting" },
  furnitureDesign: { es: "Diseño de Mobiliario", en: "Furniture Design" },
  artForYourHome: { es: "Arte para tu hogar", en: "Art for your home" },
  buttonDetails: { es: "Ver más detalles", en: "View Details" },
  professionalArchitecture: { es: "Servicio profesional de arquitectura", en: "Professional Architecture Service" },
  benefits: { es: "Beneficios:", en: "Benefits:" },
  buttonRequest: { es: "Solicitar este servicio", en: "Request this service" },

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
  t: (key: string) => string | string[] | PromoModalContent | AboutPersonal[]
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

  const t = (key: string): string | string[] | PromoModalContent | AboutPersonal[] => {
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
