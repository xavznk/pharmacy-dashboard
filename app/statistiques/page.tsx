"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, TrendingUp, TrendingDown, BarChart3, Activity, Users, ShoppingCart } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"

// Données simulées pour les statistiques
const ventesParMois = [
  { mois: "Jan", ventes: 2400, commandes: 45, clients: 32 },
  { mois: "Fév", ventes: 1398, commandes: 38, clients: 28 },
  { mois: "Mar", ventes: 9800, commandes: 67, clients: 45 },
  { mois: "Avr", ventes: 3908, commandes: 52, clients: 38 },
  { mois: "Mai", ventes: 4800, commandes: 61, clients: 42 },
  { mois: "Juin", ventes: 3800, commandes: 48, clients: 35 },
  { mois: "Juil", ventes: 4300, commandes: 55, clients: 40 },
  { mois: "Août", ventes: 3200, commandes: 42, clients: 30 },
  { mois: "Sep", ventes: 5100, commandes: 68, clients: 48 },
  { mois: "Oct", ventes: 4600, commandes: 58, clients: 41 },
  { mois: "Nov", ventes: 3900, commandes: 51, clients: 37 },
  { mois: "Déc", ventes: 4800, commandes: 62, clients: 44 },
]

const categoriesMedicaments = [
  { name: "Antalgiques", value: 35, color: "#10b981", ventes: 1250 },
  { name: "Antibiotiques", value: 25, color: "#3b82f6", ventes: 890 },
  { name: "Anti-inflammatoires", value: 20, color: "#8b5cf6", ventes: 720 },
  { name: "Gastro-entérologie", value: 12, color: "#f59e0b", ventes: 430 },
  { name: "Autres", value: 8, color: "#ef4444", ventes: 290 },
]

const heuresActivite = [
  { heure: "8h", commandes: 2 },
  { heure: "9h", commandes: 5 },
  { heure: "10h", commandes: 8 },
  { heure: "11h", commandes: 12 },
  { heure: "12h", commandes: 15 },
  { heure: "13h", commandes: 10 },
  { heure: "14h", commandes: 18 },
  { heure: "15h", commandes: 22 },
  { heure: "16h", commandes: 25 },
  { heure: "17h", commandes: 20 },
  { heure: "18h", commandes: 15 },
  { heure: "19h", commandes: 8 },
]

const topMedicaments = [
  { nom: "Paracétamol 500mg", quantite: 145, ca: 507.5 },
  { nom: "Amoxicilline 1g", quantite: 89, ca: 1139.2 },
  { nom: "Ibuprofène 400mg", quantite: 76, ca: 319.2 },
  { nom: "Oméprazole 20mg", quantite: 54, ca: 480.6 },
  { nom: "Aspirine 500mg", quantite: 43, ca: 124.7 },
]

export default function StatistiquesPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("12mois")
  const [selectedMetric, setSelectedMetric] = useState("ventes")

  const calculateGrowth = (current: number, previous: number) => {
    return ((current - previous) / previous) * 100
  }

  const currentMonthData = ventesParMois[ventesParMois.length - 1]
  const previousMonthData = ventesParMois[ventesParMois.length - 2]

  const ventesGrowth = calculateGrowth(currentMonthData.ventes, previousMonthData.ventes)
  const commandesGrowth = calculateGrowth(currentMonthData.commandes, previousMonthData.commandes)
  const clientsGrowth = calculateGrowth(currentMonthData.clients, previousMonthData.clients)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-green-800">Statistiques & Analytics</h2>
          <p className="text-muted-foreground">Analysez les performances de votre pharmacie</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[150px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7jours">7 derniers jours</SelectItem>
              <SelectItem value="30jours">30 derniers jours</SelectItem>
              <SelectItem value="3mois">3 derniers mois</SelectItem>
              <SelectItem value="12mois">12 derniers mois</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Cartes de métriques principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chiffre d'Affaires</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{currentMonthData.ventes.toLocaleString()}€</div>
            <div className="flex items-center text-xs">
              {ventesGrowth > 0 ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={ventesGrowth > 0 ? "text-green-600" : "text-red-600"}>
                {Math.abs(ventesGrowth).toFixed(1)}% vs mois dernier
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commandes</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{currentMonthData.commandes}</div>
            <div className="flex items-center text-xs">
              {commandesGrowth > 0 ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={commandesGrowth > 0 ? "text-green-600" : "text-red-600"}>
                {Math.abs(commandesGrowth).toFixed(1)}% vs mois dernier
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients Actifs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{currentMonthData.clients}</div>
            <div className="flex items-center text-xs">
              {clientsGrowth > 0 ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={clientsGrowth > 0 ? "text-green-600" : "text-red-600"}>
                {Math.abs(clientsGrowth).toFixed(1)}% vs mois dernier
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Panier Moyen</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {(currentMonthData.ventes / currentMonthData.commandes).toFixed(2)}€
            </div>
            <p className="text-xs text-muted-foreground">Par commande</p>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques détaillés */}
      <Tabs defaultValue="evolution" className="space-y-4">
        <TabsList>
          <TabsTrigger value="evolution">Évolution</TabsTrigger>
          <TabsTrigger value="categories">Catégories</TabsTrigger>
          <TabsTrigger value="activite">Activité</TabsTrigger>
          <TabsTrigger value="produits">Top Produits</TabsTrigger>
        </TabsList>

        <TabsContent value="evolution" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Évolution Annuelle</CardTitle>
                <CardDescription>Chiffre d'affaires, commandes et clients sur 12 mois</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ventes">Chiffre d'affaires</SelectItem>
                      <SelectItem value="commandes">Nombre de commandes</SelectItem>
                      <SelectItem value="clients">Clients actifs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={ventesParMois}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mois" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey={selectedMetric} stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Répartition par Catégorie</CardTitle>
                <CardDescription>Pourcentage des ventes par catégorie de médicaments</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={categoriesMedicaments}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {categoriesMedicaments.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Chiffre d'Affaires par Catégorie</CardTitle>
                <CardDescription>Revenus générés par catégorie</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoriesMedicaments} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="ventes" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activite" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activité par Heure</CardTitle>
              <CardDescription>Répartition des commandes selon l'heure de la journée</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={heuresActivite}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="heure" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="commandes" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="produits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top 5 des Médicaments</CardTitle>
              <CardDescription>Médicaments les plus vendus ce mois</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topMedicaments.map((med, index) => (
                  <div key={med.nom} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-800 font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold">{med.nom}</p>
                        <p className="text-sm text-muted-foreground">{med.quantite} unités vendues</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{med.ca.toFixed(2)}€</p>
                      <p className="text-sm text-muted-foreground">CA généré</p>
                    </div>
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
