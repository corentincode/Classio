// app/etablissement/[id]/page.tsx
import {prisma} from '@/lib/prisma'
import { notFound } from 'next/navigation'
import React from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Plus} from "lucide-react";
import {EtablissementsIdView} from "@/components/dashboard/admin/etablissement/[id]/etablissements-id-view";


type Etablissement = {
    id: string
    nom: string
    sousDomaine: string
    classes: Classe[]
    users: User[]
}

type Classe = {
    id: string
    nom: string
}

type User = {
    id: string
    name: string | null
    email: string | null
}

export default async function EtablissementIdPage({ params }: { params: { id: string } }) {
    const { id } = params

    const etablissements: Etablissement | null = await prisma.etablissement.findUnique({
        where: { id: id },
        include: {
            classes: true,
            users: true,
        },
    })

    if (!etablissements) {
        notFound()
    }

    return <EtablissementsIdView etablissements={etablissements}/>
}
