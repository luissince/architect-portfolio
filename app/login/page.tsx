"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function LoginPage() {
  const router = useRouter()
  const { login, register, isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState("login")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Estados para el formulario de inicio de sesión
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  // Estados para el formulario de registro
  const [registerName, setRegisterName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("")

  // Si el usuario ya está autenticado, redirigir al perfil
  if (isAuthenticated) {
    router.push("/perfil")
    return null
  }

  // Manejar el inicio de sesión
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await login(loginEmail, loginPassword)
      if (success) {
        router.push("/perfil")
      } else {
        setError("Credenciales incorrectas. Inténtalo de nuevo.")
      }
    } catch (err) {
      setError("Ocurrió un error al iniciar sesión. Inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  // Manejar el registro
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validaciones básicas
    if (!registerName.trim()) {
      setError("El nombre es obligatorio")
      return
    }

    if (!registerEmail.trim()) {
      setError("El email es obligatorio")
      return
    }

    if (!registerPassword) {
      setError("La contraseña es obligatoria")
      return
    }

    if (registerPassword !== registerConfirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    setIsLoading(true)

    try {
      const success = await register(registerName, registerEmail, registerPassword)
      if (success) {
        router.push("/perfil")
      } else {
        setError("No se pudo completar el registro. Inténtalo de nuevo.")
      }
    } catch (err) {
      setError("Ocurrió un error al registrarse. Inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12 mt-20">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-md">
            <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                <TabsTrigger value="register">Registrarse</TabsTrigger>
              </TabsList>

              {/* Formulario de inicio de sesión */}
              <TabsContent value="login">
                <Card>
                  <CardHeader>
                    <CardTitle>Iniciar Sesión</CardTitle>
                    <CardDescription>Ingresa tus credenciales para acceder a tu cuenta.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleLogin}>
                      {error && (
                        <Alert variant="destructive" className="mb-4">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}

                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="tu@email.com"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            required
                          />
                        </div>

                        <div className="grid gap-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="password">Contraseña</Label>
                            <Link href="#" className="text-sm text-accent hover:text-accent/80">
                              ¿Olvidaste tu contraseña?
                            </Link>
                          </div>
                          <Input
                            id="password"
                            type="password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            required
                          />
                        </div>

                        <Button type="submit" className="w-full" disabled={isLoading}>
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Iniciando sesión...
                            </>
                          ) : (
                            "Iniciar Sesión"
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex flex-col">
                    <div className="text-sm text-muted-foreground mt-2">
                      <p className="text-center">
                        Para la demostración, usa:
                        <br />
                        Email: demo@example.com
                        <br />
                        Contraseña: password
                      </p>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Formulario de registro */}
              <TabsContent value="register">
                <Card>
                  <CardHeader>
                    <CardTitle>Crear una cuenta</CardTitle>
                    <CardDescription>
                      Completa el formulario para registrarte y acceder a todas las funcionalidades.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleRegister}>
                      {error && (
                        <Alert variant="destructive" className="mb-4">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}

                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Nombre completo</Label>
                          <Input
                            id="name"
                            type="text"
                            placeholder="Tu nombre"
                            value={registerName}
                            onChange={(e) => setRegisterName(e.target.value)}
                            required
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="register-email">Email</Label>
                          <Input
                            id="register-email"
                            type="email"
                            placeholder="tu@email.com"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                            required
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="register-password">Contraseña</Label>
                          <Input
                            id="register-password"
                            type="password"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            required
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                          <Input
                            id="confirm-password"
                            type="password"
                            value={registerConfirmPassword}
                            onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                            required
                          />
                        </div>

                        <Button type="submit" className="w-full" disabled={isLoading}>
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Registrando...
                            </>
                          ) : (
                            "Registrarse"
                          )}
                        </Button>
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
