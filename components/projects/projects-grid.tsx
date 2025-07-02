"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  FolderKanban,
  Calendar,
  Users,
  Clock,
  MoreVertical,
  Star,
  AlertTriangle,
  CheckCircle,
  Pause,
  Building2,
  TrendingUp,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ProjectDetailModal } from "./project-detail-modal"

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

const mockProjects: Project[] = [
  {
    id: 1,
    name: "Implementação ERP",
    description: "Sistema integrado de gestão empresarial para otimização de processos",
    company: "TechCorp Solutions",
    status: "active",
    priority: "high",
    progress: 65,
    startDate: "2024-01-01",
    endDate: "2024-06-30",
    budget: 150000,
    spent: 97500,
    team: [
      { name: "Ana Silva", role: "PM" },
      { name: "Carlos Santos", role: "Dev" },
      { name: "Maria Costa", role: "QA" },
    ],
    tasks: {
      total: 45,
      completed: 29,
      inProgress: 8,
      pending: 8,
    },
    tags: ["ERP", "Integração", "Crítico"],
    manager: "Ana Silva",
    lastUpdate: "2024-01-15",
  },
  {
    id: 2,
    name: "Auditoria Financeira Q1",
    description: "Revisão completa dos processos financeiros e compliance",
    company: "Indústria Verde Ltda",
    status: "active",
    priority: "medium",
    progress: 30,
    startDate: "2024-01-10",
    endDate: "2024-03-31",
    budget: 75000,
    spent: 22500,
    team: [
      { name: "João Oliveira", role: "Auditor" },
      { name: "Patricia Lima", role: "Analista" },
    ],
    tasks: {
      total: 28,
      completed: 8,
      inProgress: 6,
      pending: 14,
    },
    tags: ["Auditoria", "Compliance", "Financeiro"],
    manager: "João Oliveira",
    lastUpdate: "2024-01-14",
  },
  {
    id: 3,
    name: "Plataforma E-commerce",
    description: "Desenvolvimento de nova plataforma de vendas online",
    company: "Comércio Digital",
    status: "planning",
    priority: "high",
    progress: 15,
    startDate: "2024-02-01",
    endDate: "2024-08-31",
    budget: 200000,
    spent: 30000,
    team: [
      { name: "Roberto Silva", role: "Tech Lead" },
      { name: "Fernanda Costa", role: "UX/UI" },
      { name: "Lucas Santos", role: "Backend" },
    ],
    tasks: {
      total: 67,
      completed: 10,
      inProgress: 12,
      pending: 45,
    },
    tags: ["E-commerce", "Frontend", "Backend"],
    manager: "Roberto Silva",
    lastUpdate: "2024-01-12",
  },
]

export function ProjectsGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      case "paused":
        return <Pause className="h-4 w-4 text-yellow-500" />
      case "planning":
        return <Clock className="h-4 w-4 text-purple-500" />
      default:
        return null
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
    <>
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {mockProjects.map((project) => (
          <Card
            key={project.id}
            className="card-interactive card-border-accent group"
            onClick={() => setSelectedProject(project)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                      <FolderKanban className="h-5 w-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-heading-4 truncate">{project.name}</h3>
                      <p className="text-caption line-clamp-2">{project.description}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-3">
                  {getPriorityIcon(project.priority)}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Star className="h-4 w-4 mr-2" />
                        Favoritar
                      </DropdownMenuItem>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Arquivar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-items">
              {/* Status and Company */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(project.status)}
                  <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                    {project.status === "active"
                      ? "Ativo"
                      : project.status === "completed"
                        ? "Concluído"
                        : project.status === "paused"
                          ? "Pausado"
                          : "Planejamento"}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-body-small text-muted-foreground">
                  <Building2 className="h-3 w-3" />
                  <span className="truncate max-w-24">{project.company}</span>
                </div>
              </div>

              {/* Progress */}
              <div className="space-compact">
                <div className="flex items-center justify-between">
                  <span className="text-body font-medium">Progresso</span>
                  <span className="text-body-small text-muted-foreground">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-3" />
              </div>

              {/* Budget */}
              <div className="space-compact">
                <div className="flex items-center justify-between">
                  <span className="text-body font-medium">Orçamento</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-muted-foreground" />
                    <span className="text-body-small text-muted-foreground">
                      {Math.round((project.spent / project.budget) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="text-body">
                  <span className="font-semibold">{formatCurrency(project.spent)}</span>
                  <span className="text-muted-foreground"> / {formatCurrency(project.budget)}</span>
                </div>
                <Progress value={(project.spent / project.budget) * 100} className="h-2" />
              </div>

              {/* Tasks Summary */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-gradient-to-br from-muted/30 to-muted/50 rounded-xl">
                <div className="text-center">
                  <p className="text-heading-3 font-bold text-green-600">{project.tasks.completed}</p>
                  <p className="text-caption">Concluídas</p>
                </div>
                <div className="text-center">
                  <p className="text-heading-3 font-bold text-blue-600">{project.tasks.inProgress}</p>
                  <p className="text-caption">Em Andamento</p>
                </div>
              </div>

              {/* Timeline and Team */}
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-caption">Prazo</p>
                    <p className="text-body font-medium">
                      {getDaysRemaining(project.endDate) > 0 ? `${getDaysRemaining(project.endDate)} dias` : "Vencido"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 3).map((member, index) => (
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
                    {project.team.length > 3 && (
                      <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                        <span className="text-xs font-medium">+{project.team.length - 3}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs px-2 py-1">
                    {tag}
                  </Badge>
                ))}
                {project.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs px-2 py-1">
                    +{project.tags.length - 3}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          open={!!selectedProject}
          onOpenChange={() => setSelectedProject(null)}
        />
      )}
    </>
  )
}
