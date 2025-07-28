"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getCookie } from "cookies-next"
import { Compass, Home, Lightbulb } from "lucide-react"
import { GiFamilyHouse } from "react-icons/gi"
import { MdChair } from "react-icons/md"

export type Language = "es" | "en"

export type Service = {
  id: number
  icon: ReactNode
  title: string
  description: string
  fullDescription: string
  benefits: string[]
  image: string
}

export type CommentReply = {
  id: string
  author: {
    name: string
    initials: string
    isAdmin?: boolean
  }
  content: string
  date: Date
  likes: number
  isLiked: boolean
}

export type Comment = {
  id: string
  author: {
    name: string
    initials: string
    isAdmin?: boolean
  }
  content: string
  date: Date
  likes: number
  isLiked: boolean
  isQuestion: boolean
  replies?: CommentReply[]
}

export type Project = {
  id: number
  title: string
  description: string
  fullDescription: string
  category: string
  location: string
  year: string
  images: string[]
  video: string
  model3d: string
  client: string
  architect: string
  area: string
  duration: string
  services: string[]
  features: string[]
  comments: Comment[]
}

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
    es: string | string[] | PromoModalContent | AboutPersonal[] | Service[] | Project[]
    en: string | string[] | PromoModalContent | AboutPersonal[] | Service[] | Project[]
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
  buttonDetails: { es: "Ver más detalles", en: "View Details" },
  professionalArchitecture: { es: "Servicio profesional de arquitectura", en: "Professional Architecture Service" },
  benefits: { es: "Beneficios:", en: "Benefits:" },
  buttonRequest: { es: "Solicitar este servicio", en: "Request this service" },
  servicesList: {
    es: [
      {
        id: 1,
        icon: <Home className="h-10 w-10 text-accent" />,
        title: "Diseño y Remodelación de Interiores",
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
        title: "Planos Arquitectónicos",
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
        title: "Consultoría",
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
        title: "Diseño de Mobiliario",
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
        title: "Arte para tu hogar",
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
    ],
    en: [
      {
        id: 1,
        icon: <Home className="h-10 w-10 text-accent" />,
        title: "Interior Design and Renovation",
        description:
          "We transform interior spaces to create functional and aesthetically pleasing environments that reflect your personality and lifestyle.",
        fullDescription:
          "Our interior design service covers everything from the initial concept to the final implementation. We work closely with each client to understand their needs, preferences, and lifestyle, creating spaces that are not only beautiful but also functional and personalized. We use the latest design trends, sustainable materials, and innovative solutions to transform any space into an inspiring environment that enhances quality of life.",
        benefits: [
          "Custom design tailored to your needs and style",
          "Selection of materials, furniture, and accessories",
          "Space and functionality optimization",
          "Lighting and color palette advice",
          "Supervision of design implementation",
        ],
        image: "/services1.jpeg?height=600&width=800",
      },
      {
        id: 2,
        icon: <Compass className="h-10 w-10 text-accent" />,
        title: "Architectural Plans",
        description:
          "We develop detailed and accurate architectural plans for residential, commercial, and institutional projects.",
        fullDescription:
          "Our architectural plans are the result of a meticulous process that combines creativity, technical precision, and regulatory compliance. We use advanced design software to create detailed representations that serve as a clear guide for construction. Each plan is developed considering structural, functional, aesthetic, and sustainable aspects, ensuring the final project meets all expectations and requirements.",
        benefits: [
          "Detailed and scaled plans with technical specifications",
          "Designs compliant with building codes and regulations",
          "3D representations and realistic visualizations",
          "Complete documentation for building permits",
          "Consulting throughout the construction process",
        ],
        image: "/services2.jpeg?height=600&width=800",
      },
      {
        id: 3,
        icon: <Lightbulb className="h-10 w-10 text-accent" />,
        title: "Consulting",
        description:
          "We offer expert advice at all stages of your project, from the initial concept to completion.",
        fullDescription:
          "Our architectural consulting service provides professional guidance to help you make informed decisions at every stage of your project. Whether you are considering a renovation, new construction, or just need advice on specific aspects, our team of experts will provide practical and creative solutions. We analyze each situation from multiple perspectives, considering factors such as budget, timeline, sustainability, and long-term value.",
        benefits: [
          "Feasibility studies and site analysis",
          "Advice on materials and technology selection",
          "Budget and resource optimization",
          "Solutions for energy efficiency and sustainability",
          "Project management and contractor coordination",
        ],
        image: "/services3.jpeg?height=600&width=800",
      },
      {
        id: 4,
        icon: <GiFamilyHouse className="h-10 w-10 text-accent" />,
        title: "Furniture Design",
        description:
          "Furniture design, both indoors and outdoors, is an art that blends functionality and aesthetics, transforming spaces into true homes.",
        fullDescription:
          "Furniture design, for both interior and exterior settings, is an art that combines functionality and aesthetics, transforming spaces into true homes. Indoors, each piece is carefully selected to complement the lifestyle of the inhabitants, from comfortable sofas that invite relaxation to dining tables that encourage family bonding. The materials used—such as natural wood, metal, and textiles—not only provide beauty but also durability and warmth. On the other hand, outdoor furniture design aims to create a sanctuary in nature, where furnishings withstand the elements without losing their appeal. Chairs, tables, and loungers are crafted for outdoor enjoyment, offering comfort and style to gardens, terraces, and patios. In every project, creativity is fused with ergonomics, ensuring each piece is not only visually attractive but also enhances the quality of life. This holistic approach to furniture design seeks to create harmonious spaces that reflect the owner's personality and adapt to daily needs.",
        benefits: [
          "Feasibility studies and site analysis",
          "Advice on materials and technology selection",
          "Budget and resource optimization",
          "Solutions for energy efficiency and sustainability",
          "Project management and contractor coordination",
        ],
        image: "/services4.jpeg?height=600&width=800",
      },
      {
        id: 5,
        icon: <MdChair className="h-10 w-10 text-accent" />,
        title: "Art for Your Home",
        description:
          "In the world of art, we offer a wide range of options to transform and beautify your home.",
        fullDescription:
          `In the world of art, we offer a wide range of options to transform and beautify your home. Our collection includes unique sculptures that add a touch of elegance and character to any space. Each piece is carefully crafted, reflecting the creativity and talent of the artists, allowing every corner of your home to tell a story through three-dimensional art.
        In addition, we offer a selection of paintings in various styles, from contemporary works to timeless classics. These pieces not only decorate your walls but also create a cozy and appealing atmosphere, inviting contemplation and dialogue. Each work is designed to complement your home's décor, providing a focal point that captures the attention of your visitors.
        Furthermore, we provide a variety of creative supplies for those who wish to explore their own artistic talents. From canvases of different sizes to paints, brushes, and specialized tools, we have everything you need to unleash your creativity. Whether you're an experienced artist or an enthusiastic beginner, our high-quality materials will inspire you to create masterpieces in the comfort of your home.
        In short, our offerings range from sculptures and paintings that enhance the aesthetics of your home to artistic supplies that encourage creativity. Bring art into your life and transform your home into a space full of inspiration and beauty.`,
        benefits: [
          "Feasibility studies and site analysis",
          "Advice on materials and technology selection",
          "Budget and resource optimization",
          "Solutions for energy efficiency and sustainability",
          "Project management and contractor coordination",
        ],
        image: "/services5.jpeg?height=600&width=800",
      },
    ]
  },

  // Portfolio
  portfolioTitle: { es: "Portafolio", en: "Portfolio" },
  allProjects: { es: "Todos", en: "All" },
  residential: { es: "Residencial", en: "Residential" },
  commercial: { es: "Comercial", en: "Commercial" },
  renovation: { es: "Renovación", en: "Renovation" },
  public: { es: "Público", en: "Public" },
  projectsList: {
    es: [
      {
        id: 1,
        title: "Casa Moderna Pinar",
        description:
          "Residencia minimalista con amplios espacios abiertos y luz natural. Diseñada para una familia joven que buscaba un espacio contemporáneo pero acogedor, esta casa incorpora materiales sostenibles y un diseño bioclimático que reduce el consumo energético.",
        fullDescription:
          "Esta residencia minimalista fue diseñada para una familia joven que buscaba un espacio contemporáneo pero acogedor. El proyecto se desarrolló en un terreno de 800m² con orientación norte-sur, lo que permitió aprovechar al máximo la luz natural durante todo el día.\n" +
          "La casa se estructura en dos volúmenes principales conectados por un puente acristalado que funciona como galería y espacio de transición. El volumen principal alberga las áreas sociales en planta baja (salón, comedor y cocina integrada) y los dormitorios en la planta superior. El segundo volumen contiene un estudio, gimnasio y zona de invitados.\n" +
          "Los materiales utilizados incluyen hormigón visto, madera de roble y grandes superficies acristaladas con carpintería de aluminio de alta eficiencia térmica. La sostenibilidad fue un factor clave en el diseño, incorporando paneles solares, sistema de recolección de agua de lluvia y aislamiento térmico de alto rendimiento.",

        category: "residential",
        location: "Madrid, España",
        year: "2022",
        images: [
          // "/ima<gen2.jpg",
          // "/imagen2.jpg",
          // "/imagen2.jpg",>
        ],
        video: "/CASANOEL.mp4",
        model3d: "/house.glb",
        client: "Familia Rodríguez",
        architect: "Ana Martínez",
        area: "320 m²",
        duration: "14 meses",
        services: ["Diseño arquitectónico", "Diseño de interiores", "Supervisión de obra"],
        features: [
          "Diseño bioclimático",
          "Eficiencia energética",
          "Domótica integrada",
          "Jardín sostenible",
          "Piscina de agua salada",
        ],
        comments: [
          {
            id: "1",
            author: {
              name: "Juan Pérez",
              initials: "JP",
            },
            content:
              "Me encanta el diseño bioclimático de esta casa. ¿Podrían compartir más detalles sobre el sistema de recolección de agua de lluvia? Estoy considerando implementar algo similar en mi proyecto.",
            date: new Date("2023-11-05"),
            likes: 5,
            isLiked: false,
            isQuestion: true,
            replies: [
              {
                id: "1-1",
                author: {
                  name: "Ana Martínez",
                  initials: "AM",
                  isAdmin: true,
                },
                content:
                  "Hola Juan, gracias por tu interés. El sistema de recolección de agua de lluvia incluye canalones especiales en el techo que dirigen el agua a un tanque subterráneo de 5000 litros. Esta agua se filtra y se utiliza para el riego del jardín y los inodoros, reduciendo el consumo de agua potable en aproximadamente un 40%. Si necesitas más información, no dudes en contactarnos directamente.",
                date: new Date("2023-11-06"),
                likes: 3,
                isLiked: false,
              },
            ],
          },
          {
            id: "2",
            author: {
              name: "Laura Gómez",
              initials: "LG",
            },
            content:
              "Tuve la oportunidad de visitar esta casa durante una jornada de puertas abiertas y quedé impresionada. La integración de los espacios interiores con el jardín es perfecta, y la luz natural que entra por los ventanales crea una atmósfera muy acogedora. Definitivamente un gran trabajo.",
            date: new Date("2023-10-20"),
            likes: 8,
            isLiked: false,
            isQuestion: false,
          },
        ],
      },
      {
        id: 2,
        title: "Oficinas Creativas Nexus",
        description:
          "Espacio de trabajo colaborativo diseñado para fomentar la creatividad y el bienestar. Este proyecto transforma un antiguo almacén industrial en un entorno de trabajo dinámico con áreas flexibles, zonas de descanso y elementos naturales integrados.",
        fullDescription:
          "Esta residencia minimalista fue diseñada para una familia joven que buscaba un espacio contemporáneo pero acogedor. El proyecto se desarrolló en un terreno de 800m² con orientación norte-sur, lo que permitió aprovechar al máximo la luz natural durante todo el día.\n" +
          "La casa se estructura en dos volúmenes principales conectados por un puente acristalado que funciona como galería y espacio de transición. El volumen principal alberga las áreas sociales en planta baja (salón, comedor y cocina integrada) y los dormitorios en la planta superior. El segundo volumen contiene un estudio, gimnasio y zona de invitados.\n" +
          "Los materiales utilizados incluyen hormigón visto, madera de roble y grandes superficies acristaladas con carpintería de aluminio de alta eficiencia térmica. La sostenibilidad fue un factor clave en el diseño, incorporando paneles solares, sistema de recolección de agua de lluvia y aislamiento térmico de alto rendimiento.",

        category: "commercial",
        location: "Barcelona, España",
        year: "2021",
        images: [
          // "/imagen2.jpg",
          // "/imagen2.jpg",
          // "/imagen2.jpg",
        ],
        video: "/FRITO.mp4",
        model3d: "/house.glb",
        client: "Nexus Innovations",
        architect: "Ana Martínez",
        area: "320 m²",
        duration: "14 meses",
        services: ["Diseño arquitectónico", "Diseño de interiores", "Supervisión de obra"],
        features: [
          "Diseño bioclimático",
          "Eficiencia energética",
          "Domótica integrada",
          "Jardín sostenible",
          "Piscina de agua salada",
        ],
        comments: [
          {
            id: "1",
            author: {
              name: "Juan Pérez",
              initials: "JP",
            },
            content:
              "Me encanta el diseño bioclimático de esta casa. ¿Podrían compartir más detalles sobre el sistema de recolección de agua de lluvia? Estoy considerando implementar algo similar en mi proyecto.",
            date: new Date("2023-11-05"),
            likes: 5,
            isLiked: false,
            isQuestion: true,
            replies: [
              {
                id: "1-1",
                author: {
                  name: "Ana Martínez",
                  initials: "AM",
                  isAdmin: true,
                },
                content:
                  "Hola Juan, gracias por tu interés. El sistema de recolección de agua de lluvia incluye canalones especiales en el techo que dirigen el agua a un tanque subterráneo de 5000 litros. Esta agua se filtra y se utiliza para el riego del jardín y los inodoros, reduciendo el consumo de agua potable en aproximadamente un 40%. Si necesitas más información, no dudes en contactarnos directamente.",
                date: new Date("2023-11-06"),
                likes: 3,
                isLiked: false,
              },
            ],
          },
          {
            id: "2",
            author: {
              name: "Laura Gómez",
              initials: "LG",
            },
            content:
              "Tuve la oportunidad de visitar esta casa durante una jornada de puertas abiertas y quedé impresionada. La integración de los espacios interiores con el jardín es perfecta, y la luz natural que entra por los ventanales crea una atmósfera muy acogedora. Definitivamente un gran trabajo.",
            date: new Date("2023-10-20"),
            likes: 8,
            isLiked: false,
            isQuestion: false,
          },
        ],
      },
      {
        id: 3,
        title: "Restaurante Botánico",
        description:
          "Concepto gastronómico donde la naturaleza es protagonista. El diseño integra un jardín vertical interior, materiales naturales y una paleta de colores terrosos para crear una experiencia inmersiva que complementa la propuesta culinaria orgánica del restaurante.",
        fullDescription:
          "Esta residencia minimalista fue diseñada para una familia joven que buscaba un espacio contemporáneo pero acogedor. El proyecto se desarrolló en un terreno de 800m² con orientación norte-sur, lo que permitió aprovechar al máximo la luz natural durante todo el día.\n" +
          "La casa se estructura en dos volúmenes principales conectados por un puente acristalado que funciona como galería y espacio de transición. El volumen principal alberga las áreas sociales en planta baja (salón, comedor y cocina integrada) y los dormitorios en la planta superior. El segundo volumen contiene un estudio, gimnasio y zona de invitados.\n" +
          "Los materiales utilizados incluyen hormigón visto, madera de roble y grandes superficies acristaladas con carpintería de aluminio de alta eficiencia térmica. La sostenibilidad fue un factor clave en el diseño, incorporando paneles solares, sistema de recolección de agua de lluvia y aislamiento térmico de alto rendimiento.",

        category: "commercial",
        location: "Valencia, España",
        year: "2023",
        images: [
          // "/imagen2.jpg",
          // "/imagen2.jpg",
          // "/imagen2.jpg",
        ],
        video: "/LESLY.mp4",
        model3d: "/house.glb",
        client: "Grupo Gastronómico Mediterráneo",
        architect: "Ana Martínez",
        area: "320 m²",
        duration: "14 meses",
        services: ["Diseño arquitectónico", "Diseño de interiores", "Supervisión de obra"],
        features: [
          "Diseño bioclimático",
          "Eficiencia energética",
          "Domótica integrada",
          "Jardín sostenible",
          "Piscina de agua salada",
        ],
        comments: [
          {
            id: "1",
            author: {
              name: "Juan Pérez",
              initials: "JP",
            },
            content:
              "Me encanta el diseño bioclimático de esta casa. ¿Podrían compartir más detalles sobre el sistema de recolección de agua de lluvia? Estoy considerando implementar algo similar en mi proyecto.",
            date: new Date("2023-11-05"),
            likes: 5,
            isLiked: false,
            isQuestion: true,
            replies: [
              {
                id: "1-1",
                author: {
                  name: "Ana Martínez",
                  initials: "AM",
                  isAdmin: true,
                },
                content:
                  "Hola Juan, gracias por tu interés. El sistema de recolección de agua de lluvia incluye canalones especiales en el techo que dirigen el agua a un tanque subterráneo de 5000 litros. Esta agua se filtra y se utiliza para el riego del jardín y los inodoros, reduciendo el consumo de agua potable en aproximadamente un 40%. Si necesitas más información, no dudes en contactarnos directamente.",
                date: new Date("2023-11-06"),
                likes: 3,
                isLiked: false,
              },
            ],
          },
          {
            id: "2",
            author: {
              name: "Laura Gómez",
              initials: "LG",
            },
            content:
              "Tuve la oportunidad de visitar esta casa durante una jornada de puertas abiertas y quedé impresionada. La integración de los espacios interiores con el jardín es perfecta, y la luz natural que entra por los ventanales crea una atmósfera muy acogedora. Definitivamente un gran trabajo.",
            date: new Date("2023-10-20"),
            likes: 8,
            isLiked: false,
            isQuestion: false,
          },
        ],
      },
      {
        id: 4,
        title: "Renovación Apartamento Histórico",
        description:
          "Rehabilitación de un apartamento en un edificio histórico del siglo XIX, preservando elementos arquitectónicos originales mientras se incorporan comodidades modernas. El proyecto equilibra el respeto por el patrimonio con las necesidades contemporáneas.",
        fullDescription:
          "Esta residencia minimalista fue diseñada para una familia joven que buscaba un espacio contemporáneo pero acogedor. El proyecto se desarrolló en un terreno de 800m² con orientación norte-sur, lo que permitió aprovechar al máximo la luz natural durante todo el día.\n" +
          "La casa se estructura en dos volúmenes principales conectados por un puente acristalado que funciona como galería y espacio de transición. El volumen principal alberga las áreas sociales en planta baja (salón, comedor y cocina integrada) y los dormitorios en la planta superior. El segundo volumen contiene un estudio, gimnasio y zona de invitados.\n" +
          "Los materiales utilizados incluyen hormigón visto, madera de roble y grandes superficies acristaladas con carpintería de aluminio de alta eficiencia térmica. La sostenibilidad fue un factor clave en el diseño, incorporando paneles solares, sistema de recolección de agua de lluvia y aislamiento térmico de alto rendimiento.",

        category: "renovation",
        location: "Sevilla, España",
        year: "2020",
        images: [
          // "/imagen2.jpg",
          // "/imagen2.jpg",
          // "/imagen2.jpg",
        ],
        video: "/MANUEL.mp4",
        model3d: "/house.glb",
        client: "Sr. y Sra. Martín",
        architect: "Ana Martínez",
        area: "320 m²",
        duration: "14 meses",
        services: ["Diseño arquitectónico", "Diseño de interiores", "Supervisión de obra"],
        features: [
          "Diseño bioclimático",
          "Eficiencia energética",
          "Domótica integrada",
          "Jardín sostenible",
          "Piscina de agua salada",
        ],
        comments: [
          {
            id: "1",
            author: {
              name: "Juan Pérez",
              initials: "JP",
            },
            content:
              "Me encanta el diseño bioclimático de esta casa. ¿Podrían compartir más detalles sobre el sistema de recolección de agua de lluvia? Estoy considerando implementar algo similar en mi proyecto.",
            date: new Date("2023-11-05"),
            likes: 5,
            isLiked: false,
            isQuestion: true,
            replies: [
              {
                id: "1-1",
                author: {
                  name: "Ana Martínez",
                  initials: "AM",
                  isAdmin: true,
                },
                content:
                  "Hola Juan, gracias por tu interés. El sistema de recolección de agua de lluvia incluye canalones especiales en el techo que dirigen el agua a un tanque subterráneo de 5000 litros. Esta agua se filtra y se utiliza para el riego del jardín y los inodoros, reduciendo el consumo de agua potable en aproximadamente un 40%. Si necesitas más información, no dudes en contactarnos directamente.",
                date: new Date("2023-11-06"),
                likes: 3,
                isLiked: false,
              },
            ],
          },
          {
            id: "2",
            author: {
              name: "Laura Gómez",
              initials: "LG",
            },
            content:
              "Tuve la oportunidad de visitar esta casa durante una jornada de puertas abiertas y quedé impresionada. La integración de los espacios interiores con el jardín es perfecta, y la luz natural que entra por los ventanales crea una atmósfera muy acogedora. Definitivamente un gran trabajo.",
            date: new Date("2023-10-20"),
            likes: 8,
            isLiked: false,
            isQuestion: false,
          },
        ],
      },
      {
        id: 5,
        title: "Centro Cultural La Cúpula",
        fullDescription:
          "Esta residencia minimalista fue diseñada para una familia joven que buscaba un espacio contemporáneo pero acogedor. El proyecto se desarrolló en un terreno de 800m² con orientación norte-sur, lo que permitió aprovechar al máximo la luz natural durante todo el día.\n" +
          "La casa se estructura en dos volúmenes principales conectados por un puente acristalado que funciona como galería y espacio de transición. El volumen principal alberga las áreas sociales en planta baja (salón, comedor y cocina integrada) y los dormitorios en la planta superior. El segundo volumen contiene un estudio, gimnasio y zona de invitados.\n" +
          "Los materiales utilizados incluyen hormigón visto, madera de roble y grandes superficies acristaladas con carpintería de aluminio de alta eficiencia térmica. La sostenibilidad fue un factor clave en el diseño, incorporando paneles solares, sistema de recolección de agua de lluvia y aislamiento térmico de alto rendimiento.",

        description:
          "Espacio multifuncional para eventos culturales con un diseño acústico innovador. La estructura incorpora una cúpula geodésica que optimiza la distribución del sonido y crea un espacio visualmente impactante para conciertos, exposiciones y conferencias.",
        category: "public",
        location: "Bilbao, España",
        year: "2022",
        images: [
          // "/imagen2.jpg",
          // "/imagen2.jpg",
          // "/imagen2.jpg",
        ],
        video: "/SORBOS.mp4",
        model3d: "/house.glb",
        client: "Ayuntamiento de Bilbao",
        architect: "Ana Martínez",
        area: "320 m²",
        duration: "14 meses",
        services: ["Diseño arquitectónico", "Diseño de interiores", "Supervisión de obra"],
        features: [
          "Diseño bioclimático",
          "Eficiencia energética",
          "Domótica integrada",
          "Jardín sostenible",
          "Piscina de agua salada",
        ],
        comments: [
          {
            id: "1",
            author: {
              name: "Juan Pérez",
              initials: "JP",
            },
            content:
              "Me encanta el diseño bioclimático de esta casa. ¿Podrían compartir más detalles sobre el sistema de recolección de agua de lluvia? Estoy considerando implementar algo similar en mi proyecto.",
            date: new Date("2023-11-05"),
            likes: 5,
            isLiked: false,
            isQuestion: true,
            replies: [
              {
                id: "1-1",
                author: {
                  name: "Ana Martínez",
                  initials: "AM",
                  isAdmin: true,
                },
                content:
                  "Hola Juan, gracias por tu interés. El sistema de recolección de agua de lluvia incluye canalones especiales en el techo que dirigen el agua a un tanque subterráneo de 5000 litros. Esta agua se filtra y se utiliza para el riego del jardín y los inodoros, reduciendo el consumo de agua potable en aproximadamente un 40%. Si necesitas más información, no dudes en contactarnos directamente.",
                date: new Date("2023-11-06"),
                likes: 3,
                isLiked: false,
              },
            ],
          },
          {
            id: "2",
            author: {
              name: "Laura Gómez",
              initials: "LG",
            },
            content:
              "Tuve la oportunidad de visitar esta casa durante una jornada de puertas abiertas y quedé impresionada. La integración de los espacios interiores con el jardín es perfecta, y la luz natural que entra por los ventanales crea una atmósfera muy acogedora. Definitivamente un gran trabajo.",
            date: new Date("2023-10-20"),
            likes: 8,
            isLiked: false,
            isQuestion: false,
          },
        ],
      },
    ],
    en: [
      {
        id: 1,
        title: "Modern House Pinar",
        description:
          "Minimalist residence with spacious open areas and natural light. Designed for a young family seeking a contemporary yet cozy space, this house incorporates sustainable materials and a bioclimatic design that reduces energy consumption.",
        fullDescription:
          "This minimalist residence was designed for a young family seeking a contemporary yet cozy space. The project was developed on an 800m² lot with a north-south orientation, allowing maximum use of natural light throughout the day.\n" +
          "The house is structured in two main volumes connected by a glazed bridge that serves as a gallery and transition space. The main volume houses the social areas on the ground floor (living room, dining room, and integrated kitchen) and the bedrooms on the upper floor. The second volume contains a study, gym, and guest area.\n" +
          "Materials used include exposed concrete, oak wood, and large glazed surfaces with high thermal efficiency aluminum frames. Sustainability was a key factor in the design, incorporating solar panels, a rainwater harvesting system, and high-performance thermal insulation.",
        category: "residential",
        location: "Madrid, Spain",
        year: "2022",
        images: [
          // "/imagen2.jpg",
          // "/imagen2.jpg",
          // "/imagen2.jpg",
        ],
        video: "/CASANOEL.mp4",
        model3d: "/house.glb",
        client: "Rodríguez Family",
        architect: "Ana Martínez",
        area: "320 m²",
        duration: "14 months",
        services: ["Architectural design", "Interior design", "Construction supervision"],
        features: [
          "Bioclimatic design",
          "Energy efficiency",
          "Integrated home automation",
          "Sustainable garden",
          "Saltwater pool",
        ],
        comments: [
          {
            id: "1",
            author: {
              name: "Juan Pérez",
              initials: "JP",
            },
            content:
              "Me encanta el diseño bioclimático de esta casa. ¿Podrían compartir más detalles sobre el sistema de recolección de agua de lluvia? Estoy considerando implementar algo similar en mi proyecto.",
            date: new Date("2023-11-05"),
            likes: 5,
            isLiked: false,
            isQuestion: true,
            replies: [
              {
                id: "1-1",
                author: {
                  name: "Ana Martínez",
                  initials: "AM",
                  isAdmin: true,
                },
                content:
                  "Hola Juan, gracias por tu interés. El sistema de recolección de agua de lluvia incluye canalones especiales en el techo que dirigen el agua a un tanque subterráneo de 5000 litros. Esta agua se filtra y se utiliza para el riego del jardín y los inodoros, reduciendo el consumo de agua potable en aproximadamente un 40%. Si necesitas más información, no dudes en contactarnos directamente.",
                date: new Date("2023-11-06"),
                likes: 3,
                isLiked: false,
              },
            ],
          },
          {
            id: "2",
            author: {
              name: "Laura Gómez",
              initials: "LG",
            },
            content:
              "Tuve la oportunidad de visitar esta casa durante una jornada de puertas abiertas y quedé impresionada. La integración de los espacios interiores con el jardín es perfecta, y la luz natural que entra por los ventanales crea una atmósfera muy acogedora. Definitivamente un gran trabajo.",
            date: new Date("2023-10-20"),
            likes: 8,
            isLiked: false,
            isQuestion: false,
          },
        ],
      },
      {
        id: 2,
        title: "Nexus Creative Offices",
        description:
          "Collaborative workspace designed to promote creativity and well-being. This project transforms an old industrial warehouse into a dynamic work environment with flexible areas, rest zones, and integrated natural elements.",
        fullDescription:
          "This minimalist residence was designed for a young family seeking a contemporary yet cozy space. The project was developed on an 800m² lot with a north-south orientation, allowing maximum use of natural light throughout the day.\n" +
          "The house is structured in two main volumes connected by a glazed bridge that serves as a gallery and transition space. The main volume houses the social areas on the ground floor (living room, dining room, and integrated kitchen) and the bedrooms on the upper floor. The second volume contains a study, gym, and guest area.\n" +
          "Materials used include exposed concrete, oak wood, and large glazed surfaces with high thermal efficiency aluminum frames. Sustainability was a key factor in the design, incorporating solar panels, a rainwater harvesting system, and high-performance thermal insulation.",
        category: "commercial",
        location: "Barcelona, Spain",
        year: "2021",
        images: [
          // "/imagen2.jpg",
          // "/imagen2.jpg",
          // "/imagen2.jpg",
        ],
        video: "/FRITO.mp4",
        model3d: "/house.glb",
        client: "Nexus Innovations",
        architect: "Ana Martínez",
        area: "320 m²",
        duration: "14 months",
        services: ["Architectural design", "Interior design", "Construction supervision"],
        features: [
          "Bioclimatic design",
          "Energy efficiency",
          "Integrated home automation",
          "Sustainable garden",
          "Saltwater pool",
        ],
        comments: [
          {
            id: "1",
            author: {
              name: "Juan Pérez",
              initials: "JP",
            },
            content:
              "Me encanta el diseño bioclimático de esta casa. ¿Podrían compartir más detalles sobre el sistema de recolección de agua de lluvia? Estoy considerando implementar algo similar en mi proyecto.",
            date: new Date("2023-11-05"),
            likes: 5,
            isLiked: false,
            isQuestion: true,
            replies: [
              {
                id: "1-1",
                author: {
                  name: "Ana Martínez",
                  initials: "AM",
                  isAdmin: true,
                },
                content:
                  "Hola Juan, gracias por tu interés. El sistema de recolección de agua de lluvia incluye canalones especiales en el techo que dirigen el agua a un tanque subterráneo de 5000 litros. Esta agua se filtra y se utiliza para el riego del jardín y los inodoros, reduciendo el consumo de agua potable en aproximadamente un 40%. Si necesitas más información, no dudes en contactarnos directamente.",
                date: new Date("2023-11-06"),
                likes: 3,
                isLiked: false,
              },
            ],
          },
          {
            id: "2",
            author: {
              name: "Laura Gómez",
              initials: "LG",
            },
            content:
              "Tuve la oportunidad de visitar esta casa durante una jornada de puertas abiertas y quedé impresionada. La integración de los espacios interiores con el jardín es perfecta, y la luz natural que entra por los ventanales crea una atmósfera muy acogedora. Definitivamente un gran trabajo.",
            date: new Date("2023-10-20"),
            likes: 8,
            isLiked: false,
            isQuestion: false,
          },
        ],
      },
      {
        id: 3,
        title: "Botanic Restaurant",
        description:
          "Gastronomic concept where nature takes center stage. The design integrates an indoor vertical garden, natural materials, and an earthy color palette to create an immersive experience that complements the restaurant’s organic culinary proposal.",
        fullDescription:
          "This minimalist residence was designed for a young family seeking a contemporary yet cozy space. The project was developed on an 800m² lot with a north-south orientation, allowing maximum use of natural light throughout the day.\n" +
          "The house is structured in two main volumes connected by a glazed bridge that serves as a gallery and transition space. The main volume houses the social areas on the ground floor (living room, dining room, and integrated kitchen) and the bedrooms on the upper floor. The second volume contains a study, gym, and guest area.\n" +
          "Materials used include exposed concrete, oak wood, and large glazed surfaces with high thermal efficiency aluminum frames. Sustainability was a key factor in the design, incorporating solar panels, a rainwater harvesting system, and high-performance thermal insulation.",
        category: "commercial",
        location: "Valencia, Spain",
        year: "2023",
        images: [
          // "/imagen2.jpg",
          // "/imagen2.jpg",
          // "/imagen2.jpg",
        ],
        video: "/LESLY.mp4",
        model3d: "/house.glb",
        client: "Mediterranean Gastronomic Group",
        architect: "Ana Martínez",
        area: "320 m²",
        duration: "14 months",
        services: ["Architectural design", "Interior design", "Construction supervision"],
        features: [
          "Bioclimatic design",
          "Energy efficiency",
          "Integrated home automation",
          "Sustainable garden",
          "Saltwater pool",
        ],
        comments: [
          {
            id: "1",
            author: {
              name: "Juan Pérez",
              initials: "JP",
            },
            content:
              "Me encanta el diseño bioclimático de esta casa. ¿Podrían compartir más detalles sobre el sistema de recolección de agua de lluvia? Estoy considerando implementar algo similar en mi proyecto.",
            date: new Date("2023-11-05"),
            likes: 5,
            isLiked: false,
            isQuestion: true,
            replies: [
              {
                id: "1-1",
                author: {
                  name: "Ana Martínez",
                  initials: "AM",
                  isAdmin: true,
                },
                content:
                  "Hola Juan, gracias por tu interés. El sistema de recolección de agua de lluvia incluye canalones especiales en el techo que dirigen el agua a un tanque subterráneo de 5000 litros. Esta agua se filtra y se utiliza para el riego del jardín y los inodoros, reduciendo el consumo de agua potable en aproximadamente un 40%. Si necesitas más información, no dudes en contactarnos directamente.",
                date: new Date("2023-11-06"),
                likes: 3,
                isLiked: false,
              },
            ],
          },
          {
            id: "2",
            author: {
              name: "Laura Gómez",
              initials: "LG",
            },
            content:
              "Tuve la oportunidad de visitar esta casa durante una jornada de puertas abiertas y quedé impresionada. La integración de los espacios interiores con el jardín es perfecta, y la luz natural que entra por los ventanales crea una atmósfera muy acogedora. Definitivamente un gran trabajo.",
            date: new Date("2023-10-20"),
            likes: 8,
            isLiked: false,
            isQuestion: false,
          },
        ],
      },
      {
        id: 4,
        title: "Historic Apartment Renovation",
        description:
          "Restoration of an apartment in a 19th-century historic building, preserving original architectural elements while incorporating modern comforts. The project balances respect for heritage with contemporary needs.",
        fullDescription:
          "This minimalist residence was designed for a young family seeking a contemporary yet cozy space. The project was developed on an 800m² lot with a north-south orientation, allowing maximum use of natural light throughout the day.\n" +
          "The house is structured in two main volumes connected by a glazed bridge that serves as a gallery and transition space. The main volume houses the social areas on the ground floor (living room, dining room, and integrated kitchen) and the bedrooms on the upper floor. The second volume contains a study, gym, and guest area.\n" +
          "Materials used include exposed concrete, oak wood, and large glazed surfaces with high thermal efficiency aluminum frames. Sustainability was a key factor in the design, incorporating solar panels, a rainwater harvesting system, and high-performance thermal insulation.",
        category: "renovation",
        location: "Seville, Spain",
        year: "2020",
        images: [
          // "/imagen2.jpg",
          // "/imagen2.jpg",
          // "/imagen2.jpg",
        ],
        video: "/MANUEL.mp4",
        model3d: "/house.glb",
        client: "Mr. and Mrs. Martín",
        architect: "Ana Martínez",
        area: "320 m²",
        duration: "14 months",
        services: ["Architectural design", "Interior design", "Construction supervision"],
        features: [
          "Bioclimatic design",
          "Energy efficiency",
          "Integrated home automation",
          "Sustainable garden",
          "Saltwater pool",
        ],
        comments: [
          {
            id: "1",
            author: {
              name: "Juan Pérez",
              initials: "JP",
            },
            content:
              "Me encanta el diseño bioclimático de esta casa. ¿Podrían compartir más detalles sobre el sistema de recolección de agua de lluvia? Estoy considerando implementar algo similar en mi proyecto.",
            date: new Date("2023-11-05"),
            likes: 5,
            isLiked: false,
            isQuestion: true,
            replies: [
              {
                id: "1-1",
                author: {
                  name: "Ana Martínez",
                  initials: "AM",
                  isAdmin: true,
                },
                content:
                  "Hola Juan, gracias por tu interés. El sistema de recolección de agua de lluvia incluye canalones especiales en el techo que dirigen el agua a un tanque subterráneo de 5000 litros. Esta agua se filtra y se utiliza para el riego del jardín y los inodoros, reduciendo el consumo de agua potable en aproximadamente un 40%. Si necesitas más información, no dudes en contactarnos directamente.",
                date: new Date("2023-11-06"),
                likes: 3,
                isLiked: false,
              },
            ],
          },
          {
            id: "2",
            author: {
              name: "Laura Gómez",
              initials: "LG",
            },
            content:
              "Tuve la oportunidad de visitar esta casa durante una jornada de puertas abiertas y quedé impresionada. La integración de los espacios interiores con el jardín es perfecta, y la luz natural que entra por los ventanales crea una atmósfera muy acogedora. Definitivamente un gran trabajo.",
            date: new Date("2023-10-20"),
            likes: 8,
            isLiked: false,
            isQuestion: false,
          },
        ],
      },
      {
        id: 5,
        title: "La Cúpula Cultural Center",
        description:
          "Multifunctional space for cultural events with innovative acoustic design. The structure features a geodesic dome that optimizes sound distribution and creates a visually striking space for concerts, exhibitions, and conferences.",
        fullDescription:
          "This minimalist residence was designed for a young family seeking a contemporary yet cozy space. The project was developed on an 800m² lot with a north-south orientation, allowing maximum use of natural light throughout the day.\n" +
          "The house is structured in two main volumes connected by a glazed bridge that serves as a gallery and transition space. The main volume houses the social areas on the ground floor (living room, dining room, and integrated kitchen) and the bedrooms on the upper floor. The second volume contains a study, gym, and guest area.\n" +
          "Materials used include exposed concrete, oak wood, and large glazed surfaces with high thermal efficiency aluminum frames. Sustainability was a key factor in the design, incorporating solar panels, a rainwater harvesting system, and high-performance thermal insulation.",
        category: "public",
        location: "Bilbao, Spain",
        year: "2022",
        images: [
          // "/imagen2.jpg",
          // "/imagen2.jpg",
          // "/imagen2.jpg",
        ],
        video: "/SORBOS.mp4",
        model3d: "/house.glb",
        client: "City of Bilbao",
        architect: "Ana Martínez",
        area: "320 m²",
        duration: "14 months",
        services: ["Architectural design", "Interior design", "Construction supervision"],
        features: [
          "Bioclimatic design",
          "Energy efficiency",
          "Integrated home automation",
          "Sustainable garden",
          "Saltwater pool",
        ],
        comments: [
          {
            id: "1",
            author: {
              name: "Juan Pérez",
              initials: "JP",
            },
            content:
              "Me encanta el diseño bioclimático de esta casa. ¿Podrían compartir más detalles sobre el sistema de recolección de agua de lluvia? Estoy considerando implementar algo similar en mi proyecto.",
            date: new Date("2023-11-05"),
            likes: 5,
            isLiked: false,
            isQuestion: true,
            replies: [
              {
                id: "1-1",
                author: {
                  name: "Ana Martínez",
                  initials: "AM",
                  isAdmin: true,
                },
                content:
                  "Hola Juan, gracias por tu interés. El sistema de recolección de agua de lluvia incluye canalones especiales en el techo que dirigen el agua a un tanque subterráneo de 5000 litros. Esta agua se filtra y se utiliza para el riego del jardín y los inodoros, reduciendo el consumo de agua potable en aproximadamente un 40%. Si necesitas más información, no dudes en contactarnos directamente.",
                date: new Date("2023-11-06"),
                likes: 3,
                isLiked: false,
              },
            ],
          },
          {
            id: "2",
            author: {
              name: "Laura Gómez",
              initials: "LG",
            },
            content:
              "Tuve la oportunidad de visitar esta casa durante una jornada de puertas abiertas y quedé impresionada. La integración de los espacios interiores con el jardín es perfecta, y la luz natural que entra por los ventanales crea una atmósfera muy acogedora. Definitivamente un gran trabajo.",
            date: new Date("2023-10-20"),
            likes: 8,
            isLiked: false,
            isQuestion: false,
          },
        ],
      },
    ]
  },

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
  },

  // 
  goBack: {
    es: "Volver al proyecto",
    en: "Back to project"
  },
  fullName: {
    es: "Nombre completo",
    en: "Full Name"
  },
  phone: {
    es: "Teléfono",
    en: "Phone"
  },
  location: {
    es: "Ubicación del proyecto",
    en: "Project Location"
  },
  budget: {
    es: "Presupuesto estimado",
    en: "Estimated Budget"
  },
  timeframe: {
    es: "Plazo deseado",
    en: "Desired Timeframe"
  },
  detailAditional: {
    es: "Detalles adicionales",
    en: "Additional Details"
  },
  acceptTerms: {
    es: "Acepto que mis datos sean procesados de acuerdo con la política de privacidad para recibir comunicaciones relacionadas con mi solicitud.",
    en: "I agree that my data will be processed in accordance with the privacy policy to receive communications related to my request."
  },
  sendRequest: {
    es: "Enviar solicitud",
    en: "Send Request"
  },
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string | string[] | PromoModalContent | AboutPersonal[] | Service[] | Project[]
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

  const t = (key: string): string | string[] | PromoModalContent | AboutPersonal[] | Service[] | Project[] => {
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
