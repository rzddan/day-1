import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { GlossaryList } from "@/components/glossary/glossary-list"
import { GlossarySearch } from "@/components/glossary/glossary-search"
import { AddTermModal } from "@/components/glossary/add-term-modal"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function GlossaryPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Glossário</h1>
              <p className="text-muted-foreground">
                Gerencie termos financeiros e suas definições para referência rápida.
              </p>
            </div>
            <AddTermModal />
          </div>

          <GlossarySearch />
          <GlossaryList />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
