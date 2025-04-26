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

export default function ProductsSection() {
  const { t } = useLanguage()
  const { regionData } = useRegion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [activeTab, setActiveTab] = useState("furniture")

  const products = {
    furniture: [
      { id: "f1", name: "Silla Minimalista", price: 450, image: "/placeholder.svg?height=400&width=400" },
      { id: "f2", name: "Mesa de Centro", price: 780, image: "/placeholder.svg?height=400&width=400" },
      { id: "f3", name: "Sofá Modular", price: 1250, image: "/placeholder.svg?height=400&width=400" },
      { id: "f4", name: "Estantería Flotante", price: 320, image: "/placeholder.svg?height=400&width=400" },
    ],
    decoration: [
      { id: "d1", name: "Lámpara Geométrica", price: 180, image: "/placeholder.svg?height=400&width=400" },
      { id: "d2", name: "Jarrón Artesanal", price: 95, image: "/placeholder.svg?height=400&width=400" },
      { id: "d3", name: "Espejo Circular", price: 210, image: "/placeholder.svg?height=400&width=400" },
      { id: "d4", name: "Set de Cojines", price: 120, image: "/placeholder.svg?height=400&width=400" },
    ],
    materials: [
      { id: "m1", name: "Mármol Carrara", price: 180, unit: "m²", image: "/placeholder.svg?height=400&width=400" },
      { id: "m2", name: "Madera de Roble", price: 95, unit: "m²", image: "/placeholder.svg?height=400&width=400" },
      { id: "m3", name: "Concreto Pulido", price: 75, unit: "m²", image: "/placeholder.svg?height=400&width=400" },
      { id: "m4", name: "Latón Cepillado", price: 220, unit: "m²", image: "/placeholder.svg?height=400&width=400" },
    ],
  }

  // Formatear precio según la moneda local
  const formatPrice = (price: number, unit?: string) => {
    return `${regionData.currencySymbol}${price.toLocaleString()}${unit ? `/${unit}` : ""}`
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
          {t("productsTitle")}
        </motion.h2>

        <Tabs defaultValue="furniture" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-12">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="furniture">{t("furniture")}</TabsTrigger>
              <TabsTrigger value="decoration">{t("decoration")}</TabsTrigger>
              <TabsTrigger value="materials">{t("materials")}</TabsTrigger>
            </TabsList>
          </div>

          {Object.entries(products).map(([category, items]) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {items.map((product, index) => (
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
      </div>
    </section>
  )
}
