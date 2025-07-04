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
import { Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const categories = [
  "Análise Financeira",
  "Contabilidade",
  "Investimentos",
  "Gestão de Riscos",
  "Tributação",
  "Mercado de Capitais",
  "Planejamento Financeiro",
]

export function AddTermModal() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    term: "",
    definition: "",
    category: "",
    examples: "",
    relatedTerms: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular salvamento
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Termo adicionado com sucesso!",
      description: `${formData.term} foi adicionado ao glossário.`,
    })

    setFormData({
      term: "",
      definition: "",
      category: "",
      examples: "",
      relatedTerms: "",
    })

    setIsLoading(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Novo Termo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Termo</DialogTitle>
          <DialogDescription>Adicione um novo termo financeiro ao seu glossário pessoal.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="term">Termo *</Label>
            <Input
              id="term"
              value={formData.term}
              onChange={(e) => setFormData({ ...formData, term: e.target.value })}
              placeholder="Ex: WACC"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="definition">Definição *</Label>
            <Textarea
              id="definition"
              value={formData.definition}
              onChange={(e) => setFormData({ ...formData, definition: e.target.value })}
              placeholder="Defina o termo de forma clara e objetiva..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="examples">Exemplos de Uso</Label>
            <Textarea
              id="examples"
              value={formData.examples}
              onChange={(e) => setFormData({ ...formData, examples: e.target.value })}
              placeholder="Adicione exemplos práticos, um por linha..."
              rows={3}
            />
            <p className="text-xs text-muted-foreground">Adicione cada exemplo em uma linha separada</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="relatedTerms">Termos Relacionados</Label>
            <Input
              id="relatedTerms"
              value={formData.relatedTerms}
              onChange={(e) => setFormData({ ...formData, relatedTerms: e.target.value })}
              placeholder="Ex: ROI, ROE, ROIC (separados por vírgula)"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar Termo"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
