"use client"

// Types
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {ArrowLeft, BookOpen, Edit, Mail, MapPin, Phone, School, Trash2, Users} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {SidebarTrigger} from "@/components/ui/sidebar";
import {Badge} from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {useState} from "react";

export type Classe = {
    id: string
    nom: string
}

interface ClasseDetailContentProps {
    classe: Classe
}

export default function ClasseDetailContent({ classe }: ClasseDetailContentProps) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    return (
        <div className="flex-1 flex flex-col space-y-6 ">
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
                            <h1 className="text-xl font-bold">{classe.nom}</h1>

                        </div>
                    </div>


                </div>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6">
                <div className="md:col-span-2 grid gap-y-2 grid-rows-3 h-100">

                    {/* Informations générales */}
                    <Card className="md:col-span-2 row-span-1 gap-2">
                        <CardHeader>
                            <CardTitle>Informations générales</CardTitle>
                            <CardDescription>Détails et coordonnées de l'établissement</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2 flex gap-3 items-center">
                                    <div className="text-sm font-medium text-muted-foreground m-0">Nom</div>
                                    <strong className="text-lg" >{classe.nom}</strong>
                                </div>
                            </div>
                        </CardContent>

                    </Card>
                    <Card className="md:col-span-2 row-span-2">
                        <CardHeader>
                            <CardTitle>Informations générales</CardTitle>
                            <CardDescription>Détails et coordonnées de l'établissement</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="text-sm font-medium text-muted-foreground">Nom</div>
                                    <div>{classe.nom}</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-sm font-medium text-muted-foreground">Sous-domaine</div>

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


                </div>
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
                                    <div className="text-2xl font-bold">-</div>
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
        </div>
    )
}
