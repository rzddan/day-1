import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Play, BookOpen, Video, FileText, Clock, Star, Trophy } from "lucide-react"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export function LearningTracks() {
  const [tracks, setTracks] = useState<any[]>([])

  useEffect(() => {
    supabase.from('learning_tracks').select('*').then(({ data, error }) => {
      if (data) {
        setTracks(data.map((track: any) => ({
          ...track,
          completedModules: track.completed_modules,
          xpReward: track.xp_reward,
          content: Array.isArray(track.content) ? track.content : JSON.parse(track.content),
        })))
      }
    })
  }, [])

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {tracks.map((track) => (
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
              {(track.content as any[])?.map((content: any, index: number) => (
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
