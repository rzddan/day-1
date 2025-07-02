"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, TrendingUp, Zap, Target, Gift } from "lucide-react"
import { XPDetailModal } from "./xp-detail-modal"

interface XPProgressProps {
  currentXP?: number
  currentLevel?: number
  nextLevelXP?: number
}

export function XPProgress({ currentXP = 2450, currentLevel = 8, nextLevelXP = 3000 }: XPProgressProps) {
  const [showModal, setShowModal] = useState(false)
  const progressPercentage = (currentXP / nextLevelXP) * 100
  const xpToNext = nextLevelXP - currentXP

  return (
    <>
      <Card
        className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border-blue-200 dark:border-blue-800/50 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
        onClick={() => setShowModal(true)}
      >
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg">
                <Trophy className="h-6 w-6 text-white drop-shadow-sm" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Nível Atual</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {currentLevel}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 mb-1">
                <Star className="h-5 w-5 fill-current drop-shadow-sm" />
                <span className="text-lg font-bold">{currentXP.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3" />
                <span>{xpToNext} para próximo</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">Progresso do Nível</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">{Math.round(progressPercentage)}%</span>
                <div className="flex items-center gap-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full">
                  <Zap className="h-3 w-3" />
                  <span>+15% hoje</span>
                </div>
              </div>
            </div>
            <Progress value={progressPercentage} className="h-3 bg-blue-100 dark:bg-blue-900/30" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{currentXP.toLocaleString()} XP</span>
              <span>{nextLevelXP.toLocaleString()} XP</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Target className="h-3 w-3" />
              <span>3 quests ativas</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-purple-600 dark:text-purple-400">
              <Gift className="h-3 w-3" />
              <span>Recompensa disponível</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <XPDetailModal
        open={showModal}
        onOpenChange={setShowModal}
        currentXP={currentXP}
        currentLevel={currentLevel}
        nextLevelXP={nextLevelXP}
      />
    </>
  )
}
