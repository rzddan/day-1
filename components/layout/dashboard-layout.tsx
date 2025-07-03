"use client"

import type React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { Header } from "./header"
import { AIAssistant } from "@/components/ai/ai-assistant"
import { ProjectProvider } from "@/context/ProjectContext"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ProjectProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <SidebarInset className="flex-1">
            <Header />
            <main className="flex-1 p-6">{children}</main>
            <footer className="border-t py-4 px-6">
              <p className="text-sm text-muted-foreground text-center">
                © 2024 Painel CFO. Todos os direitos reservados.
              </p>
            </footer>
          </SidebarInset>
        </div>
        <AIAssistant />
      </SidebarProvider>
    </ProjectProvider>
  )
}
