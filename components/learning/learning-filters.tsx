"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, BookOpen, Video, FileText } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LearningFilters() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Buscar módulos de aprendizado..." className="pl-10" />
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
            <DropdownMenuCheckboxItem>Finanças Básicas</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Análise de Investimentos</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Gestão de Riscos</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Uso da Plataforma</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="whitespace-nowrap bg-transparent">
              <BookOpen className="mr-2 h-4 w-4" />
              Tipo
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem checked>Todos</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>
              <Video className="mr-2 h-4 w-4" />
              Vídeo
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>
              <FileText className="mr-2 h-4 w-4" />
              Texto
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>
              <BookOpen className="mr-2 h-4 w-4" />
              Interativo
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" size="sm" className="whitespace-nowrap bg-transparent">
          Não Iniciados
        </Button>

        <Button variant="outline" size="sm" className="whitespace-nowrap bg-transparent">
          Em Progresso
        </Button>
      </div>
    </div>
  )
}
