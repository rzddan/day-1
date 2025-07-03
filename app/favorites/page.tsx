import { FavoritesList } from "@/components/favorites/favorites-list"
import { FavoritesFilters } from "@/components/favorites/favorites-filters"
import { Suspense } from "react"

export default function FavoritesPage() {
  return (
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
      <Suspense fallback={<div className="text-center py-8 text-muted-foreground">Carregando favoritos...</div>}>
        <FavoritesList />
      </Suspense>
    </div>
  )
}
