"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Trophy, Star, Calendar, Target, Users, TrendingUp, Gift, Zap } from "lucide-react"

interface AchievementDetailModalProps {
  achievement: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AchievementDetailModal({ achievement, open, onOpenChange }: AchievementDetailModalProps) {
  const [claimReward, setClaimReward] = useState(false)

  const relatedAchievements = [
    {
      id: 10,
      title: "Primeiro Projeto",
      description: "Crie seu primeiro projeto na plataforma",
      icon: Target,
      xp: 100,
      unlocked: true,
      category: "Início",
    },
    {
      id: 11,
      title: "Colaborador Ativo",
      description: "Participe de 5 projetos diferentes",
      icon: Users,
      xp: 250,
      unlocked: false,
      progress: 60,
      category: "Colaboração",
    },
    {
      id: 12,
      title: "Analista Expert",
      description: "Complete 10 análises financeiras",
      icon: TrendingUp,
      xp: 300,
      unlocked: false,
      progress: 30,
      category: "Análise",
    },
  ]

  const tips = [
    "Continue usando a plataforma diariamente para manter sua sequência",
    "Explore diferentes seções para descobrir novas funcionalidades",
    "Participe de projetos colaborativos para ganhar mais XP",
    "Complete módulos de aprendizado para acelerar seu progresso",
  ]

  if (!achievement) return null

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div
              className={`p-4 rounded-lg ${
                achievement.unlocked
                  ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <achievement.icon className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <DialogTitle className="text-xl">{achievement.title}</DialogTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{achievement.category}</Badge>
                <Badge className={getRarityColor(achievement.rarity)}>
                  {achievement.rarity === "common"
                    ? "Comum"
                    : achievement.rarity === "uncommon"
                      ? "Incomum"
                      : achievement.rarity === "rare"
                        ? "Raro"
                        : achievement.rarity === "epic"
                          ? "Épico"
                          : "Lendário"}
                </Badge>
                {achievement.unlocked && <Trophy className="h-5 w-5 text-yellow-500" />}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Descrição e Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Descrição</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground selectable">{achievement.description}</p>

              {!achievement.unlocked && achievement.progress !== undefined && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progresso</span>
                    <span className="font-medium">
                      {achievement.current || Math.floor((achievement.progress / 100) * (achievement.target || 1))}/
                      {achievement.target || 1}
                    </span>
                  </div>
                  <Progress value={achievement.progress} className="h-3" />
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">+{achievement.xp} XP</span>
                </div>
                {achievement.unlocked && achievement.unlockedAt && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Desbloqueado em {new Date(achievement.unlockedAt).toLocaleDateString("pt-BR")}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recompensas */}
          {achievement.unlocked && !claimReward && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Recompensas Disponíveis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="font-medium">Boost de XP</p>
                      <p className="text-sm text-muted-foreground">+50% XP por 24 horas</p>
                    </div>
                  </div>
                  <Button size="sm" onClick={() => setClaimReward(true)}>
                    Resgatar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Conquistas Relacionadas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Conquistas Relacionadas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {relatedAchievements.map((related) => (
                <div key={related.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded ${
                        related.unlocked
                          ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <related.icon className="h-4 w-4" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{related.title}</p>
                      <p className="text-xs text-muted-foreground">{related.description}</p>
                      {!related.unlocked && related.progress && (
                        <div className="w-32">
                          <Progress value={related.progress} className="h-1" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs">+{related.xp}</span>
                    </div>
                    {related.unlocked && <Trophy className="h-4 w-4 text-yellow-500 mt-1" />}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Dicas para Progresso */}
          {!achievement.unlocked && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Dicas para Desbloquear</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="selectable">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
