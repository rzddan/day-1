import React, { createContext, useState, ReactNode, useContext, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

export interface Company {
  id: string
  name: string
  projects: Project[]
}

export interface Project {
  id: string
  name: string
  status: "healthy" | "warning" | "danger"
}

export interface ProjectContextType {
  selectedCompany: string
  setSelectedCompany: (id: string) => void
  selectedProject: string
  setSelectedProject: (id: string) => void
  companies: Company[]
  loading: boolean
}

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [selectedCompany, setSelectedCompany] = useState<string>("")
  const [selectedProject, setSelectedProject] = useState<string>("")
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchCompanies() {
      setLoading(true)
      // Busca empresas e projetos relacionados
      const { data: companiesData, error } = await supabase
        .from("companies")
        .select("id, name, projects(id, name, status)")
      if (!error && companiesData) {
        setCompanies(companiesData as Company[])
      }
      setLoading(false)
    }
    fetchCompanies()
  }, [])

  return (
    <ProjectContext.Provider value={{
      selectedCompany,
      setSelectedCompany,
      selectedProject,
      setSelectedProject,
      companies,
      loading,
    }}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProjectContext() {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error("useProjectContext deve ser usado dentro de um ProjectProvider.")
  }
  return context
} 