"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Package, User, Heart, Settings, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { useRegion } from "@/context/region-context"

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, orders } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { regionData } = useRegion()
  const [activeTab, setActiveTab] = useState("pedidos")

  // Obtener la pestaña de los parámetros de búsqueda
  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab) {
      setActiveTab(tab)
    }
  }, [searchParams])

  // Redirigir si no está autenticado
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null // No renderizar nada mientras se redirige
  }

  // Formatear precio según la moneda local
  const formatPrice = (price: number) => {
    return `${regionData.currencySymbol}${price.toLocaleString()}`
  }

  // Formatear fecha
  const formatDate = (dateString: string) => {
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

  // Obtener el icono según el estado del pedido
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "processing":
        return <Clock className="h-4 w-4" />
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      case "cancelled":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <User className="h-12 w-12 text-accent" />
                  </div>
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription className="text-center mt-1">{user.email}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <nav className="flex flex-col space-y-1">
                  <Button
                    variant={activeTab === "pedidos" ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => setActiveTab("pedidos")}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Mis Pedidos
                  </Button>
                  <Button
                    variant={activeTab === "historial" ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => setActiveTab("historial")}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Historial de Compras
                  </Button>
                  <Button
                    variant={activeTab === "favoritos" ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => setActiveTab("favoritos")}
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Favoritos
                  </Button>
                  <Button
                    variant={activeTab === "perfil" ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => setActiveTab("perfil")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Configuración
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Contenido principal */}
          <div className="md:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
                <TabsTrigger value="historial">Historial</TabsTrigger>
                <TabsTrigger value="favoritos">Favoritos</TabsTrigger>
                <TabsTrigger value="perfil">Perfil</TabsTrigger>
              </TabsList>

              {/* Pestaña de Pedidos */}
              <TabsContent value="pedidos">
                <Card>
                  <CardHeader>
                    <CardTitle>Mis Pedidos Recientes</CardTitle>
                    <CardDescription>Visualiza y gestiona tus pedidos recientes.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {orders.length > 0 ? (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div
                            key={order.id}
                            className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors"
                          >
                            <div className="flex flex-col mb-4 md:mb-0">
                              <div className="flex items-center">
                                <span className="font-medium">Pedido #{order.id}</span>
                                <Badge className={`ml-2 ${getStatusBadgeColor(order.status)}`}>
                                  <span className="flex items-center">
                                    {getStatusIcon(order.status)}
                                    <span className="ml-1">{translateStatus(order.status)}</span>
                                  </span>
                                </Badge>
                              </div>
                              <span className="text-sm text-muted-foreground mt-1">{formatDate(order.date)}</span>
                              <span className="text-sm mt-1">
                                {order.items.length} {order.items.length === 1 ? "producto" : "productos"}
                              </span>
                            </div>
                            <div className="flex flex-col md:items-end w-full md:w-auto">
                              <span className="font-medium">{formatPrice(order.total)}</span>
                              <Button variant="outline" size="sm" className="mt-2" asChild>
                                <Link href={`/pedido/${order.id}`}>Ver detalles</Link>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Package className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">No tienes pedidos recientes</h3>
                        <p className="mt-2 text-sm text-muted-foreground">Cuando realices un pedido, aparecerá aquí.</p>
                        <Button className="mt-4" asChild>
                          <Link href="/productos">Ver productos</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Pestaña de Historial */}
              <TabsContent value="historial">
                <Card>
                  <CardHeader>
                    <CardTitle>Historial de Compras</CardTitle>
                    <CardDescription>Un registro completo de todas tus compras anteriores.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {orders.length > 0 ? (
                      <div className="space-y-6">
                        {/* Agrupar por año y mes */}
                        <div>
                          <h3 className="text-lg font-medium mb-4">2025</h3>
                          <div className="space-y-4">
                            {orders.map((order) => (
                              <div
                                key={order.id}
                                className="flex flex-col p-4 border rounded-lg hover:bg-accent/5 transition-colors"
                              >
                                <div className="flex flex-col md:flex-row justify-between">
                                  <div>
                                    <div className="flex items-center">
                                      <span className="font-medium">Pedido #{order.id}</span>
                                      <Badge className={`ml-2 ${getStatusBadgeColor(order.status)}`}>
                                        {translateStatus(order.status)}
                                      </Badge>
                                    </div>
                                    <span className="text-sm text-muted-foreground">{formatDate(order.date)}</span>
                                  </div>
                                  <span className="font-medium mt-2 md:mt-0">{formatPrice(order.total)}</span>
                                </div>

                                <Separator className="my-4" />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {order.items.map((item) => (
                                    <div key={item.id} className="flex items-center gap-3">
                                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                                        <Image
                                          src={item.image || "/placeholder.svg"}
                                          alt={item.name}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                      <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                          {item.quantity} x {formatPrice(item.price)}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                <div className="mt-4 flex justify-end">
                                  <Button variant="outline" size="sm" asChild>
                                    <Link href={`/pedido/${order.id}`}>Ver detalles</Link>
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Clock className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">No tienes historial de compras</h3>
                        <p className="mt-2 text-sm text-muted-foreground">Tu historial de compras aparecerá aquí.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Pestaña de Favoritos */}
              <TabsContent value="favoritos">
                <Card>
                  <CardHeader>
                    <CardTitle>Mis Favoritos</CardTitle>
                    <CardDescription>Productos y servicios que has marcado como favoritos.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">No tienes favoritos</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Los productos que marques como favoritos aparecerán aquí.
                      </p>
                      <Button className="mt-4" asChild>
                        <Link href="/productos">Explorar productos</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Pestaña de Perfil */}
              <TabsContent value="perfil">
                <Card>
                  <CardHeader>
                    <CardTitle>Configuración de Perfil</CardTitle>
                    <CardDescription>Gestiona tu información personal y preferencias.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nombre completo</Label>
                          <Input id="name" defaultValue={user.name} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue={user.email} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Teléfono</Label>
                          <Input id="phone" defaultValue={user.phone || ""} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Dirección</Label>
                          <Input id="address" defaultValue={user.address || ""} />
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Cambiar contraseña</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="current-password">Contraseña actual</Label>
                            <Input id="current-password" type="password" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="new-password">Nueva contraseña</Label>
                            <Input id="new-password" type="password" />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Preferencias</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="newsletter" className="h-4 w-4" defaultChecked />
                            <Label htmlFor="newsletter">Recibir newsletter</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="notifications" className="h-4 w-4" defaultChecked />
                            <Label htmlFor="notifications">Notificaciones de pedidos</Label>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button type="submit">Guardar cambios</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
