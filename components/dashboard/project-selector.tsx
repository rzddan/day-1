"use client"

import { useContext } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Building2, FolderKanban, ChevronDown } from "lucide-react"
import { useProjectContext } from "@/context/ProjectContext"

interface Company {
  id: string
  name: string
  projects: Project[]
}

interface Project {
  id: string
  name: string
  status: "healthy" | "warning" | "danger"
}

const companies: Company[] = [
  {
    id: "tech-corp",
    name: "TechCorp Inc.",
    projects: [
      { id: "erp-system", name: "Sistema ERP", status: "healthy" },
      { id: "mobile-app", name: "App Mobile", status: "warning" },
      { id: "data-migration", name: "Migração de Dados", status: "danger" },
      { id: "cloud-infra", name: "Infraestrutura Cloud", status: "healthy" },
    ],
  },
  {
    id: "retail-plus",
    name: "Retail Plus",
    projects: [
      { id: "ecommerce", name: "E-commerce Platform", status: "warning" },
      { id: "inventory", name: "Sistema de Estoque", status: "healthy" },
      { id: "pos-system", name: "Sistema PDV", status: "danger" },
    ],
  },
  {
    id: "finance-solutions",
    name: "Finance Solutions",
    projects: [
      { id: "audit-system", name: "Sistema de Auditoria", status: "healthy" },
      { id: "payment-gateway", name: "Gateway de Pagamento", status: "warning" },
    ],
  },
]

export function ProjectSelector() {
  const { selectedCompany, setSelectedCompany, selectedProject, setSelectedProject, companies } = useProjectContext()

  const handleCompanyChange = (companyId: string) => {
    setSelectedCompany(companyId)
    setSelectedProject("")
  }

  const handleProjectChange = (projectId: string) => {
    setSelectedProject(projectId)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800 border-green-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "danger":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const selectedCompanyData = companies.find((c: any) => c.id === selectedCompany)

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full">
        {/* Company Selector */}
        <div className="flex-1 flex items-center gap-2 mb-2 sm:mb-0">
          <Building2 className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground min-w-[60px]">Empresa</span>
          <Select value={selectedCompany} onValueChange={handleCompanyChange}>
            <SelectTrigger className="h-11 min-w-[200px]">
              <SelectValue placeholder="Selecione uma empresa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <div className="flex items-center justify-between w-full">
                  <span>Todas as Empresas</span>
                  <Badge variant="secondary" className="ml-2">
                    {companies.reduce((acc: number, c: any) => acc + c.projects.length, 0)} projetos
                  </Badge>
                </div>
              </SelectItem>
              {companies.map((company: any) => (
                <SelectItem key={company.id} value={company.id}>
                  <div className="flex items-center justify-between w-full">
                    <span>{company.name}</span>
                    <Badge variant="secondary" className="ml-2">
                      {company.projects.length} projetos
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Project Selector */}
        <div className="flex-1 flex items-center gap-2 mt-2 sm:mt-0">
          <FolderKanban className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground min-w-[60px]">Projeto</span>
          <Select
            value={selectedProject}
            onValueChange={handleProjectChange}
            disabled={!selectedCompany || selectedCompany === "all"}
          >
            <SelectTrigger className="h-11 min-w-[220px]">
              <SelectValue
                placeholder={
                  !selectedCompany || selectedCompany === "all"
                    ? "Selecione uma empresa primeiro"
                    : "Selecione um projeto"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {selectedCompanyData?.projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  <div className="flex items-center justify-between w-full">
                    <span>{project.name}</span>
                    <Badge className={`ml-2 ${getStatusColor(project.status)}`}>
                      {project.status === "healthy" ? "Saudável" : project.status === "warning" ? "Atenção" : "Crítico"}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Selected Info */}
      {(selectedCompany || selectedProject) && (
        <div className="flex flex-wrap items-center gap-2 p-3 bg-muted/50 rounded-lg mt-3">
          <span className="text-sm text-muted-foreground">Visualizando:</span>
          {selectedProject ? (
            <>
              <Badge variant="outline">{selectedCompanyData?.name}</Badge>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
              <Badge variant="default">
                {selectedCompanyData?.projects.find((p) => p.id === selectedProject)?.name}
              </Badge>
            </>
          ) : selectedCompany === "all" ? (
            <Badge variant="default">Todas as Empresas</Badge>
          ) : (
            <Badge variant="default">{selectedCompanyData?.name}</Badge>
          )}
        </div>
      )}
    </div>
  )
}
