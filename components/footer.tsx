"use client"

import { useLanguage } from "@/context/language-context"
import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-playfair font-bold">
              <span className="text-primary-foreground">DECORGANIKA</span>
              {/* <span className="text-accent">.</span> */}
            </Link>
            <p className="mt-4 text-primary-foreground/80 max-w-md">
              {t("footerDescription").toString()}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#home" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  {t("home").toString()}
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  {t("about").toString()}
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  {t("services").toString()}
                </Link>
              </li>
              <li>
                <Link href="#products" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  {t("products").toString()}
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  {t("contact").toString()}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("followUs").toString()}</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">{t("businnesHours").toString()}</h3>
              <p className="text-primary-foreground/80">Lunes - Viernes: 9:00 - 18:00</p>
              <p className="text-primary-foreground/80">Sábado: 10:00 - 14:00</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-primary-foreground/60">
          <a href="https://www.syssoftintegra.com/">
            © {currentYear} SysSoftIntegra. {t("allRightsReserved").toString()}.
          </a>
        </div>
      </div>
    </footer>
  )
}
