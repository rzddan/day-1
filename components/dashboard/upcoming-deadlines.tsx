"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, AlertTriangle, CheckCircle, User, Plus, Calendar, Target } from "lucide-react"
import { DeadlineDetailModal } from "./deadline-detail-modal"

interface Deadline {
  id: string
  title: string
  dueDate: string
  progress: number
  priority: "healthy" | "warning" | "danger"
  assignee: string
  companyId: string
  projectId?: string
  description: string
  estimatedHours: number
  completedHours: number
  requirements: string[]
}

interface UpcomingDeadlinesProps {
  companyId: string | null
  projectId: string | null
}

export function UpcomingDeadlines({ companyId, projectId }: UpcomingDeadlinesProps) {
  const [selectedDeadline, setSelectedDeadline] = useState<Deadline | null>(null)

  const allDeadlines: Deadline[] = [
    {
      id: "1",
      title: "Relatório Financeiro Q4",
      dueDate: "2024-01-25",
      progress: 75,
      priority: "healthy",
      assignee: "Maria Santos",
      companyId: "tech-corp",
      projectId: "erp-system",
      description: "Compilação dos dados financeiros do quarto trimestre",
      estimatedHours: 40,
      completedHours: 30,
      requirements: ["Consolidação de receitas", "Análise de despesas", "Projeções Q1"],
    },
    {
      id: "2",
      title: "Migração de Dados Crítica",
      dueDate: "2024-01-20",
      progress: 45,
      priority: "danger",
      assignee: "João Silva",
      companyId: "tech-corp",
      projectId: "data-migration",
      description: "Migração crítica dos dados legados para novo sistema",
      estimatedHours: 60,
      completedHours: 27,
      requirements: ["Backup completo", "Validação de dados", "Testes de integridade"],
    },
    {
      id: "3",
      title: "Testes de Integração E-commerce",
      dueDate: "2024-01-30",
      progress: 60,
      priority: "warning",
      assignee: "Pedro Costa",
      companyId: "retail-plus",
      projectId: "ecommerce",
      description: "Testes finais da plataforma de e-commerce antes do lançamento",
      estimatedHours: 35,
      completedHours: 21,
      requirements: ["Testes de pagamento", "Testes de carrinho", "Testes de performance"],
    },
  ]

  const filteredDeadlines = allDeadlines.filter((deadline) => {
    if (projectId) return deadline.projectId === projectId
    if (companyId) return deadline.companyId === companyId
    return true
  })

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "danger":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <CheckCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "healthy":
        return "border-l-green-500 bg-green-50/30 dark:bg-green-950/20"
      case "warning":
        return "border-l-yellow-500 bg-yellow-50/30 dark:bg-yellow-950/20"
      case "danger":
        return "border-l-red-500 bg-red-50/30 dark:bg-red-950/20"
      default:
        return "border-l-gray-500 bg-gray-50/30 dark:bg-gray-950/20"
    }
  }

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getProgressColor = (progress: number, priority: string) => {
    if (priority === "danger" && progress < 70) return "bg-red-500"
    if (priority === "warning" && progress < 80) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <>
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              Próximos Prazos
              <Badge variant="outline" className="ml-2">
                {filteredDeadlines.length}
              </Badge>
            </CardTitle>
            <Button
              size="sm"
              variant="outline"
              className="h-9 w-9 p-0 hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          {filteredDeadlines.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Clock className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">Nenhum prazo encontrado</p>
              <p className="text-sm">{projectId ? "para este projeto" : companyId ? "para esta empresa" : ""}</p>
            </div>
          ) : (
            filteredDeadlines.slice(0, 4).map((deadline) => {
              const daysUntilDue = getDaysUntilDue(deadline.dueDate)
              const hoursRemaining = deadline.estimatedHours - deadline.completedHours

              return (
                <div
                  key={deadline.id}
                  className={`p-4 rounded-xl border-l-4 cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.02] ${getPriorityColor(deadline.priority)}`}
                  onClick={() => setSelectedDeadline(deadline)}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          {getPriorityIcon(deadline.priority)}
                          <h4 className="font-semibold text-base truncate">{deadline.title}</h4>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{deadline.assignee}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            <span>
                              {deadline.completedHours}h / {deadline.estimatedHours}h
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={`/placeholder.svg?height=24&width=24`} />
                              <AvatarFallback className="text-xs">
                                {deadline.assignee
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">{deadline.assignee}</span>
                          </div>

                          <div className="text-right">
                            <p
                              className={`text-sm font-medium ${
                                daysUntilDue < 0
                                  ? "text-red-600"
                                  : daysUntilDue <= 3
                                    ? "text-yellow-600"
                                    : "text-muted-foreground"
                              }`}
                            >
                              {daysUntilDue < 0
                                ? `${Math.abs(daysUntilDue)}d atrasado`
                                : daysUntilDue === 0
                                  ? "Vence hoje"
                                  : `${daysUntilDue}d restantes`}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {hoursRemaining > 0 ? `${hoursRemaining}h restantes` : "Concluído"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progresso</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{deadline.progress}%</span>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              deadline.progress >= 80
                                ? "bg-green-50 text-green-700 border-green-200"
                                : deadline.progress >= 50
                                  ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                  : "bg-red-50 text-red-700 border-red-200"
                            }`}
                          >
                            {deadline.progress >= 80 ? "No prazo" : deadline.progress >= 50 ? "Atenção" : "Atrasado"}
                          </Badge>
                        </div>
                      </div>
                      <Progress
                        value={deadline.progress}
                        className="h-3"
                        style={
                          {
                            "--progress-background": getProgressColor(deadline.progress, deadline.priority),
                          } as React.CSSProperties
                        }
                      />
                    </div>

                    <div className="pt-3 border-t border-border/50">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          <span>Vencimento: {new Date(deadline.dueDate).toLocaleDateString("pt-BR")}</span>
                        </div>
                        <span>{deadline.requirements.length} requisitos</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}

          {filteredDeadlines.length > 4 && (
            <Button variant="ghost" className="w-full text-sm h-10 hover:bg-accent">
              Ver todos os {filteredDeadlines.length} prazos
            </Button>
          )}
        </CardContent>
      </Card>

      <DeadlineDetailModal
        deadline={selectedDeadline}
        isOpen={!!selectedDeadline}
        onClose={() => setSelectedDeadline(null)}
      />
    </>
  )
}
