"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, BookOpen, TrendingUp, Calendar, Users, Shield, Award } from "lucide-react"
import { AchievementDetailModal } from "./achievement-detail-modal"

const achievements = [
  {
    id: 1,
    title: "Primeiro Login",
    description: "Bem-vindo ao Painel CFO! Você fez seu primeiro acesso.",
    icon: Shield,
    category: "Início",
    xp: 50,
    unlocked: true,
    unlockedAt: "2024-01-10T08:00:00",
    rarity: "common",
  },
  {
    id: 2,
    title: "Analista Dedicado",
    description: "Complete 7 dias consecutivos de uso da plataforma.",
    icon: Calendar,
    category: "Consistência",
    xp: 200,
    unlocked: true,
    unlockedAt: "2024-01-15T18:30:00",
    rarity: "uncommon",
  },
  {
    id: 3,
    title: "Mestre dos Cenários",
    description: "Crie e compare 5 cenários financeiros diferentes.",
    icon: TrendingUp,
    category: "Análise",
    xp: 300,
    unlocked: true,
    unlockedAt: "2024-01-12T14:20:00",
    rarity: "rare",
    progress: 100,
  },
  {
    id: 4,
    title: "Estudante Aplicado",
    description: "Complete 3 módulos de aprendizado.",
    icon: BookOpen,
    category: "Educação",
    xp: 150,
    unlocked: false,
    progress: 67,
    current: 2,
    target: 3,
    rarity: "common",
  },
  {
    id: 5,
    title: "Organizador Expert",
    description: "Gerencie 10 projetos simultaneamente.",
    icon: Users,
    category: "Gestão",
    xp: 400,
    unlocked: false,
    progress: 40,
    current: 4,
    target: 10,
    rarity: "epic",
  },
  {
    id: 6,
    title: "Glossário Completo",
    description: "Adicione 50 termos ao glossário financeiro.",
    icon: Award,
    category: "Conhecimento",
    xp: 250,
    unlocked: false,
    progress: 12,
    current: 6,
    target: 50,
    rarity: "uncommon",
  },
]

export function AchievementsList() {
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleAchievementClick = (achievement: any) => {
    setSelectedAchievement(achievement)
    setModalOpen(true)
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
      case "uncommon":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "rare":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "epic":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
      case "legendary":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRarityLabel = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "Comum"
      case "uncommon":
        return "Incomum"
      case "rare":
        return "Raro"
      case "epic":
        return "Épico"
      case "legendary":
        return "Lendário"
      default:
        return "Comum"
    }
  }

  return (
    <>
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement) => (
            <Card
              key={achievement.id}
              className={`transition-all hover:shadow-md cursor-pointer ${
                achievement.unlocked
                  ? "border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20"
                  : "opacity-75"
              }`}
              onClick={() => handleAchievementClick(achievement)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        achievement.unlocked
                          ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <achievement.icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-base">{achievement.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {achievement.category}
                        </Badge>
                        <Badge className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                          {getRarityLabel(achievement.rarity)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  {achievement.unlocked && <Trophy className="h-5 w-5 text-yellow-500" />}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2 selectable">{achievement.description}</p>

                {!achievement.unlocked && achievement.progress !== undefined && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progresso</span>
                      <span className="font-medium">
                        {achievement.current || Math.floor((achievement.progress / 100) * (achievement.target || 1))}/
                        {achievement.target || 1}
                      </span>
                    </div>
                    <Progress value={achievement.progress} className="h-2" />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">+{achievement.xp} XP</span>
                  </div>
                  {achievement.unlocked && achievement.unlockedAt && (
                    <span className="text-xs text-muted-foreground">
                      {new Date(achievement.unlockedAt).toLocaleDateString("pt-BR")}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <AchievementDetailModal achievement={selectedAchievement} open={modalOpen} onOpenChange={setModalOpen} />
    </>
  )
}
