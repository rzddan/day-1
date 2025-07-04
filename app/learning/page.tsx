import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { LearningTracks } from "@/components/learning/learning-tracks"
import { LearningProgress } from "@/components/learning/learning-progress"
import { LearningFilters } from "@/components/learning/learning-filters"

export default function LearningPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Trilhas de Aprendizado</h1>
            <p className="text-muted-foreground">
              Desenvolva suas habilidades em finanças, contabilidade e uso da plataforma.
            </p>
          </div>
        </div>

        <LearningProgress />
        <LearningFilters />
        <LearningTracks />
      </div>
    </DashboardLayout>
  )
}
