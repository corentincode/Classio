"use client"

import { X, Mail, Phone, Calendar, Clock, Edit, Trash2, UserCheck, UserX } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
// Import the User interface from users-content.tsx
import type { User } from "./users-content"

interface UserDetailsDialogProps {
  user: User | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function UserDetailsDialog({ user, open, onOpenChange }: UserDetailsDialogProps) {
  if (!user) return null

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`
                      ${user.role === "Enseignant" ? "bg-blue-50 text-blue-700 border-blue-200" : ""}
                      ${user.role === "Élève" ? "bg-green-50 text-green-700 border-green-200" : ""}
                      ${user.role === "Administrateur" ? "bg-purple-50 text-purple-700 border-purple-200" : ""}
                    `}
                  >
                    {user.role}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`
                      ${user.status === "Actif" ? "bg-green-50 text-green-700 border-green-200" : ""}
                      ${user.status === "Inactif" ? "bg-gray-50 text-gray-700 border-gray-200" : ""}
                    `}
                  >
                    {user.status}
                  </Badge>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="mt-6">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profil</TabsTrigger>
              <TabsTrigger value="activity">Activité</TabsTrigger>
              <TabsTrigger value="settings">Paramètres</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700">Informations de contact</h3>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{user.email}</span>
                    </div>

                    {user.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{user.phone}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>Inscrit le {formatDate(user.joinedAt)}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>Dernière connexion le {formatDate(user.lastActive)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700">Informations spécifiques</h3>

                  {user.role === "Enseignant" && (
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">Matière:</span> {user.subject}
                      </div>

                      <div className="text-sm">
                        <span className="font-medium">Classes:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {user.classes?.map((cls: string) => (
                            <Badge key={cls} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {cls}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {user.role === "Élève" && (
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">Classe:</span> {user.grade}
                      </div>

                      <div className="text-sm">
                        <span className="font-medium">Parents:</span>
                        <ul className="mt-1 space-y-1">
                          {user.parents?.map((parent: string) => (
                            <li key={parent}>{parent}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {user.role === "Administrateur" && (
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">Département:</span> {user.department}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {user.role === "Élève" && (
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <h3 className="font-medium text-gray-700">Résultats scolaires</h3>

                  <div className="bg-[#f5f0e8]/30 p-4 rounded-lg">
                    <div className="text-center text-gray-500">
                      Les résultats scolaires seront disponibles prochainement
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="activity" className="space-y-4 py-4">
              <h3 className="font-medium text-gray-700">Historique d'activité</h3>

              <div className="space-y-4">
                <div className="border-l-2 border-[#c83e3e] pl-4 pb-4">
                  <div className="text-sm font-medium">Connexion</div>
                  <div className="text-xs text-gray-500">Aujourd'hui, 09:45</div>
                </div>

                <div className="border-l-2 border-gray-200 pl-4 pb-4">
                  <div className="text-sm font-medium">Document téléchargé</div>
                  <div className="text-xs text-gray-500">Hier, 14:30</div>
                  <div className="text-xs text-gray-700 mt-1">Cours de mathématiques - Algèbre</div>
                </div>

                <div className="border-l-2 border-gray-200 pl-4 pb-4">
                  <div className="text-sm font-medium">Connexion</div>
                  <div className="text-xs text-gray-500">Hier, 08:15</div>
                </div>

                <div className="border-l-2 border-gray-200 pl-4">
                  <div className="text-sm font-medium">Profil mis à jour</div>
                  <div className="text-xs text-gray-500">15/10/2023, 11:20</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4 py-4">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium">Modifier les informations</h3>
                    <p className="text-sm text-gray-500">Mettre à jour les informations de l'utilisateur</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Edit className="h-4 w-4" />
                    <span>Modifier</span>
                  </Button>
                </div>

                <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium">Statut du compte</h3>
                    <p className="text-sm text-gray-500">Activer ou désactiver le compte</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`gap-1 ${user.status === "Actif" ? "text-red-600" : "text-green-600"}`}
                  >
                    {user.status === "Actif" ? (
                      <>
                        <UserX className="h-4 w-4" />
                        <span>Désactiver</span>
                      </>
                    ) : (
                      <>
                        <UserCheck className="h-4 w-4" />
                        <span>Activer</span>
                      </>
                    )}
                  </Button>
                </div>

                <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-red-600">Supprimer le compte</h3>
                    <p className="text-sm text-gray-500">Cette action est irréversible</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1 text-red-600">
                    <Trash2 className="h-4 w-4" />
                    <span>Supprimer</span>
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}

