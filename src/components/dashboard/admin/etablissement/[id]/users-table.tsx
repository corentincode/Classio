"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, Trash } from "lucide-react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

type ClasseUser = {
    firstName: string;
    name?: string | null;
    id: string
    userId: string
    classeId: string
    roleInClass: string
    email: string
    image: string
    user: {
        id: string;
        firstName?: string | null;
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
}

type UsersTableProps = {
    users: ClasseUser[]
    etablissementId: string
    classeId: string
    onUserDeleted?: () => void
    onUserRemovedFromClass?: () => void
}

export function UsersTable({
                               users,
                               etablissementId,
                               classeId,
                               onUserDeleted,
                               onUserRemovedFromClass,
                           }: UsersTableProps) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<ClasseUser | null>(null)
    const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({})

    // Fonction pour supprimer complètement un utilisateur
    const deleteUser = async (user: ClasseUser) => {
        try {

            const response = await fetch(`/api/admin/etablissement/${etablissementId}/user/${user.id}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.message || "Erreur lors de la suppression de l'utilisateur")
            }


            if (onUserDeleted) {
                onUserDeleted()
            }
        } catch (error) {
            console.error("Erreur lors de la suppression:", error)

        } finally {
            setIsLoading((prev) => ({ ...prev, [user.userId]: false }))
        }
    }

    // Fonction pour retirer un utilisateur d'une classe
    const removeUserFromClass = async (user: ClasseUser) => {
        try {
            const response = await fetch(
                `/api/admin/etablissement/${etablissementId}/classes/${classeId}/user/${user.id}`,
                {
                    method: "DELETE",
                },
            )

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.message || "Erreur lors du retrait de l'utilisateur de la classe")
            }



            if (onUserRemovedFromClass) {
                onUserRemovedFromClass()
            }
        } catch (error) {
            console.error("Erreur lors du retrait:", error)

        } finally {
            setIsLoading((prev) => ({ ...prev, [user.id]: false }))
        }
    }

    // Ouvrir la boîte de dialogue de suppression
    const handleDeleteClick = (user: ClasseUser) => {

        setSelectedUser(user)
        setIsDeleteDialogOpen(true)
    }

    // Ouvrir la boîte de dialogue de retrait
    const handleRemoveClick = (user: ClasseUser) => {
        setSelectedUser(user)
        setIsRemoveDialogOpen(true)
    }

    // Confirmer la suppression
    const confirmDelete = () => {
        if (selectedUser) {
            deleteUser(selectedUser)
        }
        setIsDeleteDialogOpen(false)
    }

    // Confirmer le retrait
    const confirmRemove = () => {
        if (selectedUser) {
            removeUserFromClass(selectedUser)
        }
        setIsRemoveDialogOpen(false)
    }

    return (
        <>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nom</TableHead>
                            <TableHead>Prénom</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Rôle</TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.firstName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary">{user.roleInClass}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Avatar className="h-8 w-8">
                                        {user.image ? (
                                            <AvatarImage src={user.image} alt={user.name ?? "Avatar"} />
                                        ) : (
                                            <AvatarFallback>
                                                {user.firstName?.[0] || ""}
                                                {user.name?.[0] || "U"}
                                            </AvatarFallback>
                                        )}
                                    </Avatar>
                                </TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleRemoveClick(user)}
                                            disabled={isLoading[user.id] || isLoading[user.userId]}
                                        >
                                            {isLoading[user.id] ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <>
                                                    <Trash className="mr-2 h-4 w-4" />
                                                    Retirer
                                                </>
                                            )}
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDeleteClick(user)}
                                            disabled={isLoading[user.id] || isLoading[user.userId]}
                                        >
                                            {isLoading[user.userId] ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <>
                                                    <Trash className="mr-2 h-4 w-4" />
                                                    Supprimer
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</DialogTitle>
                            <DialogDescription>Cette action est irréversible. L'utilisateur sera définitivement supprimé du système.</DialogDescription>
                        </DialogHeader>

                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                                Annuler
                            </Button>

                            <Button onClick={confirmDelete} className="bg-[#c83e3e] hover:bg-[#b53535]">
                                { "Supprimer"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Dialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Êtes-vous sûr de vouloir retiré cet utilisateur ?</DialogTitle>
                            <DialogDescription>Cette action est irréversible. L'utilisateur sera définitivement retiré de la classe.</DialogDescription>
                        </DialogHeader>

                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsRemoveDialogOpen(false)}>
                                Annuler
                            </Button>

                            <Button onClick={confirmRemove} className="bg-[#c83e3e] hover:bg-[#b53535]">
                                { "Supprimer"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>


        </>
    )
}

