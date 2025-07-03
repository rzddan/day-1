"use client"

import { GlossaryList } from "@/components/glossary/glossary-list"
import { GlossarySearch } from "@/components/glossary/glossary-search"
import { AddTermModal } from "@/components/glossary/add-term-modal"
import { GlossaryDictionaryView } from "@/components/glossary/glossary-dictionary-view"

export default function GlossaryPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Glossário</h1>
          <p className="text-muted-foreground">
            Gerencie termos financeiros e suas definições para referência rápida.
          </p>
        </div>
        <AddTermModal />
      </div>
      <GlossarySearch />
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0 max-w-full lg:max-w-[55%] overflow-y-auto pr-0 lg:pr-2" style={{ maxHeight: 'calc(100vh - 220px)' }}>
          <GlossaryList />
        </div>
        <div className="flex-1 min-w-0 max-w-full lg:max-w-[45%] overflow-y-auto pl-0 lg:pl-2 border-l border-muted/40" style={{ maxHeight: 'calc(100vh - 220px)' }}>
          <GlossaryDictionaryView />
        </div>
      </div>
    </div>
  )
}
