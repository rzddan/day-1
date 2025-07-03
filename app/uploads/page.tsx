"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Download, UploadCloud, FileText, Image, Music, Video, File } from "lucide-react"
// import { supabase } from "@/lib/supabaseClient" // Descomente e ajuste conforme seu client

// Mock de arquivos (substitua por fetch real do Supabase)
const mockFiles = [
  { id: 1, name: "relatorio.pdf", url: "#", type: "application/pdf", uploaded_at: "2024-06-01", processed: true },
  { id: 2, name: "planilha.xlsx", url: "#", type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", uploaded_at: "2024-06-02", processed: false },
  { id: 3, name: "imagem.png", url: "#", type: "image/png", uploaded_at: "2024-06-03", processed: true },
  { id: 4, name: "audio.mp3", url: "#", type: "audio/mpeg", uploaded_at: "2024-06-03", processed: true },
  { id: 5, name: "video.mp4", url: "#", type: "video/mp4", uploaded_at: "2024-06-04", processed: false },
]

function getFileIcon(type: string) {
  if (type.startsWith("image/")) return <Image className="h-5 w-5 text-blue-400" />
  if (type.startsWith("audio/")) return <Music className="h-5 w-5 text-green-500" />
  if (type.startsWith("video/")) return <Video className="h-5 w-5 text-purple-500" />
  if (type === "application/pdf") return <FileText className="h-5 w-5 text-red-500" />
  return <File className="h-5 w-5 text-muted-foreground" />
}

export default function UploadsPage() {
  const [files, setFiles] = useState(mockFiles)
  const [uploading, setUploading] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)

  // TODO: Integrar com Supabase Storage e tabela uploads
  // useEffect(() => { ... }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files)
  }

  const handleUpload = async () => {
    if (!selectedFiles) return
    setUploading(true)
    // TODO: Upload real para Supabase
    setTimeout(() => {
      setUploading(false)
      setFiles((prev) => [
        ...Array.from(selectedFiles).map((file, i) => ({
          id: prev.length + i + 1,
          name: file.name,
          url: "#",
          type: file.type,
          uploaded_at: new Date().toISOString().slice(0, 10),
          processed: false,
        })),
        ...prev,
      ])
      setSelectedFiles(null)
    }, 1200)
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <UploadCloud className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Uploads & Downloads</h1>
      </div>
      <Card>
        <CardContent className="py-6 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <Input type="file" multiple onChange={handleFileChange} accept="*/*" className="max-w-xs" />
            <Button onClick={handleUpload} disabled={uploading || !selectedFiles} className="gap-2">
              <UploadCloud className="h-5 w-5" />
              {uploading ? "Enviando..." : "Enviar Arquivos"}
            </Button>
          </div>
          <div className="text-xs text-muted-foreground">Suporta PDF, DOCX, XLSX, imagens, áudios, vídeos, etc.</div>
        </CardContent>
      </Card>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Arquivos enviados</h2>
        <div className="grid gap-3">
          {files.length === 0 && <div className="text-muted-foreground">Nenhum arquivo enviado ainda.</div>}
          {files.map((file) => (
            <Card key={file.id} className="flex flex-row items-center gap-4 p-4 bg-muted/40">
              <div className="flex items-center gap-3 flex-1">
                {getFileIcon(file.type)}
                <div>
                  <div className="font-medium text-sm">{file.name}</div>
                  <div className="text-xs text-muted-foreground">{file.type} • {file.uploaded_at}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button asChild variant="outline" size="icon" title="Baixar">
                  <a href={file.url} download>
                    <Download className="h-5 w-5" />
                  </a>
                </Button>
                {file.processed ? (
                  <span className="text-xs text-green-600">Processado</span>
                ) : (
                  <span className="text-xs text-yellow-600">Aguardando</span>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 