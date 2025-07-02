"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Trophy,
  Target,
  Star,
  Zap,
  Gift,
  Calendar,
  CheckCircle,
  Clock,
  TrendingUp,
  Award,
  Flame,
  Users,
  BookOpen,
  BarChart3,
} from "lucide-react"

interface Quest {
  id: number
  title: string
  description: string
  type: "daily" | "weekly" | "monthly" | "achievement"
  xpReward: number
  progress: number
  maxProgress: number
  completed: boolean
  deadline?: string
  category: string
}

interface Achievement {
  id: number
  title: string
  description: string
  icon: string
  xpReward: number
  unlocked: boolean
  unlockedDate?: string
  rarity: "common" | "rare" | "epic" | "legendary"
}

interface XPDetailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const mockQuests: Quest[] = [
  {
    id: 1,
    title: "Análise Diária",
    description: "Complete uma análise financeira hoje",
    type: "daily",
    xpReward: 50,
    progress: 0,
    maxProgress: 1,
    completed: false,
    deadline: "2024-01-16",
    category: "Análise",
  },
  {
    id: 2,
    title: "Mestre dos Cenários",
    description: "Crie 3 cenários diferentes esta semana",
    type: "weekly",
    xpReward: 200,
    progress: 1,
    maxProgress: 3,
    completed: false,
    deadline: "2024-01-21",
    category: "Cenários",
  },
  {
    id: 3,
    title: "Organizador Expert",
    description: "Complete 10 tarefas no Kanban",
    type: "monthly",
    xpReward: 500,
    progress: 7,
    maxProgress: 10,
    completed: false,
    deadline: "2024-01-31",
    category: "Produtividade",
  },
  {
    id: 4,
    title: "Streak de Ouro",
    description: "Acesse a plataforma por 7 dias consecutivos",
    type: "achievement",
    xpReward: 300,
    progress: 5,
    maxProgress: 7,
    completed: false,
    category: "Engajamento",
  },
]

const mockAchievements: Achievement[] = [
  {
    id: 1,
    title: "Primeiro Passo",
    description: "Complete seu primeiro projeto",
    icon: "🎯",
    xpReward: 100,
    unlocked: true,
    unlockedDate: "2024-01-10",
    rarity: "common",
  },
  {
    id: 2,
    title: "Analista Financeiro",
    description: "Realize 50 análises financeiras",
    icon: "📊",
    xpReward: 500,
    unlocked: true,
    unlockedDate: "2024-01-12",
    rarity: "rare",
  },
  {
    id: 3,
    title: "Mestre dos Dados",
    description: "Processe mais de 1000 registros",
    icon: "🔥",
    xpReward: 1000,
    unlocked: false,
    rarity: "epic",
  },
  {
    id: 4,
    title: "CFO Lendário",
    description: "Alcance o nível 50",
    icon: "👑",
    xpReward: 5000,
    unlocked: false,
    rarity: "legendary",
  },
]

const levelTips = [
  "Complete tarefas diárias para ganhar XP consistente",
  "Participe de projetos colaborativos para bônus de equipe",
  "Use todas as ferramentas da plataforma para maximizar pontos",
  "Mantenha uma sequência de login para bônus de streak",
  "Complete cenários complexos para grandes recompensas",
  "Ajude outros usuários para ganhar XP social",
]

export function XPDetailModal({ open, onOpenChange }: XPDetailModalProps) {
  const [activeTab, setActiveTab] = useState("quests")

  const currentLevel = 8
  const currentXP = 2450
  const nextLevelXP = 3000
  const xpToNext = nextLevelXP - currentXP

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "rare":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "epic":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "legendary":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getQuestTypeColor = (type: string) => {
    switch (type) {
      case "daily":
        return "bg-green-100 text-green-800 border-green-200"
      case "weekly":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "monthly":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "achievement":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getQuestIcon = (category: string) => {
    switch (category) {
      case "Análise":
        return <BarChart3 className="h-4 w-4" />
      case "Cenários":
        return <Target className="h-4 w-4" />
      case "Produtividade":
        return <CheckCircle className="h-4 w-4" />
      case "Engajamento":
        return <Flame className="h-4 w-4" />
      default:
        return <Star className="h-4 w-4" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-primary/60 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl">Sistema de Gamificação</DialogTitle>
                <p className="text-muted-foreground">
                  Nível {currentLevel} • {currentXP} XP
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Próximo Nível</p>
              <p className="text-lg font-bold">{xpToNext} XP restantes</p>
            </div>
          </div>

          {/* Level Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Progresso do Nível</span>
              <span className="text-sm text-muted-foreground">
                {currentXP} / {nextLevelXP} XP
              </span>
            </div>
            <Progress value={(currentXP / nextLevelXP) * 100} className="h-3" />
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="quests">Missões</TabsTrigger>
            <TabsTrigger value="achievements">Conquistas</TabsTrigger>
            <TabsTrigger value="tips">Dicas</TabsTrigger>
            <TabsTrigger value="rewards">Recompensas</TabsTrigger>
          </TabsList>

          <TabsContent value="quests" className="space-y-4">
            <div className="grid gap-4">
              {mockQuests.map((quest) => (
                <Card key={quest.id} className={`${quest.completed ? "opacity-60" : ""}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {getQuestIcon(quest.category)}
                        <div>
                          <h4 className="font-semibold">{quest.title}</h4>
                          <p className="text-sm text-muted-foreground">{quest.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${getQuestTypeColor(quest.type)}`}>
                          {quest.type === "daily"
                            ? "Diária"
                            : quest.type === "weekly"
                              ? "Semanal"
                              : quest.type === "monthly"
                                ? "Mensal"
                                : "Conquista"}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm font-medium text-primary">
                          <Zap className="h-4 w-4" />
                          {quest.xpReward} XP
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Progresso</span>
                        <span className="text-sm text-muted-foreground">
                          {quest.progress} / {quest.maxProgress}
                        </span>
                      </div>
                      <Progress value={(quest.progress / quest.maxProgress) * 100} className="h-2" />
                    </div>
                    {quest.deadline && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        Prazo: {new Date(quest.deadline).toLocaleDateString("pt-BR")}
                      </div>
                    )}
                    {quest.completed && (
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        Missão Concluída!
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {mockAchievements.map((achievement) => (
                <Card key={achievement.id} className={`${achievement.unlocked ? "border-primary/50" : "opacity-60"}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div>
                          <h4 className="font-semibold">{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                      <Badge className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                        {achievement.rarity === "common"
                          ? "Comum"
                          : achievement.rarity === "rare"
                            ? "Raro"
                            : achievement.rarity === "epic"
                              ? "Épico"
                              : "Lendário"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm font-medium text-primary">
                        <Award className="h-4 w-4" />
                        {achievement.xpReward} XP
                      </div>
                      {achievement.unlocked ? (
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          Desbloqueado
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          Bloqueado
                        </div>
                      )}
                    </div>
                    {achievement.unlockedDate && (
                      <p className="text-xs text-muted-foreground">
                        Desbloqueado em {new Date(achievement.unlockedDate).toLocaleDateString("pt-BR")}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tips" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Dicas para Subir de Nível
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {levelTips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-primary">{index + 1}</span>
                    </div>
                    <p className="text-sm">{tip}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Multiplicadores de XP
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Flame className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-800">Streak Diário</span>
                    </div>
                    <p className="text-sm text-green-700">+25% XP por 7+ dias consecutivos</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800">Trabalho em Equipe</span>
                    </div>
                    <p className="text-sm text-blue-700">+15% XP em projetos colaborativos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5" />
                    Próximas Recompensas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium">Nível 9</p>
                        <p className="text-sm text-muted-foreground">Novo tema personalizado</p>
                      </div>
                      <Badge variant="outline">550 XP</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium">Nível 10</p>
                        <p className="text-sm text-muted-foreground">Dashboard avançado</p>
                      </div>
                      <Badge variant="outline">1550 XP</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium">Nível 15</p>
                        <p className="text-sm text-muted-foreground">Relatórios premium</p>
                      </div>
                      <Badge variant="outline">6550 XP</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Benefícios Atuais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Acesso a todos os templates</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Histórico ilimitado</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Suporte prioritário</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Exportação avançada</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
