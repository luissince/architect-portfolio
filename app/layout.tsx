import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Montserrat } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/context/language-context"
import { RegionProvider } from "@/context/region-context"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/context/cart-context"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Estudio de Arquitectura | Portfolio",
  description: "Portfolio profesional de arquitectura con proyectos, servicios y productos",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <RegionProvider>
            <LanguageProvider>
              <CartProvider>{children}</CartProvider>
            </LanguageProvider>
          </RegionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
