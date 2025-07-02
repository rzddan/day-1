"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Star } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ProjectsFilters() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Buscar projetos..." className="pl-10" />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
        <Button variant="outline" size="sm" className="whitespace-nowrap bg-transparent">
          <Star className="mr-2 h-4 w-4" />
          Favoritos
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="whitespace-nowrap bg-transparent">
              <Filter className="mr-2 h-4 w-4" />
              Status
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem checked>Em Andamento</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Planejamento</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Concluído</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Pausado</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="whitespace-nowrap bg-transparent">
              Prioridade
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem>Alta</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked>Média</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Baixa</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
