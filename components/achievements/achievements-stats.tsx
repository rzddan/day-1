import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Star, Target, Zap } from "lucide-react"

const stats = [
  {
    title: "Conquistas Desbloqueadas",
    value: "12",
    total: "25",
    icon: Trophy,
    color: "text-yellow-500",
  },
  {
    title: "XP Total Ganho",
    value: "2.450",
    subtitle: "Este mês: +340 XP",
    icon: Star,
    color: "text-blue-500",
  },
  {
    title: "Sequência Atual",
    value: "7 dias",
    subtitle: "Melhor: 15 dias",
    icon: Target,
    color: "text-green-500",
  },
  {
    title: "Nível Atual",
    value: "8",
    subtitle: "550 XP para nível 9",
    icon: Zap,
    color: "text-purple-500",
  },
]

export function AchievementsStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stat.value}
              {stat.total && <span className="text-sm text-muted-foreground">/{stat.total}</span>}
            </div>
            {stat.subtitle && <p className="text-xs text-muted-foreground mt-1">{stat.subtitle}</p>}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
