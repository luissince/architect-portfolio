"use client"

import type React from "react"

import { useLanguage } from "@/context/language-context"
import { useRegion } from "@/context/region-context"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { MdOutlineEmail, MdPhone, } from "react-icons/md"
import { GiPositionMarker } from "react-icons/gi";
import { BiCoin } from "react-icons/bi";

export default function ContactSection() {
  const { t } = useLanguage()
  const { regionData } = useRegion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1000)
  }

  return (
    <section id="contact" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          {t("contactTitle").toString()}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="h-full flex flex-col justify-center">
              <h3 className="text-2xl font-semibold mb-6">
                {t("contactTitle").toString()}
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {t("contactDescription").toString()}
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mr-4">
                    <MdPhone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium">{t("contactPhone").toString()}</h4>
                    <p className="text-muted-foreground">{regionData.phone}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mr-4">
                    <MdOutlineEmail className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium">{t("emailAddress").toString()}</h4>
                    <p className="text-muted-foreground">{regionData.email}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mr-4">
                    <GiPositionMarker className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium">{t("officeLocation").toString()}</h4>
                    <p className="text-muted-foreground">{regionData.address}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mr-4">
                    <BiCoin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium">{t("localCurrency").toString()}</h4>
                    <p className="text-muted-foreground">
                      {regionData.currency} ({regionData.currencySymbol})
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{t("contactFormTitle").toString()}</CardTitle>
                <CardDescription>
                  {t("contactFormSubTitle").toString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">¡Mensaje enviado!</h3>
                    <p className="text-center text-muted-foreground">
                      Gracias por contactarnos. Nos pondremos en contacto con usted pronto.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("name").toString()}</Label>
                      <Input id="name" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">{t("email").toString()}</Label>
                      <Input id="email" type="email" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">{t("message").toString()}</Label>
                      <Textarea id="message" rows={5} required />
                    </div>

                    <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      {t("send").toString()}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
