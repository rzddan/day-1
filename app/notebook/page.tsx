"use client"

import { useState } from "react"
import { NotebookEditor } from "@/components/notebook/notebook-editor"
import { NotebookFileManager } from "@/components/notebook/notebook-file-manager"

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

export default function NotebookPage() {
  const [activeFile, setActiveFile] = useState<NotebookFile | null>(null)

  const handleFileSelect = (file: NotebookFile) => {
    setActiveFile(file)
  }

  const handleFileUpdate = (updatedFile: NotebookFile) => {
    setActiveFile(updatedFile)
    // Aqui você salvaria no backend/localStorage
  }

  return (
    <div className="h-[calc(100vh-8rem)]">
      {/* Desktop Layout */}
      <div className="hidden md:flex h-full gap-6">
        <div className="w-80 flex-shrink-0">
          <NotebookFileManager onFileSelect={handleFileSelect} activeFile={activeFile} />
        </div>
        <div className="flex-1">
          <NotebookEditor activeFile={activeFile} onFileUpdate={handleFileUpdate} />
        </div>
      </div>
      {/* Mobile Layout */}
      <div className="md:hidden h-full">
        {activeFile ? (
          <div className="h-full space-y-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveFile(null)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                ← Voltar aos arquivos
              </button>
            </div>
            <NotebookEditor activeFile={activeFile} onFileUpdate={handleFileUpdate} />
          </div>
        ) : (
          <NotebookFileManager onFileSelect={handleFileSelect} activeFile={activeFile} />
        )}
      </div>
    </div>
  )
}
