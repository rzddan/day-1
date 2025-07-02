"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Calendar } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AddTaskModal } from "./add-task-modal"

export function KanbanFilters() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Buscar tarefas..." className="pl-10" />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
        <AddTaskModal />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="whitespace-nowrap bg-transparent">
              <Filter className="mr-2 h-4 w-4" />
              Empresa
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem checked>Todas</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>TechCorp Inc.</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Manufacturing Ltd.</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>StartupCo</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Consulting Group</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="whitespace-nowrap bg-transparent">
              <Calendar className="mr-2 h-4 w-4" />
              Prazo
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem>Hoje</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Esta Semana</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Este Mês</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Atrasadas</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
