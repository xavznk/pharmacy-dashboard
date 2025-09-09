"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Phone, Mail, Clock, Edit, Save, Shield, Globe, Users, Star, Calendar } from "lucide-react"

// Données simulées du profil de la pharmacie
const pharmacieData = {
  nom: "Pharmacie Centrale",
  adresse: "123 Avenue de la Santé, 75001 Paris",
  telephone: "+33 1 42 36 78 90",
  email: "contact@pharmacie-centrale.fr",
  siteWeb: "www.pharmacie-centrale.fr",
  numeroOrdre: "75001234",
  siret: "12345678901234",
  dateOuverture: "1985-03-15",
  description:
    "Pharmacie familiale au cœur de Paris, nous vous accompagnons depuis plus de 35 ans dans vos besoins de santé avec un service personnalisé et des conseils d'experts.",
  horaires: {
    lundi: { ouvert: true, matin: "8:30-12:30", apresmidi: "14:00-19:30" },
    mardi: { ouvert: true, matin: "8:30-12:30", apresmidi: "14:00-19:30" },
    mercredi: { ouvert: true, matin: "8:30-12:30", apresmidi: "14:00-19:30" },
    jeudi: { ouvert: true, matin: "8:30-12:30", apresmidi: "14:00-19:30" },
    vendredi: { ouvert: true, matin: "8:30-12:30", apresmidi: "14:00-19:30" },
    samedi: { ouvert: true, matin: "9:00-12:30", apresmidi: "14:00-18:00" },
    dimanche: { ouvert: false, matin: "", apresmidi: "" },
  },
  services: [
    "Préparations magistrales",
    "Orthopédie",
    "Matériel médical",
    "Homéopathie",
    "Phytothérapie",
    "Conseil nutritionnel",
    "Vaccination",
    "Tests rapides",
  ],
  coordonnees: {
    latitude: 48.8566,
    longitude: 2.3522,
  },
  statut: "Ouvert",
  garde: false,
  certifications: ["ISO 9001", "Pharmacie Verte", "Label Qualité"],
}

const equipe = [
  {
    nom: "Dr. Marie Dubois",
    poste: "Pharmacien Titulaire",
    diplome: "Docteur en Pharmacie - Université Paris V",
    specialites: ["Oncologie", "Pédiatrie"],
    experience: "15 ans",
  },
  {
    nom: "Jean-Pierre Martin",
    poste: "Pharmacien Adjoint",
    diplome: "Docteur en Pharmacie - Université Paris XI",
    specialites: ["Orthopédie", "Dermatologie"],
    experience: "8 ans",
  },
  {
    nom: "Sophie Laurent",
    poste: "Préparatrice",
    diplome: "BP Préparateur en Pharmacie",
    specialites: ["Préparations magistrales", "Homéopathie"],
    experience: "12 ans",
  },
]

export default function ProfilPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(pharmacieData)

  const handleSave = () => {
    // Logique de sauvegarde
    console.log("Sauvegarde des données:", formData)
    setIsEditing(false)
  }

  const toggleStatut = () => {
    setFormData((prev) => ({
      ...prev,
      statut: prev.statut === "Ouvert" ? "Fermé" : "Ouvert",
    }))
  }

  const toggleGarde = () => {
    setFormData((prev) => ({
      ...prev,
      garde: !prev.garde,
    }))
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-green-800">Profil de la Pharmacie</h2>
          <p className="text-muted-foreground">Gérez les informations de votre officine</p>
        </div>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Annuler
              </Button>
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="bg-green-600 hover:bg-green-700">
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          )}
        </div>
      </div>

      {/* Statut en temps réel */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-3">
              <div className={`h-3 w-3 rounded-full ${formData.statut === "Ouvert" ? "bg-green-500" : "bg-red-500"}`} />
              <div>
                <p className="font-semibold">Statut Actuel</p>
                <p className="text-sm text-muted-foreground">{formData.statut}</p>
              </div>
            </div>
            <Switch checked={formData.statut === "Ouvert"} onCheckedChange={toggleStatut} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-3">
              <Shield className={`h-5 w-5 ${formData.garde ? "text-blue-500" : "text-gray-400"}`} />
              <div>
                <p className="font-semibold">Pharmacie de Garde</p>
                <p className="text-sm text-muted-foreground">{formData.garde ? "Service actif" : "Service inactif"}</p>
              </div>
            </div>
            <Switch checked={formData.garde} onCheckedChange={toggleGarde} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-semibold">Ouvert depuis</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(formData.dateOuverture).getFullYear()} (
                  {new Date().getFullYear() - new Date(formData.dateOuverture).getFullYear()} ans)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contenu principal avec onglets */}
      <Tabs defaultValue="informations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="informations">Informations</TabsTrigger>
          <TabsTrigger value="horaires">Horaires</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="equipe">Équipe</TabsTrigger>
          <TabsTrigger value="localisation">Localisation</TabsTrigger>
        </TabsList>

        <TabsContent value="informations" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Informations Générales</CardTitle>
                <CardDescription>Détails de votre pharmacie</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom de la pharmacie</Label>
                  {isEditing ? (
                    <Input
                      id="nom"
                      value={formData.nom}
                      onChange={(e) => setFormData((prev) => ({ ...prev, nom: e.target.value }))}
                    />
                  ) : (
                    <p className="text-sm font-medium">{formData.nom}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adresse">Adresse</Label>
                  {isEditing ? (
                    <Textarea
                      id="adresse"
                      value={formData.adresse}
                      onChange={(e) => setFormData((prev) => ({ ...prev, adresse: e.target.value }))}
                    />
                  ) : (
                    <p className="text-sm flex items-start">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                      {formData.adresse}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telephone">Téléphone</Label>
                  {isEditing ? (
                    <Input
                      id="telephone"
                      value={formData.telephone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, telephone: e.target.value }))}
                    />
                  ) : (
                    <p className="text-sm flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      {formData.telephone}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  ) : (
                    <p className="text-sm flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      {formData.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteWeb">Site Web</Label>
                  {isEditing ? (
                    <Input
                      id="siteWeb"
                      value={formData.siteWeb}
                      onChange={(e) => setFormData((prev) => ({ ...prev, siteWeb: e.target.value }))}
                    />
                  ) : (
                    <p className="text-sm flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                      {formData.siteWeb}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informations Légales</CardTitle>
                <CardDescription>Données administratives</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Numéro d'Ordre</Label>
                  <p className="text-sm font-medium">{formData.numeroOrdre}</p>
                </div>

                <div className="space-y-2">
                  <Label>SIRET</Label>
                  <p className="text-sm font-medium">{formData.siret}</p>
                </div>

                <div className="space-y-2">
                  <Label>Date d'ouverture</Label>
                  <p className="text-sm font-medium">{new Date(formData.dateOuverture).toLocaleDateString("fr-FR")}</p>
                </div>

                <div className="space-y-2">
                  <Label>Certifications</Label>
                  <div className="flex flex-wrap gap-2">
                    {formData.certifications.map((cert, index) => (
                      <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                        <Star className="h-3 w-3 mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
              <CardDescription>Présentez votre pharmacie à vos clients</CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  rows={4}
                />
              ) : (
                <p className="text-sm">{formData.description}</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="horaires" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Horaires d'Ouverture</CardTitle>
              <CardDescription>Configurez vos heures d'ouverture</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(formData.horaires).map(([jour, horaire]) => (
                  <div key={jour} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-20">
                        <p className="font-medium capitalize">{jour}</p>
                      </div>
                      <Switch checked={horaire.ouvert} disabled={!isEditing} />
                    </div>
                    {horaire.ouvert && (
                      <div className="flex items-center space-x-4">
                        {isEditing ? (
                          <>
                            <Input value={horaire.matin} className="w-24" placeholder="Matin" />
                            <span>-</span>
                            <Input value={horaire.apresmidi} className="w-24" placeholder="Après-midi" />
                          </>
                        ) : (
                          <div className="flex items-center space-x-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {horaire.matin} • {horaire.apresmidi}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Services Proposés</CardTitle>
              <CardDescription>Mettez en avant vos spécialités</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {formData.services.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">{service}</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Actif
                    </Badge>
                  </div>
                ))}
              </div>
              {isEditing && (
                <Button variant="outline" className="mt-4 bg-transparent">
                  <Edit className="h-4 w-4 mr-2" />
                  Ajouter un service
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equipe" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Équipe Officinale</CardTitle>
              <CardDescription>Présentez votre équipe de professionnels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {equipe.map((membre, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-800 font-semibold">
                      {membre.nom
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div>
                        <h4 className="font-semibold">{membre.nom}</h4>
                        <p className="text-sm text-muted-foreground">{membre.poste}</p>
                      </div>
                      <div className="text-sm">
                        <p>
                          <strong>Formation:</strong> {membre.diplome}
                        </p>
                        <p>
                          <strong>Spécialités:</strong> {membre.specialites.join(", ")}
                        </p>
                        <p>
                          <strong>Expérience:</strong> {membre.experience}
                        </p>
                      </div>
                    </div>
                    {isEditing && (
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              {isEditing && (
                <Button variant="outline" className="mt-4 bg-transparent">
                  <Users className="h-4 w-4 mr-2" />
                  Ajouter un membre
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="localisation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Localisation</CardTitle>
              <CardDescription>Position géographique de votre pharmacie</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Latitude</Label>
                    <Input value={formData.coordonnees.latitude} disabled={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label>Longitude</Label>
                    <Input value={formData.coordonnees.longitude} disabled={!isEditing} />
                  </div>
                </div>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Carte interactive</p>
                    <p className="text-xs text-muted-foreground">
                      {formData.coordonnees.latitude}, {formData.coordonnees.longitude}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
