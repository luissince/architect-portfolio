"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import ThemeSwitcher from "@/components/theme-switcher"
import CartButton from "@/components/cart-button"
import { SearchModal } from "@/components/search-modal"
import { useLanguage } from "@/context/language-context"

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es")
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  const navLinks = [
    { href: "home", label: t("home") },
    { href: "about", label: t("about") },
    { href: "services", label: t("services") },
    { href: "portfolio", label: "Portfolio" },
    { href: "products", label: t("products") },
    { href: "calculator", label: t("calculator") },
    { href: "contact", label: t("contact") },
  ]

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? "bg-background/90 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-playfair font-bold">
          <span className="text-primary">ESTUDIO</span>
          <span className="text-accent">.</span>
        </Link>

        {/* Desktop Navigation - Centrado */}
        <nav className="hidden lg:flex items-center justify-center flex-1 mx-4">
          <div className="flex space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium hover:text-accent transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Acciones agrupadas */}
        <div className="flex items-center">
          {/* Buscador compacto en desktop */}
          <div className="hidden md:block mr-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }))}
              className="h-9 w-9 rounded-full"
              title="Buscar (Ctrl+K)"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {/* Idioma */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            className="h-9 w-9 rounded-full mr-1"
            title={language === "es" ? "Switch to English" : "Cambiar a Español"}
          >
            <span className="text-xs font-medium">{language === "es" ? "EN" : "ES"}</span>
          </Button>

          {/* Tema */}
          <div className="mr-1">
            <ThemeSwitcher />
          </div>

          {/* Carrito */}
          <CartButton />

          {/* Menú móvil */}
          <Button
            variant="ghost"
            size="icon"
            className="ml-1 lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          className="lg:hidden bg-background/95 backdrop-blur-md"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            <div className="py-2 flex justify-center">
              <SearchModal />
            </div>

            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-base font-medium py-2 hover:text-accent transition-colors text-left"
              >
                {link.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Componente de búsqueda (oculto pero funcional) */}
      <div className="hidden">
        <SearchModal />
      </div>
    </motion.header>
  )
}
