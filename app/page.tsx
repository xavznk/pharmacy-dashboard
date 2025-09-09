"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, ShoppingCart, Users, CreditCard, AlertTriangle, Bell, DollarSign, Clock } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Données simulées
const salesData = [
  { name: "Lun", commandes: 12, ventes: 2400 },
  { name: "Mar", commandes: 19, ventes: 1398 },
  { name: "Mer", commandes: 8, ventes: 9800 },
  { name: "Jeu", commandes: 27, ventes: 3908 },
  { name: "Ven", commandes: 18, ventes: 4800 },
  { name: "Sam", commandes: 23, ventes: 3800 },
  { name: "Dim", commandes: 15, ventes: 4300 },
]

const topMedicaments = [
  { name: "Paracétamol", value: 35, color: "#10b981" },
  { name: "Amoxicilline", value: 25, color: "#3b82f6" },
  { name: "Ibuprofène", value: 20, color: "#8b5cf6" },
  { name: "Aspirine", value: 20, color: "#f59e0b" },
]

const recentOrders = [
  {
    id: "CMD001",
    client: "Marie Dubois",
    medicament: "Paracétamol 500mg",
    statut: "En cours",
    montant: "15.50€",
    heure: "14:30",
  },
  {
    id: "CMD002",
    client: "Jean Martin",
    medicament: "Amoxicilline 1g",
    statut: "Validée",
    montant: "28.90€",
    heure: "13:45",
  },
  {
    id: "CMD003",
    client: "Sophie Laurent",
    medicament: "Ibuprofène 400mg",
    statut: "Livrée",
    montant: "12.30€",
    heure: "12:15",
  },
  {
    id: "CMD004",
    client: "Pierre Durand",
    medicament: "Doliprane 1000mg",
    statut: "En attente",
    montant: "18.75€",
    heure: "11:20",
  },
]

const notifications = [
  { type: "stock", message: "Stock faible: Paracétamol 500mg (5 unités)", time: "5 min" },
  { type: "commande", message: "Nouvelle commande de Marie Dubois", time: "12 min" },
  { type: "paiement", message: "Paiement reçu - CMD002 (28.90€)", time: "25 min" },
  { type: "client", message: "Message client - Demande de renseignement", time: "1h" },
]

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En cours":
        return "bg-blue-100 text-blue-800"
      case "Validée":
        return "bg-green-100 text-green-800"
      case "Livrée":
        return "bg-gray-100 text-gray-800"
      case "En attente":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "stock":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case "commande":
        return <ShoppingCart className="h-4 w-4 text-blue-500" />
      case "paiement":
        return <CreditCard className="h-4 w-4 text-green-500" />
      case "client":
        return <Users className="h-4 w-4 text-purple-500" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      {/* En-tête avec informations de la pharmacie */}
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-green-800">Pharmacie Centrale</h2>
          <p className="text-muted-foreground">
            123 Avenue de la Santé, 75001 Paris • Ouvert • {currentTime.toLocaleTimeString("fr-FR")}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Activity className="h-3 w-3 mr-1" />
            En ligne
          </Badge>
        </div>
      </div>

      {/* Cartes de statistiques principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commandes Aujourd'hui</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">24</div>
            <p className="text-xs text-muted-foreground">+12% par rapport à hier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chiffre d'Affaires</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">1,247€</div>
            <p className="text-xs text-muted-foreground">+8% par rapport à hier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients Actifs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">156</div>
            <p className="text-xs text-muted-foreground">+3 nouveaux clients</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Critique</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">7</div>
            <p className="text-xs text-muted-foreground">Médicaments en rupture</p>
          </CardContent>
        </Card>
      </div>

      {/* Contenu principal avec onglets */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="analytics">Analytiques</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Graphique des ventes */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Évolution des Ventes</CardTitle>
                <CardDescription>Commandes et chiffre d'affaires de la semaine</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="commandes" fill="#10b981" name="Commandes" />
                    <Bar dataKey="ventes" fill="#3b82f6" name="Ventes (€)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Commandes récentes */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Commandes Récentes</CardTitle>
                <CardDescription>Dernières commandes reçues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{order.client}</p>
                        <p className="text-xs text-muted-foreground">{order.medicament}</p>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(order.statut)}>{order.statut}</Badge>
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {order.heure}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-600">{order.montant}</p>
                        <Button size="sm" variant="outline" className="mt-1 bg-transparent">
                          Voir
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Graphique en ligne des tendances */}
            <Card>
              <CardHeader>
                <CardTitle>Tendances Mensuelles</CardTitle>
                <CardDescription>Évolution du chiffre d'affaires</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="ventes" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Graphique circulaire des médicaments populaires */}
            <Card>
              <CardHeader>
                <CardTitle>Médicaments les Plus Vendus</CardTitle>
                <CardDescription>Répartition des ventes par produit</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={topMedicaments}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {topMedicaments.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notifications Récentes</CardTitle>
              <CardDescription>Alertes et mises à jour importantes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">Il y a {notification.time}</p>
                    </div>
                    <Button size="sm" variant="ghost">
                      Marquer comme lu
                    </Button>
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
