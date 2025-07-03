"use client"

import { ScenariosGrid } from "@/components/scenarios/scenarios-grid"
import { ScenariosToolbar } from "@/components/scenarios/scenarios-toolbar"
import { AddScenarioModal } from "@/components/scenarios/add-scenario-modal"

export default function ScenariosPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Cenários</h1>
          <p className="text-muted-foreground">
            Construa, edite e compare cenários financeiros (Base, Stress, Pessimista).
          </p>
        </div>
        <AddScenarioModal />
      </div>
      <ScenariosToolbar />
      <ScenariosGrid />
    </div>
  )
}
