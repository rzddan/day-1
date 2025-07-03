import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react"

interface UserInfoProps {
  name?: string
  xp?: string
  level?: string
  compact?: boolean // Para exibição reduzida (apenas avatar)
}

export function UserInfo({ name = "Usuário CFO", xp = "2.450 XP", level = "8", compact = false }: UserInfoProps) {
  return (
    <div className={`flex items-center gap-3 ${compact ? '' : 'rounded-lg p-3 bg-muted/50'}`}>
      <Avatar className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
        <AvatarImage src="/placeholder.svg?height=32&width=32" />
        <AvatarFallback>
          <User className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      {!compact && (
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">Nível {level} • {xp}</p>
        </div>
      )}
    </div>
  )
} 