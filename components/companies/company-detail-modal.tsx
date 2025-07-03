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
  Building2,
  TrendingUp,
  TrendingDown,
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
} from "lucide-react"

interface Company {
  id: number
  name: string
  logo?: string
  industry: string
  status: string
  revenue: number
  revenueChange: number
  employees: number
  projects: number
  completedProjects: number
  healthScore: number
  lastUpdate: string
  manager: string
  priority: string
  tags: string[]
  nextReview: string
}

interface CompanyDetailModalProps {
  company: Company
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CompanyDetailModal({ company, open, onOpenChange }: CompanyDetailModalProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={company.logo || "/placeholder.svg"} />
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                  {company.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-2xl">{company.name}</DialogTitle>
                <p className="text-muted-foreground">{company.industry}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={`text-xs ${getStatusColor(company.status)}`}>
                    {company.status === "active" ? "Ativa" : company.status === "pending" ? "Pendente" : "Inativa"}
                  </Badge>
                  {getPriorityIcon(company.priority)}
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="projects">Projetos</TabsTrigger>
            <TabsTrigger value="financials">Financeiro</TabsTrigger>
            <TabsTrigger value="team">Equipe</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Receita Anual</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(company.revenue)}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    {company.revenueChange > 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    <span className={company.revenueChange > 0 ? "text-green-600" : "text-red-600"}>
                      {company.revenueChange > 0 ? "+" : ""}
                      {company.revenueChange}% vs ano anterior
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Projetos</CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{company.projects}</div>
                  <div className="text-xs text-muted-foreground">{company.completedProjects} concluídos</div>
                  <Progress value={(company.completedProjects / company.projects) * 100} className="h-2 mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Equipe</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{company.employees}</div>
                  <p className="text-xs text-muted-foreground">colaboradores ativos</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Saúde</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{company.healthScore}%</div>
                  <p
                    className={`text-xs ${
                      company.healthScore >= 80
                        ? "text-green-600"
                        : company.healthScore >= 60
                          ? "text-yellow-600"
                          : "text-red-600"
                    }`}
                  >
                    {company.healthScore >= 80 ? "Excelente" : company.healthScore >= 60 ? "Boa" : "Atenção necessária"}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Informações Gerais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Gestor Responsável</p>
                      <p className="font-medium">{company.manager}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Última Atualização</p>
                      <p className="font-medium">{new Date(company.lastUpdate).toLocaleDateString("pt-BR")}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Próxima Revisão</p>
                      <p className="font-medium">{new Date(company.nextReview).toLocaleDateString("pt-BR")}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Prioridade</p>
                      <div className="flex items-center gap-2">
                        {getPriorityIcon(company.priority)}
                        <span className="font-medium capitalize">{company.priority}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Tags e Categorias
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {company.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Projetos da Empresa</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Lista de projetos será implementada aqui.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financials">
            <Card>
              <CardHeader>
                <CardTitle>Análise Financeira</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Gráficos e análises financeiras serão implementados aqui.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <Card>
              <CardHeader>
                <CardTitle>Gestão de Equipe</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Informações da equipe serão implementadas aqui.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
