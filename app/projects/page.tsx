import { ProjectsGrid } from "@/components/projects/projects-grid"
import { ProjectsFilters } from "@/components/projects/projects-filters"
import { AddProjectModal } from "@/components/projects/add-project-modal"
import { Suspense } from "react"

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Projetos</h1>
          <p className="text-muted-foreground">Organize iniciativas entre empresas e acompanhe o progresso.</p>
        </div>
        <AddProjectModal />
      </div>
      <ProjectsFilters />
      <Suspense fallback={<div className="text-center py-8 text-muted-foreground">Carregando projetos...</div>}>
        <ProjectsGrid />
      </Suspense>
    </div>
  )
}
