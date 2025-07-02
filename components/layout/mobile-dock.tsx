"use client"

import { Home, Building2, FolderKanban, BarChart3, Bot } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const dockItems = [
  { title: "Início", url: "/", icon: Home },
  { title: "Empresas", url: "/companies", icon: Building2 },
  { title: "Projetos", url: "/projects", icon: FolderKanban },
  { title: "Cenários", url: "/scenarios", icon: BarChart3 },
  { title: "IA", url: "/ai-assistant", icon: Bot },
]

export function MobileDock() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-6 left-4 right-4 z-50 md:hidden">
      <div className="glass rounded-3xl shadow-2xl shadow-black/20 border border-white/20">
        <div className="flex items-center justify-around px-3 py-4">
          {dockItems.map((item) => {
            const isActive = pathname === item.url
            const Icon = item.icon

            return (
              <Link
                key={item.url}
                href={item.url}
                className={cn(
                  "flex flex-col items-center justify-center gap-2 rounded-2xl px-4 py-3 text-xs font-medium transition-all duration-300 min-w-0 flex-1 relative group",
                  isActive
                    ? "text-white bg-gradient-to-br from-blue-500 to-purple-600 scale-110 shadow-lg shadow-blue-500/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/10 hover:scale-105 active:scale-95",
                )}
              >
                <div className="relative">
                  <Icon className={cn("h-5 w-5 transition-all", isActive && "drop-shadow-sm")} />
                  {item.title === "Projetos" && (
                    <Badge className="absolute -top-2 -right-2 h-4 w-4 rounded-full p-0 text-[10px] bg-gradient-to-r from-red-500 to-pink-500 border-0 shadow-lg animate-pulse">
                      2
                    </Badge>
                  )}
                  {item.title === "IA" && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                  )}
                  {isActive && (
                    <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl blur-lg -z-10" />
                  )}
                </div>
                <span
                  className={cn(
                    "truncate transition-all font-medium",
                    isActive ? "text-white font-semibold" : "group-hover:font-medium",
                  )}
                >
                  {item.title}
                </span>
                {!isActive && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
