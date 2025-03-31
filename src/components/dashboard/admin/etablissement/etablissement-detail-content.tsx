"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Users,
  BookOpen,
  Edit,
  Trash2,
  Plus,
  Download,
  UserPlus,
  School,
} from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import FadeIn from "@/components/animations/fade-in"

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

interface EtablissementDetailContentProps {
  etablissement: Etablissement
}

export default function EtablissementDetailContent({ etablissement }: EtablissementDetailContentProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isAddClassDialogOpen, setIsAddClassDialogOpen] = useState(false)
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false)
  const router = useRouter()

  // Fonction pour obtenir les initiales d'un nom
  const getInitials = (name: string | null) => {
    if (!name) return "?"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Fonction pour obtenir la couleur de l'avatar en fonction du rôle
  const getAvatarColor = (role: string | undefined) => {
    switch (role) {
      case "ADMIN":
        return "bg-blue-100 text-blue-800"
      case "TEACHER":
        return "bg-green-100 text-green-800"
      case "STUDENT":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Fonction pour obtenir le libellé du rôle
  const getRoleLabel = (role: string | undefined) => {
    switch (role) {
      case "ADMIN":
        return "Administrateur"
      case "TEACHER":
        return "Enseignant"
      case "STUDENT":
        return "Élève"
      default:
        return "Utilisateur"
    }
  }

  // Fonction pour simuler la suppression
  const handleDelete = () => {
    // Simuler une requête API
    setTimeout(() => {
      router.push("/dashboard/admin/etablissements")
    }, 1000)
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="border-b border-[#f5f0e8] bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/dashboard/admin/etablissements">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <h1 className="text-xl font-bold">{etablissement.nom}</h1>
              <Badge variant="outline" className="ml-2">
                {etablissement.sousDomaine}.classio.fr
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Edit className="h-4 w-4" />
              <span className="hidden sm:inline">Modifier</span>
            </Button>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive" size="sm" className="gap-1">
                  <Trash2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Supprimer</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Supprimer l'établissement</DialogTitle>
                  <DialogDescription>
                    Êtes-vous sûr de vouloir supprimer cet établissement ? Cette action est irréversible et supprimera
                    toutes les données associées.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button variant="destructive" onClick={handleDelete}>
                    Supprimer définitivement
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Informations générales */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
                <CardDescription>Détails et coordonnées de l'établissement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Nom</div>
                    <div>{etablissement.nom}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Sous-domaine</div>
                    <div>{etablissement.sousDomaine}.classio.fr</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Adresse</div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#c83e3e]" />
                      <span>
                        {etablissement.adresse || "Non renseignée"}
                        {etablissement.codePostal && etablissement.ville && (
                          <>
                            , {etablissement.codePostal} {etablissement.ville}
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Contact</div>
                    <div className="space-y-1">
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
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="gap-1">
                  <Edit className="h-4 w-4" />
                  Modifier les informations
                </Button>
              </CardFooter>
            </Card>

            {/* Statistiques */}
            <Card>
              <CardHeader>
                <CardTitle>Statistiques</CardTitle>
                <CardDescription>Aperçu des données de l'établissement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#f9f5f0] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#c83e3e]/10 rounded-full">
                      <Users className="h-5 w-5 text-[#c83e3e]" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Utilisateurs</div>
                      <div className="text-2xl font-bold">{etablissement.users.length}</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="#users">Voir</Link>
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#f9f5f0] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#c83e3e]/10 rounded-full">
                      <BookOpen className="h-5 w-5 text-[#c83e3e]" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Classes</div>
                      <div className="text-2xl font-bold">{etablissement.classes.length}</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="#classes">Voir</Link>
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#f9f5f0] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#c83e3e]/10 rounded-full">
                      <School className="h-5 w-5 text-[#c83e3e]" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Élèves</div>
                      <div className="text-2xl font-bold">-</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" disabled>
                    Voir
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="classes" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="classes">Classes</TabsTrigger>
              <TabsTrigger value="users">Utilisateurs</TabsTrigger>
              <TabsTrigger value="settings">Paramètres</TabsTrigger>
            </TabsList>

            <TabsContent value="classes" className="m-0" id="classes">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Classes</h2>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Exporter</span>
                  </Button>

                  <Dialog open={isAddClassDialogOpen} onOpenChange={setIsAddClassDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="gap-1 bg-[#c83e3e] hover:bg-[#b53535]">
                        <Plus className="h-4 w-4" />
                        <span className="hidden sm:inline">Ajouter une classe</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Ajouter une classe</DialogTitle>
                        <DialogDescription>Créez une nouvelle classe dans cet établissement.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label htmlFor="className" className="text-sm font-medium">
                            Nom de la classe
                          </label>
                          <input id="className" className="w-full p-2 border rounded-md" placeholder="Ex: Seconde A" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddClassDialogOpen(false)}>
                          Annuler
                        </Button>
                        <Button className="bg-[#c83e3e] hover:bg-[#b53535]">Ajouter la classe</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {etablissement.classes.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Élèves</TableHead>
                        <TableHead>Enseignants</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {etablissement.classes.map((classe) => (
                        <TableRow key={classe.id}>
                          <TableCell className="font-medium">{classe.nom}</TableCell>
                          <TableCell>-</TableCell>
                          <TableCell>-</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                Détails
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
                                  <DropdownMenuItem>Gérer les élèves</DropdownMenuItem>
                                  <DropdownMenuItem>Gérer les enseignants</DropdownMenuItem>
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
              ) : (
                <div className="flex flex-col items-center justify-center h-64 border border-dashed rounded-lg p-6">
                  <BookOpen className="h-12 w-12 text-[#c83e3e]/40 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Aucune classe</h3>
                  <p className="text-muted-foreground text-center mb-4">Cet établissement n'a pas encore de classes.</p>
                  <Button onClick={() => setIsAddClassDialogOpen(true)} className="bg-[#c83e3e] hover:bg-[#b53535]">
                    Ajouter une classe
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="users" className="m-0" id="users">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Utilisateurs</h2>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Exporter</span>
                  </Button>

                  <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="gap-1 bg-[#c83e3e] hover:bg-[#b53535]">
                        <UserPlus className="h-4 w-4" />
                        <span className="hidden sm:inline">Ajouter un utilisateur</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Ajouter un utilisateur</DialogTitle>
                        <DialogDescription>Ajoutez un nouvel utilisateur à cet établissement.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label htmlFor="userName" className="text-sm font-medium">
                            Nom complet
                          </label>
                          <input id="userName" className="w-full p-2 border rounded-md" placeholder="Ex: Jean Dupont" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="userEmail" className="text-sm font-medium">
                            Email
                          </label>
                          <input
                            id="userEmail"
                            type="email"
                            className="w-full p-2 border rounded-md"
                            placeholder="Ex: jean.dupont@example.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="userRole" className="text-sm font-medium">
                            Rôle
                          </label>
                          <select id="userRole" className="w-full p-2 border rounded-md">
                            <option value="ADMIN">Administrateur</option>
                            <option value="TEACHER">Enseignant</option>
                            <option value="STUDENT">Élève</option>
                          </select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                          Annuler
                        </Button>
                        <Button className="bg-[#c83e3e] hover:bg-[#b53535]">Ajouter l'utilisateur</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {etablissement.users.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Utilisateur</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Rôle</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {etablissement.users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className={getAvatarColor(user.role)}>
                                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                              </Avatar>
                              <div>{user.name || "Utilisateur sans nom"}</div>
                            </div>
                          </TableCell>
                          <TableCell>{user.email || "-"}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`${
                                user.role === "ADMIN"
                                  ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                  : user.role === "TEACHER"
                                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                                    : "bg-purple-100 text-purple-800 hover:bg-purple-100"
                              }`}
                            >
                              {getRoleLabel(user.role)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                Détails
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
                                  <DropdownMenuItem>Réinitialiser le mot de passe</DropdownMenuItem>
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
              ) : (
                <div className="flex flex-col items-center justify-center h-64 border border-dashed rounded-lg p-6">
                  <Users className="h-12 w-12 text-[#c83e3e]/40 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Aucun utilisateur</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Cet établissement n'a pas encore d'utilisateurs.
                  </p>
                  <Button onClick={() => setIsAddUserDialogOpen(true)} className="bg-[#c83e3e] hover:bg-[#b53535]">
                    Ajouter un utilisateur
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="settings" className="m-0">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-4">Paramètres de l'établissement</h2>
                  <Card>
                    <CardHeader>
                      <CardTitle>Informations générales</CardTitle>
                      <CardDescription>Modifiez les informations de base de l'établissement</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="settingsName" className="text-sm font-medium">
                            Nom de l'établissement
                          </label>
                          <input
                            id="settingsName"
                            className="w-full p-2 border rounded-md"
                            defaultValue={etablissement.nom}
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="settingsDomain" className="text-sm font-medium">
                            Sous-domaine
                          </label>
                          <div className="flex">
                            <input
                              id="settingsDomain"
                              className="w-full p-2 border rounded-l-md"
                              defaultValue={etablissement.sousDomaine}
                            />
                            <span className="inline-flex items-center px-3 border border-l-0 rounded-r-md bg-gray-50">
                              .classio.fr
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="settingsAddress" className="text-sm font-medium">
                          Adresse
                        </label>
                        <input
                          id="settingsAddress"
                          className="w-full p-2 border rounded-md"
                          defaultValue={etablissement.adresse}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="settingsPostal" className="text-sm font-medium">
                            Code postal
                          </label>
                          <input
                            id="settingsPostal"
                            className="w-full p-2 border rounded-md"
                            defaultValue={etablissement.codePostal}
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="settingsCity" className="text-sm font-medium">
                            Ville
                          </label>
                          <input
                            id="settingsCity"
                            className="w-full p-2 border rounded-md"
                            defaultValue={etablissement.ville}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="settingsPhone" className="text-sm font-medium">
                            Téléphone
                          </label>
                          <input
                            id="settingsPhone"
                            className="w-full p-2 border rounded-md"
                            defaultValue={etablissement.telephone}
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="settingsEmail" className="text-sm font-medium">
                            Email
                          </label>
                          <input
                            id="settingsEmail"
                            type="email"
                            className="w-full p-2 border rounded-md"
                            defaultValue={etablissement.email}
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="bg-[#c83e3e] hover:bg-[#b53535]">Enregistrer les modifications</Button>
                    </CardFooter>
                  </Card>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-4">Danger</h2>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-red-600">Zone de danger</CardTitle>
                      <CardDescription>
                        Ces actions sont irréversibles et peuvent entraîner une perte de données
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 border border-red-200 bg-red-50 rounded-md">
                        <h3 className="text-lg font-medium text-red-800 mb-2">Supprimer l'établissement</h3>
                        <p className="text-red-700 mb-4">
                          La suppression de cet établissement entraînera la perte de toutes les données associées, y
                          compris les classes, les utilisateurs et les documents.
                        </p>
                        <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
                          Supprimer l'établissement
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </FadeIn>
      </main>
    </div>
  )
}

