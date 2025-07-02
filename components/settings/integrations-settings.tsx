"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Calendar, HardDriveIcon as Drive, Music, MessageSquare } from "lucide-react"

const integrations = [
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Sincronize eventos e prazos financeiros",
    icon: Calendar,
    connected: true,
    status: "Ativo",
  },
  {
    id: "google-drive",
    name: "Google Drive",
    description: "Importe e visualize documentos financeiros",
    icon: Drive,
    connected: true,
    status: "Ativo",
  },
  {
    id: "spotify",
    name: "Spotify",
    description: "Controle de música durante o trabalho",
    icon: Music,
    connected: false,
    status: "Desconectado",
  },
  {
    id: "slack",
    name: "Slack",
    description: "Receba notificações e resumos financeiros",
    icon: MessageSquare,
    connected: false,
    status: "Desconectado",
  },
]

export function IntegrationsSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Integrações Disponíveis</CardTitle>
          <CardDescription>Conecte serviços externos para melhorar sua produtividade</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {integrations.map((integration) => (
            <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-muted rounded-lg">
                  <integration.icon className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{integration.name}</h4>
                    <Badge variant={integration.connected ? "default" : "secondary"}>{integration.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{integration.description}</p>
                </div>
              </div>
              <Button variant={integration.connected ? "outline" : "default"} size="sm">
                {integration.connected ? "Desconectar" : "Conectar"}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configurações de API</CardTitle>
          <CardDescription>Configure chaves de API para serviços externos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="supabase-key">Chave Supabase</Label>
            <Input id="supabase-key" type="password" placeholder="sua-chave-supabase" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ai-endpoint">Endpoint IA</Label>
            <Input id="ai-endpoint" placeholder="https://api.openai.com/v1" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ai-key">Chave API IA</Label>
            <Input id="ai-key" type="password" placeholder="sua-chave-api-ia" />
          </div>
          <Button>Salvar Configurações</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sincronização de Dados</CardTitle>
          <CardDescription>Configure como os dados são sincronizados entre serviços</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Sincronização Automática</Label>
              <p className="text-sm text-muted-foreground">Sincroniza dados automaticamente a cada hora</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Backup Automático</Label>
              <p className="text-sm text-muted-foreground">Cria backup dos dados diariamente</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notificações de Sincronização</Label>
              <p className="text-sm text-muted-foreground">Receba notificações sobre status da sincronização</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
