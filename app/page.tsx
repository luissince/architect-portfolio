"use client"

import { Suspense } from "react"
import LoadingAnimation from "@/components/loading-animation"
import Navbar from "@/components/navbar"
import HeroBanner from "@/components/hero-banner"
import AboutSection from "@/components/about-section"
import ServicesSection from "@/components/services-section"
import PortfolioSection from "@/components/portfolio-section"
import ProductsSection from "@/components/products-section"
import PriceCalculator from "@/components/price-calculator"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import PromoModal from "@/components/promo-modal"
import SocialFloatButtons from "@/components/social-float-buttons"
import WelcomeAnimation from "@/components/welcome-animation"
import { useEffect } from "react"

export default function Home() {
  // Función para manejar el scroll a secciones desde URL con hash
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Verificar si hay un hash en la URL
      const hash = window.location.hash
      if (hash) {
        // Eliminar el # del inicio
        const sectionId = hash.substring(1)

        // Dar tiempo a que la página se cargue completamente
        setTimeout(() => {
          const section = document.getElementById(sectionId)
          if (section) {
            section.scrollIntoView({ behavior: "smooth" })
          }
        }, 500)
      }
    }
  }, [])

  return (
    <main className="min-h-screen bg-neutral-50">
      <Suspense fallback={<LoadingAnimation />}>
        {/* <WelcomeAnimation /> */}
        <Navbar />
        <HeroBanner />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        {/* <ProductsSection /> */}
        <PriceCalculator />
        <ContactSection />
        <Footer />
        {/* <PromoModal /> */}
        <SocialFloatButtons />
      </Suspense>
    </main>
  )
}
