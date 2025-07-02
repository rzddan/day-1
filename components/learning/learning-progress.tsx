import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Target, BookOpen } from "lucide-react"

const progressData = {
  totalXP: 2450,
  currentLevel: 8,
  nextLevelXP: 3000,
  completedModules: 24,
  totalModules: 45,
  certificates: 3,
  currentStreak: 7,
}

export function LearningProgress() {
  const progressPercentage = (progressData.totalXP / progressData.nextLevelXP) * 100
  const moduleProgress = (progressData.completedModules / progressData.totalModules) * 100

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Nível Atual</CardTitle>
          <Trophy className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Nível {progressData.currentLevel}</div>
          <div className="space-y-2 mt-2">
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {progressData.totalXP} / {progressData.nextLevelXP} XP
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Módulos Concluídos</CardTitle>
          <BookOpen className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {progressData.completedModules}/{progressData.totalModules}
          </div>
          <div className="space-y-2 mt-2">
            <Progress value={moduleProgress} className="h-2" />
            <p className="text-xs text-muted-foreground">{moduleProgress.toFixed(0)}% completo</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Certificados</CardTitle>
          <Star className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{progressData.certificates}</div>
          <p className="text-xs text-muted-foreground mt-2">Certificados conquistados</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sequência Atual</CardTitle>
          <Target className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{progressData.currentStreak} dias</div>
          <p className="text-xs text-muted-foreground mt-2">Continue estudando!</p>
        </CardContent>
      </Card>
    </div>
  )
}
