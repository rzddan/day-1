"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, Paperclip, Plus, Send, Download, Edit, Trash2 } from "lucide-react"

interface TaskDetailModalProps {
  task: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TaskDetailModal({ task, open, onOpenChange }: TaskDetailModalProps) {
  const [newComment, setNewComment] = useState("")
  const [progress, setProgress] = useState(task?.progress || 0)

  const comments = [
    {
      id: 1,
      author: "Ana Silva",
      content: "Iniciando a análise dos dados financeiros. Preciso dos relatórios do último trimestre.",
      timestamp: "2024-01-15T14:30:00",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      author: "Carlos Santos",
      content: "Relatórios enviados por email. Qualquer dúvida, me avise!",
      timestamp: "2024-01-15T15:45:00",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  const attachments = [
    { id: 1, name: "Relatório_Q4_2023.pdf", size: "2.3 MB", type: "pdf" },
    { id: 2, name: "Planilha_Fluxo_Caixa.xlsx", size: "1.8 MB", type: "excel" },
    { id: 3, name: "Apresentacao_Board.pptx", size: "5.1 MB", type: "powerpoint" },
  ]

  const subtasks = [
    { id: 1, title: "Coletar dados históricos", completed: true },
    { id: 2, title: "Analisar tendências", completed: true },
    { id: 3, title: "Identificar gargalos", completed: false },
    { id: 4, title: "Propor soluções", completed: false },
  ]

  const handleAddComment = () => {
    if (newComment.trim()) {
      // Adicionar comentário
      setNewComment("")
    }
  }

  if (!task) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-xl">{task.title}</DialogTitle>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    task.priority === "Alta" ? "destructive" : task.priority === "Média" ? "default" : "secondary"
                  }
                >
                  {task.priority}
                </Badge>
                <Badge variant="outline">{task.company}</Badge>
                {task.project && <Badge variant="secondary">{task.project}</Badge>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Detalhes</TabsTrigger>
            <TabsTrigger value="comments">Comentários</TabsTrigger>
            <TabsTrigger value="attachments">Anexos</TabsTrigger>
            <TabsTrigger value="activity">Atividade</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Informações Gerais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Descrição</Label>
                    <p className="text-sm text-muted-foreground selectable">
                      {task.description || "Nenhuma descrição fornecida."}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Responsável</Label>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={task.assignee?.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {task.assignee?.name
                              ?.split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{task.assignee?.name}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Prazo</Label>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        {new Date(task.dueDate).toLocaleDateString("pt-BR")}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Progresso</Label>
                    <div className="space-y-2">
                      <Progress value={progress} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span>{progress}% concluído</span>
                        <span>
                          {subtasks.filter((s) => s.completed).length}/{subtasks.length} subtarefas
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Subtarefas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {subtasks.map((subtask) => (
                    <div key={subtask.id} className="flex items-center gap-3">
                      <input type="checkbox" checked={subtask.completed} className="rounded" onChange={() => {}} />
                      <span className={`text-sm ${subtask.completed ? "line-through text-muted-foreground" : ""}`}>
                        {subtask.title}
                      </span>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Subtarefa
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="comments" className="space-y-4">
            <div className="space-y-4">
              {comments.map((comment) => (
                <Card key={comment.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {comment.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{comment.author}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(comment.timestamp).toLocaleString("pt-BR")}
                          </span>
                        </div>
                        <p className="text-sm selectable">{comment.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>EU</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <Textarea
                      placeholder="Adicione um comentário..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={3}
                    />
                    <div className="flex justify-end">
                      <Button size="sm" onClick={handleAddComment} disabled={!newComment.trim()}>
                        <Send className="h-4 w-4 mr-2" />
                        Comentar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attachments" className="space-y-4">
            <div className="space-y-3">
              {attachments.map((attachment) => (
                <Card key={attachment.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded">
                          <Paperclip className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{attachment.name}</p>
                          <p className="text-xs text-muted-foreground">{attachment.size}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button variant="outline" className="w-full bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Anexo
            </Button>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="space-y-1">
                  <p className="text-sm">
                    Tarefa criada por <strong>Ana Silva</strong>
                  </p>
                  <p className="text-xs text-muted-foreground">15/01/2024 às 14:30</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="space-y-1">
                  <p className="text-sm">Progresso atualizado para 65%</p>
                  <p className="text-xs text-muted-foreground">15/01/2024 às 16:45</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div className="space-y-1">
                  <p className="text-sm">Anexo adicionado: Relatório_Q4_2023.pdf</p>
                  <p className="text-xs text-muted-foreground">14/01/2024 às 10:20</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
