"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Plus, MapPin, Phone, Mail, School, Users, Download, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import FadeIn from "@/components/animations/fade-in"

// Type pour un établissement
interface Etablissement {
  id: string
  nom: string
  ville: string
  codePostal: string
  email: string
  telephone: string
  adresse?: string
  sousDomaine?: string
  nbClasses?: number
  nbUsers?: number
  createdAt: string
  updatedAt: string
  [key: string]: string | number | undefined
}

// Données fictives pour les établissements
const etablissementsData: Etablissement[] = [
  {
    id: "1",
    nom: "Lycée Jean Moulin",
    ville: "Paris",
    codePostal: "75001",
    adresse: "12 rue de la République",
    email: "contact@jean-moulin.edu",
    telephone: "01 23 45 67 89",
    sousDomaine: "jeanmoulin",
    nbClasses: 15,
    nbUsers: 450,
    createdAt: "2023-01-15",
    updatedAt: "2023-10-20",
  },
  {
    id: "2",
    nom: "Collège Victor Hugo",
    ville: "Lyon",
    codePostal: "69002",
    adresse: "8 avenue des Frères Lumière",
    email: "contact@victor-hugo.edu",
    telephone: "04 56 78 90 12",
    sousDomaine: "victorhugo",
    nbClasses: 10,
    nbUsers: 320,
    createdAt: "2023-02-10",
    updatedAt: "2023-09-15",
  },
  {
    id: "3",
    nom: "École Primaire Jules Ferry",
    ville: "Marseille",
    codePostal: "13001",
    adresse: "5 boulevard National",
    email: "contact@jules-ferry.edu",
    telephone: "04 91 23 45 67",
    sousDomaine: "julesferry",
    nbClasses: 8,
    nbUsers: 210,
    createdAt: "2023-03-05",
    updatedAt: "2023-11-01",
  },
  {
    id: "4",
    nom: "Lycée Marie Curie",
    ville: "Bordeaux",
    codePostal: "33000",
    adresse: "15 rue Sainte-Catherine",
    email: "contact@marie-curie.edu",
    telephone: "05 56 78 90 12",
    sousDomaine: "mariecurie",
    nbClasses: 12,
    nbUsers: 380,
    createdAt: "2023-04-20",
    updatedAt: "2023-10-10",
  },
  {
    id: "5",
    nom: "Collège Albert Camus",
    ville: "Toulouse",
    codePostal: "31000",
    adresse: "3 place du Capitole",
    email: "contact@albert-camus.edu",
    telephone: "05 61 23 45 67",
    sousDomaine: "albertcamus",
    nbClasses: 9,
    nbUsers: 290,
    createdAt: "2023-05-15",
    updatedAt: "2023-09-30",
  },
]

export default function EtablissementsView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortKey, setSortKey] = useState<keyof Etablissement>("nom")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [filter, setFilter] = useState<string>("all")

  // Filtrer les établissements en fonction de la recherche
  const filteredEtablissements = etablissementsData.filter((etablissement) => {
    const matchesSearch =
      etablissement.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      etablissement.ville.toLowerCase().includes(searchQuery.toLowerCase()) ||
      etablissement.email.toLowerCase().includes(searchQuery.toLowerCase())

    if (filter === "all") return matchesSearch
    // Ajoutez d'autres filtres si nécessaire
    return matchesSearch
  })

  // Trier les établissements
  const sortedEtablissements = [...filteredEtablissements].sort((a, b) => {
    // Utiliser l'index signature pour accéder aux propriétés de manière sûre
    const valueA = a[sortKey] || ""
    const valueB = b[sortKey] || ""

    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="border-b border-[#f5f0e8] bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-xl font-bold">Établissements</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-64 rounded-lg border border-[#f5f0e8] bg-white py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#c83e3e]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#c83e3e] text-[10px] text-white">
                3
              </span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        <FadeIn>
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Rechercher un établissement..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filtrer par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les établissements</SelectItem>
                  <SelectItem value="lycee">Lycées</SelectItem>
                  <SelectItem value="college">Collèges</SelectItem>
                  <SelectItem value="primaire">Écoles primaires</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Exporter</span>
              </Button>
              <Button className="gap-1 bg-[#c83e3e] hover:bg-[#b53535]">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Nouvel établissement</span>
              </Button>
            </div>
          </div>

          {sortedEtablissements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedEtablissements.map((etablissement) => (
                <Card key={etablissement.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold">{etablissement.nom}</h3>
                        {etablissement.sousDomaine && (
                          <Badge variant="outline" className="ml-2">
                            {etablissement.sousDomaine}.classio.fr
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-[#c83e3e]" />
                          <span>
                            {etablissement.adresse || "Adresse non renseignée"}
                            {etablissement.codePostal && etablissement.ville && (
                              <>
                                , {etablissement.codePostal} {etablissement.ville}
                              </>
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-[#c83e3e]" />
                          <span>{etablissement.telephone || "Non renseigné"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-[#c83e3e]" />
                          <span>{etablissement.email || "Non renseigné"}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#f9f5f0] p-4 grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-[#c83e3e]/10 rounded-full">
                          <School className="h-4 w-4 text-[#c83e3e]" />
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Classes</div>
                          <div className="font-medium">{etablissement.nbClasses || "-"}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-[#c83e3e]/10 rounded-full">
                          <Users className="h-4 w-4 text-[#c83e3e]" />
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Utilisateurs</div>
                          <div className="font-medium">{etablissement.nbUsers || "-"}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2 p-4 pt-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/admin/etablissements/${etablissement.id}`}>Détails</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 border border-dashed rounded-lg p-6">
              <School className="h-12 w-12 text-[#c83e3e]/40 mb-4" />
              <h3 className="text-xl font-medium mb-2">Aucun établissement trouvé</h3>
              <p className="text-muted-foreground text-center mb-4">
                Aucun établissement ne correspond à votre recherche.
              </p>
              <Button className="bg-[#c83e3e] hover:bg-[#b53535]">Ajouter un établissement</Button>
            </div>
          )}
        </FadeIn>
      </main>
    </div>
  )
}

