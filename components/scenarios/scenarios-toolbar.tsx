"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, BarChart3, TrendingDown, AlertTriangle, Copy } from "lucide-react"

export function ScenariosToolbar() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Buscar cenários..." className="pl-10" />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
        <Button variant="outline" size="sm" className="whitespace-nowrap bg-transparent">
          <BarChart3 className="mr-2 h-4 w-4 text-green-500" />
          Base
        </Button>

        <Button variant="outline" size="sm" className="whitespace-nowrap bg-transparent">
          <TrendingDown className="mr-2 h-4 w-4 text-yellow-500" />
          Stress
        </Button>

        <Button variant="outline" size="sm" className="whitespace-nowrap bg-transparent">
          <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
          Pessimista
        </Button>

        <Button variant="outline" size="sm" className="whitespace-nowrap bg-transparent">
          <Copy className="mr-2 h-4 w-4" />
          Comparar
        </Button>
      </div>
    </div>
  )
}
