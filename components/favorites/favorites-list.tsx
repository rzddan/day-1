"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, FolderKanban, BarChart3, FileText, Heart, ExternalLink, MoreHorizontal, Star } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const favorites = [
  {
    id: 1,
    title: "TechCorp Inc.",
    type: "company",
    description: "Empresa de tecnologia com foco em soluções B2B",
    url: "/companies",
    icon: Building2,
    lastAccessed: "2024-01-15T14:30:00",
    accessCount: 45,
    tags: ["Tecnologia", "B2B", "Alta Performance"],
  },
  {
    id: 2,
    title: "Reestruturação de Dívidas Q1",
    type: "project",
    description: "Projeto de otimização de estrutura de capital",
    url: "/projects",
    icon: FolderKanban,
    lastAccessed: "2024-01-15T10:15:00",
    accessCount: 32,
    tags: ["Dívidas", "Otimização", "Q1 2024"],
  },
  {
    id: 3,
    title: "Cenário Stress Test 2024",
    type: "scenario",
    description: "Análise de resistência financeira em cenário adverso",
    url: "/scenarios",
    icon: BarChart3,
    lastAccessed: "2024-01-14T16:20:00",
    accessCount: 28,
    tags: ["Stress Test", "Análise", "2024"],
  },
  {
    id: 4,
    title: "Análise de Fluxo de Caixa",
    type: "note",
    description: "Notas sobre otimização de fluxo de caixa operacional",
    url: "/notebook",
    icon: FileText,
    lastAccessed: "2024-01-14T09:45:00",
    accessCount: 19,
    tags: ["Fluxo de Caixa", "Operacional", "Otimização"],
  },
  {
    id: 5,
    title: "Manufacturing Ltd.",
    type: "company",
    description: "Indústria manufatureira com operações nacionais",
    url: "/companies",
    icon: Building2,
    lastAccessed: "2024-01-13T11:30:00",
    accessCount: 38,
    tags: ["Manufatura", "Nacional", "Covenant Risk"],
  },
]

export function FavoritesList() {
  const [favoritesList, setFavoritesList] = useState(favorites)

  const removeFavorite = (id: number) => {
    setFavoritesList((prev) => prev.filter((fav) => fav.id !== id))
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "company":
        return "Empresa"
      case "project":
        return "Projeto"
      case "scenario":
        return "Cenário"
      case "note":
        return "Nota"
      case "report":
        return "Relatório"
      default:
        return type
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "company":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "project":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "scenario":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
      case "note":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "report":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      {favoritesList.map((favorite) => (
        <Card key={favorite.id} className="transition-all hover:shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 bg-muted rounded-lg">
                  <favorite.icon className="h-5 w-5" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base">{favorite.title}</CardTitle>
                    <Heart className="h-4 w-4 text-red-500 fill-current" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs ${getTypeColor(favorite.type)}`}>{getTypeLabel(favorite.type)}</Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3" />
                      <span>{favorite.accessCount} acessos</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Button asChild variant="ghost" size="icon" className="h-6 w-6">
                  <Link href={favorite.url}>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFavorite(favorite.id)}>
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground selectable">{favorite.description}</p>

            <div className="flex flex-wrap gap-1">
              {favorite.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Último acesso: {new Date(favorite.lastAccessed).toLocaleString("pt-BR")}</span>
            </div>
          </CardContent>
        </Card>
      ))}

      {favoritesList.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhum favorito ainda</h3>
            <p className="text-muted-foreground">
              Adicione empresas, projetos e recursos aos favoritos para acesso rápido.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
