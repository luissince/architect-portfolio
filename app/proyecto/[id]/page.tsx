"use client"
import { useState, useEffect } from "react"
import { useParams, notFound } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, MapPin, User, View as View3d, Image as ImageIcon } from "lucide-react"
import SocialFloatButtons from "@/components/social-float-buttons"
import CommentsSection, { type Comment, type CommentReply } from "@/components/comments-section"
import { v4 as uuidv4 } from "uuid"
import ImageGallery from "@/components/image-gallery"
import Model3DViewer from "@/components/model-viewer-3d"
import { Project, useLanguage } from "@/context/language-context"

export default function ProjectDetailPage() {
  const params = useParams()
  const projectId = params?.id as string
  const { t } = useLanguage()

  // Verificar si tenemos un ID válido
  if (!projectId) {
    return notFound()
  }

  const project = (t("projectsList") as Project[]).find((p) => p.id === Number(projectId))

  // Si no se encuentra el proyecto, mostrar la página 404
  if (!project) {
    return notFound()
  }

  const initialComments = project.comments || []
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [viewMode, setViewMode] = useState<"gallery" | "3d">("gallery")

  useEffect(() => {
    setComments(initialComments)
  }, [initialComments])

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

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12 mt-20">
        <Link href="/#portfolio" className="inline-flex items-center text-accent hover:text-accent/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Portafolio
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
            <div className="flex flex-wrap gap-4 mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                {project.category === "residential"
                  ? "Residencial"
                  : project.category === "commercial"
                    ? "Comercial"
                    : project.category === "renovation"
                      ? "Renovación"
                      : "Público"}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                <MapPin className="mr-1 h-3 w-3" />
                {project.location}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                {project.year}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                <User className="mr-1 h-3 w-3" />
                {project.client}
              </span>
            </div>
            {/* Selector de modo de visualización */}
            {/* <div className="flex justify-end mb-4">
              <div className="inline-flex rounded-md shadow-sm">
                <Button
                  variant={viewMode === "gallery" ? "default" : "outline"}
                  className={`rounded-l-md ${viewMode === "gallery" ? "bg-accent text-accent-foreground" : ""}`}
                  onClick={() => setViewMode("gallery")}
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Galería
                </Button>
                <Button
                  variant={viewMode === "3d" ? "default" : "outline"}
                  className={`rounded-r-md ${viewMode === "3d" ? "bg-accent text-accent-foreground" : ""}`}
                  onClick={() => setViewMode("3d")}
                  disabled={!project.model3d}
                >
                  <View3d className="h-4 w-4 mr-2" />
                  Modelo 3D
                </Button>
              </div>
            </div> */}
            {/* Visualización según el modo seleccionado */}
            <ImageGallery images={project.images} videos={[project.video]} alt={project.title} />

            {/* {viewMode === "gallery" ? (
              <ImageGallery images={project.images} videos={[project.video]} alt={project.title} />
            ) : (
              project.model3d && (
                <Model3DViewer modelUrl={project.model3d} alt={project.title} />
              )
            )} */}
            <div className="prose max-w-none mb-12 mt-8">
              <h2 className="text-2xl font-semibold mb-4">Descripción del Proyecto</h2>
              <p className="whitespace-pre-line">{project.fullDescription}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold mb-4">Características</h3>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Servicios Proporcionados</h3>
                <ul className="space-y-2">
                  {project.services.map((service, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Sección de comentarios y preguntas */}
            {/* <div className="mb-12">
              <CommentsSection
                itemTitle={project.title}
                comments={comments}
                onAddComment={handleAddComment}
                onAddReply={handleAddReply}
                onLikeComment={handleLikeComment}
                onLikeReply={handleLikeReply}
              />
            </div> */}
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-card rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">Detalles del Proyecto</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Cliente</h4>
                    <p>{project.client}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Arquitecto</h4>
                    <p>{project.architect}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Ubicación</h4>
                    <p>{project.location}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Año</h4>
                    <p>{project.year}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Área</h4>
                    <p>{project.area}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Duración</h4>
                    <p>{project.duration}</p>
                  </div>
                </div>
              </div>
              <div className="bg-accent/5 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">¿Te interesa un proyecto similar?</h3>
                <p className="text-muted-foreground mb-6">
                  Podemos crear un proyecto personalizado adaptado a tus necesidades y preferencias.
                </p>
                <Link href={`/solicitar-proyecto/${project.id}`}>
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    Solicitar un proyecto similar
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <SocialFloatButtons />
    </main>
  )
}
