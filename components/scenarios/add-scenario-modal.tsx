"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, BarChart3, TrendingDown, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const companies = ["TechCorp Inc.", "Manufacturing Ltd.", "StartupCo", "Consulting Group"]

export function AddScenarioModal() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    type: "Base",
    company: "",
    description: "",
    revenue: "",
    costs: "",
    investments: "",
    assumptions: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular salvamento
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Cenário criado com sucesso!",
      description: `${formData.name} foi adicionado aos seus cenários.`,
    })

    setFormData({
      name: "",
      type: "Base",
      company: "",
      description: "",
      revenue: "",
      costs: "",
      investments: "",
      assumptions: "",
    })

    setIsLoading(false)
    setOpen(false)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Base":
        return <BarChart3 className="h-4 w-4 text-green-500" />
      case "Stress":
        return <TrendingDown className="h-4 w-4 text-yellow-500" />
      case "Pessimista":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <BarChart3 className="h-4 w-4" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Novo Cenário
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Novo Cenário</DialogTitle>
          <DialogDescription>Construa um novo cenário financeiro para análise e comparação.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Cenário *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Cenário Base 2024"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Cenário</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Base">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-green-500" />
                      Base
                    </div>
                  </SelectItem>
                  <SelectItem value="Stress">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="h-4 w-4 text-yellow-500" />
                      Stress
                    </div>
                  </SelectItem>
                  <SelectItem value="Pessimista">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      Pessimista
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Empresa</Label>
              <Select value={formData.company} onValueChange={(value) => setFormData({ ...formData, company: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a empresa" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company} value={company}>
                      {company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva as características e objetivos deste cenário..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="revenue">Receita Projetada (R$)</Label>
              <Input
                id="revenue"
                type="number"
                value={formData.revenue}
                onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="costs">Custos Estimados (R$)</Label>
              <Input
                id="costs"
                type="number"
                value={formData.costs}
                onChange={(e) => setFormData({ ...formData, costs: e.target.value })}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="investments">Investimentos (R$)</Label>
              <Input
                id="investments"
                type="number"
                value={formData.investments}
                onChange={(e) => setFormData({ ...formData, investments: e.target.value })}
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assumptions">Premissas e Considerações</Label>
            <Textarea
              id="assumptions"
              value={formData.assumptions}
              onChange={(e) => setFormData({ ...formData, assumptions: e.target.value })}
              placeholder="Liste as principais premissas utilizadas neste cenário..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Criando..." : "Criar Cenário"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
