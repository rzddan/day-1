"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MoreHorizontal, Edit, Trash2, BookOpen, Calendar } from "lucide-react"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const glossaryTerms = [
  {
    id: 1,
    term: "EBITDA",
    definition:
      "Earnings Before Interest, Taxes, Depreciation and Amortization. Indicador financeiro que representa o lucro antes dos juros, impostos, depreciação e amortização.",
    category: "Análise Financeira",
    examples: ["EBITDA = Receita Líquida - Custos Operacionais", "Usado para comparar empresas do mesmo setor"],
    dateAdded: "2024-01-15",
    lastModified: "2024-01-15",
  },
  {
    id: 2,
    term: "Covenant",
    definition:
      "Cláusula contratual em empréstimos que estabelece condições que o devedor deve cumprir, como manter determinados índices financeiros.",
    category: "Gestão de Riscos",
    examples: ["Covenant de dívida líquida/EBITDA < 3x", "Covenant de liquidez corrente > 1,2"],
    dateAdded: "2024-01-14",
    lastModified: "2024-01-14",
  },
  {
    id: 3,
    term: "Stress Ratio",
    definition:
      "Índice que mede a capacidade de uma empresa suportar cenários adversos, calculado através de simulações de stress testing.",
    category: "Gestão de Riscos",
    examples: [
      "Stress Ratio = Fluxo de Caixa Mínimo / Obrigações Fixas",
      "Valores acima de 1,5 indicam boa resistência",
    ],
    dateAdded: "2024-01-13",
    lastModified: "2024-01-13",
  },
  {
    id: 4,
    term: "Amortização",
    definition:
      "Processo de redução gradual de uma dívida através de pagamentos periódicos que incluem principal e juros.",
    category: "Contabilidade",
    examples: ["Sistema SAC: parcelas decrescentes", "Sistema Price: parcelas fixas"],
    dateAdded: "2024-01-12",
    lastModified: "2024-01-12",
  },
  {
    id: 5,
    term: "ROI",
    definition:
      "Return on Investment. Métrica que avalia a eficiência de um investimento, calculada como (Ganho - Custo) / Custo.",
    category: "Investimentos",
    examples: [
      "ROI = (Receita - Investimento) / Investimento × 100",
      "ROI de 15% significa retorno de R$ 1,15 para cada R$ 1 investido",
    ],
    dateAdded: "2024-01-11",
    lastModified: "2024-01-11",
  },
  {
    id: 6,
    term: "DRE",
    definition:
      "Demonstração do Resultado do Exercício. Relatório contábil que apresenta as receitas, custos e despesas de uma empresa em determinado período.",
    category: "Contabilidade",
    examples: [
      "Receita Bruta - Deduções = Receita Líquida",
      "Resultado Operacional = Receita Líquida - Custos - Despesas",
    ],
    dateAdded: "2024-01-10",
    lastModified: "2024-01-10",
  },
]

export function GlossaryList() {
  const [editingTerm, setEditingTerm] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      {glossaryTerms.map((item) => (
        <Card key={item.id} className="transition-all hover:shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-lg">{item.term}</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setEditingTerm(item.id)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {editingTerm === item.id ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Termo</label>
                  <Input defaultValue={item.term} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Definição</label>
                  <Textarea defaultValue={item.definition} rows={3} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Exemplos (um por linha)</label>
                  <Textarea defaultValue={item.examples.join("\n")} rows={2} />
                </div>
                <div className="flex gap-2">
                  <Button size="sm">Salvar</Button>
                  <Button size="sm" variant="outline" onClick={() => setEditingTerm(null)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  <p className="text-sm leading-relaxed">{item.definition}</p>

                  {item.examples.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Exemplos:
                      </h4>
                      <ul className="space-y-1 ml-6">
                        {item.examples.map((example, index) => (
                          <li key={index} className="text-sm text-muted-foreground list-disc">
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Adicionado em {new Date(item.dateAdded).toLocaleDateString("pt-BR")}</span>
                  </div>
                  {item.lastModified !== item.dateAdded && (
                    <span>Modificado em {new Date(item.lastModified).toLocaleDateString("pt-BR")}</span>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
