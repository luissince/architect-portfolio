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

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <Suspense fallback={<LoadingAnimation />}>
        <WelcomeAnimation />
        <Navbar />
        <HeroBanner />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <ProductsSection />
        <PriceCalculator />
        <ContactSection />
        <Footer />
        <PromoModal />
        <SocialFloatButtons />
      </Suspense>
    </main>
  )
}
