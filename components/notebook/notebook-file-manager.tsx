"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileText, Plus, Search, Star, Trash2, Calendar, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface NotebookFile {
  id: number
  title: string
  content: string
  tags: string[]
  createdAt: string
  updatedAt: string
  isFavorite: boolean
  isActive: boolean
}

interface NotebookFileManagerProps {
  onFileSelect: (file: NotebookFile) => void
  activeFile: NotebookFile | null
}

export function NotebookFileManager({ onFileSelect, activeFile }: NotebookFileManagerProps) {
  const { toast } = useToast()
  const [files, setFiles] = useState<NotebookFile[]>([
    {
      id: 1,
      title: "Análise de Fluxo de Caixa Q1",
      content: "# Análise de Fluxo de Caixa Q1\n\nRevisão detalhada dos fluxos de entrada e saída...",
      tags: ["análise", "fluxo-caixa", "Q1"],
      createdAt: "2024-01-15T14:30:00",
      updatedAt: "2024-01-15T16:45:00",
      isFavorite: true,
      isActive: true,
    },
    {
      id: 2,
      title: "Estratégias de Reestruturação",
      content: "# Estratégias de Reestruturação\n\nOpções para otimização da estrutura de capital...",
      tags: ["estratégia", "reestruturação", "dívidas"],
      createdAt: "2024-01-14T10:20:00",
      updatedAt: "2024-01-14T15:30:00",
      isFavorite: false,
      isActive: false,
    },
    {
      id: 3,
      title: "Notas da Reunião - Board Meeting",
      content: "# Board Meeting - 12/01/2024\n\nPontos discutidos:\n- Aprovação do orçamento...",
      tags: ["reunião", "board", "decisões"],
      createdAt: "2024-01-12T09:00:00",
      updatedAt: "2024-01-12T11:30:00",
      isFavorite: true,
      isActive: false,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [newFileTitle, setNewFileTitle] = useState("")
  const [showNewFileDialog, setShowNewFileDialog] = useState(false)

  const filteredFiles = files.filter(
    (file) =>
      file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleFileSelect = (file: NotebookFile) => {
    // Marcar arquivo como ativo
    setFiles((prev) => prev.map((f) => ({ ...f, isActive: f.id === file.id })))
    onFileSelect(file)
  }

  const handleCreateFile = () => {
    if (!newFileTitle.trim()) return

    const newFile: NotebookFile = {
      id: Date.now(),
      title: newFileTitle,
      content: `# ${newFileTitle}\n\n`,
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isFavorite: false,
      isActive: true,
    }

    setFiles((prev) => [...prev.map((f) => ({ ...f, isActive: false })), newFile])
    onFileSelect(newFile)
    setNewFileTitle("")
    setShowNewFileDialog(false)

    toast({
      title: "Arquivo criado!",
      description: `${newFileTitle} foi criado com sucesso.`,
    })
  }

  const handleDeleteFile = (fileId: number) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId))
    toast({
      title: "Arquivo excluído",
      description: "O arquivo foi removido permanentemente.",
    })
  }

  const toggleFavorite = (fileId: number) => {
    setFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, isFavorite: !f.isFavorite } : f)))
  }

  return (
    <Card className="h-full">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Arquivos do Caderno</CardTitle>
          <Dialog open={showNewFileDialog} onOpenChange={setShowNewFileDialog}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Novo Arquivo</DialogTitle>
                <DialogDescription>Digite o nome do novo arquivo de anotações.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Nome do arquivo..."
                  value={newFileTitle}
                  onChange={(e) => setNewFileTitle(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleCreateFile()}
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowNewFileDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateFile} disabled={!newFileTitle.trim()}>
                  Criar Arquivo
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar arquivos..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-2 p-4 max-h-[600px] overflow-y-auto">
          {filteredFiles.map((file) => (
            <div
              key={file.id}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                file.isActive ? "bg-primary/10 border-primary" : "hover:bg-muted/50"
              }`}
              onClick={() => handleFileSelect(file)}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 flex-1">
                    <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <h4 className="text-sm font-medium line-clamp-1">{file.title}</h4>
                    {file.isActive && <Eye className="h-3 w-3 text-primary" />}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(file.id)
                      }}
                    >
                      <Star className={`h-3 w-3 ${file.isFavorite ? "fill-yellow-500 text-yellow-500" : ""}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteFile(file.id)
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {file.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs px-1 py-0">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(file.updatedAt).toLocaleDateString("pt-BR")}</span>
                  </div>
                  {file.isFavorite && <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />}
                </div>
              </div>
            </div>
          ))}

          {filteredFiles.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum arquivo encontrado</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
