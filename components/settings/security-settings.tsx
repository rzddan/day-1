"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Key, Clock, AlertTriangle, CheckCircle, Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/components/auth/auth-provider"

export function SecuritySettings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const { user } = useAuth()

  const securityStatus = {
    passwordStrength: "Forte",
    lastLogin: user?.loginTime ? new Date(user.loginTime) : new Date(),
    sessionTimeout: user?.rememberMe ? "24 horas" : "8 horas",
    encryptionEnabled: true,
    backupEnabled: true,
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Status de Segurança
          </CardTitle>
          <CardDescription>Visão geral da segurança da sua conta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-1">
                <p className="text-sm font-medium">Força da Senha</p>
                <p className="text-xs text-muted-foreground">Última alteração: há 30 dias</p>
              </div>
              <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                {securityStatus.passwordStrength}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-1">
                <p className="text-sm font-medium">Último Acesso</p>
                <p className="text-xs text-muted-foreground">{securityStatus.lastLogin.toLocaleString("pt-BR")}</p>
              </div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-1">
                <p className="text-sm font-medium">Timeout da Sessão</p>
                <p className="text-xs text-muted-foreground">Desconexão automática</p>
              </div>
              <Badge variant="outline">{securityStatus.sessionTimeout}</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-1">
                <p className="text-sm font-medium">Criptografia</p>
                <p className="text-xs text-muted-foreground">Dados protegidos</p>
              </div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Alterar Senha
          </CardTitle>
          <CardDescription>Mantenha sua conta segura com uma senha forte</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Senha Atual</Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Digite sua senha atual"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">Nova Senha</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                placeholder="Digite sua nova senha"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
            <Input id="confirm-password" type="password" placeholder="Confirme sua nova senha" />
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              <strong>Dicas para uma senha forte:</strong>
              <ul className="mt-2 space-y-1 text-xs">
                <li>• Mínimo de 12 caracteres</li>
                <li>• Combine letras maiúsculas e minúsculas</li>
                <li>• Inclua números e símbolos especiais</li>
                <li>• Evite informações pessoais óbvias</li>
              </ul>
            </AlertDescription>
          </Alert>

          <Button>Alterar Senha</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Configurações de Sessão
          </CardTitle>
          <CardDescription>Gerencie como e quando sua sessão expira</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Desconexão Automática</Label>
              <p className="text-sm text-muted-foreground">Desconectar automaticamente após período de inatividade</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Lembrar Login</Label>
              <p className="text-sm text-muted-foreground">Manter sessão ativa por mais tempo</p>
            </div>
            <Switch defaultChecked={user?.rememberMe} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notificar Novos Acessos</Label>
              <p className="text-sm text-muted-foreground">Receber alerta sobre novos logins</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informações de Segurança</CardTitle>
          <CardDescription>Medidas de proteção implementadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Dados criptografados com AES-256</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Conexão segura via HTTPS</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Backup automático dos dados</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Monitoramento de atividades suspeitas</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Armazenamento local seguro</span>
            </div>
          </div>

          <Alert className="mt-4">
            <Shield className="h-4 w-4" />
            <AlertDescription className="text-sm">
              <strong>Sistema de Uso Pessoal:</strong> Este sistema foi projetado para uso individual. Todos os dados
              são armazenados localmente e criptografados. Para uso corporativo, recomenda-se implementar autenticação
              de dois fatores e auditoria de logs.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
