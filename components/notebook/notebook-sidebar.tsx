"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, FileText, Calendar } from "lucide-react"

const recentNotes = [
  {
    id: 1,
    title: "Q4 Cash Flow Analysis",
    preview: "Analyzing seasonal trends and identifying optimization opportunities...",
    date: "2024-01-15",
    tags: ["analysis", "cash-flow"],
  },
  {
    id: 2,
    title: "Debt Restructuring Options",
    preview: "Exploring refinancing strategies for Manufacturing Ltd...",
    date: "2024-01-14",
    tags: ["debt", "strategy"],
  },
  {
    id: 3,
    title: "Market Research Notes",
    preview: "Industry benchmarks and competitive analysis...",
    date: "2024-01-13",
    tags: ["research", "market"],
  },
]

export function NotebookSidebar() {
  return (
    <Card className="h-full">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Notebook</CardTitle>
          <Button size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search notes..." className="pl-10" />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-2 p-4">
          {recentNotes.map((note) => (
            <div key={note.id} className="p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h4 className="text-sm font-medium line-clamp-1">{note.title}</h4>
                  <FileText className="h-3 w-3 text-muted-foreground flex-shrink-0 ml-2" />
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{note.preview}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {note.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs px-1 py-0">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(note.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
