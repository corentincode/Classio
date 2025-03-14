"use client"

import React, {useEffect, useState} from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import {
    format,
    addDays,
    subDays,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    parseISO,
} from "date-fns"
import { fr } from "date-fns/locale"
import {BookOpen, CalendarIcon, ChevronLeft, ChevronRight, Filter, Grid, List, Plus, Search, Trash2} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import Link from "next/link";


type Etablissement = {
    id: string
    nom: string
    sousDomaine: string
    classes: Classe[]
    users: User[]
}



const etablissementSchema = z.object({
    nom: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
    sousDomaine: z
        .string()
        .min(2, { message: "Le sous-domaine doit contenir au moins 2 caractères" })
        .regex(/^[a-z0-9-]+$/, {
            message: "Le sous-domaine ne peut contenir que des lettres minuscules, des chiffres et des tirets",
        }),
})

type EtablissementFormValues = z.infer<typeof etablissementSchema>
export default function EtablissementsView() {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [etablissements, setEtablissements] = useState<Etablissement[]>([]);
    const [loading, setLoading] = useState(true);
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isAddEventOpen, setIsAddEventOpen] = useState(false)
    const form = useForm<EtablissementFormValues>({
        resolver: zodResolver(etablissementSchema),
        defaultValues: {
            nom: "",
            sousDomaine: "",
        },
    })


    useEffect(() => {
        if (status === "authenticated" && session?.user?.role !== "SUPER_ADMIN") {
            router.push("/dashboard");
        }

        const fetchEtablissements = async () => {
            try {
                const response = await fetch("/api/admin/etablissement");
                if (!response.ok) throw new Error("Impossible de charger les établissements");

                const data = await response.json();
                setEtablissements(data);
            } catch (error) {
                console.error("Erreur:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEtablissements();
    }, [status, session, router]);



    async function onSubmit(values: EtablissementFormValues) {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch("/api/admin/etablissement", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.message || "Une erreur est survenue lors de la création de l'établissement")
                return
            }

            router.push("/dashboard/admin/etablissements/")
            router.refresh()
            setIsAddEventOpen(false)
        } catch (error) {
            setError("Une erreur est survenue. Veuillez réessayer.")
        } finally {
            setIsLoading(false)
        }
    }

    // 🔥 Pendant le chargement, affiche un écran de chargement
    if (status === "loading") {
        return <p className="text-center py-6">Chargement...</p>;
    }
    return (
        <div className="flex-1 flex flex-col">
            {/* Header */}
            <header className="border-b border-[#f5f0e8] bg-white p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <SidebarTrigger />
                        <h1 className="text-xl font-bold">Etablissements : {etablissements.length}</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Rechercher un établissements..."
                                className="w-64 rounded-lg border border-[#f5f0e8] bg-white py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#c83e3e]"
                            />
                        </div>

                        <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
                            <DialogTrigger asChild>
                                <Button size="sm" className="gap-1 bg-[#c83e3e] hover:bg-[#b53535]">
                                    <Plus className="h-4 w-4" />
                                    <span className="hidden sm:inline">Ajouter un établissement</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                    <DialogTitle>Ajouter un établissement</DialogTitle>
                                    <DialogDescription>
                                        Créez un nouvel événement dans le calendrier. Remplissez tous les champs requis.
                                    </DialogDescription>
                                </DialogHeader>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                        {'dd'}
                                        <FormField
                                            control={form.control}
                                            name="nom"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nom de l'établissement</FormLabel>
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
                                                    <FormLabel>Sous-domaine</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="jean-moulin" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <DialogFooter>
                                            <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
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
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-6">
                <div className="space-y-6">
                    <div className="w-full">
                        <div
                            className="flex flex-col items-center h-full w-full rounded-md border border-dashed border-[#f5f0e8] p-6">
                            {loading ? (
                                <p className="text-gray-600">Chargement des établissements...</p>
                            ) : etablissements.length > 0 ? (

                                <div className="flex flex-col gap-4 w-full">
                                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4 w-full">
                                        {etablissements.map((etablissement) => (
                                            <Card key={etablissement.id} className="shadow-md">
                                                <CardContent className="p-4">
                                                    <h2 className="text-lg font-bold text-[#c83e3e]">{etablissement.nom}</h2>
                                                    <p className="text-gray-600">Sous-domaine: {etablissement.sousDomaine}</p>
                                                    <p className="text-gray-500">Utilisateurs: {etablissement.users?.length ?? 0}</p>
                                                    <Button className="mt-4 bg-[#c83e3e] hover:bg-[#b53535] text-white w-full">
                                                        <Link href={`/dashboard/admin/etablissements/${etablissement.id}`}>
                                                            Voir plus
                                                        </Link>

                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <BookOpen className="h-10 w-10 text-[#c83e3e]/40 mx-auto"/>
                                    <p className="text-xl font-medium">Aucun établissement trouvé</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

// Day Cell Component for Month View
