"use client"

import {
  Home,
  Building2,
  FolderKanban,
  BookOpen,
  BarChart3,
  Trello,
  GraduationCap,
  Trophy,
  Heart,
  Bell,
  BookMarked,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  HelpCircle,
  MoreHorizontal,
} from "lucide-react"
import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"
import { useTheme } from "next-themes"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { state, toggleSidebar, isMobile } = useSidebar()

  // Função para navegação
  const goTo = (href: string) => router.push(href)

  return (
    <Sidebar collapsible="icon" className={`border-r bg-background min-h-screen flex flex-col justify-between transition-all duration-300 ${state === "collapsed" ? "w-16" : "w-64"}`}>
      <SidebarHeader className="border-b flex flex-col items-center gap-2 px-3 py-6">
        <Avatar className="h-14 w-14">
          <AvatarImage src="/placeholder-user.jpg" alt="Usuário" />
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
        {state !== "collapsed" && (
          <>
            <div className="text-center">
              <div className="font-bold text-lg">shadcn</div>
            </div>
            {/* Gamificação */}
            <div className="flex flex-col items-center mt-2">
              <span className="text-xs text-muted-foreground">Nível 5</span>
              <div className="w-20 h-2 bg-muted rounded-full overflow-hidden mt-1">
                <div className="bg-primary h-2 rounded-full" style={{ width: "60%" }} />
              </div>
              <span className="text-xs text-muted-foreground mt-1">XP: 1200/2000</span>
            </div>
          </>
        )}
        <Button variant="ghost" size="icon" className="mt-2" onClick={toggleSidebar}>
          {state === "collapsed" ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </SidebarHeader>
      <SidebarContent className="flex-1 px-2 py-4">
        <TooltipProvider>
          <nav className="flex flex-col gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild variant="ghost" className={`justify-start w-full ${pathname.startsWith("/companies") ? "bg-accent" : ""}`}>
                  <Link href="/companies"><Building2 className="mr-2 h-5 w-5" />{state !== "collapsed" && "Empresas"}</Link>
                </Button>
              </TooltipTrigger>
              {state === "collapsed" && <TooltipContent>Empresas</TooltipContent>}
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild variant="ghost" className={`justify-start w-full ${pathname.startsWith("/projects") ? "bg-accent" : ""}`}>
                  <Link href="/projects"><Trello className="mr-2 h-5 w-5" />{state !== "collapsed" && "Projetos"}</Link>
                </Button>
              </TooltipTrigger>
              {state === "collapsed" && <TooltipContent>Projetos</TooltipContent>}
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild variant="ghost" className={`justify-start w-full ${pathname.startsWith("/notebook") ? "bg-accent" : ""}`}>
                  <Link href="/notebook"><BookOpen className="mr-2 h-5 w-5" />{state !== "collapsed" && "Caderno"}</Link>
                </Button>
              </TooltipTrigger>
              {state === "collapsed" && <TooltipContent>Caderno</TooltipContent>}
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild variant="ghost" className={`justify-start w-full ${pathname.startsWith("/scenarios") ? "bg-accent" : ""}`}>
                  <Link href="/scenarios"><BarChart3 className="mr-2 h-5 w-5" />{state !== "collapsed" && "Cenários"}</Link>
                </Button>
              </TooltipTrigger>
              {state === "collapsed" && <TooltipContent>Cenários</TooltipContent>}
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild variant="ghost" className={`justify-start w-full ${pathname.startsWith("/kanban") ? "bg-accent" : ""}`}>
                  <Link href="/kanban"><FolderKanban className="mr-2 h-5 w-5" />{state !== "collapsed" && "Kanban"}</Link>
                </Button>
              </TooltipTrigger>
              {state === "collapsed" && <TooltipContent>Kanban</TooltipContent>}
            </Tooltip>
            {state !== "collapsed" && <div className="mt-4 mb-1 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Aprendizado & Crescimento</div>}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild variant="ghost" className={`justify-start w-full ${pathname.startsWith("/learning") ? "bg-accent" : ""}`}>
                  <Link href="/learning"><GraduationCap className="mr-2 h-5 w-5" />{state !== "collapsed" && "Trilhas de Aprendizado"}</Link>
                </Button>
              </TooltipTrigger>
              {state === "collapsed" && <TooltipContent>Trilhas de Aprendizado</TooltipContent>}
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild variant="ghost" className={`justify-start w-full ${pathname.startsWith("/achievements") ? "bg-accent" : ""}`}>
                  <Link href="/achievements"><Trophy className="mr-2 h-5 w-5" />{state !== "collapsed" && "Conquistas"}</Link>
                </Button>
              </TooltipTrigger>
              {state === "collapsed" && <TooltipContent>Conquistas</TooltipContent>}
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild variant="ghost" className={`justify-start w-full ${pathname.startsWith("/favorites") ? "bg-accent" : ""}`}>
                  <Link href="/favorites"><Heart className="mr-2 h-5 w-5" />{state !== "collapsed" && "Favoritos"}</Link>
                </Button>
              </TooltipTrigger>
              {state === "collapsed" && <TooltipContent>Favoritos</TooltipContent>}
            </Tooltip>
            {state !== "collapsed" && <div className="mt-4 mb-1 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Ferramentas</div>}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild variant="ghost" className={`justify-start w-full ${pathname.startsWith("/notifications") ? "bg-accent" : ""}`}>
                  <Link href="/notifications"><Bell className="mr-2 h-5 w-5" />{state !== "collapsed" && "Notificações"}</Link>
                </Button>
              </TooltipTrigger>
              {state === "collapsed" && <TooltipContent>Notificações</TooltipContent>}
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild variant="ghost" className={`justify-start w-full ${pathname.startsWith("/glossary") ? "bg-accent" : ""}`}>
                  <Link href="/glossary"><BookMarked className="mr-2 h-5 w-5" />{state !== "collapsed" && "Glossário"}</Link>
                </Button>
              </TooltipTrigger>
              {state === "collapsed" && <TooltipContent>Glossário</TooltipContent>}
            </Tooltip>
          </nav>
        </TooltipProvider>
        <Separator className="my-6" />
        {/* Placeholder para gadget do Spotify */}
        {state !== "collapsed" && (
          <div className="w-full flex flex-col items-center mb-2">
            <div className="w-full h-12 bg-muted rounded-lg flex items-center justify-center text-xs text-muted-foreground">
              Gadget Spotify (em breve)
            </div>
          </div>
        )}
      </SidebarContent>
      <SidebarFooter className="border-t flex flex-col items-center gap-2 py-4">
        <div className="flex flex-row gap-4 mb-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild variant="ghost" size="icon" title="Configurações">
                <Link href="/settings"><Settings className="h-5 w-5" /></Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Configurações</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild variant="ghost" size="icon" title="Ajuda">
                <Link href="/help"><HelpCircle className="h-5 w-5" /></Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Ajuda</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild variant="ghost" size="icon" title="Mais">
                <Link href="/more"><MoreHorizontal className="h-5 w-5" /></Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Mais</TooltipContent>
          </Tooltip>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
