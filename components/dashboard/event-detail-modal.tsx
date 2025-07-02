"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  AlertTriangle,
  CheckCircle,
  Edit,
  Trash2,
  Share2,
  Bell,
  X,
  Video,
  Phone,
  Copy,
  ExternalLink,
} from "lucide-react"

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  type: "meeting" | "deadline" | "presentation"
  priority: "healthy" | "warning" | "danger"
  participants: string[]
  companyId: string
  projectId?: string
  description: string
  isOnline?: boolean
  duration?: string
}

interface EventDetailModalProps {
  event: Event | null
  isOpen: boolean
  onClose: () => void
}

export function EventDetailModal({ event, isOpen, onClose }: EventDetailModalProps) {
  if (!event) return null

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "healthy":
        return <CheckCircle className="h-6 w-6 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-6 w-6 text-yellow-600" />
      case "danger":
        return <AlertTriangle className="h-6 w-6 text-red-600" />
      default:
        return <CheckCircle className="h-6 w-6 text-gray-600" />
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "healthy":
        return "Normal"
      case "warning":
        return "Atenção"
      case "danger":
        return "Crítico"
      default:
        return "Desconhecido"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "healthy":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800"
      case "danger":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "meeting":
        return "Reunião"
      case "deadline":
        return "Prazo"
      case "presentation":
        return "Apresentação"
      default:
        return "Evento"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "deadline":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      case "presentation":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-3xl max-h-[95vh] p-0 gap-0">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
          <div className="flex items-start gap-4">
            {getPriorityIcon(event.priority)}
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-xl sm:text-2xl font-bold leading-tight pr-8">{event.title}</DialogTitle>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <Badge className={getTypeColor(event.type)}>{getTypeLabel(event.type)}</Badge>
                <Badge className={getPriorityColor(event.priority)}>{getPriorityText(event.priority)}</Badge>
                {event.isOnline && (
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800"
                  >
                    <Video className="h-3 w-3 mr-1" />
                    Online
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4 h-8 w-8" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        {/* Content */}
        <ScrollArea className="flex-1 max-h-[calc(95vh-200px)]">
          <div className="p-6 space-y-6">
            {/* Informações Básicas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-sm">Data</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString("pt-BR", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                  <Clock className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Horário</p>
                    <p className="text-sm text-muted-foreground">
                      {event.time} {event.duration && `(${event.duration})`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                  <MapPin className="h-5 w-5 text-purple-600 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm">Local</p>
                    <p className="text-sm text-muted-foreground truncate">{event.location}</p>
                    {event.isOnline && (
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Entrar
                        </Button>
                        <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent">
                          <Copy className="h-3 w-3 mr-1" />
                          Copiar Link
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                  <Users className="h-5 w-5 text-orange-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Participantes</p>
                    <p className="text-sm text-muted-foreground">{event.participants.length} pessoas</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Descrição */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Descrição</h3>
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-sm leading-relaxed">{event.description}</p>
              </div>
            </div>

            <Separator />

            {/* Participantes */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-semibold text-lg">Participantes ({event.participants.length})</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {event.participants.map((participant, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                      <AvatarFallback className="text-sm font-medium">
                        {participant
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm truncate">{participant}</p>
                      <p className="text-xs text-muted-foreground">Participante</p>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Phone className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Video className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t p-6 pt-4 bg-muted/20">
          <div className="grid grid-cols-2 sm:flex gap-3">
            <Button className="flex-1">
              <Bell className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Definir Lembrete</span>
              <span className="sm:hidden">Lembrete</span>
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <Edit className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Editar Evento</span>
              <span className="sm:hidden">Editar</span>
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <Share2 className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Compartilhar</span>
              <span className="sm:hidden">Compartilhar</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 bg-transparent"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
