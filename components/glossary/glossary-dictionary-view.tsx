import { useMemo } from "react"
import { BookOpen } from "lucide-react"
import { Input } from "@/components/ui/input"

// Dados mockados (depois integrar com backend/IA)
const glossaryTerms = [
  { term: "Amortização", definition: "Processo de redução gradual de uma dívida...", examples: ["Sistema SAC: parcelas decrescentes", "Sistema Price: parcelas fixas"] },
  { term: "Covenant", definition: "Cláusula contratual em empréstimos...", examples: ["Covenant de dívida líquida/EBITDA < 3x"] },
  { term: "DRE", definition: "Demonstração do Resultado do Exercício...", examples: ["Receita Bruta - Deduções = Receita Líquida"] },
  { term: "EBITDA", definition: "Earnings Before Interest, Taxes...", examples: ["EBITDA = Receita Líquida - Custos Operacionais"] },
  { term: "ROI", definition: "Return on Investment...", examples: ["ROI = (Receita - Investimento) / Investimento × 100"] },
  { term: "Stress Ratio", definition: "Índice que mede a capacidade de uma empresa...", examples: ["Stress Ratio = Fluxo de Caixa Mínimo / Obrigações Fixas"] },
]

function groupByLetter(terms: typeof glossaryTerms) {
  return terms.reduce((acc, item) => {
    const letter = item.term[0].toUpperCase()
    if (!acc[letter]) acc[letter] = []
    acc[letter].push(item)
    return acc
  }, {} as Record<string, typeof glossaryTerms>)
}

export function GlossaryDictionaryView() {
  // Busca rápida (mock)
  const grouped = useMemo(() => groupByLetter(glossaryTerms), [])
  const letters = Object.keys(grouped).sort()

  return (
    <div className="p-2">
      <div className="mb-4">
        <Input placeholder="Buscar termo ou significado..." className="w-full" />
      </div>
      <div className="space-y-6">
        {letters.map((letter) => (
          <div key={letter}>
            <div className="sticky top-0 z-10 bg-background/80 backdrop-blur font-bold text-lg border-b border-muted/30 mb-2 px-1 py-1">{letter}</div>
            <ul className="space-y-2">
              {grouped[letter].map((item) => (
                <li key={item.term} className="rounded-lg border border-muted/30 bg-muted/10 p-3 hover:bg-accent/30 transition-all">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-base">{item.term}</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{item.definition}</div>
                  {item.examples && item.examples.length > 0 && (
                    <div className="mt-2">
                      <div className="flex items-center gap-1 text-xs font-medium mb-1">
                        <BookOpen className="h-4 w-4" /> Exemplos:
                      </div>
                      <ul className="list-disc ml-6 space-y-1">
                        {item.examples.map((ex, i) => (
                          <li key={i} className="text-xs text-muted-foreground">{ex}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
} 