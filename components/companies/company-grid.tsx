"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Building2,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Calendar,
  MoreVertical,
  Star,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CompanyDetailModal } from "./company-detail-modal"
import { supabase } from "@/lib/supabaseClient"

interface Company {
  id: number
  name: string
  logo?: string
  industry: string
  status: string
  revenue: number
  revenueChange: number
  employees: number
  projects: number
  completedProjects: number
  healthScore: number
  lastUpdate: string
  manager: string
  priority: string
  tags: string[]
  nextReview: string
}

interface CompanyGridProps {
  onSelect?: (id: string) => void
}

function toCamelCaseCompany(company: any): Company {
  return {
    id: company.id,
    name: company.name,
    logo: company.logo,
    industry: company.industry,
    status: company.status,
    revenue: company.revenue,
    revenueChange: company.revenue_change,
    employees: company.employees,
    projects: company.projects ?? 0,
    completedProjects: company.completed_projects ?? 0,
    healthScore: company.health_score ?? 0,
    lastUpdate: company.last_update,
    manager: company.manager,
    priority: company.priority,
    tags: Array.isArray(company.tags)
      ? company.tags
      : (typeof company.tags === 'string' ? JSON.parse(company.tags) : []),
    nextReview: company.next_review,
  }
}

export function CompanyGrid({ onSelect }: CompanyGridProps) {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [companies, setCompanies] = useState<Company[]>([])

  useEffect(() => {
    supabase.from('companies').select('*').then(({ data, error }) => {
      console.log('Empresas do Supabase:', data, error);
      if (data) {
        setCompanies(data.map(toCamelCaseCompany))
      }
    })
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "medium":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "low":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return null
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
    }).format(value)
  }

  return (
    <>
      {companies.length === 0 && <div style={{padding: 32}}>Nenhuma empresa encontrada ou erro na consulta.</div>}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {companies.map((company) => (
          <Card
            key={company.id}
            className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-l-4 border-l-primary/20 hover:border-l-primary"
            onClick={() => onSelect ? onSelect(company.id.toString()) : setSelectedCompany(company)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={company.logo || "/placeholder.svg"} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {company.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm sm:text-base truncate">{company.name}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{company.industry}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getPriorityIcon(company.priority)}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Star className="h-4 w-4 mr-2" />
                        Favoritar
                      </DropdownMenuItem>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Arquivar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Status and Health Score */}
              <div className="flex items-center justify-between">
                <Badge className={`text-xs ${getStatusColor(company.status)}`}>
                  {company.status === "active" ? "Ativa" : company.status === "pending" ? "Pendente" : "Inativa"}
                </Badge>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Saúde:</span>
                  <span
                    className={`text-xs font-medium ${
                      company.healthScore >= 80
                        ? "text-green-600"
                        : company.healthScore >= 60
                          ? "text-yellow-600"
                          : "text-red-600"
                    }`}
                  >
                    {company.healthScore}%
                  </span>
                </div>
              </div>

              {/* Revenue */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Receita Anual</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {company.revenueChange > 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    <span className={`text-xs ${company.revenueChange > 0 ? "text-green-600" : "text-red-600"}`}>
                      {company.revenueChange > 0 ? "+" : ""}
                      {company.revenueChange}%
                    </span>
                  </div>
                </div>
                <p className="text-lg font-bold">{formatCurrency(company.revenue)}</p>
              </div>

              {/* Projects Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Projetos</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {company.completedProjects}/{company.projects}
                  </span>
                </div>
                <Progress value={(company.completedProjects / company.projects) * 100} className="h-2" />
              </div>

              {/* Team and Next Review */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Equipe</p>
                    <p className="text-sm font-medium">{company.employees}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Próxima Revisão</p>
                    <p className="text-sm font-medium">
                      {new Date(company.nextReview).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {company.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                    {tag}
                  </Badge>
                ))}
                {company.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs px-2 py-0.5">
                    +{company.tags.length - 3}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedCompany && (
        <CompanyDetailModal
          company={selectedCompany}
          open={!!selectedCompany}
          onOpenChange={() => setSelectedCompany(null)}
        />
      )}
    </>
  )
}
