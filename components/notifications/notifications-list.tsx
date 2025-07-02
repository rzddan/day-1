"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, TrendingUp, Calendar, FileText, Bell, CheckCircle, X, Eye, ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"

const notifications = [
  {
    id: 1,
    type: "alert",
    priority: "high",
    title: "Covenant em Risco - Manufacturing Ltd.",
    message: "A empresa está próxima de violar o covenant de dívida líquida/EBITDA. Ratio atual: 2.8x (limite: 3.0x)",
    timestamp: "2024-01-15T14:30:00",
    read: false,
    company: "Manufacturing Ltd.",
    icon: AlertTriangle,
    color: "text-red-500",
    actionUrl: "/companies",
    actionText: "Ver Empresa",
  },
  {
    id: 2,
    type: "deadline",
    priority: "high",
    title: "Vencimento de Empréstimo",
    message: "Empréstimo de R$ 2.5M vence em 5 dias. Verificar disponibilidade de caixa para pagamento.",
    timestamp: "2024-01-15T10:15:00",
    read: false,
    company: "TechCorp Inc.",
    icon: Calendar,
    color: "text-orange-500",
    actionUrl: "/companies",
    actionText: "Ver Detalhes",
  },
  {
    id: 3,
    type: "opportunity",
    priority: "medium",
    title: "Oportunidade de Investimento Identificada",
    message: "IA detectou oportunidade de aplicação de R$ 500k em CDB com rendimento 12% a.a.",
    timestamp: "2024-01-15T09:45:00",
    read: true,
    company: "StartupCo",
    icon: TrendingUp,
    color: "text-green-500",
    actionUrl: "/scenarios",
    actionText: "Ver Cenários",
  },
  {
    id: 4,
    type: "project",
    priority: "medium",
    title: "Projeto Atrasado",
    message: "Implementação ERP Financeiro está 3 dias atrasada. Revisar cronograma e recursos.",
    timestamp: "2024-01-14T16:20:00",
    read: true,
    company: "Todas",
    icon: FileText,
    color: "text-blue-500",
    actionUrl: "/projects",
    actionText: "Ver Projetos",
  },
  {
    id: 5,
    type: "system",
    priority: "low",
    title: "Backup Realizado com Sucesso",
    message: "Backup automático dos dados financeiros concluído. Próximo backup: 16/01/2024 às 02:00.",
    timestamp: "2024-01-14T02:00:00",
    read: true,
    company: "Sistema",
    icon: CheckCircle,
    color: "text-green-500",
    actionUrl: "/settings",
    actionText: "Configurações",
  },
]

export function NotificationsList() {
  const [notificationsList, setNotificationsList] = useState(notifications)
  const router = useRouter()

  const markAsRead = (id: number) => {
    setNotificationsList((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const removeNotification = (id: number) => {
    setNotificationsList((prev) => prev.filter((notif) => notif.id !== id))
  }

  const handleActionClick = (notification: any) => {
    markAsRead(notification.id)
    router.push(notification.actionUrl)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-4">
      {notificationsList.map((notification) => (
        <Card
          key={notification.id}
          className={`transition-all hover:shadow-md ${!notification.read ? "border-l-4 border-l-primary bg-muted/20" : ""}`}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-full bg-muted ${notification.color}`}>
                <notification.icon className="h-4 w-4" />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{notification.title}</h4>
                      {!notification.read && <div className="h-2 w-2 bg-primary rounded-full" />}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getPriorityColor(notification.priority)} className="text-xs">
                        {notification.priority === "high"
                          ? "Alta"
                          : notification.priority === "medium"
                            ? "Média"
                            : "Baixa"}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {notification.company}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => removeNotification(notification.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground selectable">{notification.message}</p>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    {new Date(notification.timestamp).toLocaleString("pt-BR")}
                  </p>

                  {notification.actionUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleActionClick(notification)}
                      className="text-xs"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      {notification.actionText}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {notificationsList.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhuma notificação</h3>
            <p className="text-muted-foreground">Você está em dia com todas as suas notificações!</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
