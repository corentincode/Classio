"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
    BarChart3,
    BookOpen, Calendar,
    Clock,
    Download,
    FileText,
    MessageSquare,
    MoreHorizontal,
    Plus,
    Search,
    Users
} from "lucide-react"
import {SidebarTrigger} from "@/components/ui/sidebar";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import React, {useState} from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {motion} from "framer-motion";
import {ClassesTable} from "@/components/dashboard/admin/etablissement/[id]/clases-table";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {CreateClasseForm} from "@/components/dashboard/admin/etablissement/[id]/create-classe-form";

type Classe = {
    id: string
    nom: string
}

type User = {
    id: string
    name: string | null
    email: string | null
}

type Etablissement = {
    id: string
    nom: string
    sousDomaine: string
    classes: Classe[]
    users: User[]
}
interface EtablissementViewProps {
    etablissements: Etablissement
}

const classeSchema = z.object({
    nom: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
    sousDomaine: z
        .string()
        .min(2, { message: "Le sous-domaine doit contenir au moins 2 caractères" })
        .regex(/^[a-z0-9-]+$/, {
            message: "Le sous-domaine ne peut contenir que des lettres minuscules, des chiffres et des tirets",
        }),
})
export function EtablissementsIdView({ etablissements }: EtablissementViewProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("overview")
    const [isAddClasseOpen, setIsAddClasseOpen] = useState(false)
    const [classes, setClasses] = useState<Classe[]>(etablissements.classes)

// Fonction pour rafraîchir les classes après ajout
    const refreshClasses = async () => {
        try {
            const response = await fetch(`/api/admin/etablissement/${etablissements.id}/classes`)
            if (response.ok) {
                const data = await response.json()
                setClasses(data)
            }
        } catch (error) {
            console.error("Erreur lors du rafraîchissement des classes:", error)
        }
    }

    return (
        <div className="flex-1 flex flex-col">
            {/* Header */}
            <header className="border-b border-[#f5f0e8] bg-white p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <SidebarTrigger/>
                        <h1 className="text-xl font-bold">Etablissements : {etablissements.nom}</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"/>
                            <input
                                type="text"
                                placeholder="Rechercher un établissements..."
                                className="w-64 rounded-lg border border-[#f5f0e8] bg-white py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#c83e3e]"
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-6">
                <div className="space-y-6">
                    <div className="w-full">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                            <div className="flex items-center justify-between">
                                <TabsList className="bg-[#f5f0e8]/50">
                                    <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                                    <TabsTrigger value="classes">Classes</TabsTrigger>
                                    <TabsTrigger value="calendar">Calendrier</TabsTrigger>
                                    <TabsTrigger value="reports">Rapports</TabsTrigger>
                                </TabsList>

                                <div className="hidden md:flex items-center gap-2">
                                    <Button variant="outline" size="sm" className="gap-1">
                                        <FileText className="h-4 w-4" />
                                        <span>Exporter</span>
                                    </Button>
                                    <Button size="sm" className="gap-1 bg-[#c83e3e] hover:bg-[#b53535]">
                                        <Download className="h-4 w-4" />
                                        <span>Télécharger le rapport</span>
                                    </Button>
                                </div>
                            </div>

                            <TabsContent value="overview" className="space-y-6 w-full">
                                overview
                            </TabsContent>

                            <TabsContent value="classes" className="w-full">
                                <div className="rounded-md border border-dashed border-[#f5f0e8] p-3">
                                    <div className="flex justify-end">
                                        <Button size="sm" className="gap-1 bg-[#c83e3e] hover:bg-[#b53535]" onClick={() => setIsAddClasseOpen(true)}>
                                            <Plus className="h-4 w-4 mr-2" />
                                            Ajouter une classe
                                        </Button>
                                    </div>
                                    <div className="mt-5">
                                        <ClassesTable etablissementId={etablissements.id} classes={etablissements.classes} />
                                        <CreateClasseForm
                                            etablissementId={etablissements.id}
                                            isOpen={isAddClasseOpen}
                                            onOpenChange={setIsAddClasseOpen}
                                            onSuccess={refreshClasses}
                                        />
                                    </div>
                                </div>

                            </TabsContent>

                            <TabsContent value="calendar" className="w-full">
                                <div
                                    className="flex h-[400px] w-full items-center justify-center rounded-md border border-dashed border-[#f5f0e8]">
                                    <div className="flex flex-col items-center gap-2 text-center">
                                        <Calendar className="h-10 w-10 text-[#c83e3e]/40"/>
                                        <div className="text-xl font-medium">Calendrier</div>
                                        <div className="text-sm text-gray-500">Cette section est en cours de
                                            développement
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="reports" className="w-full">
                                <div
                                    className="flex h-[400px] w-full items-center justify-center rounded-md border border-dashed border-[#f5f0e8]">
                                    <div className="flex flex-col items-center gap-2 text-center">
                                        <BarChart3 className="h-10 w-10 text-[#c83e3e]/40"/>
                                        <div className="text-xl font-medium">Rapports</div>
                                        <div className="text-sm text-gray-500">Cette section est en cours de
                                            développement
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </main>
            {/*classes*/}
            {/*<div className="mb-6">*/}
            {/*    <h2 className="text-xl font-semibold mb-2">Classes</h2>*/}
            {/*    <div className="flex justify-between items-center mb-2">*/}
            {/*        <p className="text-muted-foreground">Total: {etablissement.classes.length}</p>*/}
            {/*        <Button asChild size="sm">*/}
            {/*            <Link href={`/etablissement/${etablissement.id}/classes/new`}>*/}
            {/*                <Plus className="h-4 w-4 mr-2" />*/}
            {/*                Ajouter une classe*/}
            {/*            </Link>*/}
            {/*        </Button>*/}
            {/*    </div>*/}
            {/*    {etablissement.classes.length > 0 ? (*/}
            {/*        <ul className="space-y-2">*/}
            {/*            {etablissement.classes.map((classe) => (*/}
            {/*                <li key={classe.id} className="p-3 border rounded-md">*/}
            {/*                    {classe.nom}*/}
            {/*                </li>*/}
            {/*            ))}*/}
            {/*        </ul>*/}
            {/*    ) : (*/}
            {/*        <p className="text-muted-foreground">Aucune classe trouvée</p>*/}
            {/*    )}*/}
            {/*</div>*/}

            {/*user*/}
            {/*<div>*/}
            {/*    <h2 className="text-xl font-semibold mb-2">Utilisateurs</h2>*/}
            {/*    <div className="flex justify-between items-center mb-2">*/}
            {/*        <p className="text-muted-foreground">Total: {etablissement.users.length}</p>*/}
            {/*        <Button asChild size="sm">*/}
            {/*            <Link href={`/etablissement/${etablissement.id}/users/new`}>*/}
            {/*                <Plus className="h-4 w-4 mr-2" />*/}
            {/*                Ajouter un utilisateur*/}
            {/*            </Link>*/}
            {/*        </Button>*/}
            {/*    </div>*/}
            {/*    {etablissement.users.length > 0 ? (*/}
            {/*        <ul className="space-y-2">*/}
            {/*            {etablissement.users.map((user) => (*/}
            {/*                <li key={user.id} className="p-3 border rounded-md">*/}
            {/*                    {user.name || "Sans nom"} - {user.email}*/}
            {/*                </li>*/}
            {/*            ))}*/}
            {/*        </ul>*/}
            {/*    ) : (*/}
            {/*        <p className="text-muted-foreground">Aucun utilisateur trouvé</p>*/}
            {/*    )}*/}
            {/*</div>*/}
        </div>)
}

