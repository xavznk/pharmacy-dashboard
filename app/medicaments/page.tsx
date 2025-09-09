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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter, Download, Upload, AlertTriangle, Package, Edit, Trash2, Eye } from "lucide-react"

// Données simulées des médicaments
const medicaments = [
  {
    id: "MED001",
    nom: "Paracétamol 500mg",
    categorie: "Antalgique",
    stock: 150,
    seuilMin: 20,
    prix: 3.5,
    statut: "Disponible",
    fabricant: "Doliprane",
    dateExpiration: "2025-06-15",
    description: "Antalgique et antipyrétique",
  },
  {
    id: "MED002",
    nom: "Amoxicilline 1g",
    categorie: "Antibiotique",
    stock: 8,
    seuilMin: 15,
    prix: 12.8,
    statut: "Stock faible",
    fabricant: "Clamoxyl",
    dateExpiration: "2024-12-20",
    description: "Antibiotique à large spectre",
  },
  {
    id: "MED003",
    nom: "Ibuprofène 400mg",
    categorie: "Anti-inflammatoire",
    stock: 75,
    seuilMin: 25,
    prix: 4.2,
    statut: "Disponible",
    fabricant: "Advil",
    dateExpiration: "2025-03-10",
    description: "Anti-inflammatoire non stéroïdien",
  },
  {
    id: "MED004",
    nom: "Aspirine 500mg",
    categorie: "Antalgique",
    stock: 0,
    seuilMin: 30,
    prix: 2.9,
    statut: "Rupture",
    fabricant: "Aspégic",
    dateExpiration: "2024-11-30",
    description: "Antalgique, antipyrétique et antiagrégant plaquettaire",
  },
  {
    id: "MED005",
    nom: "Oméprazole 20mg",
    categorie: "Gastro-entérologie",
    stock: 45,
    seuilMin: 20,
    prix: 8.9,
    statut: "Disponible",
    fabricant: "Mopral",
    dateExpiration: "2025-08-22",
    description: "Inhibiteur de la pompe à protons",
  },
]

export default function MedicamentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "Disponible":
        return "bg-green-100 text-green-800"
      case "Stock faible":
        return "bg-yellow-100 text-yellow-800"
      case "Rupture":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case "Stock faible":
      case "Rupture":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const filteredMedicaments = medicaments.filter((med) => {
    const matchesSearch =
      med.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.fabricant.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || med.categorie === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = [...new Set(medicaments.map((med) => med.categorie))]
  const stockFaible = medicaments.filter((med) => med.stock <= med.seuilMin).length
  const ruptures = medicaments.filter((med) => med.stock === 0).length

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-green-800">Gestion des Médicaments</h2>
          <p className="text-muted-foreground">
            Gérez votre stock de médicaments et surveillez les niveaux d'inventaire
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Importer
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter Médicament
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Ajouter un nouveau médicament</DialogTitle>
                <DialogDescription>Remplissez les informations du médicament à ajouter au stock.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nom" className="text-right">
                    Nom
                  </Label>
                  <Input id="nom" className="col-span-3" placeholder="Nom du médicament" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="categorie" className="text-right">
                    Catégorie
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="antalgique">Antalgique</SelectItem>
                      <SelectItem value="antibiotique">Antibiotique</SelectItem>
                      <SelectItem value="anti-inflammatoire">Anti-inflammatoire</SelectItem>
                      <SelectItem value="gastro">Gastro-entérologie</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="stock" className="text-right">
                    Stock
                  </Label>
                  <Input id="stock" type="number" className="col-span-3" placeholder="Quantité" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="prix" className="text-right">
                    Prix
                  </Label>
                  <Input id="prix" type="number" step="0.01" className="col-span-3" placeholder="Prix en €" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea id="description" className="col-span-3" placeholder="Description du médicament" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Ajouter
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Médicaments</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{medicaments.length}</div>
            <p className="text-xs text-muted-foreground">Références en stock</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Faible</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stockFaible}</div>
            <p className="text-xs text-muted-foreground">Sous le seuil minimum</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ruptures</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{ruptures}</div>
            <p className="text-xs text-muted-foreground">Stock épuisé</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valeur Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {medicaments.reduce((total, med) => total + med.stock * med.prix, 0).toFixed(2)}€
            </div>
            <p className="text-xs text-muted-foreground">Valeur totale</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Médicaments</CardTitle>
          <CardDescription>Gérez votre inventaire de médicaments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un médicament..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes catégories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Médicament</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Expiration</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMedicaments.map((medicament) => (
                  <TableRow key={medicament.id}>
                    <TableCell className="font-medium">
                      <div>
                        <p className="font-semibold">{medicament.nom}</p>
                        <p className="text-sm text-muted-foreground">{medicament.fabricant}</p>
                      </div>
                    </TableCell>
                    <TableCell>{medicament.categorie}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className={medicament.stock <= medicament.seuilMin ? "text-red-600 font-semibold" : ""}>
                          {medicament.stock}
                        </span>
                        {medicament.stock <= medicament.seuilMin && <AlertTriangle className="h-4 w-4 text-red-500" />}
                      </div>
                    </TableCell>
                    <TableCell>{medicament.prix.toFixed(2)}€</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(medicament.statut)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(medicament.statut)}
                          <span>{medicament.statut}</span>
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(medicament.dateExpiration).toLocaleDateString("fr-FR")}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
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
