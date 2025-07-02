"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin, Users, AlertTriangle, CheckCircle, Plus, Video } from "lucide-react"
import { EventDetailModal } from "./event-detail-modal"

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

interface UpcomingEventsProps {
  companyId: string | null
  projectId: string | null
}

export function UpcomingEvents({ companyId, projectId }: UpcomingEventsProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const allEvents: Event[] = [
    {
      id: "1",
      title: "Reunião de Planejamento Q1",
      date: "2024-01-15",
      time: "14:00",
      location: "Sala de Reuniões A",
      type: "meeting",
      priority: "healthy",
      participants: ["João Silva", "Maria Santos", "Pedro Costa"],
      companyId: "tech-corp",
      projectId: "erp-system",
      description: "Planejamento estratégico para o primeiro trimestre do projeto ERP",
      isOnline: false,
      duration: "2h",
    },
    {
      id: "2",
      title: "Apresentação para Stakeholders",
      date: "2024-01-18",
      time: "10:00",
      location: "Google Meet",
      type: "presentation",
      priority: "warning",
      participants: ["Ana Oliveira", "Carlos Mendes", "Lucia Ferreira", "Roberto Silva"],
      companyId: "tech-corp",
      projectId: "mobile-app",
      description: "Apresentação do progresso do desenvolvimento do aplicativo mobile",
      isOnline: true,
      duration: "1h 30min",
    },
    {
      id: "3",
      title: "Deadline - Migração de Dados",
      date: "2024-01-20",
      time: "23:59",
      location: "Online",
      type: "deadline",
      priority: "danger",
      participants: ["Roberto Lima", "Sandra Alves"],
      companyId: "tech-corp",
      projectId: "data-migration",
      description: "Prazo final para conclusão da migração dos dados legados",
      isOnline: true,
      duration: "Todo o dia",
    },
    {
      id: "4",
      title: "Review Mensal E-commerce",
      date: "2024-01-22",
      time: "15:30",
      location: "Zoom",
      type: "meeting",
      priority: "healthy",
      participants: ["Felipe Rocha", "Carla Dias"],
      companyId: "retail-plus",
      projectId: "ecommerce",
      description: "Revisão mensal dos indicadores do projeto de e-commerce",
      isOnline: true,
      duration: "45min",
    },
  ]

  const filteredEvents = allEvents.filter((event) => {
    if (projectId) return event.projectId === projectId
    if (companyId) return event.companyId === companyId
    return true
  })

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "danger":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <CheckCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "healthy":
        return "border-l-green-500 bg-green-50/30 dark:bg-green-950/20"
      case "warning":
        return "border-l-yellow-500 bg-yellow-50/30 dark:bg-yellow-950/20"
      case "danger":
        return "border-l-red-500 bg-red-50/30 dark:bg-red-950/20"
      default:
        return "border-l-gray-500 bg-gray-50/30 dark:bg-gray-950/20"
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

  const getDaysUntilEvent = (date: string) => {
    const today = new Date()
    const eventDate = new Date(date)
    const diffTime = eventDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <>
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Próximos Eventos
              <Badge variant="outline" className="ml-2">
                {filteredEvents.length}
              </Badge>
            </CardTitle>
            <Button
              size="sm"
              variant="outline"
              className="h-9 w-9 p-0 hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">Nenhum evento encontrado</p>
              <p className="text-sm">{projectId ? "para este projeto" : companyId ? "para esta empresa" : ""}</p>
            </div>
          ) : (
            filteredEvents.slice(0, 4).map((event) => {
              const daysUntil = getDaysUntilEvent(event.date)

              return (
                <div
                  key={event.id}
                  className={`p-4 rounded-xl border-l-4 cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.02] ${getPriorityColor(event.priority)}`}
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          {getPriorityIcon(event.priority)}
                          <h4 className="font-semibold text-base truncate">{event.title}</h4>
                          {event.isOnline && (
                            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                              <Video className="h-3 w-3 mr-1" />
                              Online
                            </Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span>
                              {new Date(event.date).toLocaleDateString("pt-BR")} às {event.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{event.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Badge className={getTypeColor(event.type)}>{getTypeLabel(event.type)}</Badge>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Users className="h-4 w-4" />
                              <span>{event.participants.length} participantes</span>
                            </div>
                          </div>

                          <div className="text-right">
                            <p
                              className={`text-sm font-medium ${
                                daysUntil === 0
                                  ? "text-orange-600"
                                  : daysUntil === 1
                                    ? "text-yellow-600"
                                    : daysUntil < 0
                                      ? "text-red-600"
                                      : "text-muted-foreground"
                              }`}
                            >
                              {daysUntil === 0
                                ? "Hoje"
                                : daysUntil === 1
                                  ? "Amanhã"
                                  : daysUntil < 0
                                    ? "Atrasado"
                                    : `${daysUntil} dias`}
                            </p>
                            {event.duration && <p className="text-xs text-muted-foreground">{event.duration}</p>}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Participantes Preview */}
                    <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                      <div className="flex -space-x-2">
                        {event.participants.slice(0, 3).map((participant, index) => (
                          <Avatar key={index} className="h-6 w-6 border-2 border-background">
                            <AvatarImage src={`/placeholder.svg?height=24&width=24`} />
                            <AvatarFallback className="text-xs">
                              {participant
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {event.participants.length > 3 && (
                          <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                            <span className="text-xs font-medium">+{event.participants.length - 3}</span>
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {event.participants.slice(0, 2).join(", ")}
                        {event.participants.length > 2 && ` e mais ${event.participants.length - 2}`}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })
          )}

          {filteredEvents.length > 4 && (
            <Button variant="ghost" className="w-full text-sm h-10 hover:bg-accent">
              Ver todos os {filteredEvents.length} eventos
            </Button>
          )}
        </CardContent>
      </Card>

      <EventDetailModal event={selectedEvent} isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)} />
    </>
  )
}
