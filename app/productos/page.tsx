"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/context/language-context"
import { useRegion } from "@/context/region-context"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import SocialFloatButtons from "@/components/social-float-buttons"
import { ProductGridSkeleton } from "@/components/product-skeleton"

export default function ProductsPage() {
  const { t } = useLanguage()
  const { regionData } = useRegion()
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  // Datos de productos (mismos que en products-section.tsx)
  const products = {
    furniture: [
      {
        id: "f1",
        name: "Silla Minimalista",
        price: 450,
        unit: "unid.",
        image: "/placeholder.svg?height=400&width=400",
        popularity: 10,
      },
      {
        id: "f2",
        name: "Mesa de Centro",
        price: 780,
        unit: "unid.",
        image: "/placeholder.svg?height=400&width=400",
        popularity: 8,
      },
      {
        id: "f3",
        name: "Sofá Modular",
        price: 1250,
        unit: "unid.",
        image: "/placeholder.svg?height=400&width=400",
        popularity: 9,
      },
      {
        id: "f4",
        name: "Estantería Flotante",
        price: 320,
        unit: "unid.",
        image: "/placeholder.svg?height=400&width=400",
        popularity: 7,
      },
      {
        id: "f5",
        name: "Sillón Reclinable",
        price: 890,
        unit: "unid.",
        image: "/placeholder.svg?height=400&width=400",
        popularity: 6,
      },
      {
        id: "f6",
        name: "Mesa de Comedor",
        price: 1100,
        unit: "unid.",
        image: "/placeholder.svg?height=400&width=400",
        popularity: 5,
      },
    ],
    decoration: [
      {
        id: "d1",
        name: "Lámpara Geométrica",
        price: 180,
        unit: "unid.",
        image: "/placeholder.svg?height=400&width=400",
        popularity: 10,
      },
      {
        id: "d2",
        name: "Jarrón Artesanal",
        price: 95,
        unit: "unid.",
        image: "/placeholder.svg?height=400&width=400",
        popularity: 8,
      },
      {
        id: "d3",
        name: "Espejo Circular",
        price: 210,
        unit: "unid.",
        image: "/placeholder.svg?height=400&width=400",
        popularity: 9,
      },
      { id: "d4", name: "Set de Cojines", price: 120, image: "/placeholder.svg?height=400&width=400", popularity: 7 },
      {
        id: "d5",
        name: "Cuadro Abstracto",
        price: 250,
        unit: "unid.",
        image: "/placeholder.svg?height=400&width=400",
        popularity: 6,
      },
      {
        id: "d6",
        name: "Reloj de Pared",
        price: 85,
        unit: "unid.",
        image: "/placeholder.svg?height=400&width=400",
        popularity: 5,
      },
    ],
    materials: [
      {
        id: "m1",
        name: "Mármol Carrara",
        price: 180,
        unit: "m²",
        image: "/placeholder.svg?height=400&width=400",
        popularity: 10,
      },
      {
        id: "m2",
        name: "Madera de Roble",
        price: 95,
        unit: "m²",
        image: "/placeholder.svg?height=400&width=400",
        popularity: 9,
      },
      {
        id: "m3",
        name: "Concreto Pulido",
        price: 75,
        unit: "m²",
        image: "/placeholder.svg?height=400&width=400",
        popularity: 8,
      },
      {
        id: "m4",
        name: "Latón Cepillado",
        price: 220,
        unit: "m²",
        image: "/placeholder.svg?height=400&width=400",
        popularity: 7,
      },
      {
        id: "m5",
        name: "Piedra Natural",
        price: 150,
        unit: "m²",
        image: "/placeholder.svg?height=400&width=400",
        popularity: 6,
      },
      {
        id: "m6",
        name: "Vidrio Templado",
        price: 190,
        unit: "m²",
        image: "/placeholder.svg?height=400&width=400",
        popularity: 5,
      },
    ],
  }

  // Simular carga de datos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Formatear precio según la moneda local
  const formatPrice = (price: number, unit?: string) => {
    return `${regionData.currencySymbol} ${price.toLocaleString()}${unit ? ` ${unit}` : ""}`
  }

  // Filtrar productos según la categoría seleccionada
  const filteredProducts =
    activeCategory === "all" ? Object.values(products).flat() : products[activeCategory as keyof typeof products] || []

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12 mt-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("productsTitle")}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubra nuestra selección de productos de alta calidad para complementar sus espacios arquitectónicos,
            desde mobiliario exclusivo hasta materiales premium.
          </p>
        </div>

        <Tabs
          defaultValue="all"
          className="w-full mb-12"
          onValueChange={(value) => {
            setIsLoading(true)
            setActiveCategory(value)
            // Simular tiempo de carga al cambiar de categoría
            setTimeout(() => setIsLoading(false), 500)
          }}
        >
          <div className="flex justify-center">
            <TabsList className="grid grid-cols-4 w-full max-w-2xl">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="furniture">{t("furniture")}</TabsTrigger>
              <TabsTrigger value="decoration">{t("decoration")}</TabsTrigger>
              <TabsTrigger value="materials">{t("materials")}</TabsTrigger>
            </TabsList>
          </div>
        </Tabs>

        {isLoading ? (
          <ProductGridSkeleton count={8} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/producto/${product.id}`}>
                  <Card className="overflow-hidden border-0 shadow-md transition-all duration-300 hover:shadow-xl h-full">
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-110"
                      />
                      {product.popularity >= 9 && (
                        <div className="absolute top-2 right-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">
                          Popular
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <p className="text-accent font-medium mt-2">{formatPrice(product.price, product.unit)}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-4 hover:bg-accent hover:text-accent-foreground"
                      >
                        Ver detalles
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-8">
            ¿Buscas un producto personalizado? Contáctanos para discutir tus necesidades específicas.
          </p>
          <Link href="/#contact">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Contactar ahora</Button>
          </Link>
        </div>
      </div>

      <Footer />
      <SocialFloatButtons />
    </main>
  )
}
