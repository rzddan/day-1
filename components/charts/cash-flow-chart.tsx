"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, BarChart3 } from "lucide-react"

export function CashFlowChart() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg font-semibold flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Fluxo de Caixa
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[200px] sm:h-[300px] flex items-center justify-center bg-muted/30 rounded-lg">
          <div className="text-center text-muted-foreground">
            <TrendingUp className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Gráfico de Fluxo de Caixa</p>
            <p className="text-xs mt-1">Em desenvolvimento</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
