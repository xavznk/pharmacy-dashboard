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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Eye, Check, X, Clock, Truck, ShoppingCart, Phone, Mail, MapPin } from "lucide-react"

// Données simulées des commandes
const commandes = [
  {
    id: "CMD001",
    numero: "PH-2024-001",
    client: {
      nom: "Marie Dubois",
      telephone: "+33 6 12 34 56 78",
      email: "marie.dubois@email.com",
      adresse: "15 Rue de la Paix, 75001 Paris",
    },
    medicaments: [
      { nom: "Paracétamol 500mg", quantite: 2, prix: 3.5 },
      { nom: "Ibuprofène 400mg", quantite: 1, prix: 4.2 },
    ],
    montantTotal: 11.2,
    statut: "En attente",
    dateCommande: "2024-01-15T14:30:00",
    dateLivraison: null,
    modePaiement: "À la livraison",
    notes: "Livraison urgente demandée",
  },
  {
    id: "CMD002",
    numero: "PH-2024-002",
    client: {
      nom: "Jean Martin",
      telephone: "+33 6 98 76 54 32",
      email: "jean.martin@email.com",
      adresse: "42 Avenue des Champs, 75008 Paris",
    },
    medicaments: [{ nom: "Amoxicilline 1g", quantite: 1, prix: 12.8 }],
    montantTotal: 12.8,
    statut: "Validée",
    dateCommande: "2024-01-15T13:45:00",
    dateLivraison: null,
    modePaiement: "Mobile Money",
    notes: "",
  },
  {
    id: "CMD003",
    numero: "PH-2024-003",
    client: {
      nom: "Sophie Laurent",
      telephone: "+33 6 55 44 33 22",
      email: "sophie.laurent@email.com",
      adresse: "8 Boulevard Saint-Germain, 75005 Paris",
    },
    medicaments: [
      { nom: "Oméprazole 20mg", quantite: 1, prix: 8.9 },
      { nom: "Paracétamol 500mg", quantite: 1, prix: 3.5 },
    ],
    montantTotal: 12.4,
    statut: "En cours",
    dateCommande: "2024-01-15T12:15:00",
    dateLivraison: null,
    modePaiement: "Mobile Money",
    notes: "Client préfère livraison après 18h",
  },
  {
    id: "CMD004",
    numero: "PH-2024-004",
    client: {
      nom: "Pierre Durand",
      telephone: "+33 6 11 22 33 44",
      email: "pierre.durand@email.com",
      adresse: "23 Rue de Rivoli, 75004 Paris",
    },
    medicaments: [{ nom: "Aspirine 500mg", quantite: 2, prix: 2.9 }],
    montantTotal: 5.8,
    statut: "Livrée",
    dateCommande: "2024-01-14T16:20:00",
    dateLivraison: "2024-01-15T10:30:00",
    modePaiement: "À la livraison",
    notes: "",
  },
]

export default function CommandesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "En attente":
        return "bg-yellow-100 text-yellow-800"
      case "Validée":
        return "bg-blue-100 text-blue-800"
      case "En cours":
        return "bg-purple-100 text-purple-800"
      case "Livrée":
        return "bg-green-100 text-green-800"
      case "Annulée":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case "En attente":
        return <Clock className="h-4 w-4" />
      case "Validée":
        return <Check className="h-4 w-4" />
      case "En cours":
        return <Truck className="h-4 w-4" />
      case "Livrée":
        return <Check className="h-4 w-4" />
      case "Annulée":
        return <X className="h-4 w-4" />
      default:
        return <ShoppingCart className="h-4 w-4" />
    }
  }

  const filteredCommandes = commandes.filter((cmd) => {
    const matchesSearch =
      cmd.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmd.client.nom.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || cmd.statut === selectedStatus
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: commandes.length,
    enAttente: commandes.filter((c) => c.statut === "En attente").length,
    enCours: commandes.filter((c) => c.statut === "En cours").length,
    livrees: commandes.filter((c) => c.statut === "Livrée").length,
  }

  const handleStatusChange = (commandeId: string, newStatus: string) => {
    // Logique pour changer le statut de la commande
    console.log(`Changement statut commande ${commandeId} vers ${newStatus}`)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-green-800">Gestion des Commandes</h2>
          <p className="text-muted-foreground">Suivez et gérez toutes les commandes reçues via l'application mobile</p>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commandes</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Aujourd'hui</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Attente</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.enAttente}</div>
            <p className="text-xs text-muted-foreground">À traiter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Cours</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.enCours}</div>
            <p className="text-xs text-muted-foreground">En livraison</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Livrées</CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.livrees}</div>
            <p className="text-xs text-muted-foreground">Terminées</p>
          </CardContent>
        </Card>
      </div>

      {/* Liste des commandes */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Commandes</CardTitle>
          <CardDescription>Gérez le statut et le suivi de vos commandes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une commande..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="En attente">En attente</SelectItem>
                <SelectItem value="Validée">Validée</SelectItem>
                <SelectItem value="En cours">En cours</SelectItem>
                <SelectItem value="Livrée">Livrée</SelectItem>
                <SelectItem value="Annulée">Annulée</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>N° Commande</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Médicaments</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCommandes.map((commande) => (
                  <TableRow key={commande.id}>
                    <TableCell className="font-medium">
                      <div>
                        <p className="font-semibold">{commande.numero}</p>
                        <p className="text-sm text-muted-foreground">{commande.modePaiement}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-semibold">{commande.client.nom}</p>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {commande.client.telephone}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {commande.medicaments.map((med, index) => (
                          <div key={index} className="text-sm">
                            <span className="font-medium">{med.nom}</span>
                            <span className="text-muted-foreground"> x{med.quantite}</span>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-green-600">{commande.montantTotal.toFixed(2)}€</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(commande.statut)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(commande.statut)}
                          <span>{commande.statut}</span>
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(commande.dateCommande).toLocaleDateString("fr-FR")}
                      <br />
                      <span className="text-sm text-muted-foreground">
                        {new Date(commande.dateCommande).toLocaleTimeString("fr-FR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(commande)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>Détails de la commande {commande.numero}</DialogTitle>
                              <DialogDescription>Informations complètes de la commande</DialogDescription>
                            </DialogHeader>
                            {selectedOrder && (
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">Informations Client</h4>
                                    <div className="space-y-2 text-sm">
                                      <p>
                                        <strong>Nom:</strong> {selectedOrder.client.nom}
                                      </p>
                                      <p className="flex items-center">
                                        <Phone className="h-3 w-3 mr-1" />
                                        {selectedOrder.client.telephone}
                                      </p>
                                      <p className="flex items-center">
                                        <Mail className="h-3 w-3 mr-1" />
                                        {selectedOrder.client.email}
                                      </p>
                                      <p className="flex items-start">
                                        <MapPin className="h-3 w-3 mr-1 mt-1" />
                                        {selectedOrder.client.adresse}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Détails Commande</h4>
                                    <div className="space-y-2 text-sm">
                                      <p>
                                        <strong>Date:</strong>{" "}
                                        {new Date(selectedOrder.dateCommande).toLocaleString("fr-FR")}
                                      </p>
                                      <p>
                                        <strong>Paiement:</strong> {selectedOrder.modePaiement}
                                      </p>
                                      <p>
                                        <strong>Statut:</strong>
                                        <Badge className={`ml-2 ${getStatusColor(selectedOrder.statut)}`}>
                                          {selectedOrder.statut}
                                        </Badge>
                                      </p>
                                      {selectedOrder.notes && (
                                        <p>
                                          <strong>Notes:</strong> {selectedOrder.notes}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Médicaments Commandés</h4>
                                  <div className="border rounded-lg">
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>Médicament</TableHead>
                                          <TableHead>Quantité</TableHead>
                                          <TableHead>Prix unitaire</TableHead>
                                          <TableHead>Total</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {selectedOrder.medicaments.map((med: any, index: number) => (
                                          <TableRow key={index}>
                                            <TableCell>{med.nom}</TableCell>
                                            <TableCell>{med.quantite}</TableCell>
                                            <TableCell>{med.prix.toFixed(2)}€</TableCell>
                                            <TableCell>{(med.quantite * med.prix).toFixed(2)}€</TableCell>
                                          </TableRow>
                                        ))}
                                        <TableRow>
                                          <TableCell colSpan={3} className="font-semibold">
                                            Total
                                          </TableCell>
                                          <TableCell className="font-semibold text-green-600">
                                            {selectedOrder.montantTotal.toFixed(2)}€
                                          </TableCell>
                                        </TableRow>
                                      </TableBody>
                                    </Table>
                                  </div>
                                </div>
                              </div>
                            )}
                            <DialogFooter>
                              <div className="flex space-x-2">
                                {selectedOrder?.statut === "En attente" && (
                                  <>
                                    <Button
                                      variant="outline"
                                      onClick={() => handleStatusChange(selectedOrder.id, "Annulée")}
                                      className="text-red-600 hover:text-red-700"
                                    >
                                      <X className="h-4 w-4 mr-2" />
                                      Annuler
                                    </Button>
                                    <Button
                                      onClick={() => handleStatusChange(selectedOrder.id, "Validée")}
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      <Check className="h-4 w-4 mr-2" />
                                      Valider
                                    </Button>
                                  </>
                                )}
                                {selectedOrder?.statut === "Validée" && (
                                  <Button
                                    onClick={() => handleStatusChange(selectedOrder.id, "En cours")}
                                    className="bg-blue-600 hover:bg-blue-700"
                                  >
                                    <Truck className="h-4 w-4 mr-2" />
                                    Expédier
                                  </Button>
                                )}
                                {selectedOrder?.statut === "En cours" && (
                                  <Button
                                    onClick={() => handleStatusChange(selectedOrder.id, "Livrée")}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    <Check className="h-4 w-4 mr-2" />
                                    Marquer comme livrée
                                  </Button>
                                )}
                              </div>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        {commande.statut === "En attente" && (
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleStatusChange(commande.id, "Validée")}
                              className="text-green-600 hover:text-green-700"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleStatusChange(commande.id, "Annulée")}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
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
