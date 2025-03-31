"use client"

import React, { useState } from "react"
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
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

// Définition du schéma de validation pour le formulaire de classe
const classeSchema = z.object({
    nom: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
})

type ClasseFormValues = z.infer<typeof classeSchema>

interface ClasseFormProps {
    etablissementId: string
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    onSuccess?: () => void
}

export function CreateClasseForm({ etablissementId, isOpen, onOpenChange, onSuccess }: ClasseFormProps) {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const form = useForm<ClasseFormValues>({
        resolver: zodResolver(classeSchema),
        defaultValues: {
            nom: "",
        },
    })

    async function onSubmit(values: ClasseFormValues) {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch(`/api/admin/etablissement/${etablissementId}/classes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.message || "Une erreur est survenue lors de la création de la classe")
                return
            }

            // Réinitialiser le formulaire
            form.reset()

            // Fermer le dialogue
            onOpenChange(false)

            // Rafraîchir la page ou les données
            if (onSuccess) {
                onSuccess()
            } else {
                router.refresh()
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
                    <DialogTitle>Ajouter une classe</DialogTitle>
                    <DialogDescription>
                        Créez une nouvelle classe pour cet établissement. Remplissez le champ requis.
                    </DialogDescription>
                </DialogHeader>

                {error && (
                    <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                        {error}
                    </div>
                )}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="nom"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nom de la classe</FormLabel>
                                    <FormControl>
                                        <Input placeholder="6ème A" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button variant="outline" onClick={() => onOpenChange(false)}>
                                Annuler
                            </Button>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="bg-[#c83e3e] hover:bg-[#b53535]"
                            >
                                {isLoading ? "Création en cours..." : "Créer la classe"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
