import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { CompanyGrid } from "@/components/companies/company-grid"
import { AddCompanyModal } from "@/components/companies/add-company-modal"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function CompaniesPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Empresas</h1>
              <p className="text-muted-foreground">Gerencie e monitore todas suas empresas em um só lugar.</p>
            </div>
            <AddCompanyModal />
          </div>

          <CompanyGrid />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
