"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  Star,
  AlertTriangle,
  CheckCircle,
  Clock,
  Building2,
  Target,
  DollarSign,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScenarioDetailModal } from "./scenario-detail-modal"

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

const mockScenarios: Scenario[] = [
  {
    id: 1,
    name: "Cenário Base 2024",
    description: "Projeção conservadora baseada em dados históricos e tendências atuais",
    type: "base",
    company: "TechCorp Solutions",
    status: "active",
    confidence: 85,
    impact: "high",
    probability: 75,
    createdDate: "2024-01-01",
    lastUpdate: "2024-01-15",
    author: "Ana Silva",
    metrics: {
      revenue: 2800000,
      revenueChange: 12,
      costs: 2100000,
      costsChange: 8,
      profit: 700000,
      profitChange: 25,
      cashFlow: 450000,
      cashFlowChange: 15,
    },
    assumptions: ["Crescimento de mercado de 10%", "Inflação controlada em 4%", "Sem grandes mudanças regulatórias"],
    tags: ["Conservador", "Histórico", "Realista"],
  },
  {
    id: 2,
    name: "Stress Test - Crise Econômica",
    description: "Simulação de cenário adverso com recessão e alta volatilidade",
    type: "stress",
    company: "Indústria Verde Ltda",
    status: "active",
    confidence: 70,
    impact: "high",
    probability: 25,
    createdDate: "2024-01-05",
    lastUpdate: "2024-01-14",
    author: "Carlos Santos",
    metrics: {
      revenue: 1400000,
      revenueChange: -22,
      costs: 1600000,
      costsChange: 5,
      profit: -200000,
      profitChange: -135,
      cashFlow: -150000,
      cashFlowChange: -180,
    },
    assumptions: ["Recessão econômica de 6 meses", "Redução de demanda em 30%", "Aumento de custos operacionais"],
    tags: ["Stress", "Recessão", "Adverso"],
  },
  {
    id: 3,
    name: "Cenário Otimista - Expansão",
    description: "Projeção agressiva com expansão de mercado e novos produtos",
    type: "optimistic",
    company: "StartupX",
    status: "draft",
    confidence: 60,
    impact: "high",
    probability: 40,
    createdDate: "2024-01-10",
    lastUpdate: "2024-01-12",
    author: "Maria Costa",
    metrics: {
      revenue: 850000,
      revenueChange: 89,
      costs: 520000,
      costsChange: 45,
      profit: 330000,
      profitChange: 175,
      cashFlow: 280000,
      cashFlowChange: 220,
    },
    assumptions: [
      "Lançamento bem-sucedido de 3 produtos",
      "Captação de investimento Series A",
      "Expansão para 2 novos mercados",
    ],
    tags: ["Otimista", "Expansão", "Crescimento"],
  },
]

export function ScenariosGrid() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null)

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

  return (
    <>
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {mockScenarios.map((scenario) => (
          <Card
            key={scenario.id}
            className="card-interactive card-border-accent group"
            onClick={() => setSelectedScenario(scenario)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                      <BarChart3 className="h-5 w-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-heading-4 truncate">{scenario.name}</h3>
                      <p className="text-caption line-clamp-2">{scenario.description}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-3">
                  {getImpactIcon(scenario.impact)}
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
                      <DropdownMenuItem>Duplicar</DropdownMenuItem>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Arquivar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-items">
              {/* Type and Status */}
              <div className="flex items-center justify-between">
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
              </div>

              {/* Company */}
              <div className="flex items-center gap-2 text-body-small text-muted-foreground">
                <Building2 className="h-4 w-4" />
                <span className="truncate">{scenario.company}</span>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-compact">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3 text-muted-foreground" />
                    <span className="text-caption">Receita</span>
                  </div>
                  <p className="text-body font-semibold">{formatCurrency(scenario.metrics.revenue)}</p>
                  <div className="flex items-center gap-1">
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

                <div className="space-compact">
                  <div className="flex items-center gap-1">
                    <Target className="h-3 w-3 text-muted-foreground" />
                    <span className="text-caption">Lucro</span>
                  </div>
                  <p className="text-body font-semibold">{formatCurrency(scenario.metrics.profit)}</p>
                  <div className="flex items-center gap-1">
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
              </div>

              {/* Confidence and Probability */}
              <div className="space-compact">
                <div className="space-compact">
                  <div className="flex items-center justify-between">
                    <span className="text-body font-medium">Confiança</span>
                    <span className="text-body-small text-muted-foreground">{scenario.confidence}%</span>
                  </div>
                  <Progress value={scenario.confidence} className="h-2" />
                </div>

                <div className="space-compact">
                  <div className="flex items-center justify-between">
                    <span className="text-body font-medium">Probabilidade</span>
                    <span className="text-body-small text-muted-foreground">{scenario.probability}%</span>
                  </div>
                  <Progress value={scenario.probability} className="h-2" />
                </div>
              </div>

              {/* Author and Date */}
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border/50 text-caption">
                <div>
                  <p>Autor: {scenario.author}</p>
                </div>
                <div>
                  <p>
                    Atualizado:{" "}
                    {new Date(scenario.lastUpdate).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {scenario.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs px-2 py-1">
                    {tag}
                  </Badge>
                ))}
                {scenario.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs px-2 py-1">
                    +{scenario.tags.length - 3}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedScenario && (
        <ScenarioDetailModal
          scenario={selectedScenario}
          open={!!selectedScenario}
          onOpenChange={() => setSelectedScenario(null)}
        />
      )}
    </>
  )
}
