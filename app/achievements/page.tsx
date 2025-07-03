import { AchievementsList } from "@/components/achievements/achievements-list"
import { AchievementsStats } from "@/components/achievements/achievements-stats"
import { Suspense } from "react"

export default function AchievementsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Conquistas</h1>
          <p className="text-muted-foreground">Acompanhe seu progresso e conquistas na plataforma.</p>
        </div>
      </div>
      <AchievementsStats />
      <Suspense fallback={<div className="text-center py-8 text-muted-foreground">Carregando conquistas...</div>}>
        <AchievementsList />
      </Suspense>
    </div>
  )
}
