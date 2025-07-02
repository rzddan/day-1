"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Lightbulb,
  Target,
  BarChart3,
  Edit,
  Share,
  BookmarkPlus,
} from "lucide-react"

interface Insight {
  id: string
  title: string
  type: "opportunity" | "risk" | "trend" | "recommendation"
  impact: "high" | "medium" | "low"
  confidence: number
  summary: string
  company: string
  createdAt: string
  fullAnalysis: string
  recommendations: string[]
  metrics: {
    label: string
    value: string
    change: number
  }[]
}

interface InsightDetailModalProps {
  insight: Insight | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function InsightDetailModal({ insight, open, onOpenChange }: InsightDetailModalProps) {
  if (!insight) return null

  const getTypeColor = (type: Insight["type"]) => {
    switch (type) {
      case "opportunity":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "risk":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "trend":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "recommendation":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getTypeLabel = (type: Insight["type"]) => {
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

  const getTypeIcon = (type: Insight["type"]) => {
    switch (type) {
      case "opportunity":
        return <TrendingUp className="h-4 w-4" />
      case "risk":
        return <AlertCircle className="h-4 w-4" />
      case "trend":
        return <BarChart3 className="h-4 w-4" />
      case "recommendation":
        return <Lightbulb className="h-4 w-4" />
      default:
        return <Brain className="h-4 w-4" />
    }
  }

  const getImpactColor = (impact: Insight["impact"]) => {
    switch (impact) {
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

  const getImpactLabel = (impact: Insight["impact"]) => {
    switch (impact) {
      case "high":
        return "Alto"
      case "medium":
        return "Médio"
      case "low":
        return "Baixo"
      default:
        return "Normal"
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600"
    if (confidence >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <DialogTitle className="text-xl">{insight.title}</DialogTitle>
              <div className="flex items-center gap-2">
                <Badge className={getTypeColor(insight.type)}>
                  {getTypeIcon(insight.type)}
                  <span className="ml-1">{getTypeLabel(insight.type)}</span>
                </Badge>
                <Badge className={getImpactColor(insight.impact)}>
                  <Target className="h-3 w-3 mr-1" />
                  Impacto {getImpactLabel(insight.impact)}
                </Badge>
                <Badge variant="outline">
                  <Brain className="h-3 w-3 mr-1" />
                  {insight.confidence}% de confiança
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <BookmarkPlus className="h-4 w-4 mr-1" />
                Salvar
              </Button>
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-1" />
                Compartilhar
              </Button>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-1" />
                Editar
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Resumo */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">Resumo Executivo</h4>
            <p className="text-sm leading-relaxed">{insight.summary}</p>
          </div>

          {/* Métricas Principais */}
          <div>
            <h4 className="font-medium mb-3">Métricas Principais</h4>
            <div className="grid grid-cols-3 gap-4">
              {insight.metrics.map((metric, index) => (
                <div key={index} className="p-4 bg-card border rounded-lg text-center">
                  <div className="text-2xl font-bold mb-1">{metric.value}</div>
                  <div className="text-sm text-muted-foreground mb-2">{metric.label}</div>
                  {metric.change !== 0 && (
                    <div
                      className={`flex items-center justify-center gap-1 text-xs ${
                        metric.change > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {metric.change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {Math.abs(metric.change)}%
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Análise Completa */}
          <div>
            <h4 className="font-medium mb-3">Análise Detalhada</h4>
            <div className="prose prose-sm max-w-none">
              <p className="text-sm leading-relaxed text-muted-foreground">{insight.fullAnalysis}</p>
            </div>
          </div>

          <Separator />

          {/* Recomendações */}
          <div>
            <h4 className="font-medium mb-3">Recomendações de Ação</h4>
            <div className="space-y-3">
              {insight.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Nível de Confiança */}
          <div>
            <h4 className="font-medium mb-3">Nível de Confiança da IA</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Confiança da Análise</span>
                <span className={`font-medium ${getConfidenceColor(insight.confidence)}`}>{insight.confidence}%</span>
              </div>
              <Progress value={insight.confidence} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {insight.confidence >= 90
                  ? "Análise altamente confiável baseada em dados robustos"
                  : insight.confidence >= 70
                    ? "Análise confiável com boa base de dados"
                    : "Análise preliminar - recomenda-se validação adicional"}
              </p>
            </div>
          </div>

          <Separator />

          {/* Ações */}
          <div className="flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
              Gerado em {new Date(insight.createdAt).toLocaleDateString("pt-BR")} • Baseado em dados dos últimos 90 dias
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Gerar Relatório</Button>
              <Button>Implementar Recomendações</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
