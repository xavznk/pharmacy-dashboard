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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  Download,
  CreditCard,
  Smartphone,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  FileText,
} from "lucide-react"

// Données simulées des paiements
const paiements = [
  {
    id: "PAY001",
    numeroCommande: "PH-2024-001",
    client: "Marie Dubois",
    montant: 11.2,
    methode: "Mobile Money",
    statut: "Payé",
    dateTransaction: "2024-01-15T14:35:00",
    referenceTransaction: "MM-789456123",
    frais: 0.5,
    montantNet: 10.7,
  },
  {
    id: "PAY002",
    numeroCommande: "PH-2024-002",
    client: "Jean Martin",
    montant: 12.8,
    methode: "À la livraison",
    statut: "En attente",
    dateTransaction: null,
    referenceTransaction: null,
    frais: 0,
    montantNet: 12.8,
  },
  {
    id: "PAY003",
    numeroCommande: "PH-2024-003",
    client: "Sophie Laurent",
    montant: 12.4,
    methode: "Mobile Money",
    statut: "Payé",
    dateTransaction: "2024-01-15T12:20:00",
    referenceTransaction: "MM-456789012",
    frais: 0.5,
    montantNet: 11.9,
  },
  {
    id: "PAY004",
    numeroCommande: "PH-2024-004",
    client: "Pierre Durand",
    montant: 5.8,
    methode: "À la livraison",
    statut: "Payé",
    dateTransaction: "2024-01-15T10:30:00",
    referenceTransaction: "CASH-001",
    frais: 0,
    montantNet: 5.8,
  },
  {
    id: "PAY005",
    numeroCommande: "PH-2024-005",
    client: "Isabelle Moreau",
    montant: 24.5,
    methode: "Mobile Money",
    statut: "Échoué",
    dateTransaction: "2024-01-15T09:15:00",
    referenceTransaction: "MM-123456789",
    frais: 0,
    montantNet: 0,
  },
]

export default function PaiementsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedMethod, setSelectedMethod] = useState("all")
  const [selectedPayment, setSelectedPayment] = useState<any>(null)

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "Payé":
        return "bg-green-100 text-green-800"
      case "En attente":
        return "bg-yellow-100 text-yellow-800"
      case "Échoué":
        return "bg-red-100 text-red-800"
      case "Remboursé":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case "Payé":
        return <CheckCircle className="h-4 w-4" />
      case "En attente":
        return <Clock className="h-4 w-4" />
      case "Échoué":
        return <XCircle className="h-4 w-4" />
      default:
        return <CreditCard className="h-4 w-4" />
    }
  }

  const getMethodIcon = (methode: string) => {
    switch (methode) {
      case "Mobile Money":
        return <Smartphone className="h-4 w-4" />
      case "À la livraison":
        return <CreditCard className="h-4 w-4" />
      default:
        return <CreditCard className="h-4 w-4" />
    }
  }

  const filteredPaiements = paiements.filter((payment) => {
    const matchesSearch =
      payment.numeroCommande.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (payment.referenceTransaction && payment.referenceTransaction.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = selectedStatus === "all" || payment.statut === selectedStatus
    const matchesMethod = selectedMethod === "all" || payment.methode === selectedMethod
    return matchesSearch && matchesStatus && matchesMethod
  })

  const stats = {
    total: paiements.reduce((sum, p) => sum + (p.statut === "Payé" ? p.montantNet : 0), 0),
    payes: paiements.filter((p) => p.statut === "Payé").length,
    enAttente: paiements.filter((p) => p.statut === "En attente").length,
    echecs: paiements.filter((p) => p.statut === "Échoué").length,
  }

  const generateReceipt = (payment: any) => {
    console.log(`Génération du reçu pour le paiement ${payment.id}`)
    // Logique de génération de reçu PDF
  }

  const exportReport = () => {
    console.log("Export du rapport comptable")
    // Logique d'export Excel/PDF
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-green-800">Gestion des Paiements</h2>
          <p className="text-muted-foreground">Suivez tous les paiements et générez vos rapports comptables</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={exportReport}>
            <Download className="h-4 w-4 mr-2" />
            Rapport Comptable
          </Button>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus Totaux</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.total.toFixed(2)}€</div>
            <p className="text-xs text-muted-foreground">Montant net encaissé</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paiements Réussis</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.payes}</div>
            <p className="text-xs text-muted-foreground">Transactions validées</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Attente</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.enAttente}</div>
            <p className="text-xs text-muted-foreground">À encaisser</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Échecs</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.echecs}</div>
            <p className="text-xs text-muted-foreground">Transactions échouées</p>
          </CardContent>
        </Card>
      </div>

      {/* Liste des paiements */}
      <Card>
        <CardHeader>
          <CardTitle>Historique des Paiements</CardTitle>
          <CardDescription>Consultez et gérez tous vos paiements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un paiement..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="Payé">Payé</SelectItem>
                <SelectItem value="En attente">En attente</SelectItem>
                <SelectItem value="Échoué">Échoué</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedMethod} onValueChange={setSelectedMethod}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Méthode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes méthodes</SelectItem>
                <SelectItem value="Mobile Money">Mobile Money</SelectItem>
                <SelectItem value="À la livraison">À la livraison</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>N° Commande</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Méthode</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPaiements.map((paiement) => (
                  <TableRow key={paiement.id}>
                    <TableCell className="font-medium">
                      <div>
                        <p className="font-semibold">{paiement.numeroCommande}</p>
                        {paiement.referenceTransaction && (
                          <p className="text-sm text-muted-foreground">{paiement.referenceTransaction}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{paiement.client}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-semibold text-green-600">{paiement.montant.toFixed(2)}€</p>
                        {paiement.frais > 0 && (
                          <p className="text-sm text-muted-foreground">Net: {paiement.montantNet.toFixed(2)}€</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getMethodIcon(paiement.methode)}
                        <span>{paiement.methode}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(paiement.statut)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(paiement.statut)}
                          <span>{paiement.statut}</span>
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {paiement.dateTransaction ? (
                        <div>
                          {new Date(paiement.dateTransaction).toLocaleDateString("fr-FR")}
                          <br />
                          <span className="text-sm text-muted-foreground">
                            {new Date(paiement.dateTransaction).toLocaleTimeString("fr-FR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedPayment(paiement)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>Détails du Paiement</DialogTitle>
                              <DialogDescription>Informations complètes de la transaction</DialogDescription>
                            </DialogHeader>
                            {selectedPayment && (
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">Transaction</h4>
                                    <div className="space-y-2 text-sm">
                                      <p>
                                        <strong>ID:</strong> {selectedPayment.id}
                                      </p>
                                      <p>
                                        <strong>Commande:</strong> {selectedPayment.numeroCommande}
                                      </p>
                                      <p>
                                        <strong>Client:</strong> {selectedPayment.client}
                                      </p>
                                      {selectedPayment.referenceTransaction && (
                                        <p>
                                          <strong>Référence:</strong> {selectedPayment.referenceTransaction}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Montants</h4>
                                    <div className="space-y-2 text-sm">
                                      <p>
                                        <strong>Montant brut:</strong> {selectedPayment.montant.toFixed(2)}€
                                      </p>
                                      <p>
                                        <strong>Frais:</strong> {selectedPayment.frais.toFixed(2)}€
                                      </p>
                                      <p>
                                        <strong>Montant net:</strong>{" "}
                                        <span className="text-green-600 font-semibold">
                                          {selectedPayment.montantNet.toFixed(2)}€
                                        </span>
                                      </p>
                                      <p>
                                        <strong>Méthode:</strong> {selectedPayment.methode}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Statut</h4>
                                  <div className="flex items-center space-x-2">
                                    <Badge className={getStatusColor(selectedPayment.statut)}>
                                      <div className="flex items-center space-x-1">
                                        {getStatusIcon(selectedPayment.statut)}
                                        <span>{selectedPayment.statut}</span>
                                      </div>
                                    </Badge>
                                    {selectedPayment.dateTransaction && (
                                      <span className="text-sm text-muted-foreground">
                                        le {new Date(selectedPayment.dateTransaction).toLocaleString("fr-FR")}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        {paiement.statut === "Payé" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => generateReceipt(paiement)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
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
