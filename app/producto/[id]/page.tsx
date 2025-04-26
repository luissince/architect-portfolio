"use client"

import type React from "react"

import { useState } from "react"
import { useParams, notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Check, Truck, ShieldCheck, CreditCard, Minus, Plus } from "lucide-react"
import { useRegion } from "@/context/region-context"
import { useLanguage } from "@/context/language-context"
import { useCart } from "@/context/cart-context"
import SocialFloatButtons from "@/components/social-float-buttons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import CommentsSection, { type Comment, type CommentReply } from "@/components/comments-section"
import { v4 as uuidv4 } from "uuid"
import ImageGallery from "@/components/image-gallery"
import { toast } from "sonner"

// Datos simulados de productos con modelos 3D y videos
const products = {
  furniture: [
    {
      id: "f1",
      name: "Silla Minimalista",
      price: 450,
      image: "/placeholder.svg?height=400&width=400",
      gallery: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      videos: [
        "/placeholder.svg?height=600&width=600", // Simulación de video
      ],
      model3d: "/chair.glb", // Ruta al modelo 3D
      description:
        "Silla de diseño minimalista con estructura de acero y asiento de cuero natural. Perfecta para espacios contemporáneos.",
      details:
        "Esta silla combina la simplicidad del diseño minimalista con materiales de alta calidad. La estructura está fabricada en acero inoxidable con acabado cepillado, mientras que el asiento y respaldo están tapizados en cuero natural de primera calidad. Su diseño ergonómico garantiza comodidad sin sacrificar estética.",
      dimensions: {
        width: "56 cm",
        depth: "60 cm",
        height: "82 cm",
        weight: "8 kg",
      },
      materials: ["Acero inoxidable", "Cuero natural", "Espuma de alta densidad"],
      colors: ["Negro", "Marrón", "Blanco crema"],
      category: "furniture",
      stock: 12,
      comments: [
        {
          id: "1",
          author: {
            name: "María López",
            initials: "ML",
          },
          content: "¿Esta silla está disponible en color azul? Me encantaría combinarla con mi decoración actual.",
          date: new Date("2023-10-15"),
          likes: 3,
          isLiked: false,
          isQuestion: true,
          replies: [
            {
              id: "1-1",
              author: {
                name: "Estudio Arquitectura",
                initials: "EA",
                isAdmin: true,
              },
              content:
                "Hola María, actualmente solo disponemos de los colores listados (Negro, Marrón y Blanco crema). Sin embargo, podemos hacer un pedido especial en azul si lo deseas. El tiempo de entrega sería de aproximadamente 4-6 semanas. ¿Te interesaría esta opción?",
              date: new Date("2023-10-16"),
              likes: 1,
              isLiked: false,
            },
          ],
        },
        {
          id: "2",
          author: {
            name: "Carlos Rodríguez",
            initials: "CR",
          },
          content:
            "Compré esta silla hace un mes y estoy encantado con la calidad. El cuero es suave pero resistente, y la estructura es muy estable. Totalmente recomendable.",
          date: new Date("2023-09-28"),
          likes: 7,
          isLiked: false,
          isQuestion: false,
        },
      ],
    },
    {
      id: "f2",
      name: "Mesa de Centro",
      price: 780,
      image: "/placeholder.svg?height=400&width=400",
      gallery: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      description: "Mesa de centro con diseño geométrico, tablero de mármol y base de metal dorado.",
      details:
        "Esta elegante mesa de centro combina un tablero de mármol natural con una base geométrica de metal con acabado dorado. Su diseño sofisticado la convierte en una pieza focal para cualquier sala de estar. El mármol está tratado para resistir manchas y cada pieza es única debido a las vetas naturales del material.",
      dimensions: {
        width: "120 cm",
        depth: "70 cm",
        height: "45 cm",
        weight: "35 kg",
      },
      materials: ["Mármol natural", "Metal con acabado dorado"],
      colors: ["Mármol blanco/Base dorada", "Mármol negro/Base dorada"],
      category: "furniture",
      stock: 5,
      comments: [],
    },
  ],
  decoration: [
    {
      id: "d1",
      name: "Lámpara Geométrica",
      price: 180,
      image: "/placeholder.svg?height=400&width=400",
      gallery: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      description: "Lámpara colgante con diseño geométrico en metal negro y detalles en latón.",
      details:
        "Esta lámpara colgante combina un diseño geométrico contemporáneo con materiales de alta calidad. La estructura está fabricada en metal con acabado negro mate y detalles en latón cepillado. Proporciona una iluminación ambiental perfecta para comedores, salas de estar o entradas.",
      dimensions: {
        diameter: "45 cm",
        height: "50 cm",
        weight: "3.2 kg",
      },
      materials: ["Metal con acabado negro mate", "Latón cepillado"],
      colors: ["Negro/Latón"],
      category: "decoration",
      stock: 8,
      comments: [],
    },
  ],
  materials: [
    {
      id: "m1",
      name: "Mármol Carrara",
      price: 180,
      unit: "m²",
      image: "/placeholder.svg?height=400&width=400",
      gallery: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      description: "Mármol blanco Carrara de alta calidad, ideal para encimeras, suelos y revestimientos.",
      details:
        "El mármol Carrara es reconocido mundialmente por su belleza atemporal. Este mármol blanco con sutiles vetas grises proviene de las canteras de Carrara, Italia. Cada pieza es única, con patrones de vetas diferentes. Ideal para encimeras de cocina, suelos, revestimientos de baño y elementos decorativos.",
      specifications: {
        thickness: "20 mm",
        finish: "Pulido",
        origin: "Carrara, Italia",
      },
      applications: ["Encimeras", "Suelos", "Revestimientos", "Elementos decorativos"],
      maintenance:
        "Requiere sellado periódico para proteger contra manchas. Limpiar con productos específicos para piedra natural.",
      category: "materials",
      stock: 200,
      comments: [],
    },
  ],
}

// Función para encontrar un producto por ID
const findProductById = (id: string) => {
  for (const category in products) {
    const found = products[category as keyof typeof products].find((p) => p.id === id)
    if (found) return found
  }
  return null
}

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params?.id as string

  // Verificar si tenemos un ID válido
  if (!productId) {
    return notFound()
  }

  const product = findProductById(productId)

  // Si no se encuentra el producto, mostrar la página 404
  if (!product) {
    return notFound()
  }

  const { regionData } = useRegion()
  const { t } = useLanguage()
  const { addItem } = useCart()

  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    acceptTerms: false,
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [comments, setComments] = useState<Comment[]>(product.comments || [])
  const [viewMode, setViewMode] = useState<"gallery" | "3d">("gallery")

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormState((prev) => ({ ...prev, acceptTerms: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    console.log("Form submitted:", formState)

    // Simular envío exitoso
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1000)
  }

  // Formatear precio según la moneda local
  const formatPrice = (price: number) => {
    return `${regionData.currencySymbol}${price.toLocaleString()}`
  }

  // Funciones para la sección de comentarios
  const handleAddComment = (newCommentData: Omit<Comment, "id" | "date" | "likes" | "isLiked" | "replies">) => {
    const newComment: Comment = {
      ...newCommentData,
      id: uuidv4(),
      date: new Date(),
      likes: 0,
      isLiked: false,
      replies: [],
    }

    setComments((prev) => [newComment, ...prev])
  }

  const handleAddReply = (commentId: string, replyData: Omit<CommentReply, "id" | "date" | "likes" | "isLiked">) => {
    const newReply: CommentReply = {
      ...replyData,
      id: uuidv4(),
      date: new Date(),
      likes: 0,
      isLiked: false,
    }

    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply],
          }
        }
        return comment
      }),
    )
  }

  const handleLikeComment = (commentId: string) => {
    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          const isLiked = !comment.isLiked
          return {
            ...comment,
            likes: isLiked ? comment.likes + 1 : comment.likes - 1,
            isLiked,
          }
        }
        return comment
      }),
    )
  }

  const handleLikeReply = (commentId: string, replyId: string) => {
    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId && comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map((reply) => {
              if (reply.id === replyId) {
                const isLiked = !reply.isLiked
                return {
                  ...reply,
                  likes: isLiked ? reply.likes + 1 : reply.likes - 1,
                  isLiked,
                }
              }
              return reply
            }),
          }
        }
        return comment
      }),
    )
  }

  const handleAddToCart = () => {
    if (product.category === "materials") return

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
      category: product.category,
    })

    toast.success("Producto añadido al carrito", {
      description: `${quantity} x ${product.name}`,
      duration: 3000,
    })
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12 mt-20">
        <Link href="/#products" className="inline-flex items-center text-accent hover:text-accent/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Productos
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            {/* Selector de modo de visualización */}
            <div className="flex justify-end mb-4">
              <div className="inline-flex rounded-md shadow-sm">
                <Button
                  variant={viewMode === "gallery" ? "default" : "outline"}
                  className={`rounded-l-md ${viewMode === "gallery" ? "bg-accent text-accent-foreground" : ""}`}
                  onClick={() => setViewMode("gallery")}
                >
                  Galería
                </Button>
                <Button
                  variant={viewMode === "3d" ? "default" : "outline"}
                  className={`rounded-r-md ${viewMode === "3d" ? "bg-accent text-accent-foreground" : ""}`}
                  onClick={() => setViewMode("3d")}
                  disabled={!product.model3d}
                >
                  Vista 3D
                </Button>
              </div>
            </div>

            {/* Visualización según el modo seleccionado */}
         
              <ImageGallery
                images={product.gallery || [product.image]}
                videos={product.videos || []}
                alt={product.name}
              />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

            <div className="flex items-center mb-6">
              <span className="text-2xl font-semibold text-accent">
                {formatPrice(product.price)}
                {product.unit ? `/${product.unit}` : ""}
              </span>

              {product.stock <= 5 && (
                <span className="ml-4 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">¡Últimas unidades!</span>
              )}
            </div>

            <p className="text-muted-foreground mb-8">{product.description}</p>

            {product.category !== "materials" && (
              <div className="flex items-center space-x-4 mb-8">
                <span className="text-sm font-medium">Cantidad:</span>
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-3 py-2 hover:bg-muted transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-3 py-2 hover:bg-muted transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">{product.stock} disponibles</span>
              </div>
            )}

            <div className="space-y-4 mb-8">
              <Button
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={() => setShowRequestForm(true)}
              >
                Solicitar información
              </Button>

              {product.category !== "materials" && (
                <Button variant="outline" className="w-full" onClick={handleAddToCart}>
                  Añadir al carrito
                </Button>
              )}
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-center">
                <Truck className="h-5 w-5 mr-3 text-muted-foreground" />
                <span>Envío a todo el país en 5-7 días laborables</span>
              </div>

              <div className="flex items-center">
                <ShieldCheck className="h-5 w-5 mr-3 text-muted-foreground" />
                <span>Garantía de 2 años en todos nuestros productos</span>
              </div>

              <div className="flex items-center">
                <CreditCard className="h-5 w-5 mr-3 text-muted-foreground" />
                <span>Pago seguro con tarjeta, transferencia o PayPal</span>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="description" className="mb-16" onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="description">Descripción</TabsTrigger>
            <TabsTrigger value="details">Especificaciones</TabsTrigger>
            <TabsTrigger value="shipping">Envío y devoluciones</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-0">
            <Card>
              <CardContent className="pt-6">
                <p className="whitespace-pre-line">{product.details}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="mt-0">
            <Card>
              <CardContent className="pt-6">
                {product.category === "furniture" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Dimensiones</h3>
                      <ul className="grid grid-cols-2 gap-2">
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Ancho:</span>
                          <span>{product.dimensions.width}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Profundidad:</span>
                          <span>{product.dimensions.depth}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Altura:</span>
                          <span>{product.dimensions.height}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Peso:</span>
                          <span>{product.dimensions.weight}</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Materiales</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {product.materials.map((material, index) => (
                          <li key={index}>{material}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Colores disponibles</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {product.colors.map((color, index) => (
                          <li key={index}>{color}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {product.category === "decoration" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Dimensiones</h3>
                      <ul className="grid grid-cols-2 gap-2">
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Diámetro:</span>
                          <span>{product.dimensions.diameter}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Altura:</span>
                          <span>{product.dimensions.height}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Peso:</span>
                          <span>{product.dimensions.weight}</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Materiales</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {product.materials.map((material, index) => (
                          <li key={index}>{material}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Colores disponibles</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {product.colors.map((color, index) => (
                          <li key={index}>{color}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {product.category === "materials" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Especificaciones</h3>
                      <ul className="grid grid-cols-2 gap-2">
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Grosor:</span>
                          <span>{product.specifications.thickness}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Acabado:</span>
                          <span>{product.specifications.finish}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Origen:</span>
                          <span>{product.specifications.origin}</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Aplicaciones</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {product.applications.map((application, index) => (
                          <li key={index}>{application}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Mantenimiento</h3>
                      <p>{product.maintenance}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shipping" className="mt-0">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Envío</h3>
                  <p className="mb-2">Realizamos envíos a todo el país. Los plazos de entrega estimados son:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Capitales: 3-5 días laborables</li>
                    <li>Resto del país: 5-7 días laborables</li>
                    <li>Zonas insulares: 7-10 días laborables</li>
                  </ul>
                  <p className="mt-2">
                    Los gastos de envío se calculan en función del destino y el volumen del pedido.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Devoluciones</h3>
                  <p className="mb-2">
                    Aceptamos devoluciones dentro de los 14 días siguientes a la recepción del producto, siempre que se
                    encuentre en su estado original.
                  </p>
                  <p>Para iniciar una devolución, contacte con nuestro servicio de atención al cliente.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Garantía</h3>
                  <p>Todos nuestros productos cuentan con una garantía de 2 años que cubre defectos de fabricación.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {showRequestForm && !isSubmitted && (
          <div className="bg-card rounded-lg shadow-md p-8 mb-16">
            <h2 className="text-2xl font-semibold mb-6">Solicitar información sobre {product.name}</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo *</Label>
                  <Input id="name" name="name" value={formState.name} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono *</Label>
                <Input id="phone" name="phone" value={formState.phone} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensaje *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder={`Me interesa el producto ${product.name}. Quisiera recibir más información sobre...`}
                />
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox id="terms" checked={formState.acceptTerms} onCheckedChange={handleCheckboxChange} required />
                <Label htmlFor="terms" className="text-sm leading-tight">
                  Acepto que mis datos sean procesados de acuerdo con la política de privacidad para recibir
                  comunicaciones relacionadas con mi solicitud. *
                </Label>
              </div>

              <div className="flex space-x-4">
                <Button
                  type="submit"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  disabled={!formState.acceptTerms}
                >
                  Enviar solicitud
                </Button>

                <Button type="button" variant="outline" onClick={() => setShowRequestForm(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        )}

        {isSubmitted && (
          <div className="bg-card rounded-lg shadow-md p-8 text-center mb-16">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">¡Solicitud enviada con éxito!</h2>
            <p className="text-muted-foreground mb-6">
              Gracias por su interés en {product.name}. Hemos recibido su solicitud y nos pondremos en contacto con
              usted en las próximas 24-48 horas.
            </p>
            <Button
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              onClick={() => setShowRequestForm(false)}
            >
              Continuar explorando
            </Button>
          </div>
        )}

        {/* Sección de comentarios y preguntas */}
        <div className="mb-16">
          <CommentsSection
            itemTitle={product.name}
            comments={comments}
            onAddComment={handleAddComment}
            onAddReply={handleAddReply}
            onLikeComment={handleLikeComment}
            onLikeReply={handleLikeReply}
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-8">Productos relacionados</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products[product.category as keyof typeof products]
              .filter((p) => p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link href={`/producto/${relatedProduct.id}`} key={relatedProduct.id}>
                  <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                    <div className="relative h-48 w-full">
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-2">{relatedProduct.name}</h3>
                      <p className="text-accent font-semibold">
                        {formatPrice(relatedProduct.price)}
                        {relatedProduct.unit ? `/${relatedProduct.unit}` : ""}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>

      <Footer />
      <SocialFloatButtons />
    </main>
  )
}
