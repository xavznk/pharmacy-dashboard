"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  User,
  Shield,
  Bell,
  Database,
  Palette,
  Globe,
  Save,
  Download,
  Upload,
  Trash2,
  AlertTriangle,
  Check,
  Key,
} from "lucide-react"

// Données simulées des paramètres
const parametresUtilisateur = {
  nom: "Dr. Marie Dubois",
  email: "marie.dubois@pharmacie-centrale.fr",
  telephone: "+33 1 42 36 78 90",
  poste: "Pharmacien Titulaire",
  langue: "fr",
  fuseau: "Europe/Paris",
  theme: "light",
  notifications: {
    email: true,
    push: true,
    sms: false,
  },
}

const parametresSysteme = {
  sauvegarde: {
    automatique: true,
    frequence: "quotidienne",
    heure: "02:00",
    retention: 30,
  },
  securite: {
    doubleAuth: true,
    sessionTimeout: 30,
    tentativesMax: 3,
    motDePasseComplexe: true,
  },
  api: {
    rateLimit: 1000,
    timeout: 30,
    logs: true,
  },
}

const historiqueActivite = [
  {
    action: "Connexion utilisateur",
    utilisateur: "Dr. Marie Dubois",
    timestamp: "2024-01-15T14:30:00",
    ip: "192.168.1.100",
    statut: "Succès",
  },
  {
    action: "Modification profil pharmacie",
    utilisateur: "Dr. Marie Dubois",
    timestamp: "2024-01-15T13:45:00",
    ip: "192.168.1.100",
    statut: "Succès",
  },
  {
    action: "Export rapport mensuel",
    utilisateur: "Jean-Pierre Martin",
    timestamp: "2024-01-15T12:15:00",
    ip: "192.168.1.101",
    statut: "Succès",
  },
  {
    action: "Tentative connexion échouée",
    utilisateur: "Inconnu",
    timestamp: "2024-01-15T11:30:00",
    ip: "203.0.113.1",
    statut: "Échec",
  },
]

export default function ParametresPage() {
  const [userSettings, setUserSettings] = useState(parametresUtilisateur)
  const [systemSettings, setSystemSettings] = useState(parametresSysteme)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    // Simulation de sauvegarde
    setTimeout(() => {
      setIsLoading(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }, 1000)
  }

  const exportSettings = () => {
    console.log("Export des paramètres")
    // Logique d'export
  }

  const importSettings = () => {
    console.log("Import des paramètres")
    // Logique d'import
  }

  const resetSettings = () => {
    console.log("Réinitialisation des paramètres")
    // Logique de réinitialisation
  }

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "Succès":
        return "bg-green-100 text-green-800"
      case "Échec":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-green-800">Paramètres Système</h2>
          <p className="text-muted-foreground">Configurez votre dashboard et vos préférences</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={exportSettings}>
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button variant="outline" size="sm" onClick={importSettings}>
            <Upload className="h-4 w-4 mr-2" />
            Importer
          </Button>
          <Button onClick={handleSave} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Sauvegarde..." : "Sauvegarder"}
          </Button>
        </div>
      </div>

      {showSuccess && (
        <Alert className="border-green-200 bg-green-50">
          <Check className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">Paramètres sauvegardés avec succès !</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="utilisateur" className="space-y-4">
        <TabsList>
          <TabsTrigger value="utilisateur">Utilisateur</TabsTrigger>
          <TabsTrigger value="securite">Sécurité</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="systeme">Système</TabsTrigger>
          <TabsTrigger value="activite">Activité</TabsTrigger>
        </TabsList>

        <TabsContent value="utilisateur" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Profil Utilisateur</span>
                </CardTitle>
                <CardDescription>Informations personnelles et préférences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom complet</Label>
                  <Input
                    id="nom"
                    value={userSettings.nom}
                    onChange={(e) => setUserSettings((prev) => ({ ...prev, nom: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userSettings.email}
                    onChange={(e) => setUserSettings((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telephone">Téléphone</Label>
                  <Input
                    id="telephone"
                    value={userSettings.telephone}
                    onChange={(e) => setUserSettings((prev) => ({ ...prev, telephone: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="poste">Poste</Label>
                  <Input
                    id="poste"
                    value={userSettings.poste}
                    onChange={(e) => setUserSettings((prev) => ({ ...prev, poste: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="h-5 w-5" />
                  <span>Préférences d'Affichage</span>
                </CardTitle>
                <CardDescription>Personnalisez l'apparence de votre dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Langue</Label>
                  <Select
                    value={userSettings.langue}
                    onValueChange={(value) => setUserSettings((prev) => ({ ...prev, langue: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Fuseau horaire</Label>
                  <Select
                    value={userSettings.fuseau}
                    onValueChange={(value) => setUserSettings((prev) => ({ ...prev, fuseau: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Europe/Paris">Europe/Paris (GMT+1)</SelectItem>
                      <SelectItem value="Europe/London">Europe/London (GMT+0)</SelectItem>
                      <SelectItem value="America/New_York">America/New_York (GMT-5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Thème</Label>
                  <Select
                    value={userSettings.theme}
                    onValueChange={(value) => setUserSettings((prev) => ({ ...prev, theme: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Clair</SelectItem>
                      <SelectItem value="dark">Sombre</SelectItem>
                      <SelectItem value="auto">Automatique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="securite" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Authentification</span>
                </CardTitle>
                <CardDescription>Paramètres de sécurité et d'authentification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Authentification à deux facteurs</Label>
                    <p className="text-sm text-muted-foreground">Sécurisez votre compte avec 2FA</p>
                  </div>
                  <Switch
                    checked={systemSettings.securite.doubleAuth}
                    onCheckedChange={(checked) =>
                      setSystemSettings((prev) => ({
                        ...prev,
                        securite: { ...prev.securite, doubleAuth: checked },
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Timeout de session (minutes)</Label>
                  <Input
                    type="number"
                    value={systemSettings.securite.sessionTimeout}
                    onChange={(e) =>
                      setSystemSettings((prev) => ({
                        ...prev,
                        securite: { ...prev.securite, sessionTimeout: Number.parseInt(e.target.value) },
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tentatives de connexion max</Label>
                  <Input
                    type="number"
                    value={systemSettings.securite.tentativesMax}
                    onChange={(e) =>
                      setSystemSettings((prev) => ({
                        ...prev,
                        securite: { ...prev.securite, tentativesMax: Number.parseInt(e.target.value) },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mot de passe complexe requis</Label>
                    <p className="text-sm text-muted-foreground">Exiger des mots de passe forts</p>
                  </div>
                  <Switch
                    checked={systemSettings.securite.motDePasseComplexe}
                    onCheckedChange={(checked) =>
                      setSystemSettings((prev) => ({
                        ...prev,
                        securite: { ...prev.securite, motDePasseComplexe: checked },
                      }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Key className="h-5 w-5" />
                  <span>Gestion des Mots de Passe</span>
                </CardTitle>
                <CardDescription>Changez votre mot de passe</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Mot de passe actuel</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>

                <div className="space-y-2">
                  <Label>Nouveau mot de passe</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>

                <div className="space-y-2">
                  <Label>Confirmer le nouveau mot de passe</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>

                <Button className="w-full">Changer le mot de passe</Button>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Préférences de Notifications</span>
              </CardTitle>
              <CardDescription>Configurez comment vous souhaitez être notifié</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notifications par email</Label>
                  <p className="text-sm text-muted-foreground">Recevoir les alertes par email</p>
                </div>
                <Switch
                  checked={userSettings.notifications.email}
                  onCheckedChange={(checked) =>
                    setUserSettings((prev) => ({
                      ...prev,
                      notifications: { ...prev.notifications, email: checked },
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notifications push</Label>
                  <p className="text-sm text-muted-foreground">Recevoir les notifications dans le navigateur</p>
                </div>
                <Switch
                  checked={userSettings.notifications.push}
                  onCheckedChange={(checked) =>
                    setUserSettings((prev) => ({
                      ...prev,
                      notifications: { ...prev.notifications, push: checked },
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notifications SMS</Label>
                  <p className="text-sm text-muted-foreground">Recevoir les alertes critiques par SMS</p>
                </div>
                <Switch
                  checked={userSettings.notifications.sms}
                  onCheckedChange={(checked) =>
                    setUserSettings((prev) => ({
                      ...prev,
                      notifications: { ...prev.notifications, sms: checked },
                    }))
                  }
                />
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-3">Types de notifications</h4>
                <div className="space-y-3">
                  {[
                    { type: "Stock faible", description: "Alertes de rupture de stock" },
                    { type: "Nouvelles commandes", description: "Notification des nouvelles commandes" },
                    { type: "Paiements", description: "Confirmations de paiement" },
                    { type: "Messages clients", description: "Messages et réclamations" },
                    { type: "Mises à jour système", description: "Nouvelles versions et maintenance" },
                  ].map((item) => (
                    <div key={item.type} className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>{item.type}</Label>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="systeme" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>Sauvegarde</span>
                </CardTitle>
                <CardDescription>Configuration des sauvegardes automatiques</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sauvegarde automatique</Label>
                    <p className="text-sm text-muted-foreground">Sauvegarder automatiquement les données</p>
                  </div>
                  <Switch
                    checked={systemSettings.sauvegarde.automatique}
                    onCheckedChange={(checked) =>
                      setSystemSettings((prev) => ({
                        ...prev,
                        sauvegarde: { ...prev.sauvegarde, automatique: checked },
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Fréquence</Label>
                  <Select
                    value={systemSettings.sauvegarde.frequence}
                    onValueChange={(value) =>
                      setSystemSettings((prev) => ({
                        ...prev,
                        sauvegarde: { ...prev.sauvegarde, frequence: value },
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="horaire">Toutes les heures</SelectItem>
                      <SelectItem value="quotidienne">Quotidienne</SelectItem>
                      <SelectItem value="hebdomadaire">Hebdomadaire</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Heure de sauvegarde</Label>
                  <Input
                    type="time"
                    value={systemSettings.sauvegarde.heure}
                    onChange={(e) =>
                      setSystemSettings((prev) => ({
                        ...prev,
                        sauvegarde: { ...prev.sauvegarde, heure: e.target.value },
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Rétention (jours)</Label>
                  <Input
                    type="number"
                    value={systemSettings.sauvegarde.retention}
                    onChange={(e) =>
                      setSystemSettings((prev) => ({
                        ...prev,
                        sauvegarde: { ...prev.sauvegarde, retention: Number.parseInt(e.target.value) },
                      }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>API & Intégrations</span>
                </CardTitle>
                <CardDescription>Configuration des API et services externes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Limite de requêtes par heure</Label>
                  <Input
                    type="number"
                    value={systemSettings.api.rateLimit}
                    onChange={(e) =>
                      setSystemSettings((prev) => ({
                        ...prev,
                        api: { ...prev.api, rateLimit: Number.parseInt(e.target.value) },
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Timeout API (secondes)</Label>
                  <Input
                    type="number"
                    value={systemSettings.api.timeout}
                    onChange={(e) =>
                      setSystemSettings((prev) => ({
                        ...prev,
                        api: { ...prev.api, timeout: Number.parseInt(e.target.value) },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Logs détaillés</Label>
                    <p className="text-sm text-muted-foreground">Enregistrer les logs d'API</p>
                  </div>
                  <Switch
                    checked={systemSettings.api.logs}
                    onCheckedChange={(checked) =>
                      setSystemSettings((prev) => ({
                        ...prev,
                        api: { ...prev.api, logs: checked },
                      }))
                    }
                  />
                </div>

                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full mb-2 bg-transparent">
                    Tester la connexion API
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" onClick={resetSettings}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Réinitialiser les paramètres
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activite" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historique d'Activité</CardTitle>
              <CardDescription>Journal des actions effectuées sur le système</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {historiqueActivite.map((activite, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-semibold">{activite.action}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Utilisateur: {activite.utilisateur}</span>
                        <span>IP: {activite.ip}</span>
                        <span>{new Date(activite.timestamp).toLocaleString("fr-FR")}</span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(activite.statut)}>{activite.statut}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
