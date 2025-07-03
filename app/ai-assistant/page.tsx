"use client"

import { Bot, Zap, Settings, MessageCircle, Terminal, Calendar, BookOpen } from "lucide-react"

export default function AIAssistantPage() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <Bot className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Agente IA</h1>
        <span className="ml-2 px-2 py-1 rounded bg-muted text-xs text-muted-foreground">Beta</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Chat principal */}
        <div className="md:col-span-2 bg-background rounded-xl border p-6 flex flex-col min-h-[400px]">
          <div className="flex-1 flex flex-col justify-center items-center text-muted-foreground">
            <MessageCircle className="h-10 w-10 mb-2" />
            <p className="text-lg font-semibold">Converse com a IA</p>
            <p className="text-sm">Em breve, você poderá tirar dúvidas, pedir análises e automatizar tarefas.</p>
          </div>
        </div>
        {/* Gadgets/Workflow */}
        <div className="flex flex-col gap-4">
          <div className="bg-muted rounded-lg p-4 flex items-center gap-3">
            <Zap className="h-6 w-6 text-yellow-500" />
            <div>
              <div className="font-medium">Automação de Rotinas</div>
              <div className="text-xs text-muted-foreground">Configure fluxos automáticos para seu dia a dia.</div>
            </div>
          </div>
          <div className="bg-muted rounded-lg p-4 flex items-center gap-3">
            <Calendar className="h-6 w-6 text-blue-500" />
            <div>
              <div className="font-medium">Integração com Calendário</div>
              <div className="text-xs text-muted-foreground">Sincronize tarefas e eventos importantes.</div>
            </div>
          </div>
          <div className="bg-muted rounded-lg p-4 flex items-center gap-3">
            <Terminal className="h-6 w-6 text-purple-500" />
            <div>
              <div className="font-medium">Execução de Scripts</div>
              <div className="text-xs text-muted-foreground">Automatize processos com scripts personalizados.</div>
            </div>
          </div>
          <div className="bg-muted rounded-lg p-4 flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-green-500" />
            <div>
              <div className="font-medium">Base de Conhecimento</div>
              <div className="text-xs text-muted-foreground">Consulte documentos e informações rapidamente.</div>
            </div>
          </div>
          <div className="bg-muted rounded-lg p-4 flex items-center gap-3">
            <Settings className="h-6 w-6 text-muted-foreground" />
            <div>
              <div className="font-medium">Configurações</div>
              <div className="text-xs text-muted-foreground">Personalize sua experiência com a IA.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 