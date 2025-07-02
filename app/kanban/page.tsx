import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { KanbanBoard } from "@/components/kanban/kanban-board"
import { KanbanFilters } from "@/components/kanban/kanban-filters"

export default function KanbanPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Kanban Global</h1>
            <p className="text-muted-foreground">Visualize tarefas de todas as empresas e projetos em um só lugar.</p>
          </div>
        </div>

        <KanbanFilters />
        <KanbanBoard />
      </div>
    </DashboardLayout>
  )
}
