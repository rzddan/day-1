"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Star,
  Edit,
  FileText,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Building2,
  DollarSign,
  Calculator,
  Lightbulb,
} from "lucide-react"
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

interface Scenario {
  id: number
  name: string
  description: string
  type: "base" | "stress" | "pessimistic" | "optimistic"
  company: string
  status: "active" | "draft" | "archived" | "completed"
  confidence: number
  impact: "high" | "medium" | "low"
  probability: number
  createdDate: string
  lastUpdate: string
  author: string
  metrics: {
    revenue: number
    revenueChange: number
    costs: number
    costsChange: number
    profit: number
    profitChange: number
    cashFlow: number
    cashFlowChange: number
  }
  assumptions: string[]
  tags: string[]
}

interface ScenarioDetailModalProps {
  scenario: Scenario
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ScenarioDetailModal({ scenario, open, onOpenChange }: ScenarioDetailModalProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const getTypeColor = (type: string) => {
    switch (type) {
      case "base":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "stress":
        return "bg-red-100 text-red-800 border-red-200"
      case "pessimistic":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "optimistic":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "archived":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getImpactIcon = (impact: string) => {
    switch (impact) {
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

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "base":
        return "Base"
      case "stress":
        return "Stress"
      case "pessimistic":
        return "Pessimista"
      case "optimistic":
        return "Otimista"
      default:
        return type
    }
  }

  // Mock chart data
  const chartData = [
    { month: "Jan", revenue: scenario.metrics.revenue * 0.8, profit: scenario.metrics.profit * 0.7 },
    { month: "Fev", revenue: scenario.metrics.revenue * 0.85, profit: scenario.metrics.profit * 0.8 },
    { month: "Mar", revenue: scenario.metrics.revenue * 0.9, profit: scenario.metrics.profit * 0.85 },
    { month: "Abr", revenue: scenario.metrics.revenue * 0.95, profit: scenario.metrics.profit * 0.9 },
    { month: "Mai", revenue: scenario.metrics.revenue * 0.98, profit: scenario.metrics.profit * 0.95 },
    { month: "Jun", revenue: scenario.metrics.revenue, profit: scenario.metrics.profit },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <div>
                <DialogTitle className="text-heading-2">{scenario.name}</DialogTitle>
                <p className="text-body text-muted-foreground">{scenario.description}</p>
                <div className="flex items-center gap-3 mt-3">
                  <Badge className={`text-xs ${getTypeColor(scenario.type)}`}>{getTypeLabel(scenario.type)}</Badge>
                  <Badge className={`text-xs ${getStatusColor(scenario.status)}`}>
                    {scenario.status === "active"
                      ? "Ativo"
                      : scenario.status === "draft"
                        ? "Rascunho"
                        : scenario.status === "archived"
                          ? "Arquivado"
                          : "Concluído"}
                  </Badge>
                  <div className="flex items-center gap-1">
                    {getImpactIcon(scenario.impact)}
                    <span className="text-body-small capitalize">{scenario.impact} impacto</span>
                  </div>
                  <div className="flex items-center gap-1 text-body-small text-muted-foreground">
                    <Building2 className="h-3 w-3" />
                    {scenario.company}
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
            <TabsTrigger value="metrics">Métricas</TabsTrigger>
            <TabsTrigger value="assumptions">Premissas</TabsTrigger>
            <TabsTrigger value="analysis">Análise</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-content">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="card-gradient">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-body font-medium">Confiança</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-heading-2 font-bold">{scenario.confidence}%</div>
                  <Progress value={scenario.confidence} className="h-3 mt-2" />
                  <p className="text-caption mt-2">
                    {scenario.confidence >= 80
                      ? "Alta confiança"
                      : scenario.confidence >= 60
                        ? "Média confiança"
                        : "Baixa confiança"}
                  </p>
                </CardContent>
              </Card>

              <Card className="card-gradient">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-body font-medium">Probabilidade</CardTitle>
                  <Calculator className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-heading-2 font-bold">{scenario.probability}%</div>
                  <Progress value={scenario.probability} className="h-3 mt-2" />
                  <p className="text-caption mt-2">
                    {scenario.probability >= 70
                      ? "Muito provável"
                      : scenario.probability >= 40
                        ? "Provável"
                        : "Pouco provável"}
                  </p>
                </CardContent>
              </Card>

              <Card className="card-gradient">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-body font-medium">Receita Projetada</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-heading-3 font-bold">{formatCurrency(scenario.metrics.revenue)}</div>
                  <div className="flex items-center gap-1 text-caption">
                    {scenario.metrics.revenueChange > 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    <span className={scenario.metrics.revenueChange > 0 ? "text-green-600" : "text-red-600"}>
                      {scenario.metrics.revenueChange > 0 ? "+" : ""}
                      {scenario.metrics.revenueChange}% vs atual
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-gradient">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-body font-medium">Lucro Projetado</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-heading-3 font-bold">{formatCurrency(scenario.metrics.profit)}</div>
                  <div className="flex items-center gap-1 text-caption">
                    {scenario.metrics.profitChange > 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    <span className={scenario.metrics.profitChange > 0 ? "text-green-600" : "text-red-600"}>
                      {scenario.metrics.profitChange > 0 ? "+" : ""}
                      {scenario.metrics.profitChange}% vs atual
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-heading-4 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Projeção Financeira
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} name="Receita" />
                        <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} name="Lucro" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-heading-4 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Informações do Cenário
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-compact">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-body-small text-muted-foreground">Autor</p>
                      <p className="text-body font-medium">{scenario.author}</p>
                    </div>
                    <div>
                      <p className="text-body-small text-muted-foreground">Criado em</p>
                      <p className="text-body font-medium">
                        {new Date(scenario.createdDate).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <div>
                      <p className="text-body-small text-muted-foreground">Última Atualização</p>
                      <p className="text-body font-medium">
                        {new Date(scenario.lastUpdate).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <div>
                      <p className="text-body-small text-muted-foreground">Empresa</p>
                      <p className="text-body font-medium">{scenario.company}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-body-small text-muted-foreground mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {scenario.tags.map((tag) => (
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

          <TabsContent value="metrics">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-heading-4">Métricas Financeiras</CardTitle>
                </CardHeader>
                <CardContent className="space-items">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-body-small text-blue-700">Receita</p>
                      <p className="text-heading-3 font-bold text-blue-900">
                        {formatCurrency(scenario.metrics.revenue)}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        {scenario.metrics.revenueChange > 0 ? (
                          <TrendingUp className="h-3 w-3 text-green-500" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-500" />
                        )}
                        <span
                          className={`text-xs ${scenario.metrics.revenueChange > 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {scenario.metrics.revenueChange > 0 ? "+" : ""}
                          {scenario.metrics.revenueChange}%
                        </span>
                      </div>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg">
                      <p className="text-body-small text-red-700">Custos</p>
                      <p className="text-heading-3 font-bold text-red-900">{formatCurrency(scenario.metrics.costs)}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {scenario.metrics.costsChange > 0 ? (
                          <TrendingUp className="h-3 w-3 text-red-500" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-green-500" />
                        )}
                        <span
                          className={`text-xs ${scenario.metrics.costsChange > 0 ? "text-red-600" : "text-green-600"}`}
                        >
                          {scenario.metrics.costsChange > 0 ? "+" : ""}
                          {scenario.metrics.costsChange}%
                        </span>
                      </div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-body-small text-green-700">Lucro</p>
                      <p className="text-heading-3 font-bold text-green-900">
                        {formatCurrency(scenario.metrics.profit)}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        {scenario.metrics.profitChange > 0 ? (
                          <TrendingUp className="h-3 w-3 text-green-500" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-500" />
                        )}
                        <span
                          className={`text-xs ${scenario.metrics.profitChange > 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {scenario.metrics.profitChange > 0 ? "+" : ""}
                          {scenario.metrics.profitChange}%
                        </span>
                      </div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-body-small text-purple-700">Fluxo de Caixa</p>
                      <p className="text-heading-3 font-bold text-purple-900">
                        {formatCurrency(scenario.metrics.cashFlow)}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        {scenario.metrics.cashFlowChange > 0 ? (
                          <TrendingUp className="h-3 w-3 text-green-500" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-500" />
                        )}
                        <span
                          className={`text-xs ${scenario.metrics.cashFlowChange > 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {scenario.metrics.cashFlowChange > 0 ? "+" : ""}
                          {scenario.metrics.cashFlowChange}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-heading-4">Análise de Risco</CardTitle>
                </CardHeader>
                <CardContent className="space-items">
                  <div className="space-compact">
                    <div className="flex items-center justify-between">
                      <span className="text-body font-medium">Nível de Confiança</span>
                      <span className="text-body-small text-muted-foreground">{scenario.confidence}%</span>
                    </div>
                    <Progress value={scenario.confidence} className="h-3" />
                  </div>
                  <div className="space-compact">
                    <div className="flex items-center justify-between">
                      <span className="text-body font-medium">Probabilidade de Ocorrência</span>
                      <span className="text-body-small text-muted-foreground">{scenario.probability}%</span>
                    </div>
                    <Progress value={scenario.probability} className="h-3" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-body font-medium">Nível de Impacto</span>
                    <div className="flex items-center gap-2">
                      {getImpactIcon(scenario.impact)}
                      <span className="text-body-small capitalize">{scenario.impact}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="assumptions">
            <Card>
              <CardHeader>
                <CardTitle className="text-heading-4 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Premissas do Cenário
                </CardTitle>
              </CardHeader>
              <CardContent className="space-items">
                {scenario.assumptions.map((assumption, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-primary">{index + 1}</span>
                    </div>
                    <p className="text-body selectable">{assumption}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis">
            <Card>
              <CardHeader>
                <CardTitle className="text-heading-4">Análise Detalhada</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Análise detalhada do cenário será implementada aqui.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle className="text-heading-4">Relatórios e Exportações</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Opções de relatórios e exportações serão implementadas aqui.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
