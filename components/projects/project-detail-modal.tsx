"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  FolderKanban,
  Calendar,
  Users,
  DollarSign,
  Star,
  Edit,
  FileText,
  BarChart3,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Building2,
  MessageSquare,
} from "lucide-react"

interface Project {
  id: number
  name: string
  description: string
  company: string
  status: "active" | "completed" | "paused" | "planning"
  priority: "high" | "medium" | "low"
  progress: number
  startDate: string
  endDate: string
  budget: number
  spent: number
  team: Array<{
    name: string
    avatar?: string
    role: string
  }>
  tasks: {
    total: number
    completed: number
    inProgress: number
    pending: number
  }
  tags: string[]
  manager: string
  lastUpdate: string
}

interface ProjectDetailModalProps {
  project: Project
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProjectDetailModal({ project, open, onOpenChange }: ProjectDetailModalProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "paused":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "planning":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "medium":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "low":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return null
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
    }).format(value)
  }

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate)
    const today = new Date()
    const diffTime = end.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
                <FolderKanban className="h-8 w-8 text-white" />
              </div>
              <div>
                <DialogTitle className="text-heading-2">{project.name}</DialogTitle>
                <p className="text-body text-muted-foreground">{project.description}</p>
                <div className="flex items-center gap-3 mt-3">
                  <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                    {project.status === "active"
                      ? "Ativo"
                      : project.status === "completed"
                        ? "Concluído"
                        : project.status === "paused"
                          ? "Pausado"
                          : "Planejamento"}
                  </Badge>
                  <div className="flex items-center gap-1">
                    {getPriorityIcon(project.priority)}
                    <span className="text-body-small capitalize">{project.priority} prioridade</span>
                  </div>
                  <div className="flex items-center gap-1 text-body-small text-muted-foreground">
                    <Building2 className="h-3 w-3" />
                    {project.company}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Star className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="tasks">Tarefas</TabsTrigger>
            <TabsTrigger value="team">Equipe</TabsTrigger>
            <TabsTrigger value="budget">Orçamento</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-content">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="card-gradient">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-body font-medium">Progresso Geral</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-heading-2 font-bold">{project.progress}%</div>
                  <Progress value={project.progress} className="h-3 mt-2" />
                  <p className="text-caption mt-2">
                    {project.tasks.completed} de {project.tasks.total} tarefas concluídas
                  </p>
                </CardContent>
              </Card>

              <Card className="card-gradient">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-body font-medium">Orçamento</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-heading-3 font-bold">{formatCurrency(project.spent)}</div>
                  <div className="flex items-center gap-1 text-caption">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span>de {formatCurrency(project.budget)}</span>
                  </div>
                  <Progress value={(project.spent / project.budget) * 100} className="h-2 mt-2" />
                </CardContent>
              </Card>

              <Card className="card-gradient">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-body font-medium">Equipe</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-heading-2 font-bold">{project.team.length}</div>
                  <p className="text-caption">membros ativos</p>
                  <div className="flex -space-x-2 mt-2">
                    {project.team.slice(0, 4).map((member, index) => (
                      <Avatar key={index} className="h-6 w-6 border-2 border-background">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {project.team.length > 4 && (
                      <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                        <span className="text-xs font-medium">+{project.team.length - 4}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="card-gradient">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-body font-medium">Prazo</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-heading-2 font-bold">
                    {getDaysRemaining(project.endDate) > 0 ? getDaysRemaining(project.endDate) : 0}
                  </div>
                  <p className="text-caption">
                    {getDaysRemaining(project.endDate) > 0 ? "dias restantes" : "projeto vencido"}
                  </p>
                  <p className="text-caption mt-1">Fim: {new Date(project.endDate).toLocaleDateString("pt-BR")}</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-heading-4 flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Status das Tarefas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-heading-2 font-bold text-green-600">{project.tasks.completed}</div>
                      <p className="text-body-small text-green-700">Concluídas</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-heading-2 font-bold text-blue-600">{project.tasks.inProgress}</div>
                      <p className="text-body-small text-blue-700">Em Andamento</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-heading-2 font-bold text-yellow-600">{project.tasks.pending}</div>
                      <p className="text-body-small text-yellow-700">Pendentes</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-heading-2 font-bold text-gray-600">{project.tasks.total}</div>
                      <p className="text-body-small text-gray-700">Total</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-heading-4 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Informações do Projeto
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-compact">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-body-small text-muted-foreground">Gerente</p>
                      <p className="text-body font-medium">{project.manager}</p>
                    </div>
                    <div>
                      <p className="text-body-small text-muted-foreground">Início</p>
                      <p className="text-body font-medium">{new Date(project.startDate).toLocaleDateString("pt-BR")}</p>
                    </div>
                    <div>
                      <p className="text-body-small text-muted-foreground">Última Atualização</p>
                      <p className="text-body font-medium">
                        {new Date(project.lastUpdate).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <div>
                      <p className="text-body-small text-muted-foreground">Empresa</p>
                      <p className="text-body font-medium">{project.company}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-body-small text-muted-foreground mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tasks">
            <Card>
              <CardHeader>
                <CardTitle className="text-heading-4">Gestão de Tarefas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Lista detalhada de tarefas será implementada aqui.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <Card>
              <CardHeader>
                <CardTitle className="text-heading-4">Membros da Equipe</CardTitle>
              </CardHeader>
              <CardContent className="space-items">
                {project.team.map((member, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="text-body font-medium">{member.name}</h4>
                      <p className="text-body-small text-muted-foreground">{member.role}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="budget">
            <Card>
              <CardHeader>
                <CardTitle className="text-heading-4">Análise Orçamentária</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Detalhes do orçamento e gastos serão implementados aqui.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle className="text-heading-4">Timeline do Projeto</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Timeline detalhada será implementada aqui.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
