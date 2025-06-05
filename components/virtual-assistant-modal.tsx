"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Bot, Loader2 } from "lucide-react"
import { useLanguage } from "@/context/language-context"

type Message = {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?",
    isBot: true,
    timestamp: new Date(),
  },
]

export default function VirtualAssistantModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { language } = useLanguage()
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const translations = {
    title: language === "es" ? "Asistente Virtual" : "Virtual Assistant",
    placeholder: language === "es" ? "Escribe tu mensaje aquí..." : "Type your message here...",
    send: language === "es" ? "Enviar" : "Send",
    typing: language === "es" ? "Escribiendo..." : "Typing...",
    commonQuestions: language === "es" ? "Preguntas frecuentes:" : "Common questions:",
    questions: [
      language === "es" ? "¿Cómo puedo hacer un pedido?" : "How can I place an order?",
      language === "es" ? "¿Cuáles son los métodos de pago?" : "What payment methods do you accept?",
      language === "es" ? "¿Cuánto tiempo tarda la entrega?" : "How long does delivery take?",
      language === "es" ? "¿Puedo personalizar un proyecto?" : "Can I customize a project?",
    ],
  }

  // Respuestas predefinidas para preguntas comunes
  const getResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase()

    if (lowerQuestion.includes("pedido") || lowerQuestion.includes("order")) {
      return language === "es"
        ? "Para hacer un pedido, simplemente navega a la sección de productos o servicios, selecciona lo que deseas y haz clic en 'Añadir al carrito'. Luego puedes finalizar tu compra desde el carrito."
        : "To place an order, simply navigate to the products or services section, select what you want, and click 'Add to cart'. Then you can complete your purchase from the cart."
    }

    if (lowerQuestion.includes("pago") || lowerQuestion.includes("payment")) {
      return language === "es"
        ? "Aceptamos tarjetas de crédito/débito, transferencias bancarias y efectivo contra entrega en algunas zonas. Todos los detalles se muestran en el proceso de pago."
        : "We accept credit/debit cards, bank transfers, and cash on delivery in some areas. All details are shown during the checkout process."
    }

    if (lowerQuestion.includes("entrega") || lowerQuestion.includes("delivery")) {
      return language === "es"
        ? "El tiempo de entrega depende de tu ubicación y el tipo de producto. Generalmente, los productos estándar se entregan en 3-5 días hábiles, mientras que los proyectos personalizados pueden tomar de 2 a 4 semanas."
        : "Delivery time depends on your location and product type. Generally, standard products are delivered within 3-5 business days, while custom projects may take 2-4 weeks."
    }

    if (lowerQuestion.includes("personalizar") || lowerQuestion.includes("customize")) {
      return language === "es"
        ? "¡Sí! Ofrecemos servicios de personalización para la mayoría de nuestros proyectos. Puedes especificar tus requisitos durante el proceso de solicitud o contactarnos directamente para discutir tus necesidades específicas."
        : "Yes! We offer customization services for most of our projects. You can specify your requirements during the request process or contact us directly to discuss your specific needs."
    }

    return language === "es"
      ? "Gracias por tu pregunta. Para obtener información más específica, te recomendamos contactar directamente con nuestro equipo a través de WhatsApp o correo electrónico."
      : "Thank you for your question. For more specific information, we recommend contacting our team directly via WhatsApp or email."
  }

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return

    // Añadir mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simular respuesta del bot después de un breve retraso
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickQuestion = (question: string) => {
    // Añadir la pregunta como mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Simular respuesta del bot después de un breve retraso
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponse(question),
        isBot: true,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Manejar envío con Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bottom-20 right-6 z-40 w-[350px] max-w-[90vw] rounded-lg bg-background shadow-xl border border-border"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-accent" />
              <h3 className="font-medium">{translations.title}</h3>
            </div>
            <button onClick={onClose} className="rounded-full p-1 hover:bg-muted transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages container */}
          <div className="p-4 h-[350px] overflow-y-auto">
            {messages.map((message) => (
              <div key={message.id} className={`mb-3 max-w-[80%] ${message.isBot ? "mr-auto" : "ml-auto"}`}>
                <div
                  className={`p-3 rounded-lg ${
                    message.isBot ? "bg-muted text-foreground" : "bg-accent text-accent-foreground"
                  }`}
                >
                  {message.text}
                </div>
                <div className={`text-xs text-muted-foreground mt-1 ${message.isBot ? "text-left" : "text-right"}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="mb-3 max-w-[80%] mr-auto">
                <div className="p-3 rounded-lg bg-muted text-foreground flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {translations.typing}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick questions */}
          <div className="px-4 py-2 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">{translations.commonQuestions}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {translations.questions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="text-xs bg-muted hover:bg-muted/80 text-foreground px-2 py-1 rounded-full transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input area */}
          <div className="p-3 border-t border-border flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={translations.placeholder}
              className="flex-1 bg-muted p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <button
              onClick={handleSendMessage}
              disabled={inputValue.trim() === ""}
              className="p-2 rounded-md bg-accent text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
