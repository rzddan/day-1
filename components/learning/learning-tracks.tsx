import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Play, BookOpen, Video, FileText, Clock, Star, Trophy } from "lucide-react"

const learningTracks = [
  {
    id: 1,
    title: "Fundamentos de Análise Financeira",
    description:
      "Aprenda os conceitos básicos de análise financeira, incluindo demonstrações financeiras, indicadores e métricas essenciais.",
    category: "Finanças Básicas",
    type: "Curso Completo",
    duration: "4h 30min",
    modules: 12,
    completedModules: 8,
    difficulty: "Iniciante",
    xpReward: 250,
    certificate: true,
    rating: 4.8,
    enrolled: 1247,
    content: [
      { type: "video", count: 8 },
      { type: "text", count: 4 },
      { type: "quiz", count: 3 },
    ],
  },
  {
    id: 2,
    title: "Gestão de Fluxo de Caixa Avançada",
    description: "Técnicas avançadas para projeção, monitoramento e otimização do fluxo de caixa empresarial.",
    category: "Gestão Financeira",
    type: "Especialização",
    duration: "6h 15min",
    modules: 18,
    completedModules: 0,
    difficulty: "Avançado",
    xpReward: 400,
    certificate: true,
    rating: 4.9,
    enrolled: 892,
    content: [
      { type: "video", count: 12 },
      { type: "text", count: 6 },
      { type: "interactive", count: 4 },
    ],
  },
  {
    id: 3,
    title: "Análise de Cenários e Stress Testing",
    description: "Como construir e analisar diferentes cenários financeiros para tomada de decisão estratégica.",
    category: "Análise de Riscos",
    type: "Workshop",
    duration: "2h 45min",
    modules: 8,
    completedModules: 8,
    difficulty: "Intermediário",
    xpReward: 180,
    certificate: true,
    rating: 4.7,
    enrolled: 634,
    content: [
      { type: "video", count: 5 },
      { type: "interactive", count: 3 },
    ],
  },
  {
    id: 4,
    title: "Dominando o Painel CFO",
    description: "Guia completo para usar todas as funcionalidades da plataforma de forma eficiente.",
    category: "Uso da Plataforma",
    type: "Tutorial",
    duration: "1h 20min",
    modules: 6,
    completedModules: 3,
    difficulty: "Iniciante",
    xpReward: 120,
    certificate: false,
    rating: 4.6,
    enrolled: 2156,
    content: [
      { type: "video", count: 6 },
      { type: "interactive", count: 2 },
    ],
  },
]

export function LearningTracks() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {learningTracks.map((track) => (
        <Card key={track.id} className="transition-all hover:shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base line-clamp-1">{track.title}</CardTitle>
                  {track.certificate && <Trophy className="h-4 w-4 text-yellow-500" />}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    {track.category}
                  </Badge>
                  <Badge
                    variant={
                      track.difficulty === "Iniciante"
                        ? "secondary"
                        : track.difficulty === "Intermediário"
                          ? "default"
                          : "destructive"
                    }
                    className="text-xs"
                  >
                    {track.difficulty}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {track.type}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground line-clamp-2">{track.description}</p>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso</span>
                <span className="font-medium">
                  {track.completedModules}/{track.modules} módulos
                </span>
              </div>
              <Progress value={(track.completedModules / track.modules) * 100} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{track.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span>
                  {track.rating} ({track.enrolled})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              {track.content.map((content, index) => (
                <div key={index} className="flex items-center gap-1">
                  {content.type === "video" && <Video className="h-3 w-3" />}
                  {content.type === "text" && <FileText className="h-3 w-3" />}
                  {content.type === "interactive" && <BookOpen className="h-3 w-3" />}
                  <span>{content.count}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  +{track.xpReward} XP
                </Badge>
                {track.certificate && (
                  <Badge variant="outline" className="text-xs">
                    Certificado
                  </Badge>
                )}
              </div>
              <Button size="sm" className="gap-2">
                <Play className="h-3 w-3" />
                {track.completedModules === 0
                  ? "Iniciar"
                  : track.completedModules === track.modules
                    ? "Revisar"
                    : "Continuar"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
