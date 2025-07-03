"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, BookOpen, TrendingUp, Calendar, Users, Shield, Award } from "lucide-react"
import { AchievementDetailModal } from "./achievement-detail-modal"
import { supabase } from "@/lib/supabaseClient"

export function AchievementsList() {
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [achievements, setAchievements] = useState<any[]>([])

  useEffect(() => {
    supabase.from('achievements').select('*').then(({ data, error }) => {
      if (data) {
        setAchievements(data.map((achievement: any) => ({
          ...achievement,
          unlockedAt: achievement.unlocked_at,
        })))
      }
    })
  }, [])

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
              className={`transition-all hover:scale-[1.03] hover:ring-2 hover:ring-blue-700/40 cursor-pointer bg-gradient-to-br from-blue-950/80 to-purple-950/60 border-0 shadow-xl ${achievement.unlocked ? "opacity-100" : "opacity-60 grayscale"}`}
              onClick={() => handleAchievementClick(achievement)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-3 rounded-xl shadow-lg border-2 ${achievement.unlocked ? "bg-gradient-to-br from-yellow-400/30 to-blue-400/10 border-yellow-400/40" : "bg-muted/20 border-muted/30"}`}
                    >
                      <achievement.icon className="h-8 w-8" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-base text-white drop-shadow font-bold">{achievement.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs bg-blue-900/60 text-blue-100 border-blue-700/40">
                          {achievement.category}
                        </Badge>
                        <Badge className={`text-xs font-semibold ${getRarityColor(achievement.rarity)} border-0`}> {getRarityLabel(achievement.rarity)} </Badge>
                      </div>
                    </div>
                  </div>
                  {achievement.unlocked && <Trophy className="h-6 w-6 text-yellow-400 drop-shadow" />}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-blue-100/80 line-clamp-2 selectable">{achievement.description}</p>

                {!achievement.unlocked && achievement.progress !== undefined && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-blue-100/80">
                      <span>Progresso</span>
                      <span className="font-medium">
                        {achievement.current || Math.floor((achievement.progress / 100) * (achievement.target || 1))}/
                        {achievement.target || 1}
                      </span>
                    </div>
                    <Progress value={achievement.progress} className="h-2 bg-blue-900/60" />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-medium text-yellow-100">+{achievement.xp} XP</span>
                  </div>
                  {achievement.unlocked && achievement.unlockedAt && (
                    <span className="text-xs text-blue-100/80">
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
