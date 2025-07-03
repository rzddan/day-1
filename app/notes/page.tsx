"use client"

import { useEffect, useState } from "react"
import { supabase } from '@/lib/supabaseClient';

export default function Notes() {
  const [notes, setNotes] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchNotes() {
      setLoading(true)
      setError(null)
      try {
        const { data, error } = await supabase.from("notes").select()
        if (error) setError(error.message)
        setNotes(data)
      } catch (err: any) {
        setError(err.message || "Erro desconhecido")
      } finally {
        setLoading(false)
      }
    }
    fetchNotes()
  }, [])

  if (loading) return <div className="text-center py-8 text-muted-foreground">Carregando notas...</div>
  if (error) return <div className="text-center py-8 text-destructive">Erro ao carregar notas: {error}</div>
  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}