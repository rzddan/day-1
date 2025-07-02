"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CalendarWidget() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Calendário
          </CardTitle>
          <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[200px] sm:h-[250px] flex items-center justify-center bg-muted/30 rounded-lg">
          <div className="text-center text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Widget de Calendário</p>
            <p className="text-xs mt-1">Em desenvolvimento</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
