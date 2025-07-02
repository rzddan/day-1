"use client"

import { Home, Building2, FolderKanban, BarChart3, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const dockItems = [
  { title: "Início", url: "/", icon: Home },
  { title: "Empresas", url: "/companies", icon: Building2 },
  { title: "Projetos", url: "/projects", icon: FolderKanban },
  { title: "Cenários", url: "/scenarios", icon: BarChart3 },
  { title: "Perfil", url: "/profile", icon: User },
]

export function MobileDock() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <div className="bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 border border-border/50 rounded-2xl shadow-2xl shadow-black/10">
        <div className="flex items-center justify-around px-2 py-3">
          {dockItems.map((item) => {
            const isActive = pathname === item.url
            const Icon = item.icon

            return (
              <Link
                key={item.url}
                href={item.url}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 rounded-xl px-3 py-2 text-xs font-medium transition-all duration-200 min-w-0 flex-1 relative",
                  isActive
                    ? "text-primary bg-primary/15 scale-105 shadow-lg shadow-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50 hover:scale-105 active:scale-95",
                )}
              >
                <div className="relative">
                  <Icon className={cn("h-5 w-5 transition-all", isActive && "drop-shadow-sm")} />
                  {item.title === "Projetos" && (
                    <Badge className="absolute -top-2 -right-2 h-4 w-4 rounded-full p-0 text-[10px] bg-gradient-to-r from-red-500 to-pink-500 border-0 shadow-lg">
                      2
                    </Badge>
                  )}
                  {isActive && <div className="absolute -inset-1 bg-primary/20 rounded-lg blur-sm -z-10" />}
                </div>
                <span className={cn("truncate transition-all", isActive && "font-semibold")}>{item.title}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
