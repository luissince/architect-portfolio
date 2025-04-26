"use client"

import type React from "react"

import { useState } from "react"
import { useCart } from "@/context/cart-context"
import { useRegion } from "@/context/region-context"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CreditCard, Banknote, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart()
  const { regionData } = useRegion()
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
    paymentMethod: "card" as "card" | "cash" | "transfer",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Formatear precio según la moneda local
  const formatPrice = (price: number) => {
    return `${regionData.currencySymbol}${price.toLocaleString()}`
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentMethodChange = (value: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value as "card" | "cash" | "transfer" }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulación de procesamiento de pago
    setTimeout(() => {
      // Guardar información del pedido en localStorage para la página de confirmación
      const orderData = {
        items,
        totalPrice,
        customerInfo: formData,
        orderNumber: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        orderDate: new Date().toISOString(),
      }
      localStorage.setItem("lastOrder", JSON.stringify(orderData))

      // Limpiar el carrito
      clearCart()

      // Redirigir a la página de confirmación
      router.push("/carrito/confirmacion")
    }, 1500)
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12 mt-20">
          <div className="max-w-2xl mx-auto text-center py-16">
            <h1 className="text-3xl font-bold mb-6">Tu carrito está vacío</h1>
            <p className="text-muted-foreground mb-8">
              No tienes productos en tu carrito. Explora nuestro catálogo para encontrar productos que te interesen.
            </p>
            <Link href="/#products">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Ver productos</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12 mt-20">
        <Link href="/#products" className="inline-flex items-center text-accent hover:text-accent/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Continuar comprando
        </Link>

        <h1 className="text-3xl font-bold mb-8">Tu carrito</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Productos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 py-4 border-b last:border-0">
                      <div className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.category === "furniture"
                            ? "Mobiliario"
                            : item.category === "decoration"
                              ? "Decoración"
                              : "Materiales"}
                        </p>
                        <p className="text-accent font-medium mt-1">{formatPrice(item.price)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 hover:bg-muted transition-colors"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 border-x">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 hover:bg-muted transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Información de contacto</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre completo *</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono *</Label>
                        <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Dirección de entrega *</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Notas adicionales</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Instrucciones especiales para la entrega, preferencias, etc."
                        rows={3}
                      />
                    </div>

                    <div className="space-y-3">
                      <Label>Método de pago *</Label>
                      <RadioGroup
                        value={formData.paymentMethod}
                        onValueChange={handlePaymentMethodChange}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2 rounded-md border p-3">
                          <RadioGroupItem value="card" id="payment-card" />
                          <Label htmlFor="payment-card" className="flex items-center">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Tarjeta de crédito/débito
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 rounded-md border p-3">
                          <RadioGroupItem value="transfer" id="payment-transfer" />
                          <Label htmlFor="payment-transfer" className="flex items-center">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Transferencia bancaria
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 rounded-md border p-3">
                          <RadioGroupItem value="cash" id="payment-cash" />
                          <Label htmlFor="payment-cash" className="flex items-center">
                            <Banknote className="mr-2 h-4 w-4" />
                            Efectivo al recibir
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Procesando..." : "Completar pedido"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle>Resumen del pedido</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal ({items.length} productos)</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Envío</span>
                      <span>Calculado en el siguiente paso</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total estimado</span>
                      <span className="text-lg">{formatPrice(totalPrice)}</span>
                    </div>

                    <div className="pt-4 text-sm text-muted-foreground">
                      <p>
                        Al completar tu pedido, recibirás una cotización detallada por correo electrónico y WhatsApp con
                        los detalles de tu compra y las opciones de envío disponibles.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
