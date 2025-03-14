"use client"

import { useState, useEffect } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"

// Définition du schéma de validation pour le formulaire
const addUserToClasseSchema = z
    .object({
        userId: z
            .string({
                required_error: "Veuillez sélectionner un utilisateur",
            })
            .optional(),
        email: z.string().email("Veuillez entrer une adresse email valide").optional(),
        firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères").optional(),
        name: z.string().min(2, "Le nom doit contenir au moins 2 caractères").optional(),
        password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }),
        roleInClass: z.enum(["ELEVE", "PROF", "SURVEILLANT", "SECRETAIRE"], {
            required_error: "Veuillez sélectionner un rôle",
        }),
        createNewUser: z.boolean().default(false),
    })
    .refine(
        (data) => {
            // Si on crée un nouvel utilisateur, email, firstName et name sont requis
            if (data.createNewUser) {
                return !!data.email && !!data.firstName && !!data.name
            }
            // Sinon, userId est requis
            return !!data.userId
        },
        {
            message: "Veuillez sélectionner un utilisateur existant ou remplir tous les champs pour en créer un nouveau",
            path: ["userId"],
        },
    )

type AddUserToClasseFormValues = z.infer<typeof addUserToClasseSchema>

type User = {
    id: string
    name: string | null
    email: string | null
}

type Classe = {
    id: string
    nom: string
    etablissementId: string
}

interface AddUserToClasseFormProps {
    etablissementId: string
    classeId: string
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    onSuccess?: () => void
}

export function AddUserToClasseForm({
                                        etablissementId,
                                        classeId,
                                        isOpen,
                                        onOpenChange,
                                        onSuccess,
                                    }: AddUserToClasseFormProps) {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [users, setUsers] = useState<User[]>([])
    const [classe, setClasse] = useState<Classe | null>(null)
    const [loadingUsers, setLoadingUsers] = useState(false)
    const [createNewUser, setCreateNewUser] = useState(false)
    const router = useRouter()

    const form = useForm<AddUserToClasseFormValues>({
        resolver: zodResolver(addUserToClasseSchema),
        defaultValues: {
            userId: "",
            email: "",
            firstName: "",
            name: "",
            password: "",
            roleInClass: "ELEVE",
            createNewUser: false,
        },
    })

    // Mettre à jour le formulaire quand createNewUser change
    useEffect(() => {
        form.setValue("createNewUser", createNewUser)
    }, [createNewUser, form])

    // Charger les utilisateurs de l'établissement et les infos de la classe
    useEffect(() => {
        if (isOpen) {
            const fetchUsers = async () => {
                setLoadingUsers(true)
                try {
                    const response = await fetch(`/api/admin/etablissement/${etablissementId}/users`)
                    if (response.ok) {
                        const data = await response.json()
                        setUsers(data)
                    } else {
                        setError("Impossible de charger les utilisateurs")
                    }
                } catch (error) {
                    console.error("Erreur lors du chargement des utilisateurs:", error)
                    setError("Une erreur est survenue lors du chargement des utilisateurs")
                } finally {
                    setLoadingUsers(false)
                }
            }

            const fetchClasse = async () => {
                try {
                    const response = await fetch(`/api/admin/etablissement/${etablissementId}/classe/${classeId}`)
                    if (response.ok) {
                        const data = await response.json()
                        setClasse(data)
                    } else {
                        setError("Impossible de charger les informations de la classe")
                    }
                } catch (error) {
                    console.error("Erreur lors du chargement de la classe:", error)
                    setError("Une erreur est survenue lors du chargement de la classe")
                }
            }

            fetchUsers()
            fetchClasse()
        }
    }, [etablissementId, classeId, isOpen])

    async function onSubmit(values: AddUserToClasseFormValues) {
        setIsLoading(true)
        setError(null)

        try {
            if (createNewUser) {
                // Créer un nouvel utilisateur et l'associer directement à la classe
                const response = await fetch(`/api/admin/etablissement/${etablissementId}/user`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: values.email,
                        firstName: values.firstName,
                        name: values.name,
                        password: values.password,
                        role: values.roleInClass === "PROF" ? "PROF" : "ELEVE", // Définir le rôle global en fonction du rôle dans la classe
                        classeId: classeId,
                        roleInClass: values.roleInClass,
                    }),
                })

                const data = await response.json()

                if (!response.ok) {
                    setError(data.message || "Une erreur est survenue lors de la création de l'utilisateur")
                    return
                }

                // Réinitialiser le formulaire
                form.reset()
                setCreateNewUser(false)

                // Fermer le dialogue
                onOpenChange(false)

                // Rafraîchir les données
                if (onSuccess) {
                    onSuccess()
                }
            } else {
                // Ajouter un utilisateur existant à la classe
                const response = await fetch(`/api/admin/classes/users`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId: values.userId,
                        roleInClass: values.roleInClass,
                        etablissementId,
                        classeId,
                    }),
                })

                const data = await response.json()

                if (!response.ok) {
                    setError(data.message || "Une erreur est survenue lors de l'ajout de l'utilisateur à la classe")
                    return
                }

                // Réinitialiser le formulaire
                form.reset()

                // Fermer le dialogue
                onOpenChange(false)

                // Rafraîchir les données
                if (onSuccess) {
                    onSuccess()
                }
            }
        } catch (error) {
            setError("Une erreur est survenue. Veuillez réessayer.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Ajouter un utilisateur à la classe {classe?.nom || ""}</DialogTitle>
                    <DialogDescription>Associez un utilisateur à cette classe et définissez son rôle.</DialogDescription>
                </DialogHeader>

                {error && <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">{error}</div>}

                <div className="flex items-center space-x-2 mb-4">
                    <Button
                        type="button"
                        variant={createNewUser ? "outline" : "default"}
                        onClick={() => setCreateNewUser(false)}
                        className={!createNewUser ? "bg-[#c83e3e] hover:bg-[#b53535]" : ""}
                    >
                        Utilisateur existant
                    </Button>
                    <Button
                        type="button"
                        variant={createNewUser ? "default" : "outline"}
                        onClick={() => setCreateNewUser(true)}
                        className={createNewUser ? "bg-[#c83e3e] hover:bg-[#b53535]" : ""}
                    >
                        Nouvel utilisateur
                    </Button>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {!createNewUser ? (
                            <FormField
                                control={form.control}
                                name="userId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Utilisateur</FormLabel>
                                        <FormControl>
                                            <Select disabled={loadingUsers} onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        placeholder={
                                                            loadingUsers ? "Chargement des utilisateurs..." : "Sélectionner un utilisateur"
                                                        }
                                                    />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {users.map((user) => (
                                                        <SelectItem key={user.id} value={user.id}>
                                                            {user.name || "Sans nom"} ({user.email})
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ) : (
                            <>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="email@exemple.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Prénom</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Prénom" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nom</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nom" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mot de passe</FormLabel>
                                            <FormControl>
                                                <Input type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        <FormField
                            control={form.control}
                            name="roleInClass"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rôle dans la classe</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionner un rôle" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="ELEVE">Élève</SelectItem>
                                                <SelectItem value="PROF">Professeur</SelectItem>
                                                <SelectItem value="SURVEILLANT">Surveillant</SelectItem>
                                                <SelectItem value="SECRETAIRE">Secrétaire</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button variant="outline" onClick={() => onOpenChange(false)}>
                                Annuler
                            </Button>
                            <Button type="submit" disabled={isLoading || loadingUsers} className="bg-[#c83e3e] hover:bg-[#b53535]">
                                {isLoading ? "Ajout en cours..." : "Ajouter à la classe"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

