"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Building,
  Search,
  Plus,
  Filter,
  MapPin,
  Users,
  School,
  Grid3X3,
  ListIcon,
  Download,
  Upload,
} from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import FadeIn from "@/components/animations/fade-in"
import Link from "next/link"

// Types
type Etablissement = {
  id: string
  nom: string
  sousDomaine: string
  adresse?: string
  ville?: string
  codePostal?: string
  telephone?: string
  email?: string
  logo?: string
  classes: { id: string; nom: string }[]
  users: { id: string; name: string | null; email: string | null; role?: string }[]
}

// Schéma de validation pour le formulaire d'établissement
const etablissementSchema = z.object({
  nom: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  sousDomaine: z
    .string()
    .min(2, { message: "Le sous-domaine doit contenir au moins 2 caractères" })
    .regex(/^[a-z0-9-]+$/, {
      message: "Le sous-domaine ne peut contenir que des lettres minuscules, des chiffres et des tirets",
    }),
  adresse: z.string().optional(),
  ville: z.string().optional(),
  codePostal: z.string().optional(),
  telephone: z.string().optional(),
  email: z.string().email({ message: "Veuillez entrer une adresse email valide" }).optional(),
})

type EtablissementFormValues = z.infer<typeof etablissementSchema>

// Données de démonstration
const demoEtablissements: Etablissement[] = [
  {
    id: "1",
    nom: "Lycée Jean Moulin",
    sousDomaine: "jean-moulin",
    adresse: "123 Rue de l'Éducation",
    ville: "Paris",
    codePostal: "75001",
    telephone: "01 23 45 67 89",
    email: "contact@jean-moulin.edu",
    logo: "/placeholder.svg?height=100&width=100",
    classes: [
      { id: "1", nom: "Seconde A" },
      { id: "2", nom: "Seconde B" },
      { id: "3", nom: "Première S" },
    ],
    users: [
      { id: "1", name: "Jean Dupont", email: "jean@example.com", role: "ADMIN" },
      { id: "2", name: "Marie Martin", email: "marie@example.com", role: "TEACHER" },
    ],
  },
  {
    id: "2",
    nom: "Collège Victor Hugo",
    sousDomaine: "victor-hugo",
    adresse: "456 Avenue des Lettres",
    ville: "Lyon",
    codePostal: "69002",
    telephone: "04 56 78 90 12",
    email: "contact@victor-hugo.edu",
    logo: "/placeholder.svg?height=100&width=100",
    classes: [
      { id: "4", nom: "6ème A" },
      { id: "5", nom: "5ème B" },
    ],
    users: [
      { id: "3", name: "Paul Durand", email: "paul@example.com", role: "ADMIN" },
      { id: "4", name: "Sophie Petit", email: "sophie@example.com", role: "TEACHER" },
      { id: "5", name: "Lucas Moreau", email: "lucas@example.com", role: "TEACHER" },
    ],
  },
  {
    id: "3",
    nom: "École Primaire Jules Ferry",
    sousDomaine: "jules-ferry",
    adresse: "789 Boulevard de l'Apprentissage",
    ville: "Marseille",
    codePostal: "13001",
    telephone: "04 91 23 45 67",
    email: "contact@jules-ferry.edu",
    logo: "/placeholder.svg?height=100&width=100",
    classes: [
      { id: "6", nom: "CP" },
      { id: "7", nom: "CE1" },
      { id: "8", nom: "CE2" },
      { id: "9", nom: "CM1" },
      { id: "10", nom: "CM2" },
    ],
    users: [
      { id: "6", name: "Emma Blanc", email: "emma@example.com", role: "ADMIN" },
      { id: "7", name: "Thomas Leroy", email: "thomas@example.com", role: "TEACHER" },
    ],
  },
  {
    id: "4",
    nom: "Lycée Professionnel Gustave Eiffel",
    sousDomaine: "gustave-eiffel",
    adresse: "101 Rue de l'Industrie",
    ville: "Bordeaux",
    codePostal: "33000",
    telephone: "05 56 78 90 12",
    email: "contact@gustave-eiffel.edu",
    logo: "/placeholder.svg?height=100&width=100",
    classes: [
      { id: "11", nom: "CAP Électricité" },
      { id: "12", nom: "Bac Pro Mécanique" },
    ],
    users: [
      { id: "8", name: "Julie Dubois", email: "julie@example.com", role: "ADMIN" },
      { id: "9", name: "Nicolas Martin", email: "nicolas@example.com", role: "TEACHER" },
    ],
  },
]

export default function EtablissementsContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [etablissements, setEtablissements] = useState<Etablissement[]>([])
  const [filteredEtablissements, setFilteredEtablissements] = useState<Etablissement[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [sortConfig, setSortConfig] = useState<{ key: keyof Etablissement; direction: "asc" | "desc" } | null>(null)

  const { data: session, status } = useSession()
  const router = useRouter()

  const form = useForm<EtablissementFormValues>({
    resolver: zodResolver(etablissementSchema),
    defaultValues: {
      nom: "",
      sousDomaine: "",
      adresse: "",
      ville: "",
      codePostal: "",
      telephone: "",
      email: "",
    },
  })

  // Simuler le chargement des données
  useEffect(() => {
    // Vérifier si l'utilisateur est un super admin
    if (status === "authenticated" && session?.user?.role !== "SUPER_ADMIN") {
      router.push("/dashboard")
      return
    }

    // Simuler une requête API
    const timer = setTimeout(() => {
      setEtablissements(demoEtablissements)
      setFilteredEtablissements(demoEtablissements)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [status, session, router])

  // Filtrer les établissements en fonction du terme de recherche
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredEtablissements(etablissements)
    } else {
      const lowercasedSearch = searchTerm.toLowerCase()
      const filtered = etablissements.filter(
        (etab) =>
          etab.nom.toLowerCase().includes(lowercasedSearch) ||
          etab.sousDomaine.toLowerCase().includes(lowercasedSearch) ||
          etab.ville?.toLowerCase().includes(lowercasedSearch) ||
          etab.email?.toLowerCase().includes(lowercasedSearch),
      )
      setFilteredEtablissements(filtered)
    }
  }, [searchTerm, etablissements])

  // Fonction pour trier les établissements
  const sortEtablissements = (key: keyof Etablissement) => {
    let direction: "asc" | "desc" = "asc"

    if (sortConfig && sortConfig.key === key) {
      direction = sortConfig.direction === "asc" ? "desc" : "asc"
    }

    const sorted = [...filteredEtablissements].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1
      return 0
    })

    setFilteredEtablissements(sorted)
    setSortConfig({ key, direction })
  }

  // Gérer la soumission du formulaire
  async function onSubmit(values: EtablissementFormValues) {
    setIsLoading(true)

    try {
      // Simuler une requête API
      setTimeout(() => {
        // Ajouter le nouvel établissement à la liste
        const newEtablissement: Etablissement = {
          id: (etablissements.length + 1).toString(),
          ...values,
          classes: [],
          users: [],
        }

        setEtablissements([...etablissements, newEtablissement])
        setFilteredEtablissements([...etablissements, newEtablissement])
        setIsAddDialogOpen(false)
        form.reset()
      }, 1000)
    } catch (error) {
      console.error("Erreur lors de la création de l'établissement:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Si le statut est en cours de chargement, afficher un écran de chargement
  if (status === "loading") {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Skeleton className="h-12 w-12 rounded-full mx-auto mb-4" />
          <Skeleton className="h-4 w-32 mx-auto" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="border-b border-[#f5f0e8] bg-white p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-xl font-bold">Établissements</h1>
              <p className="text-sm text-muted-foreground">Gérez les établissements de votre réseau</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Rechercher un établissement..."
                className="w-full sm:w-64 pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filtrer par</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => sortEtablissements("nom")}>
                    Nom {sortConfig?.key === "nom" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => sortEtablissements("ville")}>
                    Ville {sortConfig?.key === "ville" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Réinitialiser les filtres</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="hidden sm:flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  className="rounded-r-none"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  className="rounded-l-none"
                  onClick={() => setViewMode("list")}
                >
                  <ListIcon className="h-4 w-4" />
                </Button>
              </div>

              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-1 bg-[#c83e3e] hover:bg-[#b53535]">
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">Ajouter un établissement</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Ajouter un établissement</DialogTitle>
                    <DialogDescription>
                      Créez un nouvel établissement dans votre réseau. Remplissez tous les champs requis.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="nom"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nom de l'établissement*</FormLabel>
                              <FormControl>
                                <Input placeholder="Lycée Jean Moulin" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="sousDomaine"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Sous-domaine*</FormLabel>
                              <FormControl>
                                <Input placeholder="jean-moulin" {...field} />
                              </FormControl>
                              <FormDescription>L'URL sera: classio.fr/{field.value || "sous-domaine"}</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="adresse"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Adresse</FormLabel>
                              <FormControl>
                                <Input placeholder="123 Rue de l'Éducation" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <FormField
                            control={form.control}
                            name="codePostal"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Code postal</FormLabel>
                                <FormControl>
                                  <Input placeholder="75001" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="ville"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Ville</FormLabel>
                                <FormControl>
                                  <Input placeholder="Paris" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="telephone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Téléphone</FormLabel>
                              <FormControl>
                                <Input placeholder="01 23 45 67 89" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="contact@etablissement.edu" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                          Annuler
                        </Button>
                        <Button type="submit" disabled={isLoading} className="bg-[#c83e3e] hover:bg-[#b53535]">
                          {isLoading ? "Création en cours..." : "Créer l'établissement"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        <Tabs defaultValue="tous" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="tous">Tous</TabsTrigger>
              <TabsTrigger value="lycees">Lycées</TabsTrigger>
              <TabsTrigger value="colleges">Collèges</TabsTrigger>
              <TabsTrigger value="primaires">Écoles primaires</TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Exporter</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Upload className="h-4 w-4" />
                <span className="hidden sm:inline">Importer</span>
              </Button>
            </div>
          </div>

          <TabsContent value="tous" className="m-0">
            <FadeIn>
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Array(8)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton key={i} className="h-48 rounded-lg" />
                    ))}
                </div>
              ) : filteredEtablissements.length > 0 ? (
                viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredEtablissements.map((etablissement) => (
                      <Card key={etablissement.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardHeader className="p-4 pb-2 bg-[#f9f5f0]">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg font-bold text-[#c83e3e]">{etablissement.nom}</CardTitle>
                            <Badge variant="outline" className="bg-white">
                              {etablissement.classes.length} classes
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-3 space-y-3">
                          <div className="flex items-center text-sm text-gray-600">
                            <Building className="h-4 w-4 mr-2 text-[#c83e3e]" />
                            <span>{etablissement.sousDomaine}.classio.fr</span>
                          </div>
                          {etablissement.ville && (
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="h-4 w-4 mr-2 text-[#c83e3e]" />
                              <span>
                                {etablissement.codePostal} {etablissement.ville}
                              </span>
                            </div>
                          )}
                          <div className="flex items-center text-sm text-gray-600">
                            <Users className="h-4 w-4 mr-2 text-[#c83e3e]" />
                            <span>{etablissement.users.length} utilisateurs</span>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex justify-between">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/dashboard/admin/etablissements/${etablissement.id}`}>Voir les détails</Link>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-more-horizontal"
                                >
                                  <circle cx="12" cy="12" r="1" />
                                  <circle cx="19" cy="12" r="1" />
                                  <circle cx="5" cy="12" r="1" />
                                </svg>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Modifier</DropdownMenuItem>
                              <DropdownMenuItem>Gérer les classes</DropdownMenuItem>
                              <DropdownMenuItem>Gérer les utilisateurs</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Supprimer</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[300px]">Nom</TableHead>
                          <TableHead>Sous-domaine</TableHead>
                          <TableHead>Ville</TableHead>
                          <TableHead>Classes</TableHead>
                          <TableHead>Utilisateurs</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredEtablissements.map((etablissement) => (
                          <TableRow key={etablissement.id}>
                            <TableCell className="font-medium">{etablissement.nom}</TableCell>
                            <TableCell>{etablissement.sousDomaine}.classio.fr</TableCell>
                            <TableCell>{etablissement.ville || "-"}</TableCell>
                            <TableCell>{etablissement.classes.length}</TableCell>
                            <TableCell>{etablissement.users.length}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={`/dashboard/admin/etablissements/${etablissement.id}`}>Détails</Link>
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-more-horizontal"
                                      >
                                        <circle cx="12" cy="12" r="1" />
                                        <circle cx="19" cy="12" r="1" />
                                        <circle cx="5" cy="12" r="1" />
                                      </svg>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Modifier</DropdownMenuItem>
                                    <DropdownMenuItem>Gérer les classes</DropdownMenuItem>
                                    <DropdownMenuItem>Gérer les utilisateurs</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600">Supprimer</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center justify-center h-64 border border-dashed rounded-lg p-6">
                  <Building className="h-12 w-12 text-[#c83e3e]/40 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Aucun établissement trouvé</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Aucun établissement ne correspond à votre recherche.
                  </p>
                  <Button onClick={() => setSearchTerm("")} variant="outline">
                    Réinitialiser la recherche
                  </Button>
                </div>
              )}
            </FadeIn>
          </TabsContent>

          <TabsContent value="lycees" className="m-0">
            <div className="flex flex-col items-center justify-center h-64 border border-dashed rounded-lg p-6">
              <School className="h-12 w-12 text-[#c83e3e]/40 mb-4" />
              <h3 className="text-xl font-medium mb-2">Filtrage par type d'établissement</h3>
              <p className="text-muted-foreground text-center">Cette fonctionnalité sera disponible prochainement.</p>
            </div>
          </TabsContent>

          <TabsContent value="colleges" className="m-0">
            <div className="flex flex-col items-center justify-center h-64 border border-dashed rounded-lg p-6">
              <School className="h-12 w-12 text-[#c83e3e]/40 mb-4" />
              <h3 className="text-xl font-medium mb-2">Filtrage par type d'établissement</h3>
              <p className="text-muted-foreground text-center">Cette fonctionnalité sera disponible prochainement.</p>
            </div>
          </TabsContent>

          <TabsContent value="primaires" className="m-0">
            <div className="flex flex-col items-center justify-center h-64 border border-dashed rounded-lg p-6">
              <School className="h-12 w-12 text-[#c83e3e]/40 mb-4" />
              <h3 className="text-xl font-medium mb-2">Filtrage par type d'établissement</h3>
              <p className="text-muted-foreground text-center">Cette fonctionnalité sera disponible prochainement.</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

