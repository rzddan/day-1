"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Bot,
  Send,
  Mic,
  Paperclip,
  MoreVertical,
  Zap,
  TrendingUp,
  FileText,
  Calculator,
  BarChart3,
  Building2,
  Target,
  Lightbulb,
  Clock,
  Star,
  Plus,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Message {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
  type?: "text" | "analysis" | "suggestion"
}

interface QuickAction {
  id: string
  title: string
  description: string
  icon: any
  prompt: string
  category: "analysis" | "planning" | "reporting" | "insights"
  color: string
}

const quickActions: QuickAction[] = [
  {
    id: "cash-flow",
    title: "Análise de Fluxo de Caixa",
    description: "Analise o fluxo de caixa atual e projeções",
    icon: TrendingUp,
    prompt: "Faça uma análise detalhada do fluxo de caixa das empresas no último trimestre",
    category: "analysis",
    color: "bg-blue-500",
  },
  {
    id: "financial-report",
    title: "Relatório Financeiro",
    description: "Gere um relatório financeiro completo",
    icon: FileText,
    prompt: "Crie um relatório financeiro executivo com os principais indicadores",
    category: "reporting",
    color: "bg-green-500",
  },
  {
    id: "budget-planning",
    title: "Planejamento Orçamentário",
    description: "Ajude com o planejamento do orçamento",
    icon: Calculator,
    prompt: "Auxilie no planejamento orçamentário para o próximo trimestre",
    category: "planning",
    color: "bg-purple-500",
  },
  {
    id: "performance-metrics",
    title: "Métricas de Performance",
    description: "Analise as métricas de performance",
    icon: BarChart3,
    prompt: "Analise as métricas de performance das empresas e projetos",
    category: "analysis",
    color: "bg-orange-500",
  },
  {
    id: "company-insights",
    title: "Insights de Empresas",
    description: "Obtenha insights sobre as empresas",
    icon: Building2,
    prompt: "Forneça insights estratégicos sobre o desempenho das empresas",
    category: "insights",
    color: "bg-cyan-500",
  },
  {
    id: "goal-tracking",
    title: "Acompanhamento de Metas",
    description: "Monitore o progresso das metas",
    icon: Target,
    prompt: "Analise o progresso das metas e objetivos estabelecidos",
    category: "analysis",
    color: "bg-red-500",
  },
]

const quickPrompts = [
  "Como está o desempenho financeiro geral?",
  "Quais são os principais riscos identificados?",
  "Sugira melhorias para o fluxo de caixa",
  "Analise a rentabilidade dos projetos",
  "Identifique oportunidades de crescimento",
  "Compare o desempenho entre empresas",
]

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Olá! Sou seu assistente financeiro inteligente. Como posso ajudá-lo hoje?",
      sender: "assistant",
      timestamp: new Date(),
      type: "text",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Entendi sua solicitação: "${content}". Estou analisando os dados financeiros e preparando uma resposta detalhada para você.`,
        sender: "assistant",
        timestamp: new Date(),
        type: "analysis",
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleQuickAction = (action: QuickAction) => {
    handleSendMessage(action.prompt)
  }

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "analysis":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "planning":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "reporting":
        return "bg-green-100 text-green-800 border-green-200"
      case "insights":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="page-layout">
      <div className="page-header">
        <div className="container-page py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-heading-2">Assistente IA</h1>
                <p className="text-caption">Seu consultor financeiro inteligente</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Online
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Limpar conversa</DropdownMenuItem>
                  <DropdownMenuItem>Exportar chat</DropdownMenuItem>
                  <DropdownMenuItem>Configurações</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      <div className="page-content">
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Quick Actions Sidebar */}
          <div className="lg:col-span-1 space-content">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-heading-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Ações Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-compact">
                {quickActions.map((action) => {
                  const Icon = action.icon
                  return (
                    <Card
                      key={action.id}
                      className="card-interactive p-3 cursor-pointer hover:shadow-md"
                      onClick={() => handleQuickAction(action)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 ${action.color} rounded-lg flex-shrink-0`}>
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-body font-medium line-clamp-1">{action.title}</h4>
                          <p className="text-caption line-clamp-2">{action.description}</p>
                          <Badge className={`mt-2 text-xs ${getCategoryColor(action.category)}`}>
                            {action.category === "analysis"
                              ? "Análise"
                              : action.category === "planning"
                                ? "Planejamento"
                                : action.category === "reporting"
                                  ? "Relatório"
                                  : "Insights"}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-heading-4 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  Prompts Rápidos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-compact">
                {quickPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-left h-auto p-3 text-body-small"
                    onClick={() => handleQuickPrompt(prompt)}
                  >
                    <Plus className="h-3 w-3 mr-2 flex-shrink-0" />
                    <span className="line-clamp-2">{prompt}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[calc(100vh-12rem)]">
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/ai-avatar.png" />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        AI
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-heading-4">Assistente Financeiro</h3>
                      <p className="text-caption">Especialista em análise financeira</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-caption">Ativo</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0 flex flex-col h-full">
                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-items">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.sender === "assistant" && (
                          <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                              AI
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                            message.sender === "user"
                              ? "bg-primary text-primary-foreground ml-12"
                              : message.type === "analysis"
                                ? "bg-blue-50 border border-blue-200 text-blue-900"
                                : "bg-muted"
                          }`}
                        >
                          <p className="text-body selectable">{message.content}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs opacity-70">
                              {message.timestamp.toLocaleTimeString("pt-BR", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                            {message.type === "analysis" && (
                              <Badge variant="secondary" className="text-xs">
                                <BarChart3 className="h-3 w-3 mr-1" />
                                Análise
                              </Badge>
                            )}
                          </div>
                        </div>
                        {message.sender === "user" && (
                          <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs">EU</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex gap-3 justify-start">
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                            AI
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-muted rounded-2xl px-4 py-3">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="p-4 border-t bg-muted/30">
                  <div className="flex items-end gap-3">
                    <div className="flex-1 relative">
                      <Input
                        ref={inputRef}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Digite sua mensagem..."
                        className="pr-20 min-h-[44px] resize-none"
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage(inputMessage)
                          }
                        }}
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Mic className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleSendMessage(inputMessage)}
                      disabled={!inputMessage.trim() || isTyping}
                      className="h-11 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-caption">
                    <Clock className="h-3 w-3" />
                    <span>Resposta típica em 2-5 segundos</span>
                    <div className="flex items-center gap-1 ml-auto">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span>IA Premium Ativa</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
