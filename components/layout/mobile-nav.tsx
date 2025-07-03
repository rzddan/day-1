"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Menu,
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
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { UserInfo } from "./UserInfo"

const navigationSections = [
  {
    title: "Principal",
    items: [
      { title: "Dashboard", url: "/", icon: Home },
      { title: "Empresas", url: "/companies", icon: Building2 },
      { title: "Projetos", url: "/projects", icon: FolderKanban },
      { title: "Cenários", url: "/scenarios", icon: BarChart3 },
    ],
  },
  {
    title: "Ferramentas",
    items: [
      { title: "Caderno", url: "/notebook", icon: BookOpen },
      { title: "Kanban", url: "/kanban", icon: Trello },
      { title: "Trilhas", url: "/learning", icon: GraduationCap },
      { title: "Glossário", url: "/glossary", icon: BookMarked },
    ],
  },
  {
    title: "Pessoal",
    items: [
      { title: "Conquistas", url: "/achievements", icon: Trophy },
      { title: "Favoritos", url: "/favorites", icon: Heart },
      { title: "Notificações", url: "/notifications", icon: Bell },
      { title: "Configurações", url: "/settings", icon: Settings },
    ],
  },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 p-6 border-b">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-sm font-bold">CF</span>
            </div>
            <div>
              <h2 className="font-semibold">Painel CFO</h2>
              <p className="text-sm text-muted-foreground">Hub Financeiro</p>
            </div>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-6 py-6">
              {navigationSections.map((section, index) => (
                <div key={section.title}>
                  <h4 className="mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    {section.title}
                  </h4>
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <Link
                        key={item.url}
                        href={item.url}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                          pathname === item.url ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.title}
                      </Link>
                    ))}
                  </div>
                  {index < navigationSections.length - 1 && <Separator className="mt-6" />}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="border-t p-4">
            <UserInfo />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
