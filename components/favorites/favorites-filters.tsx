"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Heart } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function FavoritesFilters() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Buscar favoritos..." className="pl-10" />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="whitespace-nowrap bg-transparent">
              <Filter className="mr-2 h-4 w-4" />
              Tipo
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem checked>Todos</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Empresas</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Projetos</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Cenários</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Notas</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Relatórios</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" size="sm" className="whitespace-nowrap bg-transparent">
          <Heart className="mr-2 h-4 w-4" />
          Mais Acessados
        </Button>
      </div>
    </div>
  )
}
