"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  username: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular usuário sempre logado durante desenvolvimento
    const devUser: User = {
      id: "dev-1",
      username: "Desenvolvedor",
      email: "dev@painel-cfo.com",
      role: "admin",
    }

    setUser(devUser)
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simular login sempre bem-sucedido durante desenvolvimento
    const devUser: User = {
      id: "dev-1",
      username: username || "Desenvolvedor",
      email: "dev@painel-cfo.com",
      role: "admin",
    }

    setUser(devUser)
    return true
  }

  const logout = () => {
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
