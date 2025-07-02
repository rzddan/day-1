"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send, Minimize2 } from "lucide-react"

export function AIAssistant() {
  const [isMinimized, setIsMinimized] = useState(true)
  const [message, setMessage] = useState("")

  if (isMinimized) {
    return (
      <div className="fixed bottom-20 md:bottom-6 right-4 z-40">
        <Button onClick={() => setIsMinimized(false)} className="h-12 w-12 rounded-full shadow-lg">
          <Bot className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-40 w-80 max-w-[calc(100vw-2rem)]">
      <Card className="shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <Bot className="h-4 w-4" />
              Assistente IA
            </CardTitle>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsMinimized(true)}>
              <Minimize2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <ScrollArea className="h-48 mb-3">
            <div className="space-y-2">
              <div className="bg-muted p-2 rounded-lg text-sm">Olá! Como posso ajudar você hoje?</div>
            </div>
          </ScrollArea>
          <div className="flex gap-2">
            <Input
              placeholder="Digite sua mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="text-sm"
            />
            <Button size="icon" className="h-9 w-9">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
