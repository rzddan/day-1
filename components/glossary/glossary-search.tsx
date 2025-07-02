"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, SortAsc } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function GlossarySearch() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Buscar termos do glossário..." className="pl-10" />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="whitespace-nowrap bg-transparent">
              <Filter className="mr-2 h-4 w-4" />
              Categoria
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem checked>Todas</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Análise Financeira</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Contabilidade</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Investimentos</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Gestão de Riscos</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Tributação</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="whitespace-nowrap bg-transparent">
              <SortAsc className="mr-2 h-4 w-4" />
              Ordenar
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem checked>A-Z</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Z-A</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Mais Recentes</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Mais Antigos</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
