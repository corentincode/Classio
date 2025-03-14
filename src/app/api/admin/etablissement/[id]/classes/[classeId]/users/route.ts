import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import {auth} from "@/lib/auth";

// Schéma de validation pour l'ajout d'un utilisateur à une classe
const addUserToClasseSchema = z.object({
    userId: z.string(),
    roleInClass: z.enum(["ELEVE", "PROF", "SURVEILLANT", "SECRETAIRE"]),
})

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string; classeId: string }> }) {
    try {
        // Résoudre la Promise pour obtenir les paramètres
        const resolvedParams = await params
        const { id: etablissementId, classeId } = resolvedParams

        // Vérifier l'authentification et les autorisations
        const session = await auth()

        if (!session?.user) {
            return NextResponse.json({ message: "Non autorisé" }, { status: 401 })
        }

        // Reste du code...
        // Utilisez etablissementId et classeId comme avant

        return NextResponse.json({ success: true }, { status: 201 })
    } catch (error) {
        console.error("Erreur:", error)
        return NextResponse.json({ message: "Une erreur est survenue" }, { status: 500 })
    }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string; classeId: string }> }) {
    try {
        // Résoudre la Promise pour obtenir les paramètres
        const resolvedParams = await params
        const { id: etablissementId, classeId } = resolvedParams

        // Reste du code...

        return NextResponse.json([])
    } catch (error) {
        console.error("Erreur:", error)
        return NextResponse.json({ message: "Une erreur est survenue" }, { status: 500 })
    }
}

