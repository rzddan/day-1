"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Bell, AlertTriangle, TrendingUp, Calendar } from "lucide-react"

export function NotificationSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notificações do Sistema
          </CardTitle>
          <CardDescription>Configure quando e como receber notificações</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notificações Push</Label>
              <p className="text-sm text-muted-foreground">Receber notificações no navegador</p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Sons de Notificação</Label>
              <p className="text-sm text-muted-foreground">Reproduzir som ao receber notificações</p>
            </div>
            <Switch />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Modo Não Perturbe</Label>
              <p className="text-sm text-muted-foreground">Pausar notificações durante horários específicos</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Alertas Financeiros
          </CardTitle>
          <CardDescription>Notificações sobre eventos financeiros importantes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Vencimentos Próximos</Label>
              <p className="text-sm text-muted-foreground">Alertas sobre prazos e vencimentos</p>
            </div>
            <div className="flex items-center gap-2">
              <Switch defaultChecked />
              <Select defaultValue="3">
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 dia</SelectItem>
                  <SelectItem value="3">3 dias</SelectItem>
                  <SelectItem value="7">7 dias</SelectItem>
                  <SelectItem value="15">15 dias</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Violação de Covenants</Label>
              <p className="text-sm text-muted-foreground">Alertas sobre riscos de covenant</p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Fluxo de Caixa Baixo</Label>
              <p className="text-sm text-muted-foreground">Alertas sobre níveis críticos de caixa</p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Oportunidades de Investimento</Label>
              <p className="text-sm text-muted-foreground">Sugestões da IA sobre oportunidades</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Relatórios e Resumos
          </CardTitle>
          <CardDescription>Configure a frequência de relatórios automáticos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Resumo Diário</Label>
              <p className="text-sm text-muted-foreground">Resumo das atividades do dia</p>
            </div>
            <div className="flex items-center gap-2">
              <Switch defaultChecked />
              <Select defaultValue="18">
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8">08:00</SelectItem>
                  <SelectItem value="12">12:00</SelectItem>
                  <SelectItem value="18">18:00</SelectItem>
                  <SelectItem value="20">20:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Relatório Semanal</Label>
              <p className="text-sm text-muted-foreground">Análise semanal consolidada</p>
            </div>
            <div className="flex items-center gap-2">
              <Switch defaultChecked />
              <Select defaultValue="monday">
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monday">Segunda</SelectItem>
                  <SelectItem value="friday">Sexta</SelectItem>
                  <SelectItem value="sunday">Domingo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Relatório Mensal</Label>
              <p className="text-sm text-muted-foreground">Análise mensal detalhada</p>
            </div>
            <div className="flex items-center gap-2">
              <Switch defaultChecked />
              <Select defaultValue="1">
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Dia 1</SelectItem>
                  <SelectItem value="15">Dia 15</SelectItem>
                  <SelectItem value="30">Último dia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Eventos e Prazos
          </CardTitle>
          <CardDescription>Notificações sobre eventos do calendário</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Reuniões e Compromissos</Label>
              <p className="text-sm text-muted-foreground">Lembretes de eventos agendados</p>
            </div>
            <div className="flex items-center gap-2">
              <Switch defaultChecked />
              <Select defaultValue="15">
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 min</SelectItem>
                  <SelectItem value="15">15 min</SelectItem>
                  <SelectItem value="30">30 min</SelectItem>
                  <SelectItem value="60">1 hora</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Deadlines de Projetos</Label>
              <p className="text-sm text-muted-foreground">Alertas sobre prazos de projetos</p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Datas Fiscais Importantes</Label>
              <p className="text-sm text-muted-foreground">Lembretes sobre obrigações fiscais</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
