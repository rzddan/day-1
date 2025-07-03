import { Heart } from "lucide-react"

export function FavoritesDetailsView() {
  // Placeholder: exibe instruções e visual amigável
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center text-muted-foreground">
      <Heart className="h-12 w-12 mb-4 text-pink-400" />
      <h2 className="text-lg font-semibold mb-2">Selecione um favorito</h2>
      <p className="text-sm">Ao clicar em um favorito, você verá detalhes, links e contexto aqui.<br/>No futuro, esta área mostrará informações detalhadas, ações rápidas e integração com IA.</p>
    </div>
  )
} 