"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, AlertCircle, Lightbulb, Plus } from "lucide-react"

interface Insight {
  id: string
  title: string
  type: "opportunity" | "risk" | "trend" | "recommendation"
  impact: "high" | "medium" | "low"
  confidence: number
  summary: string
  companyId: string
  projectId?: string
  createdAt: string
}

interface RecentInsightsProps {
  companyId: string | null
  projectId: string | null
}

export function RecentInsights({ companyId, projectId }: RecentInsightsProps) {
  const allInsights: Insight[] = [
    {
      id: "1",
      title: "Oportunidade de Redução de Custos",
      type: "opportunity",
      impact: "high",
      confidence: 87,
      summary: "Identificada oportunidade de reduzir custos operacionais em 15% através da otimização de processos.",
      companyId: "tech-corp",
      projectId: "erp-system",
      createdAt: "2024-01-10",
    },
    {
      id: "2",
      title: "Risco de Atraso no Cronograma",
      type: "risk",
      impact: "medium",
      confidence: 92,
      summary: "Projeto de migração apresenta 65% de chance de atraso devido à complexidade dos dados legados.",
      companyId: "tech-corp",
      projectId: "data-migration",
      createdAt: "2024-01-09",
    },
    {
      id: "3",
      title: "Tendência de Crescimento",
      type: "trend",
      impact: "high",
      confidence: 94,
      summary: "Setor de e-commerce apresenta crescimento de 35% ao ano, criando oportunidades estratégicas.",
      companyId: "retail-plus",
      projectId: "ecommerce",
      createdAt: "2024-01-08",
    },
  ]

  const filteredInsights = allInsights.filter((insight) => {
    if (projectId) return insight.projectId === projectId
    if (companyId) return insight.companyId === companyId
    return true
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "opportunity":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "risk":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case "trend":
        return <TrendingUp className="h-4 w-4 text-blue-600" />
      case "recommendation":
        return <Lightbulb className="h-4 w-4 text-yellow-600" />
      default:
        return <Brain className="h-4 w-4 text-gray-600" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "opportunity":
        return "bg-green-100 text-green-800"
      case "risk":
        return "bg-red-100 text-red-800"
      case "trend":
        return "bg-blue-100 text-blue-800"
      case "recommendation":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "opportunity":
        return "Oportunidade"
      case "risk":
        return "Risco"
      case "trend":
        return "Tendência"
      case "recommendation":
        return "Recomendação"
      default:
        return "Insight"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-yellow-500"
      case "low":
        return "border-l-green-500"
      default:
        return "border-l-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg font-semibold flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Insights da IA
          </CardTitle>
          <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        {filteredInsights.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Brain className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Nenhum insight encontrado</p>
            <p className="text-xs mt-1">{projectId ? "para este projeto" : companyId ? "para esta empresa" : ""}</p>
          </div>
        ) : (
          filteredInsights.slice(0, 3).map((insight) => (
            <div
              key={insight.id}
              className={`p-3 rounded-lg border-l-4 bg-card hover:bg-accent/50 cursor-pointer transition-colors ${getImpactColor(insight.impact)}`}
            >
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  {getTypeIcon(insight.type)}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm leading-tight mb-1">{insight.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-2">{insight.summary}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className={`text-xs ${getTypeColor(insight.type)}`}>
                        {getTypeLabel(insight.type)}
                      </Badge>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Confiança: {insight.confidence}%</span>
                        <span>•</span>
                        <span>{new Date(insight.createdAt).toLocaleDateString("pt-BR")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {filteredInsights.length > 3 && (
          <Button variant="ghost" className="w-full text-sm h-8">
            Ver todos os {filteredInsights.length} insights
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
