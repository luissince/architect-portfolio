"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Tipos
type User = {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
}

type OrderItem = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

type Order = {
  id: string
  date: string
  total: number
  status: "pending" | "processing" | "completed" | "cancelled"
  items: OrderItem[]
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  orders: Order[]
}

// Datos de demostración
const demoUser: User = {
  id: "user-1",
  name: "Cliente Demostración",
  email: "demo@example.com",
  phone: "+1234567890",
  address: "Calle Principal 123, Ciudad",
}

const demoOrders: Order[] = [
  {
    id: "order-1",
    date: "2025-04-28T10:30:00Z",
    total: 12500,
    status: "completed",
    items: [
      {
        id: "product-1",
        name: "Silla de Diseño Moderno",
        price: 4500,
        quantity: 2,
        image: "/placeholder.svg?key=qbe8m",
      },
      {
        id: "product-2",
        name: "Mesa de Centro Minimalista",
        price: 3500,
        quantity: 1,
        image: "/placeholder.svg?key=vu10m",
      },
    ],
  },
  {
    id: "order-2",
    date: "2025-04-15T14:20:00Z",
    total: 8700,
    status: "processing",
    items: [
      {
        id: "product-3",
        name: "Lámpara de Pie Contemporánea",
        price: 2900,
        quantity: 3,
        image: "/placeholder.svg?key=xw1eh",
      },
    ],
  },
  {
    id: "order-3",
    date: "2025-03-22T09:15:00Z",
    total: 15800,
    status: "pending",
    items: [
      {
        id: "product-4",
        name: "Estantería Modular",
        price: 7900,
        quantity: 2,
        image: "/placeholder.svg?key=n5ul8",
      },
    ],
  },
]

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Proveedor del contexto
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])

  // Cargar datos del usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const storedOrders = localStorage.getItem("orders")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setOrders(storedOrders ? JSON.parse(storedOrders) : [])
    }

    setIsLoading(false)
  }, [])

  // Función de inicio de sesión
  const login = async (email: string, password: string): Promise<boolean> => {
    // En una implementación real, esto haría una petición a un API
    // Para la demostración, verificamos con el usuario demo
    if (email === demoUser.email && password === "password") {
      setUser(demoUser)
      setOrders(demoOrders)

      // Guardar en localStorage
      localStorage.setItem("user", JSON.stringify(demoUser))
      localStorage.setItem("orders", JSON.stringify(demoOrders))

      return true
    }
    return false
  }

  // Función de registro
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // En una implementación real, esto haría una petición a un API
    // Para la demostración, simulamos un registro exitoso
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
    }

    setUser(newUser)
    setOrders([])

    // Guardar en localStorage
    localStorage.setItem("user", JSON.stringify(newUser))
    localStorage.setItem("orders", JSON.stringify([]))

    return true
  }

  // Función de cierre de sesión
  const logout = () => {
    setUser(null)
    setOrders([])
    localStorage.removeItem("user")
    localStorage.removeItem("orders")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        orders,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}
