"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Clock, User, AlertTriangle, CheckCircle, Edit, Trash2, Calendar } from "lucide-react"

interface Deadline {
  id: string
  title: string
  dueDate: string
  progress: number
  priority: "high" | "medium" | "low"
  status: "pending" | "in-progress" | "completed" | "overdue"
  assignee: string
  company: string
  description: string
  requirements: string[]
  estimatedHours: number
  completedHours: number
}

interface DeadlineDetailModalProps {
  deadline: Deadline | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeadlineDetailModal({ deadline, open, onOpenChange }: DeadlineDetailModalProps) {
  if (!deadline) return null

  const getStatusColor = (status: Deadline["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getStatusLabel = (status: Deadline["status"]) => {
    switch (status) {
      case "completed":
        return "Concluído"
      case "in-progress":
        return "Em Andamento"
      case "pending":
        return "Pendente"
      case "overdue":
        return "Atrasado"
      default:
        return "Desconhecido"
    }
  }

  const getPriorityColor = (priority: Deadline["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getPriorityLabel = (priority: Deadline["priority"]) => {
    switch (priority) {
      case "high":
        return "Alta"
      case "medium":
        return "Média"
      case "low":
        return "Baixa"
      default:
        return "Normal"
    }
  }

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysUntilDue = getDaysUntilDue(deadline.dueDate)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-xl">{deadline.title}</DialogTitle>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(deadline.status)}>{getStatusLabel(deadline.status)}</Badge>
                <Badge className={getPriorityColor(deadline.priority)}>
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Prioridade {getPriorityLabel(deadline.priority)}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-1" />
                Editar
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="h-4 w-4 mr-1" />
                Excluir
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações Básicas */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Vencimento:</span>
              <span
                className={`${
                  daysUntilDue < 0 ? "text-red-600 font-medium" : daysUntilDue <= 3 ? "text-orange-600 font-medium" : ""
                }`}
              >
                {new Date(deadline.dueDate).toLocaleDateString("pt-BR")}
                {daysUntilDue < 0 && ` (${Math.abs(daysUntilDue)} dias atrasado)`}
                {daysUntilDue === 0 && " (Vence hoje)"}
                {daysUntilDue > 0 && ` (${daysUntilDue} dias restantes)`}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Responsável:</span>
              <span>{deadline.assignee}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Horas:</span>
              <span>
                {deadline.completedHours}h / {deadline.estimatedHours}h
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Progresso:</span>
              <span>{deadline.progress}%</span>
            </div>
          </div>

          {/* Barra de Progresso */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Progresso Geral</span>
              <span className="text-sm text-muted-foreground">{deadline.progress}%</span>
            </div>
            <Progress value={deadline.progress} className="h-3" />
          </div>

          <Separator />

          {/* Descrição */}
          <div>
            <h4 className="font-medium mb-2">Descrição</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{deadline.description}</p>
          </div>

          <Separator />

          {/* Lista de Requisitos */}
          <div>
            <h4 className="font-medium mb-3">Requisitos ({deadline.requirements.length})</h4>
            <div className="space-y-2">
              {deadline.requirements.map((requirement, index) => {
                // Simular alguns requisitos como concluídos baseado no progresso
                const isCompleted = index < Math.floor(deadline.requirements.length * (deadline.progress / 100))

                return (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Checkbox
                      checked={isCompleted}
                      className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                    />
                    <span className={`text-sm flex-1 ${isCompleted ? "line-through text-muted-foreground" : ""}`}>
                      {requirement}
                    </span>
                    {isCompleted && (
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                        Concluído
                      </Badge>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <Separator />

          {/* Estatísticas de Tempo */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{deadline.estimatedHours}h</div>
              <div className="text-xs text-muted-foreground">Estimado</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{deadline.completedHours}h</div>
              <div className="text-xs text-muted-foreground">Concluído</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {deadline.estimatedHours - deadline.completedHours}h
              </div>
              <div className="text-xs text-muted-foreground">Restante</div>
            </div>
          </div>

          <Separator />

          {/* Ações */}
          <div className="flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
              Última atualização: {new Date().toLocaleDateString("pt-BR")}
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Atualizar Progresso</Button>
              <Button>Marcar como Concluído</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
