"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingDown,
  DollarSign,
  Target,
  Users,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

interface DashboardOverviewProps {
  companyId?: string | null
  projectId?: string | null
}

export function DashboardOverview({ companyId, projectId }: DashboardOverviewProps) {
  const getFilteredData = () => {
    if (projectId) {
      return {
        revenue: { value: 450000, change: 12, status: "healthy", trend: "up", previousValue: 402000 },
        expenses: { value: 380000, change: -8, status: "healthy", trend: "down", previousValue: 413000 },
        profit: { value: 70000, change: 45, status: "healthy", trend: "up", previousValue: 48000 },
        team: { value: 8, change: 2, status: "healthy", trend: "up", previousValue: 6 },
      }
    } else if (companyId) {
      return {
        revenue: { value: 2450000, change: 15, status: "healthy", trend: "up", previousValue: 2130000 },
        expenses: { value: 1980000, change: 8, status: "warning", trend: "up", previousValue: 1833000 },
        profit: { value: 470000, change: 32, status: "healthy", trend: "up", previousValue: 356000 },
        team: { value: 45, change: 5, status: "healthy", trend: "up", previousValue: 43 },
      }
    } else {
      return {
        revenue: { value: 6340000, change: 18, status: "healthy", trend: "up", previousValue: 5373000 },
        expenses: { value: 5430000, change: 12, status: "healthy", trend: "up", previousValue: 4848000 },
        profit: { value: 910000, change: 35, status: "healthy", trend: "up", previousValue: 674000 },
        team: { value: 127, change: 12, status: "healthy", trend: "up", previousValue: 113 },
      }
    }
  }

  const data = getFilteredData()

  const getStatusIcon = (status: string) => {
    switch (status) {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "border-l-green-500 bg-green-50/50 dark:bg-green-950/20"
      case "warning":
        return "border-l-yellow-500 bg-yellow-50/50 dark:bg-yellow-950/20"
      case "danger":
        return "border-l-red-500 bg-red-50/50 dark:bg-red-950/20"
      default:
        return "border-l-gray-500 bg-gray-50/50 dark:bg-gray-950/20"
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const cards = [
    {
      title: "Receita Total",
      value: formatCurrency(data.revenue.value),
      change: data.revenue.change,
      status: data.revenue.status,
      icon: DollarSign,
      trend: data.revenue.trend,
      previousValue: data.revenue.previousValue,
      description: "Receita acumulada no período",
    },
    {
      title: "Despesas",
      value: formatCurrency(data.expenses.value),
      change: data.expenses.change,
      status: data.expenses.status,
      icon: TrendingDown,
      trend: data.expenses.trend,
      previousValue: data.expenses.previousValue,
      description: "Custos operacionais totais",
    },
    {
      title: projectId ? "Resultado" : "Lucro Líquido",
      value: formatCurrency(data.profit.value),
      change: data.profit.change,
      status: data.profit.status,
      icon: Target,
      trend: data.profit.trend,
      previousValue: data.profit.previousValue,
      description: "Resultado líquido do período",
    },
    {
      title: projectId ? "Equipe" : "Total Pessoas",
      value: data.team.value.toString(),
      change: data.team.change,
      status: data.team.status,
      icon: Users,
      trend: data.team.trend,
      previousValue: data.team.previousValue,
      description: "Pessoas envolvidas",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon
        const changeValue = card.value === card.previousValue?.toString() ? 0 : card.change

        return (
          <Card
            key={index}
            className={`relative border-l-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] ${getStatusColor(card.status)}`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="space-y-1">
                <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
                <p className="text-xs text-muted-foreground/80">{card.description}</p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(card.status)}
                <div className="p-2 rounded-lg bg-background/50">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="space-y-3">
                <div className="text-2xl sm:text-3xl font-bold">{card.value}</div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {changeValue !== 0 && (
                      <>
                        {changeValue > 0 ? (
                          <ArrowUpRight className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-red-600" />
                        )}
                        <span className={`text-sm font-medium ${changeValue > 0 ? "text-green-600" : "text-red-600"}`}>
                          {Math.abs(changeValue)}%
                        </span>
                      </>
                    )}
                  </div>

                  <Badge variant="outline" className="text-xs">
                    {card.trend === "up" ? "↗" : "↘"} Tendência
                  </Badge>
                </div>

                <div className="pt-2 border-t border-border/50">
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>Período anterior:</span>
                    <span className="font-medium">
                      {typeof card.previousValue === "number" && card.previousValue > 1000
                        ? formatCurrency(card.previousValue)
                        : card.previousValue?.toString()}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
