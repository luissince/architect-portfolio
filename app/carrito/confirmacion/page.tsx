"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, FileText, Send } from "lucide-react"
import Link from "next/link"

type OrderItem = {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  category: string
}

type CustomerInfo = {
  name: string
  email: string
  phone: string
  address: string
  notes: string
  paymentMethod: "card" | "cash" | "transfer"
}

type OrderData = {
  items: OrderItem[]
  totalPrice: number
  customerInfo: CustomerInfo
  orderNumber: string
  orderDate: string
}

export default function OrderConfirmationPage() {
  const router = useRouter()
  const [orderData, setOrderData] = useState<OrderData | null>(null)

  useEffect(() => {
    // Recuperar datos del pedido del localStorage
    const savedOrder = localStorage.getItem("lastOrder")
    if (!savedOrder) {
      // Si no hay datos de pedido, redirigir al inicio
      router.push("/")
      return
    }

    try {
      const parsedOrder = JSON.parse(savedOrder) as OrderData
      setOrderData(parsedOrder)
    } catch (error) {
      console.error("Error al cargar los datos del pedido:", error)
      router.push("/")
    }
  }, [router])

  if (!orderData) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12 mt-20">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Formatear método de pago
  const formatPaymentMethod = (method: string) => {
    switch (method) {
      case "card":
        return "Tarjeta de crédito/débito"
      case "cash":
        return "Efectivo al recibir"
      case "transfer":
        return "Transferencia bancaria"
      default:
        return method
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12 mt-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">¡Pedido completado con éxito!</h1>
            <p className="text-muted-foreground">
              Gracias por tu compra. Hemos recibido tu pedido y te contactaremos pronto.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Resumen del pedido</span>
                <span className="text-accent">#{orderData.orderNumber}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Fecha del pedido</h3>
                    <p>{formatDate(orderData.orderDate)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Método de pago</h3>
                    <p>{formatPaymentMethod(orderData.customerInfo.paymentMethod)}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Productos</h3>
                  <div className="space-y-3">
                    {orderData.items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <div>
                          <span className="font-medium">{item.name}</span>
                          <span className="text-muted-foreground ml-2">x{item.quantity}</span>
                        </div>
                        <span>${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span className="text-lg">${orderData.totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Información de contacto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Nombre</h3>
                  <p>{orderData.customerInfo.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
                  <p>{orderData.customerInfo.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Teléfono</h3>
                  <p>{orderData.customerInfo.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Dirección</h3>
                  <p>{orderData.customerInfo.address}</p>
                </div>
              </div>

              {orderData.customerInfo.notes && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Notas</h3>
                  <p>{orderData.customerInfo.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="bg-muted rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="bg-background rounded-full p-2">
                <FileText className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Cotización enviada</h3>
                <p className="text-sm text-muted-foreground">
                  Hemos enviado una cotización detallada a tu correo electrónico y WhatsApp con todos los detalles de tu
                  pedido.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/">
              <Button variant="outline" className="w-full sm:w-auto">
                Volver al inicio
              </Button>
            </Link>
            <Button className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
              <Send className="mr-2 h-4 w-4" />
              Contactar con soporte
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
