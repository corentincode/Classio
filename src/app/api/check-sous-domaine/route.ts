import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const sousDomaine = searchParams.get("sousDomaine")

        if (!sousDomaine) {
            return NextResponse.json(
                { error: "Paramètre sousDomaine manquant" },
                { status: 400 }
            )
        }

        // Vérifier si le sous-domaine existe dans la base de données
        const etablissement = await prisma.etablissement.findUnique({
            where: {
                sousDomaine: sousDomaine
            },
            select: {
                id: true,
                nom: true
            }
        })

        if (!etablissement) {
            return NextResponse.json({ exists: false }, { status: 200 })
        }

        return NextResponse.json({
            exists: true,
            etablissementId: etablissement.id,
            etablissementNom: etablissement.nom
        }, { status: 200 })
    } catch (error) {
        console.error("Erreur lors de la vérification du sous-domaine:", error)
        return NextResponse.json(
            { error: "Erreur serveur" },
            { status: 500 }
        )
    }
}