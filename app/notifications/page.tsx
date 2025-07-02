import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { NotificationsList } from "@/components/notifications/notifications-list"
import { NotificationsFilters } from "@/components/notifications/notifications-filters"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function NotificationsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Notificações</h1>
              <p className="text-muted-foreground">
                Acompanhe alertas, lembretes e atualizações importantes do sistema.
              </p>
            </div>
          </div>

          <NotificationsFilters />
          <NotificationsList />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
