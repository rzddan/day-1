"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Lock, User, AlertCircle, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { z } from "zod"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    rememberMe: false,
  })
  const [error, setError] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  // Credenciais de demonstração (em produção, isso seria validado no backend)
  const DEMO_CREDENTIALS = {
    username: "cfo.admin",
    password: "FinanceHub2024!",
  }

  const loginSchema = z.object({
    username: z.string().min(3, "Usuário muito curto").max(32, "Usuário muito longo"),
    password: z.string().min(8, "Senha muito curta"),
    rememberMe: z.boolean(),
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    const result = loginSchema.safeParse(credentials)
    if (!result.success) {
      setError(result.error.errors[0].message)
      return
    }
    setIsLoading(true)

    // Simular delay de autenticação
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (credentials.username === DEMO_CREDENTIALS.username && credentials.password === DEMO_CREDENTIALS.password) {
      // Simular armazenamento de sessão
      localStorage.setItem(
        "cfo-auth",
        JSON.stringify({
          username: credentials.username,
          loginTime: new Date().toISOString(),
          rememberMe: credentials.rememberMe,
        }),
      )

      toast({
        title: "Login realizado com sucesso!",
        description: "Redirecionando para o painel...",
      })

      setTimeout(() => {
        router.push("/")
      }, 1000)
    } else {
      setError("Credenciais inválidas. Verifique seu usuário e senha.")
    }

    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Nome de Usuário</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="username"
              type="text"
              placeholder="Digite seu usuário"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="pl-10 pr-10"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={credentials.rememberMe}
            onCheckedChange={(checked) => setCredentials({ ...credentials, rememberMe: checked as boolean })}
          />
          <Label htmlFor="remember" className="text-sm">
            Manter-me conectado
          </Label>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Entrando..." : "Entrar"}
        </Button>
      </form>

      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Credenciais de Demonstração</span>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4 text-green-600" />
            <span className="font-medium">Usuário:</span>
            <code className="bg-background px-2 py-1 rounded text-xs">cfo.admin</code>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4 text-green-600" />
            <span className="font-medium">Senha:</span>
            <code className="bg-background px-2 py-1 rounded text-xs">FinanceHub2024!</code>
          </div>
        </div>

        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription className="text-xs">
            <strong>Segurança:</strong> Este é um sistema de uso pessoal. Em produção, as credenciais serão
            criptografadas e armazenadas de forma segura. Recomenda-se usar senhas fortes e autenticação de dois
            fatores.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
