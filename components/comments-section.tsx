"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThumbsUp, MoreVertical, Reply, Flag } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"

// Tipos para los comentarios
export type Comment = {
  id: string
  author: {
    name: string
    avatar?: string
    initials: string
  }
  content: string
  date: Date
  likes: number
  isLiked?: boolean
  isQuestion: boolean
  replies?: CommentReply[]
}

export type CommentReply = {
  id: string
  author: {
    name: string
    avatar?: string
    initials: string
    isAdmin?: boolean
  }
  content: string
  date: Date
  likes: number
  isLiked?: boolean
}

type CommentsProps = {
  itemTitle: string
  comments: Comment[]
  onAddComment: (comment: Omit<Comment, "id" | "date" | "likes" | "isLiked" | "replies">) => void
  onAddReply: (commentId: string, reply: Omit<CommentReply, "id" | "date" | "likes" | "isLiked">) => void
  onLikeComment: (commentId: string) => void
  onLikeReply: (commentId: string, replyId: string) => void
}

export default function CommentsSection({
  itemTitle,
  comments,
  onAddComment,
  onAddReply,
  onLikeComment,
  onLikeReply,
}: CommentsProps) {
  const [newComment, setNewComment] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")

  // Filtrar comentarios según la pestaña activa
  const filteredComments =
    activeTab === "all"
      ? comments
      : activeTab === "questions"
        ? comments.filter((c) => c.isQuestion)
        : comments.filter((c) => !c.isQuestion)

  const handleSubmitComment = () => {
    if (!newComment.trim()) return

    onAddComment({
      author: {
        name: "Usuario",
        initials: "U",
      },
      content: newComment,
      isQuestion: newComment.trim().endsWith("?"),
    })

    setNewComment("")
  }

  const handleSubmitReply = (commentId: string) => {
    if (!replyContent.trim()) return

    onAddReply(commentId, {
      author: {
        name: "Usuario",
        initials: "U",
      },
      content: replyContent,
    })

    setReplyContent("")
    setReplyingTo(null)
  }

  const formatDate = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true, locale: es })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Comentarios y Preguntas</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder={`Deja un comentario o pregunta sobre ${itemTitle}...`}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={4}
            className="mb-4"
          />
          <div className="flex justify-end">
            <Button
              onClick={handleSubmitComment}
              disabled={!newComment.trim()}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Publicar comentario
            </Button>
          </div>
        </CardContent>
      </Card>

      <div>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="all">Todos ({comments.length})</TabsTrigger>
            <TabsTrigger value="questions">Preguntas ({comments.filter((c) => c.isQuestion).length})</TabsTrigger>
            <TabsTrigger value="comments">Comentarios ({comments.filter((c) => !c.isQuestion).length})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            {filteredComments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {activeTab === "all"
                  ? "No hay comentarios ni preguntas aún. ¡Sé el primero en comentar!"
                  : activeTab === "questions"
                    ? "No hay preguntas aún. ¿Tienes alguna duda?"
                    : "No hay comentarios aún. ¡Comparte tu opinión!"}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredComments.map((comment) => (
                  <Card key={comment.id} className="border-l-4 border-l-accent">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            {comment.author.avatar && (
                              <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                            )}
                            <AvatarFallback>{comment.author.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{comment.author.name}</div>
                            <div className="text-xs text-muted-foreground">{formatDate(comment.date)}</div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Flag className="h-4 w-4 mr-2" />
                              Reportar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="whitespace-pre-line">{comment.content}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-0">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center space-x-1"
                          onClick={() => onLikeComment(comment.id)}
                        >
                          <ThumbsUp className={`h-4 w-4 ${comment.isLiked ? "fill-accent text-accent" : ""}`} />
                          <span>{comment.likes}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center space-x-1"
                          onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                        >
                          <Reply className="h-4 w-4" />
                          <span>Responder</span>
                        </Button>
                      </div>
                      <div>
                        {comment.isQuestion && (
                          <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">Pregunta</span>
                        )}
                      </div>
                    </CardFooter>

                    {/* Área de respuesta */}
                    {replyingTo === comment.id && (
                      <div className="px-6 pb-4">
                        <Textarea
                          placeholder="Escribe tu respuesta..."
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          rows={2}
                          className="mb-2"
                        />
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setReplyingTo(null)
                              setReplyContent("")
                            }}
                          >
                            Cancelar
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleSubmitReply(comment.id)}
                            disabled={!replyContent.trim()}
                            className="bg-accent hover:bg-accent/90 text-accent-foreground"
                          >
                            Responder
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Respuestas */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="px-6 pb-4 space-y-3">
                        <div className="text-sm font-medium">
                          {comment.replies.length} {comment.replies.length === 1 ? "respuesta" : "respuestas"}
                        </div>
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="pl-4 border-l-2 border-muted">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center space-x-3">
                                <Avatar className="h-8 w-8">
                                  {reply.author.avatar && (
                                    <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                                  )}
                                  <AvatarFallback>{reply.author.initials}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium flex items-center">
                                    {reply.author.name}
                                    {reply.author.isAdmin && (
                                      <span className="ml-2 text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                                        Admin
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-xs text-muted-foreground">{formatDate(reply.date)}</div>
                                </div>
                              </div>
                            </div>
                            <div className="ml-11">
                              <p className="text-sm whitespace-pre-line">{reply.content}</p>
                              <div className="mt-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="flex items-center space-x-1 h-7 px-2"
                                  onClick={() => onLikeReply(comment.id, reply.id)}
                                >
                                  <ThumbsUp className={`h-3 w-3 ${reply.isLiked ? "fill-accent text-accent" : ""}`} />
                                  <span className="text-xs">{reply.likes}</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
