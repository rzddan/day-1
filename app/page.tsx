"use client"

import { useState } from "react"
import { MobileDock } from "@/components/layout/mobile-dock"
import { XPProgress } from "@/components/gamification/xp-progress"
import { ProjectSelector } from "@/components/dashboard/project-selector"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { UpcomingEvents } from "@/components/dashboard/upcoming-events"
import { UpcomingDeadlines } from "@/components/dashboard/upcoming-deadlines"
import { RecentInsights } from "@/components/dashboard/recent-insights"
import { CashFlowChart } from "@/components/charts/cash-flow-chart"
import { CalendarWidget } from "@/components/calendar/calendar-widget"

export default function DashboardPage() {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  const handleSelectionChange = (companyId: string | null, projectId: string | null) => {
    setSelectedCompany(companyId)
    setSelectedProject(projectId)
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="pb-20 md:pb-6">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
          {/* Header Section */}
          <div className="space-y-3 sm:space-y-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Painel de Controle</h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">
                {selectedProject
                  ? "Visão detalhada do projeto selecionado"
                  : selectedCompany
                    ? "Visão geral da empresa selecionada"
                    : "Visão geral de todas as empresas e projetos financeiros"}
              </p>
            </div>

            {/* Gamification - Always at top on mobile */}
            <XPProgress />
          </div>

          {/* Project Selector */}
          <ProjectSelector />

          {/* Overview Cards */}
          <DashboardOverview companyId={selectedCompany} projectId={selectedProject} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Left Column - Charts */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <CashFlowChart />
            </div>

            {/* Right Column - Calendar */}
            <div className="space-y-4 sm:space-y-6">
              <CalendarWidget />
            </div>
          </div>

          {/* Bottom Grid - Events, Deadlines, Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <UpcomingEvents companyId={selectedCompany} projectId={selectedProject} />
            <UpcomingDeadlines companyId={selectedCompany} projectId={selectedProject} />
            <RecentInsights companyId={selectedCompany} projectId={selectedProject} />
          </div>
        </div>
      </main>

      <MobileDock />
    </div>
  )
}
