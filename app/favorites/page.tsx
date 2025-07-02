import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { FavoritesList } from "@/components/favorites/favorites-list"
import { FavoritesFilters } from "@/components/favorites/favorites-filters"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function FavoritesPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Favoritos</h1>
              <p className="text-muted-foreground">
                Acesso rápido aos seus projetos, empresas e recursos mais importantes.
              </p>
            </div>
          </div>

          <FavoritesFilters />
          <FavoritesList />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
