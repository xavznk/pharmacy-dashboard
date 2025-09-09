"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Activity, Eye, EyeOff, Shield, Mail, Lock } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulation de l'authentification
    setTimeout(() => {
      if (email === "admin@pharmacie.fr" && password === "admin123") {
        router.push("/")
      } else {
        setError("Email ou mot de passe incorrect")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo et titre */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white">
              <Activity className="h-6 w-6" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-green-800">PharmaDash</h1>
          <p className="text-muted-foreground">Dashboard de Gestion Pharmacie</p>
        </div>

        {/* Formulaire de connexion */}
        <Card className="border-green-100">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-green-800">Connexion</CardTitle>
            <CardDescription className="text-center">Connectez-vous à votre espace de gestion</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm">
                  Se souvenir de moi
                </Label>
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                {isLoading ? "Connexion..." : "Se connecter"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <Button variant="link" className="text-green-600 hover:text-green-700">
                Mot de passe oublié ?
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Informations de sécurité */}
        <Card className="border-blue-100 bg-blue-50/50">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-blue-800">Connexion Sécurisée</p>
                <p className="text-xs text-blue-600">
                  Vos données sont protégées par un chiffrement SSL et une authentification à deux facteurs.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informations de test */}
        <Card className="border-yellow-100 bg-yellow-50/50">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-yellow-800">Compte de démonstration</p>
              <div className="text-xs text-yellow-700 space-y-1">
                <p>
                  <strong>Email:</strong> admin@pharmacie.fr
                </p>
                <p>
                  <strong>Mot de passe:</strong> admin123
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
