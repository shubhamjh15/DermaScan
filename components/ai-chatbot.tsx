"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Send, Bot, User } from "lucide-react"

type Message = {
  id: number
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: 1,
    content: "Hi there! I'm your AI beauty assistant. How can I help you today?",
    sender: "bot",
    timestamp: new Date(),
  },
]

export default function AiChatbot() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Modified to prevent automatic scrolling
  const scrollToBottom = () => {
    // Only scroll if user is already at the bottom or it's the initial message
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50

      if (isAtBottom || messages.length <= 1) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponses = [
        "Based on your skin type, I'd recommend a gentle cleanser with hyaluronic acid.",
        "That's a great question! The 'glass skin' trend is all about achieving a dewy, reflective complexion.",
        "For your concern, try incorporating a vitamin C serum in your morning routine.",
        "The current Gen Z makeup trend is focused on minimal base with bold graphic liner.",
        "I'd recommend trying the 'slugging' technique with a petroleum-based balm at night.",
      ]

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]

      const botMessage: Message = {
        id: messages.length + 2,
        content: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="border-primary/20 bg-card/80 backdrop-blur-lg overflow-hidden">
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-3 flex items-center gap-2 border-b border-border/50">
          <Bot className="h-5 w-5 text-primary" />
          <span className="font-medium">Beauty AI Assistant</span>
        </div>

        <CardContent className="p-0">
          <div
            ref={chatContainerRef}
            className="h-[350px] overflow-y-auto p-4 space-y-4"
            style={{ scrollBehavior: "smooth" }}
          >
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                  <Avatar className={`h-8 w-8 ${message.sender === "bot" ? "bg-primary/20" : "bg-secondary/20"}`}>
                    {message.sender === "bot" ? (
                      <Bot className="h-4 w-4 text-primary" />
                    ) : (
                      <User className="h-4 w-4 text-secondary" />
                    )}
                  </Avatar>

                  <div
                    className={`rounded-lg p-3 text-sm ${
                      message.sender === "user" ? "bg-secondary text-secondary-foreground" : "bg-muted"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[80%]">
                  <Avatar className="h-8 w-8 bg-primary/20">
                    <Bot className="h-4 w-4 text-primary" />
                  </Avatar>

                  <div className="rounded-lg p-3 text-sm bg-muted flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-150"></div>
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-300"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </CardContent>

        <CardFooter className="p-3 border-t border-border/50">
          <form onSubmit={handleSend} className="flex w-full gap-2">
            <Input
              placeholder="Ask about skincare, makeup, or trends..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-border/50 bg-background/50"
            />
            <Button type="submit" size="icon" disabled={!input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
