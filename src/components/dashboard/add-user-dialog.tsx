"use client"

import { useState } from "react"
import { UserPlus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AddUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AddUserDialog({ open, onOpenChange }: AddUserDialogProps) {
  const [userRole, setUserRole] = useState("student")
  const [activeTab, setActiveTab] = useState("single")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-[#c83e3e]" />
              Ajouter un utilisateur
            </DialogTitle>
            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>Ajoutez un nouvel utilisateur à votre établissement</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="single">Utilisateur unique</TabsTrigger>
            <TabsTrigger value="bulk">Import en masse</TabsTrigger>
          </TabsList>

          <TabsContent value="single" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-4">
                  <Label htmlFor="role">Rôle</Label>
                  <Select value={userRole} onValueChange={setUserRole}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Sélectionner un rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Élève</SelectItem>
                      <SelectItem value="teacher">Enseignant</SelectItem>
                      <SelectItem value="admin">Administrateur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" placeholder="Prénom" />
                </div>
                <div>
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" placeholder="Nom" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@example.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" placeholder="+33 6 12 34 56 78" />
                </div>
              </div>

              {userRole === "student" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="class">Classe</Label>
                      <Select>
                        <SelectTrigger id="class">
                          <SelectValue placeholder="Sélectionner une classe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="seconde-a">Seconde A</SelectItem>
                          <SelectItem value="premiere-es">Première ES</SelectItem>
                          <SelectItem value="terminale-s1">Terminale S1</SelectItem>
                          <SelectItem value="terminale-s2">Terminale S2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="birthdate">Date de naissance</Label>
                      <Input id="birthdate" type="date" />
                    </div>
                  </div>

                  <div>
                    <Label>Informations des parents</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <Input placeholder="Nom du parent 1" />
                      <Input placeholder="Email du parent 1" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <Input placeholder="Nom du parent 2 (optionnel)" />
                      <Input placeholder="Email du parent 2 (optionnel)" />
                    </div>
                  </div>
                </div>
              )}

              {userRole === "teacher" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="subject">Matière enseignée</Label>
                    <Select>
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Sélectionner une matière" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maths">Mathématiques</SelectItem>
                        <SelectItem value="physics">Physique-Chimie</SelectItem>
                        <SelectItem value="history">Histoire-Géographie</SelectItem>
                        <SelectItem value="french">Français</SelectItem>
                        <SelectItem value="english">Anglais</SelectItem>
                        <SelectItem value="biology">SVT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="classes">Classes enseignées</Label>
                    <Select>
                      <SelectTrigger id="classes">
                        <SelectValue placeholder="Sélectionner des classes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="seconde-a">Seconde A</SelectItem>
                        <SelectItem value="premiere-es">Première ES</SelectItem>
                        <SelectItem value="terminale-s1">Terminale S1</SelectItem>
                        <SelectItem value="terminale-s2">Terminale S2</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="text-xs text-gray-500 mt-1">
                      Vous pourrez ajouter d'autres classes après la création
                    </div>
                  </div>
                </div>
              )}

              {userRole === "admin" && (
                <div>
                  <Label htmlFor="department">Département</Label>
                  <Select>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Sélectionner un département" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="direction">Direction</SelectItem>
                      <SelectItem value="vie-scolaire">Vie scolaire</SelectItem>
                      <SelectItem value="administration">Administration</SelectItem>
                      <SelectItem value="technique">Support technique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="bulk" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="text-gray-500">Glissez-déposez un fichier CSV ou Excel, ou</div>
                  <Button variant="outline" size="sm">
                    Parcourir les fichiers
                  </Button>
                  <div className="text-xs text-gray-500 mt-2">Formats supportés: .csv, .xlsx (max 5MB)</div>
                </div>
              </div>

              <div>
                <Label>Instructions</Label>
                <div className="text-sm text-gray-500 mt-1 space-y-2">
                  <p>
                    Votre fichier doit contenir les colonnes suivantes: Prénom, Nom, Email, Rôle, et d'autres
                    informations spécifiques au rôle.
                  </p>
                  <p>
                    <a href="#" className="text-[#c83e3e] hover:underline">
                      Télécharger un modèle de fichier
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button className="bg-[#c83e3e] hover:bg-[#b53535]">Ajouter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

