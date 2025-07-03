"use client"

import { FavoritesList } from "@/components/favorites/favorites-list"
import { FavoritesFilters } from "@/components/favorites/favorites-filters"
import { FavoritesDetailsView } from "@/components/favorites/favorites-details-view"

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
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Coluna esquerda: grid de favoritos agrupados */}
        <div className="flex-1 min-w-0 max-w-full lg:max-w-[55%] overflow-y-auto pr-0 lg:pr-2" style={{ maxHeight: 'calc(100vh - 220px)' }}>
          <FavoritesList />
        </div>
        {/* Coluna direita: detalhes/contexto do favorito */}
        <div className="flex-1 min-w-0 max-w-full lg:max-w-[45%] overflow-y-auto pl-0 lg:pl-2 border-l border-muted/40" style={{ maxHeight: 'calc(100vh - 220px)' }}>
          <FavoritesDetailsView />
        </div>
      </div>
    </div>
  )
}
