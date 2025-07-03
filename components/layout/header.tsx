"use client"

import { Bell, Search, User, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MobileNav } from "./mobile-nav"
import { UserInfo } from "./UserInfo"
import { ProjectSelector } from "@/components/dashboard/project-selector"
import { useTheme } from "next-themes"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function Header() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const nextTheme = isDark ? "light" : "dark"
  const nextThemeLabel = isDark ? "Alternar para tema claro" : "Alternar para tema escuro"

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between h-14 px-4 sm:px-6 w-full">
        {/* Esquerda: Logo e título */}
        <div className="flex items-center gap-2 min-w-[120px]">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground">
            <span className="text-xs font-bold">CF</span>
          </div>
          <span className="font-semibold">Painel CFO</span>
        </div>

        {/* Centro: Busca */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-sm">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar..." className="pl-8" />
            </div>
          </div>
        </div>

        {/* Direita: Notificações, ProjectSelector, Avatar, Toggle Theme */}
        <div className="flex items-center gap-3 min-w-[320px] justify-end">
          {/* Notificações */}
          <Button variant="ghost" size="icon" className="relative flex items-center justify-center">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">3</Badge>
          </Button>

          {/* ProjectSelector - Empresa/Projeto */}
          <div className="min-w-[260px]">
            <ProjectSelector />
          </div>

          {/* Toggle Theme */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" aria-label={nextThemeLabel} onClick={() => setTheme(nextTheme)}>
                  {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{nextThemeLabel}</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Avatar */}
          <UserInfo compact />
        </div>
      </div>
    </header>
  )
}
