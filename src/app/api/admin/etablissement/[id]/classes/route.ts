import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import {auth} from "@/lib/auth";
import {Role} from "@prisma/client";

// Schéma de validation pour la création d'une classe
const classeSchema = z.object({
    nom: z.string().min(2),
})

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        // Vérifier l'authentification et les autorisations
        const session = await auth()

        if (!session?.user) {
            return NextResponse.json({ message: "Non autorisé" }, { status: 401 })
        }

        // Vérifier si l'utilisateur est un SUPER_ADMIN ou ADMIN
        const user = await prisma.user.findUnique({
            where: { email: session.user.email as string },
            select: { role: true },
        })

        if (!user || (user.role !== Role.SUPER_ADMIN && user.role !== Role.ADMIN)) {
            return NextResponse.json({ message: "Accès refusé" }, { status: 403 })
        }

        // Récupérer l'ID de l'établissement
        const etablissementId = params.id

        // Vérifier si l'établissement existe
        const etablissement = await prisma.etablissement.findUnique({
            where: { id: etablissementId },
        })

        if (!etablissement) {
            return NextResponse.json({ message: "Établissement non trouvé" }, { status: 404 })
        }

        // Valider les données de la requête
        const body = await request.json()
        const validationResult = classeSchema.safeParse(body)

        if (!validationResult.success) {
            return NextResponse.json(
                { message: "Données invalides", errors: validationResult.error.format() },
                { status: 400 },
            )
        }

        // Créer la classe
        const { nom } = validationResult.data

        const classe = await prisma.classe.create({
            data: {
                nom,
                etablissementId,
            },
        })

        return NextResponse.json(classe, { status: 201 })
    } catch (error) {
        console.error("Erreur lors de la création de la classe:", error)
        return NextResponse.json({ message: "Une erreur est survenue lors de la création de la classe" }, { status: 500 })
    }
}

// Route pour récupérer toutes les classes d'un établissement
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string; classeId: string }> }) {
    try {
        const resolvedParams = await params
        const { id: etablissementId, classeId } = resolvedParams

        // Vérifier l'authentification et les autorisations
        const session = await auth()

        if (!session?.user) {
            return NextResponse.json({ message: "Non autorisé" }, { status: 401 })
        }

        return NextResponse.json([])
    } catch (error) {
        console.error("Erreur:", error)
        return NextResponse.json({ message: "Une erreur est survenue" }, { status: 500 })
    }
}