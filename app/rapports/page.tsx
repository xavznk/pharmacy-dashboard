"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, FileText, BarChart3, TrendingUp, CalendarIcon, Filter, Eye, Mail, Printer } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

// Données simulées des rapports
const rapportsDisponibles = [
  {
    id: "RPT001",
    nom: "Rapport Mensuel des Ventes",
    type: "Ventes",
    periode: "Décembre 2024",
    dateGeneration: "2024-01-01T09:00:00",
    taille: "2.4 MB",
    format: "PDF",
    statut: "Généré",
    description: "Analyse complète des ventes du mois avec détails par catégorie",
  },
  {
    id: "RPT002",
    nom: "Inventaire Stock",
    type: "Stock",
    periode: "31 Décembre 2024",
    dateGeneration: "2024-01-01T08:30:00",
    taille: "1.8 MB",
    format: "Excel",
    statut: "Généré",
    description: "État complet du stock avec valorisation",
  },
  {
    id: "RPT003",
    nom: "Rapport Comptable Trimestriel",
    type: "Comptabilité",
    periode: "Q4 2024",
    dateGeneration: "2024-01-01T10:15:00",
    taille: "3.2 MB",
    format: "PDF",
    statut: "Généré",
    description: "Bilan comptable avec détail des recettes et dépenses",
  },
  {
    id: "RPT004",
    nom: "Analyse Clients",
    type: "Clients",
    periode: "Décembre 2024",
    dateGeneration: "2024-01-01T11:00:00",
    taille: "1.5 MB",
    format: "PDF",
    statut: "En cours",
    description: "Segmentation clientèle et analyse comportementale",
  },
]

const typesRapports = [
  {
    type: "Ventes",
    description: "Chiffre d'affaires, commandes, tendances",
    icone: <TrendingUp className="h-5 w-5" />,
    formats: ["PDF", "Excel"],
  },
  {
    type: "Stock",
    description: "Inventaire, valorisation, mouvements",
    icone: <BarChart3 className="h-5 w-5" />,
    formats: ["PDF", "Excel"],
  },
  {
    type: "Comptabilité",
    description: "Bilan, compte de résultat, TVA",
    icone: <FileText className="h-5 w-5" />,
    formats: ["PDF"],
  },
  {
    type: "Clients",
    description: "Analyse clientèle, fidélisation",
    icone: <FileText className="h-5 w-5" />,
    formats: ["PDF", "Excel"],
  },
]

export default function RapportsPage() {
  const [selectedType, setSelectedType] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("mois")
  const [dateDebut, setDateDebut] = useState<Date>()
  const [dateFin, setDateFin] = useState<Date>()
  const [isGenerating, setIsGenerating] = useState(false)

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "Généré":
        return "bg-green-100 text-green-800"
      case "En cours":
        return "bg-yellow-100 text-yellow-800"
      case "Erreur":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "PDF":
        return <FileText className="h-4 w-4 text-red-500" />
      case "Excel":
        return <FileText className="h-4 w-4 text-green-500" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const genererRapport = async (type: string, format: string) => {
    setIsGenerating(true)
    // Simulation de génération
    setTimeout(() => {
      console.log(`Génération du rapport ${type} en format ${format}`)
      setIsGenerating(false)
    }, 2000)
  }

  const telechargerRapport = (rapport: any) => {
    console.log(`Téléchargement du rapport ${rapport.id}`)
    // Logique de téléchargement
  }

  const envoyerParEmail = (rapport: any) => {
    console.log(`Envoi par email du rapport ${rapport.id}`)
    // Logique d'envoi par email
  }

  const filteredRapports = rapportsDisponibles.filter((rapport) => {
    return selectedType === "all" || rapport.type === selectedType
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-green-800">Rapports & Exports</h2>
          <p className="text-muted-foreground">Générez et consultez vos rapports d'activité</p>
        </div>
      </div>

      {/* Génération de nouveaux rapports */}
      <Card>
        <CardHeader>
          <CardTitle>Générer un Nouveau Rapport</CardTitle>
          <CardDescription>Créez des rapports personnalisés selon vos besoins</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {typesRapports.map((type) => (
              <Card key={type.type} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    {type.icone}
                    <h4 className="font-semibold">{type.type}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{type.description}</p>
                  <div className="space-y-2">
                    {type.formats.map((format) => (
                      <Button
                        key={format}
                        variant="outline"
                        size="sm"
                        className="w-full bg-transparent"
                        onClick={() => genererRapport(type.type, format)}
                        disabled={isGenerating}
                      >
                        {getFormatIcon(format)}
                        <span className="ml-2">Générer {format}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <h4 className="font-semibold mb-3">Options de Période</h4>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Période prédéfinie</label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jour">Aujourd'hui</SelectItem>
                    <SelectItem value="semaine">Cette semaine</SelectItem>
                    <SelectItem value="mois">Ce mois</SelectItem>
                    <SelectItem value="trimestre">Ce trimestre</SelectItem>
                    <SelectItem value="annee">Cette année</SelectItem>
                    <SelectItem value="personnalise">Période personnalisée</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {selectedPeriod === "personnalise" && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date de début</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateDebut ? format(dateDebut, "PPP", { locale: fr }) : "Sélectionner"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={dateDebut} onSelect={setDateDebut} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date de fin</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateFin ? format(dateFin, "PPP", { locale: fr }) : "Sélectionner"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={dateFin} onSelect={setDateFin} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Historique des rapports */}
      <Card>
        <CardHeader>
          <CardTitle>Historique des Rapports</CardTitle>
          <CardDescription>Consultez et téléchargez vos rapports précédents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Type de rapport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="Ventes">Ventes</SelectItem>
                <SelectItem value="Stock">Stock</SelectItem>
                <SelectItem value="Comptabilité">Comptabilité</SelectItem>
                <SelectItem value="Clients">Clients</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rapport</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Période</TableHead>
                  <TableHead>Date de génération</TableHead>
                  <TableHead>Format</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRapports.map((rapport) => (
                  <TableRow key={rapport.id}>
                    <TableCell>
                      <div>
                        <p className="font-semibold">{rapport.nom}</p>
                        <p className="text-sm text-muted-foreground">{rapport.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{rapport.type}</Badge>
                    </TableCell>
                    <TableCell>{rapport.periode}</TableCell>
                    <TableCell>
                      {new Date(rapport.dateGeneration).toLocaleDateString("fr-FR")}
                      <br />
                      <span className="text-sm text-muted-foreground">
                        {new Date(rapport.dateGeneration).toLocaleTimeString("fr-FR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getFormatIcon(rapport.format)}
                        <span>{rapport.format}</span>
                        <span className="text-sm text-muted-foreground">({rapport.taille})</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(rapport.statut)}>{rapport.statut}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {rapport.statut === "Généré" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => telechargerRapport(rapport)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => envoyerParEmail(rapport)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-700">
                              <Printer className="h-4 w-4" />
                            </Button>
                          </>
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
