"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Bell,
  AlertTriangle,
  ShoppingCart,
  Users,
  CreditCard,
  Package,
  Settings,
  Check,
  Clock,
  Trash2,
} from "lucide-react"

// Données simulées des notifications
const notifications = [
  {
    id: "NOT001",
    type: "stock",
    titre: "Stock faible - Paracétamol 500mg",
    message: "Il ne reste que 5 unités en stock. Seuil minimum: 20 unités",
    timestamp: "2024-01-15T14:30:00",
    lu: false,
    priorite: "haute",
    action: "Réapprovisionner",
  },
  {
    id: "NOT002",
    type: "commande",
    titre: "Nouvelle commande reçue",
    message: "Commande PH-2024-001 de Marie Dubois pour 11.20€",
    timestamp: "2024-01-15T14:25:00",
    lu: false,
    priorite: "normale",
    action: "Voir commande",
  },
  {
    id: "NOT003",
    type: "paiement",
    titre: "Paiement reçu",
    message: "Paiement de 28.90€ reçu pour la commande PH-2024-002",
    timestamp: "2024-01-15T13:45:00",
    lu: true,
    priorite: "normale",
    action: "Voir paiement",
  },
  {
    id: "NOT004",
    type: "client",
    titre: "Message client",
    message: "Sophie Laurent a envoyé un message concernant sa commande",
    timestamp: "2024-01-15T12:15:00",
    lu: false,
    priorite: "normale",
    action: "Répondre",
  },
  {
    id: "NOT005",
    type: "stock",
    titre: "Rupture de stock - Aspirine 500mg",
    message: "Stock épuisé. Dernière vente il y a 2 heures",
    timestamp: "2024-01-15T11:30:00",
    lu: true,
    priorite: "critique",
    action: "Commander",
  },
  {
    id: "NOT006",
    type: "systeme",
    titre: "Mise à jour système",
    message: "Une nouvelle version du dashboard est disponible",
    timestamp: "2024-01-15T09:00:00",
    lu: false,
    priorite: "basse",
    action: "Mettre à jour",
  },
]

const parametresNotifications = {
  stock: {
    actif: true,
    email: true,
    push: true,
    seuil: 20,
  },
  commandes: {
    actif: true,
    email: true,
    push: true,
  },
  paiements: {
    actif: true,
    email: false,
    push: true,
  },
  clients: {
    actif: true,
    email: true,
    push: false,
  },
  systeme: {
    actif: true,
    email: false,
    push: false,
  },
}

export default function NotificationsPage() {
  const [notificationsList, setNotificationsList] = useState(notifications)
  const [selectedTab, setSelectedTab] = useState("toutes")

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "stock":
        return <Package className="h-5 w-5 text-orange-500" />
      case "commande":
        return <ShoppingCart className="h-5 w-5 text-blue-500" />
      case "paiement":
        return <CreditCard className="h-5 w-5 text-green-500" />
      case "client":
        return <Users className="h-5 w-5 text-purple-500" />
      case "systeme":
        return <Settings className="h-5 w-5 text-gray-500" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  const getPriorityColor = (priorite: string) => {
    switch (priorite) {
      case "critique":
        return "bg-red-100 text-red-800 border-red-200"
      case "haute":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "normale":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "basse":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const marquerCommeLu = (id: string) => {
    setNotificationsList((prev) => prev.map((notif) => (notif.id === id ? { ...notif, lu: true } : notif)))
  }

  const supprimerNotification = (id: string) => {
    setNotificationsList((prev) => prev.filter((notif) => notif.id !== id))
  }

  const marquerToutCommeLu = () => {
    setNotificationsList((prev) => prev.map((notif) => ({ ...notif, lu: true })))
  }

  const filteredNotifications = notificationsList.filter((notif) => {
    switch (selectedTab) {
      case "non-lues":
        return !notif.lu
      case "stock":
        return notif.type === "stock"
      case "commandes":
        return notif.type === "commande"
      case "paiements":
        return notif.type === "paiement"
      default:
        return true
    }
  })

  const stats = {
    total: notificationsList.length,
    nonLues: notificationsList.filter((n) => !n.lu).length,
    critiques: notificationsList.filter((n) => n.priorite === "critique").length,
    stock: notificationsList.filter((n) => n.type === "stock").length,
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-green-800">Centre de Notifications</h2>
          <p className="text-muted-foreground">Gérez toutes vos alertes et notifications</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={marquerToutCommeLu}>
            <Check className="h-4 w-4 mr-2" />
            Tout marquer comme lu
          </Button>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Toutes notifications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Non Lues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.nonLues}</div>
            <p className="text-xs text-muted-foreground">À traiter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critiques</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.critiques}</div>
            <p className="text-xs text-muted-foreground">Priorité haute</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertes Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.stock}</div>
            <p className="text-xs text-muted-foreground">Stock faible/rupture</p>
          </CardContent>
        </Card>
      </div>

      {/* Contenu principal avec onglets */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="toutes">Toutes</TabsTrigger>
          <TabsTrigger value="non-lues">
            Non lues
            {stats.nonLues > 0 && (
              <Badge variant="secondary" className="ml-2 bg-orange-100 text-orange-800">
                {stats.nonLues}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="stock">Stock</TabsTrigger>
          <TabsTrigger value="commandes">Commandes</TabsTrigger>
          <TabsTrigger value="paiements">Paiements</TabsTrigger>
          <TabsTrigger value="parametres">Paramètres</TabsTrigger>
        </TabsList>

        <TabsContent value="toutes" className="space-y-4">
          <NotificationsList
            notifications={filteredNotifications}
            onMarkAsRead={marquerCommeLu}
            onDelete={supprimerNotification}
            getNotificationIcon={getNotificationIcon}
            getPriorityColor={getPriorityColor}
          />
        </TabsContent>

        <TabsContent value="non-lues" className="space-y-4">
          <NotificationsList
            notifications={filteredNotifications}
            onMarkAsRead={marquerCommeLu}
            onDelete={supprimerNotification}
            getNotificationIcon={getNotificationIcon}
            getPriorityColor={getPriorityColor}
          />
        </TabsContent>

        <TabsContent value="stock" className="space-y-4">
          <NotificationsList
            notifications={filteredNotifications}
            onMarkAsRead={marquerCommeLu}
            onDelete={supprimerNotification}
            getNotificationIcon={getNotificationIcon}
            getPriorityColor={getPriorityColor}
          />
        </TabsContent>

        <TabsContent value="commandes" className="space-y-4">
          <NotificationsList
            notifications={filteredNotifications}
            onMarkAsRead={marquerCommeLu}
            onDelete={supprimerNotification}
            getNotificationIcon={getNotificationIcon}
            getPriorityColor={getPriorityColor}
          />
        </TabsContent>

        <TabsContent value="paiements" className="space-y-4">
          <NotificationsList
            notifications={filteredNotifications}
            onMarkAsRead={marquerCommeLu}
            onDelete={supprimerNotification}
            getNotificationIcon={getNotificationIcon}
            getPriorityColor={getPriorityColor}
          />
        </TabsContent>

        <TabsContent value="parametres" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de Notifications</CardTitle>
              <CardDescription>Configurez vos préférences de notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(parametresNotifications).map(([type, config]) => (
                <div key={type} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getNotificationIcon(type)}
                      <div>
                        <Label className="text-base font-medium capitalize">{type}</Label>
                        <p className="text-sm text-muted-foreground">
                          Notifications pour {type === "stock" ? "les alertes de stock" : `les ${type}`}
                        </p>
                      </div>
                    </div>
                    <Switch checked={config.actif} />
                  </div>
                  {config.actif && (
                    <div className="ml-8 space-y-2">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Switch checked={config.email} />
                          <Label className="text-sm">Email</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch checked={config.push} />
                          <Label className="text-sm">Push</Label>
                        </div>
                      </div>
                      {type === "stock" && (
                        <div className="flex items-center space-x-2">
                          <Label className="text-sm">Seuil d'alerte:</Label>
                          <input type="number" value={config.seuil} className="w-20 px-2 py-1 text-sm border rounded" />
                          <span className="text-sm text-muted-foreground">unités</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Composant pour la liste des notifications
function NotificationsList({
  notifications,
  onMarkAsRead,
  onDelete,
  getNotificationIcon,
  getPriorityColor,
}: {
  notifications: any[]
  onMarkAsRead: (id: string) => void
  onDelete: (id: string) => void
  getNotificationIcon: (type: string) => React.ReactNode
  getPriorityColor: (priorite: string) => string
}) {
  if (notifications.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Bell className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg font-medium text-muted-foreground">Aucune notification</p>
          <p className="text-sm text-muted-foreground">Vous êtes à jour !</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <Card key={notification.id} className={`${!notification.lu ? "border-l-4 border-l-blue-500" : ""}`}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between space-x-4">
              <div className="flex items-start space-x-3 flex-1">
                {getNotificationIcon(notification.type)}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <h4 className={`font-semibold ${!notification.lu ? "text-foreground" : "text-muted-foreground"}`}>
                      {notification.titre}
                    </h4>
                    <Badge className={getPriorityColor(notification.priorite)}>{notification.priorite}</Badge>
                    {!notification.lu && <div className="h-2 w-2 rounded-full bg-blue-500" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(notification.timestamp).toLocaleString("fr-FR")}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  {notification.action}
                </Button>
                {!notification.lu && (
                  <Button variant="ghost" size="sm" onClick={() => onMarkAsRead(notification.id)}>
                    <Check className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(notification.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
