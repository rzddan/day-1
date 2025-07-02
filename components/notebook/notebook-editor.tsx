"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Save, Share, BookOpen, Tag, Plus, X } from "lucide-react"
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

interface NotebookEditorProps {
  activeFile: NotebookFile | null
  onFileUpdate: (file: NotebookFile) => void
}

export function NotebookEditor({ activeFile, onFileUpdate }: NotebookEditorProps) {
  const { toast } = useToast()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    if (activeFile) {
      setTitle(activeFile.title)
      setContent(activeFile.content)
      setTags(activeFile.tags)
      setHasChanges(false)
    } else {
      setTitle("Novo Arquivo")
      setContent("")
      setTags([])
      setHasChanges(false)
    }
  }, [activeFile])

  const handleSave = () => {
    if (!activeFile) return

    const updatedFile = {
      ...activeFile,
      title,
      content,
      tags,
      updatedAt: new Date().toISOString(),
    }

    onFileUpdate(updatedFile)
    setHasChanges(false)

    toast({
      title: "Arquivo salvo!",
      description: "Suas alterações foram salvas com sucesso.",
    })
  }

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
      setHasChanges(true)
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
    setHasChanges(true)
  }

  const handleContentChange = (value: string) => {
    setContent(value)
    setHasChanges(true)
  }

  const handleTitleChange = (value: string) => {
    setTitle(value)
    setHasChanges(true)
  }

  if (!activeFile) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent className="text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Selecione um arquivo</h3>
          <p className="text-muted-foreground">Escolha um arquivo existente ou crie um novo para começar a escrever.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <BookOpen className="h-5 w-5" />
            <Input
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="text-lg font-semibold border-none p-0 h-auto focus-visible:ring-0 bg-transparent"
            />
            {hasChanges && (
              <Badge variant="secondary" className="text-xs">
                Não salvo
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share className="mr-2 h-4 w-4" />
              Compartilhar
            </Button>
            <Button size="sm" onClick={handleSave} disabled={!hasChanges}>
              <Save className="mr-2 h-4 w-4" />
              Salvar
            </Button>
          </div>
        </div>

        {/* Tags Section */}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
                <Button variant="ghost" size="icon" className="h-3 w-3 ml-1 p-0" onClick={() => handleRemoveTag(tag)}>
                  <X className="h-2 w-2" />
                </Button>
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Adicionar tag..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
              className="h-8 text-sm"
            />
            <Button size="sm" variant="outline" onClick={handleAddTag} disabled={!newTag.trim()}>
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <Textarea
          placeholder="Comece a escrever suas análises, pensamentos ou notas de pesquisa aqui. O assistente de IA pode ajudá-lo a analisar dados financeiros, explicar conceitos ou gerar insights baseados em suas anotações."
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
          className="h-full border-none resize-none focus-visible:ring-0 text-base leading-relaxed p-6 selectable"
        />
      </CardContent>
    </Card>
  )
}
