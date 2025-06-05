"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Package, Truck, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useRegion } from "@/context/region-context"

export default function OrderDetailPage() {
  const { orders, isAuthenticated, isLoading } = useAuth()
  const { regionData } = useRegion()
  const params = useParams()
  const orderId = params?.id as string

  const [order, setOrder] = useState<any>(null)
  const [orderStatus, setOrderStatus] = useState<
    {
      step: number
      label: string
      date: string | null
      icon: React.ReactNode
    }[]
  >([])

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = "/login"
      return
    }

    if (orders && orderId) {
      const foundOrder = orders.find((o) => o.id === orderId)
      if (foundOrder) {
        setOrder(foundOrder)

        // Configurar el estado del pedido para la línea de tiempo
        const statusTimeline = [
          {
            step: 1,
            label: "Pedido recibido",
            date: foundOrder.date,
            icon: <Package className="h-5 w-5" />,
          },
          {
            step: 2,
            label: "En procesamiento",
            date:
              foundOrder.status === "processing" || foundOrder.status === "completed"
                ? new Date(new Date(foundOrder.date).getTime() + 24 * 60 * 60 * 1000).toISOString()
                : null,
            icon: <Clock className="h-5 w-5" />,
          },
          {
            step: 3,
            label: "En camino",
            date:
              foundOrder.status === "completed"
                ? new Date(new Date(foundOrder.date).getTime() + 3 * 24 * 60 * 60 * 1000).toISOString()
                : null,
            icon: <Truck className="h-5 w-5" />,
          },
          {
            step: 4,
            label: "Entregado",
            date:
              foundOrder.status === "completed"
                ? new Date(new Date(foundOrder.date).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString()
                : null,
            icon: <CheckCircle className="h-5 w-5" />,
          },
        ]

        setOrderStatus(statusTimeline)
      }
    }
  }, [orderId, orders, isAuthenticated, isLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    )
  }

  if (!order) {
    return notFound()
  }

  // Formatear precio según la moneda local
  const formatPrice = (price: number) => {
    return `${regionData.currencySymbol}${price.toLocaleString()}`
  }

  // Formatear fecha
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Pendiente"

    try {
      const date = new Date(dateString)
      return format(date, "d 'de' MMMM, yyyy", { locale: es })
    } catch (error) {
      return dateString
    }
  }

  // Obtener el color de la insignia según el estado del pedido
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "processing":
        return "bg-blue-500"
      case "pending":
        return "bg-yellow-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  // Traducir el estado del pedido
  const translateStatus = (status: string) => {
    switch (status) {
      case "completed":
        return "Completado"
      case "processing":
        return "En proceso"
      case "pending":
        return "Pendiente"
      case "cancelled":
        return "Cancelado"
      default:
        return status
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12 mt-20">
        <Link href="/perfil" className="inline-flex items-center text-accent hover:text-accent/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a mi perfil
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Detalles del Pedido #{order.id}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Realizado el {formatDate(order.date)}</p>
                </div>
                <Badge className={getStatusBadgeColor(order.status)}>{translateStatus(order.status)}</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {/* Línea de tiempo del pedido */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Estado del pedido</h3>
                    <div className="relative">
                      {/* Línea de conexión */}
                      <div className="absolute left-6 top-0 h-full w-0.5 bg-muted"></div>

                      {/* Pasos */}
                      <div className="space-y-8">
                        {orderStatus.map((status, index) => (
                          <div key={index} className="relative flex items-start">
                            <div
                              className={`flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                                status.date ? "border-accent bg-accent text-white" : "border-muted bg-background"
                              } z-10`}
                            >
                              {status.icon}
                            </div>
                            <div className="ml-4 mt-1">
                              <p className="font-medium">{status.label}</p>
                              <p className="text-sm text-muted-foreground">{formatDate(status.date)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Productos del pedido */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Productos</h3>
                    <div className="space-y-4">
                      {order.items.map((item: any) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <Link href={`/producto/${item.id}`} className="font-medium hover:text-accent">
                              {item.name}
                            </Link>
                            <p className="text-sm text-muted-foreground">Cantidad: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                            <p className="text-sm text-muted-foreground">{formatPrice(item.price)} por unidad</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Información de Entrega</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Dirección de entrega</h4>
                    <p className="text-muted-foreground">
                      Calle Principal 123
                      <br />
                      Ciudad
                      <br />
                      Código Postal
                      <br />
                      País
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Método de envío</h4>
                    <p className="text-muted-foreground">Envío estándar</p>
                    <p className="text-sm text-muted-foreground mt-1">Tiempo estimado de entrega: 5-7 días hábiles</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(order.total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Envío</span>
                    <span>Gratis</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Impuestos</span>
                    <span>Incluidos</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatPrice(order.total)}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Método de pago</span>
                    <span className="text-sm font-medium">Tarjeta de crédito</span>
                  </div>

                  <div className="rounded-md bg-muted p-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">
                        Para cualquier consulta sobre tu pedido, contáctanos a través de nuestro formulario de contacto
                        o por WhatsApp.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      Contactar soporte
                    </Button>
                    <Button variant="outline" className="w-full">
                      Descargar factura
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>¿Necesitas ayuda?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    Seguimiento del envío
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Solicitar devolución
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Reportar un problema
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
