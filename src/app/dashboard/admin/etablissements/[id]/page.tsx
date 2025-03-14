// app/etablissement/[id]/page.tsx
import {prisma} from '@/lib/prisma'
import { notFound } from 'next/navigation'
import React from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Plus} from "lucide-react";
import {EtablissementsIdView} from "@/components/dashboard/admin/etablissement/[id]/etablissements-id-view";
import type {NextRequest} from "next/server";


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

export default async function EtablissementIdPage({ params }: { params:  Promise<{ id: string;  }> }) {


    const resolvedParams = await params
    const { id: etablissementId } = resolvedParams

    const etablissements: Etablissement | null = await prisma.etablissement.findUnique({
        where: { id: etablissementId },
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
