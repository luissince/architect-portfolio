"use client"

import { useLanguage } from "@/context/language-context"
import { useRegion } from "@/context/region-context"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FadeInAnimation } from "./animation-wrapper"
import { useRouter } from "next/navigation"

export default function ProductsSection() {
  const { t } = useLanguage()
  const { regionData } = useRegion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [activeTab, setActiveTab] = useState("furniture")
  const router = useRouter()

  const products = {
    furniture: [
      {
        id: "f1",
        name: "Silla Minimalista",
        price: 450,
        unit: "unid.",
        image: "imagen3.png",
        popularity: 10,
      },
      {
        id: "f2",
        name: "Mesa de Centro",
        price: 780,
        unit: "unid.",
        image: "imagen3.png",
        popularity: 8,
      },
      {
        id: "f3",
        name: "Sofá Modular",
        price: 1250,
        unit: "unid.",
        image: "imagen3.png",
        popularity: 9,
      },
      {
        id: "f4",
        name: "Estantería Flotante",
        price: 320,
        unit: "unid.",
        image: "imagen3.png",
        popularity: 7,
      },
      {
        id: "f5",
        name: "Sillón Reclinable",
        price: 890,
        unit: "unid.",
        image: "imagen3.png",
        popularity: 6,
      },
      {
        id: "f6",
        name: "Mesa de Comedor",
        price: 1100,
        unit: "unid.",
        image: "imagen3.png",
        popularity: 5,
      },
    ],
    decoration: [
      {
        id: "d1",
        name: "Lámpara Geométrica",
        price: 180,
        unit: "unid.",
        image: "imagen3.png",
        popularity: 10,
      },
      {
        id: "d2",
        name: "Jarrón Artesanal",
        price: 95,
        unit: "unid.",
        image: "imagen3.png",
        popularity: 8,
      },
      {
        id: "d3",
        name: "Espejo Circular",
        price: 210,
        unit: "unid.",
        image: "imagen3.png",
        popularity: 9,
      },
      { id: "d4", name: "Set de Cojines", price: 120, image: "imagen3.png", popularity: 7 },
      {
        id: "d5",
        name: "Cuadro Abstracto",
        price: 250,
        unit: "unid.",
        image: "imagen3.png",
        popularity: 6,
      },
      {
        id: "d6",
        name: "Reloj de Pared",
        price: 85,
        unit: "unid.",
        image: "imagen3.png",
        popularity: 5,
      },
    ],
    materials: [
      {
        id: "m1",
        name: "Mármol Carrara",
        price: 180,
        unit: "m²",
        image: "imagen3.png",
        popularity: 10,
      },
      {
        id: "m2",
        name: "Madera de Roble",
        price: 95,
        unit: "m²",
        image: "imagen3.png",
        popularity: 9,
      },
      {
        id: "m3",
        name: "Concreto Pulido",
        price: 75,
        unit: "m²",
        image: "imagen3.png",
        popularity: 8,
      },
      {
        id: "m4",
        name: "Latón Cepillado",
        price: 220,
        unit: "m²",
        image: "imagen3.png",
        popularity: 7,
      },
      {
        id: "m5",
        name: "Piedra Natural",
        price: 150,
        unit: "m²",
        image: "imagen3.png",
        popularity: 6,
      },
      {
        id: "m6",
        name: "Vidrio Templado",
        price: 190,
        unit: "m²",
        image: "imagen3.png",
        popularity: 5,
      },
    ],
  }

  // Formatear precio según la moneda local
  const formatPrice = (price: number, unit?: string) => {
    return `${regionData.currencySymbol} ${price.toLocaleString()}${unit ? `  ${unit}` : ""}`
  }

  // Obtener los productos más populares para la categoría activa
  const getPopularProducts = (category: string) => {
    const categoryProducts = products[category as keyof typeof products]
    // Ordenar por popularidad y tomar los 4 primeros
    return [...categoryProducts].sort((a, b) => b.popularity - a.popularity).slice(0, 4)
  }

  return (
    <section id="products" className="py-20 bg-muted overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          {t("productsTitle").toString()}
        </motion.h2>

        <Tabs defaultValue="furniture" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-12">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="furniture">{t("furniture").toString()}</TabsTrigger>
              <TabsTrigger value="decoration">{t("decoration").toString()}</TabsTrigger>
              <TabsTrigger value="materials">{t("materials").toString()}</TabsTrigger>
            </TabsList>
          </div>

          {Object.entries(products).map(([category, items]) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {getPopularProducts(category).map((product, index) => (
                  <FadeInAnimation key={product.id} delay={index * 0.1}>
                    <Link href={`/producto/${product.id}`}>
                      <Card className="overflow-hidden border-0 shadow-md transition-all duration-300 hover:shadow-xl h-full">
                        <div className="relative h-64 w-full overflow-hidden">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
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
                  </FadeInAnimation>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        {/* Botón Ver más */}
        <div className="flex justify-center mt-12">
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              router.push("/productos")
            }}
          >
            Ver más productos
          </Button>
        </div>
      </div>
    </section>
  )
}
