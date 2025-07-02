"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar, MessageSquare, Paperclip, Plus, MoreHorizontal } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TaskDetailModal } from "./task-detail-modal"

const columns = [
  {
    id: "todo",
    title: "A Fazer",
    count: 8,
    color: "bg-gray-100 dark:bg-gray-800",
  },
  {
    id: "progress",
    title: "Em Andamento",
    count: 5,
    color: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    id: "review",
    title: "Em Revisão",
    count: 3,
    color: "bg-yellow-100 dark:bg-yellow-900/20",
  },
  {
    id: "done",
    title: "Concluído",
    count: 12,
    color: "bg-green-100 dark:bg-green-900/20",
  },
]

const tasks = {
  todo: [
    {
      id: 1,
      title: "Análise de Fluxo de Caixa Q1",
      description: "Revisar projeções e identificar gargalos",
      company: "TechCorp Inc.",
      project: "Reestruturação de Dívidas Q1",
      priority: "Alta",
      dueDate: "2024-01-20",
      assignee: { name: "Ana Silva", avatar: "/placeholder.svg?height=32&width=32" },
      comments: 3,
      attachments: 2,
      progress: 0,
    },
    {
      id: 2,
      title: "Preparar Relatório Mensal",
      description: "Consolidar dados de todas as empresas",
      company: "Todas",
      project: null,
      priority: "Média",
      dueDate: "2024-01-25",
      assignee: { name: "Carlos Santos", avatar: "/placeholder.svg?height=32&width=32" },
      comments: 1,
      attachments: 0,
      progress: 0,
    },
  ],
  progress: [
    {
      id: 3,
      title: "Implementação Dashboard BI",
      description: "Configurar painéis de controle financeiro",
      company: "Manufacturing Ltd.",
      project: "Implementação ERP Financeiro",
      priority: "Alta",
      dueDate: "2024-02-15",
      assignee: { name: "Maria Costa", avatar: "/placeholder.svg?height=32&width=32" },
      comments: 8,
      attachments: 5,
      progress: 65,
    },
  ],
  review: [
    {
      id: 4,
      title: "Validação Cenários Stress",
      description: "Revisar simulações de cenários pessimistas",
      company: "StartupCo",
      project: "Análise de Viabilidade - Expansão",
      priority: "Alta",
      dueDate: "2024-01-18",
      assignee: { name: "Lucia Ferreira", avatar: "/placeholder.svg?height=32&width=32" },
      comments: 5,
      attachments: 3,
      progress: 90,
    },
  ],
  done: [
    {
      id: 5,
      title: "Auditoria Fiscal Q4",
      description: "Revisão completa da documentação fiscal",
      company: "Consulting Group",
      project: "Otimização Fiscal 2024",
      priority: "Média",
      dueDate: "2024-01-15",
      assignee: { name: "Roberto Alves", avatar: "/placeholder.svg?height=32&width=32" },
      comments: 12,
      attachments: 8,
      progress: 100,
    },
  ],
}

export function KanbanBoard() {
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleTaskClick = (task: any) => {
    setSelectedTask(task)
    setModalOpen(true)
  }

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden md:flex gap-6 overflow-x-auto pb-4">
        {columns.map((column) => (
          <div key={column.id} className="flex-shrink-0 w-80">
            <Card className={`h-full ${column.color}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    {column.title}
                    <Badge variant="secondary" className="text-xs">
                      {column.count}
                    </Badge>
                  </CardTitle>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <ScrollArea className="h-[600px]">
                  <div className="space-y-3">
                    {tasks[column.id as keyof typeof tasks]?.map((task) => (
                      <Card
                        key={task.id}
                        className="bg-background shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleTaskClick(task)}
                      >
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1 flex-1">
                              <h4 className="text-sm font-medium line-clamp-2">{task.title}</h4>
                              <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 flex-shrink-0"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="space-y-2">
                            <div className="flex flex-wrap gap-1">
                              <Badge variant="outline" className="text-xs">
                                {task.company}
                              </Badge>
                              {task.project && (
                                <Badge variant="secondary" className="text-xs">
                                  {task.project}
                                </Badge>
                              )}
                            </div>

                            <Badge
                              variant={
                                task.priority === "Alta"
                                  ? "destructive"
                                  : task.priority === "Média"
                                    ? "default"
                                    : "secondary"
                              }
                              className="text-xs w-fit"
                            >
                              {task.priority}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(task.dueDate).toLocaleDateString("pt-BR")}</span>
                            </div>
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="text-xs">
                                {task.assignee.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          </div>

                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>{task.comments}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Paperclip className="h-3 w-3" />
                              <span>{task.attachments}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden space-y-4">
        {columns.map((column) => (
          <Card key={column.id} className={column.color}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                {column.title}
                <Badge variant="secondary" className="text-xs">
                  {column.count}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tasks[column.id as keyof typeof tasks]?.map((task) => (
                <Card
                  key={task.id}
                  className="bg-background shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleTaskClick(task)}
                >
                  <CardContent className="p-3 space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="text-sm font-medium line-clamp-2 flex-1">{task.title}</h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 flex-shrink-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge
                        variant={
                          task.priority === "Alta" ? "destructive" : task.priority === "Média" ? "default" : "secondary"
                        }
                        className="text-xs"
                      >
                        {task.priority}
                      </Badge>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MessageSquare className="h-3 w-3" />
                        <span>{task.comments}</span>
                        <Paperclip className="h-3 w-3" />
                        <span>{task.attachments}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <TaskDetailModal task={selectedTask} open={modalOpen} onOpenChange={setModalOpen} />
    </>
  )
}
