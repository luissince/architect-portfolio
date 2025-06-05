"use client"

import { useLanguage } from "@/context/language-context"
import { useRegion } from "@/context/region-context"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

export default function PriceCalculator() {
  const { t } = useLanguage()
  const { regionData } = useRegion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const [squareMeters, setSquareMeters] = useState(100)
  const [projectType, setProjectType] = useState("residential")
  const [materialQuality, setMaterialQuality] = useState("standard")
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null)

  const calculatePrice = () => {
    let basePrice = 0

    switch (projectType) {
      case "residential":
        basePrice = 800
        break
      case "commercial":
        basePrice = 1000
        break
      case "industrial":
        basePrice = 600
        break
    }

    let qualityMultiplier = 1

    switch (materialQuality) {
      case "basic":
        qualityMultiplier = 0.8
        break
      case "standard":
        qualityMultiplier = 1
        break
      case "premium":
        qualityMultiplier = 1.5
        break
      case "luxury":
        qualityMultiplier = 2.2
        break
    }

    const finalPrice = basePrice * squareMeters * qualityMultiplier

    setEstimatedPrice(finalPrice)
  }

  const formatPrice = (price: number) => {
    if (!price) return ""
    return `${regionData.currencySymbol}${price.toLocaleString()}`
  }

  return (
    <section id="calculator" className="py-20 bg-background parallax relative">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          className="object-cover w-full h-full"
        >
          <source src="/video3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            ref={ref}
          >
            {t("calculatorTitle").toString()}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="backdrop-blur-md bg-background/80">
              <CardHeader>
                <CardTitle>{t("calculatorTitle").toString()}</CardTitle>
                <CardDescription>Calcule el costo estimado de su proyecto arquitectónico</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="square-meters">
                    {t("squareMeters").toString()}: {squareMeters} m²
                  </Label>
                  <Slider
                    id="square-meters"
                    min={20}
                    max={500}
                    step={10}
                    value={[squareMeters]}
                    onValueChange={(value) => setSquareMeters(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project-type">{t("projectType").toString()}</Label>
                  <Select value={projectType} onValueChange={setProjectType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione tipo de proyecto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residencial</SelectItem>
                      <SelectItem value="commercial">Comercial</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="material-quality">{t("materials").toString()}</Label>
                  <Select value={materialQuality} onValueChange={setMaterialQuality}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione calidad de materiales" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Básico</SelectItem>
                      <SelectItem value="standard">Estándar</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="luxury">Lujo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={calculatePrice} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  {t("calculate").toString()}
                </Button>

                {estimatedPrice !== null && (
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">{t("estimatedPrice").toString()}:</h3>
                    <p className="text-2xl font-bold text-accent">{formatPrice(estimatedPrice)}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      *Este es un precio estimado. Contáctenos para un presupuesto detallado.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
