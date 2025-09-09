"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Users, Phone, Mail, MapPin, ShoppingCart, Calendar, Eye, MessageSquare, Star } from "lucide-react"

// Données simulées des clients
const clients = [
  {
    id: "CLI001",
    nom: "Marie Dubois",
    email: "marie.dubois@email.com",
    telephone: "+33 6 12 34 56 78",
    adresse: "15 Rue de la Paix, 75001 Paris",
    dateInscription: "2023-08-15",
    nombreCommandes: 12,
    montantTotal: 245.8,
    derniereCommande: "2024-01-15",
    statut: "Actif",
    notes: "Cliente fidèle, préfère les génériques",
  },
  {
    id: "CLI002",
    nom: "Jean Martin",
    email: "jean.martin@email.com",
    telephone: "+33 6 98 76 54 32",
    adresse: "42 Avenue des Champs, 75008 Paris",
    dateInscription: "2023-11-22",
    nombreCommandes: 8,
    montantTotal: 156.4,
    derniereCommande: "2024-01-14",
    statut: "Actif",
    notes: "Allergique à la pénicilline",
  },
  {
    id: "CLI003",
    nom: "Sophie Laurent",
    email: "sophie.laurent@email.com",
    telephone: "+33 6 55 44 33 22",
    adresse: "8 Boulevard Saint-Germain, 75005 Paris",
    dateInscription: "2023-06-10",
    nombreCommandes: 25,
    montantTotal: 487.9,
    derniereCommande: "2024-01-13",
    statut: "VIP",
    notes: "Cliente premium, livraisons prioritaires",
  },
  {
    id: "CLI004",
    nom: "Pierre Durand",
    email: "pierre.durand@email.com",
    telephone: "+33 6 11 22 33 44",
    adresse: "23 Rue de Rivoli, 75004 Paris",
    dateInscription: "2024-01-05",
    nombreCommandes: 2,
    montantTotal: 28.6,
    derniereCommande: "2024-01-12",
    statut: "Nouveau",
    notes: "",
  },
  {
    id: "CLI005",
    nom: "Isabelle Moreau",
    email: "isabelle.moreau@email.com",
    telephone: "+33 6 77 88 99 00",
    adresse: "56 Rue du Faubourg, 75011 Paris",
    dateInscription: "2023-03-18",
    nombreCommandes: 18,
    montantTotal: 324.5,
    derniereCommande: "2024-01-10",
    statut: "Actif",
    notes: "Préfère les livraisons le matin",
  },
]

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClient, setSelectedClient] = useState<any>(null)

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "VIP":
        return "bg-purple-100 text-purple-800"
      case "Actif":
        return "bg-green-100 text-green-800"
      case "Nouveau":
        return "bg-blue-100 text-blue-800"
      case "Inactif":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case "VIP":
        return <Star className="h-4 w-4" />
      case "Actif":
        return <Users className="h-4 w-4" />
      case "Nouveau":
        return <Users className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  const filteredClients = clients.filter(
    (client) =>
      client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.telephone.includes(searchTerm),
  )

  const stats = {
    total: clients.length,
    actifs: clients.filter((c) => c.statut === "Actif").length,
    vip: clients.filter((c) => c.statut === "VIP").length,
    nouveaux: clients.filter((c) => c.statut === "Nouveau").length,
  }

  const handleContactClient = (client: any, method: string) => {
    switch (method) {
      case "phone":
        window.open(`tel:${client.telephone}`)
        break
      case "email":
        window.open(`mailto:${client.email}`)
        break
      case "sms":
        window.open(`sms:${client.telephone}`)
        break
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-green-800">Gestion des Clients</h2>
          <p className="text-muted-foreground">Gérez votre base de clients et leur historique d'achats</p>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Clients enregistrés</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients Actifs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.actifs}</div>
            <p className="text-xs text-muted-foreground">Commandes récentes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients VIP</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.vip}</div>
            <p className="text-xs text-muted-foreground">Clients premium</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nouveaux Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.nouveaux}</div>
            <p className="text-xs text-muted-foreground">Ce mois-ci</p>
          </CardContent>
        </Card>
      </div>

      {/* Liste des clients */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Clients</CardTitle>
          <CardDescription>Consultez et gérez vos clients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Commandes</TableHead>
                  <TableHead>Montant Total</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Dernière Commande</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">
                      <div>
                        <p className="font-semibold">{client.nom}</p>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {client.adresse.split(",")[0]}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {client.telephone}
                        </p>
                        <p className="text-sm flex items-center text-muted-foreground">
                          <Mail className="h-3 w-3 mr-1" />
                          {client.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">{client.nombreCommandes}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-green-600">{client.montantTotal.toFixed(2)}€</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(client.statut)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(client.statut)}
                          <span>{client.statut}</span>
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{new Date(client.derniereCommande).toLocaleDateString("fr-FR")}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedClient(client)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>Profil Client - {client.nom}</DialogTitle>
                              <DialogDescription>Informations détaillées du client</DialogDescription>
                            </DialogHeader>
                            {selectedClient && (
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">Informations Personnelles</h4>
                                    <div className="space-y-2 text-sm">
                                      <p>
                                        <strong>Nom:</strong> {selectedClient.nom}
                                      </p>
                                      <p className="flex items-center">
                                        <Phone className="h-3 w-3 mr-1" />
                                        {selectedClient.telephone}
                                      </p>
                                      <p className="flex items-center">
                                        <Mail className="h-3 w-3 mr-1" />
                                        {selectedClient.email}
                                      </p>
                                      <p className="flex items-start">
                                        <MapPin className="h-3 w-3 mr-1 mt-1" />
                                        {selectedClient.adresse}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Statistiques</h4>
                                    <div className="space-y-2 text-sm">
                                      <p>
                                        <strong>Inscription:</strong>{" "}
                                        {new Date(selectedClient.dateInscription).toLocaleDateString("fr-FR")}
                                      </p>
                                      <p>
                                        <strong>Commandes:</strong> {selectedClient.nombreCommandes}
                                      </p>
                                      <p>
                                        <strong>Montant total:</strong>{" "}
                                        <span className="text-green-600 font-semibold">
                                          {selectedClient.montantTotal.toFixed(2)}€
                                        </span>
                                      </p>
                                      <p>
                                        <strong>Dernière commande:</strong>{" "}
                                        {new Date(selectedClient.derniereCommande).toLocaleDateString("fr-FR")}
                                      </p>
                                      <p>
                                        <strong>Statut:</strong>
                                        <Badge className={`ml-2 ${getStatusColor(selectedClient.statut)}`}>
                                          {selectedClient.statut}
                                        </Badge>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                {selectedClient.notes && (
                                  <div>
                                    <h4 className="font-semibold mb-2">Notes</h4>
                                    <p className="text-sm bg-gray-50 p-3 rounded-lg">{selectedClient.notes}</p>
                                  </div>
                                )}
                                <div className="flex space-x-2 pt-4">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleContactClient(selectedClient, "phone")}
                                  >
                                    <Phone className="h-4 w-4 mr-2" />
                                    Appeler
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleContactClient(selectedClient, "email")}
                                  >
                                    <Mail className="h-4 w-4 mr-2" />
                                    Email
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleContactClient(selectedClient, "sms")}
                                  >
                                    <MessageSquare className="h-4 w-4 mr-2" />
                                    SMS
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleContactClient(client, "phone")}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleContactClient(client, "email")}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
