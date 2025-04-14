import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } },
) {
    const etablissementId = params.id
    const isMiddlewareRequest = request.nextUrl.searchParams.get("_middleware") === "true"

    console.log("[API] etablissement/[id]: Called with id:", etablissementId, "isMiddlewareRequest:", isMiddlewareRequest)

    try {
        // For middleware requests, skip authentication
        if (isMiddlewareRequest) {
            console.log("[API] etablissement/[id]: Middleware request, bypassing auth")

            // Récupérer les données de l'établissement depuis la base de données
            const etablissement = await prisma.etablissement.findUnique({
                where: { id: etablissementId },
                select: {
                    id: true,
                    nom: true,
                    sousDomaine: true,
                    adresse: true,
                    ville: true,
                    codePostal: true,
                },
            })

            if (!etablissement) {
                console.log("[API] etablissement/[id]: Établissement non trouvé")
                return NextResponse.json({ error: "Établissement non trouvé" }, { status: 404 })
            }

            console.log("[API] etablissement/[id]: Établissement trouvé:", etablissement.nom)
            return NextResponse.json(etablissement, { headers: { 'Cache-Control': 'no-store, max-age=0' } })
        }

        // For regular requests, check authentication
        const session = await auth()

        if (!session?.user) {
            console.log("[API] etablissement/[id]: User not authenticated")
            return NextResponse.json({ message: "Non autorisé" }, { status: 401 })
        }

        // Check if user has permission to access this establishment
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { role: true, etablissementId: true }
        })

        if (!user) {
            console.log("[API] etablissement/[id]: User not found")
            return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 })
        }

        const isSuperAdmin = user.role === "SUPER_ADMIN"
        const belongsToEstablishment = user.etablissementId === etablissementId

        console.log("[API] etablissement/[id]: User permissions - isSuperAdmin:", isSuperAdmin, "belongsToEstablishment:", belongsToEstablishment)

        if (!isSuperAdmin && !belongsToEstablishment) {
            console.log("[API] etablissement/[id]: User doesn't have permission")
            return NextResponse.json({
                error: "Vous n'avez pas la permission d'accéder à cet établissement"
            }, { status: 403 })
        }

        // Récupérer les données de l'établissement depuis la base de données
        const etablissement = await prisma.etablissement.findUnique({
            where: { id: etablissementId },
            select: {
                id: true,
                nom: true,
                sousDomaine: true,
                adresse: true,
                ville: true,
                codePostal: true,
            },
        })

        if (!etablissement) {
            console.log("[API] etablissement/[id]: Établissement non trouvé")
            return NextResponse.json({ error: "Établissement non trouvé" }, { status: 404 })
        }

        console.log("[API] etablissement/[id]: Établissement trouvé:", etablissement.nom)

        // For regular requests, include additional statistics
        const elevesCount = await prisma.user.count({
            where: {
                etablissementId: etablissementId,
                role: "ELEVE",
            },
        })

        const classesCount = await prisma.classe.count({
            where: {
                etablissementId: etablissementId,
            },
        })

        // Ajouter les statistiques à l'objet établissement
        const etablissementWithStats = {
            ...etablissement,
            stats: {
                eleves: elevesCount,
                classes: classesCount,
                presence: 94.2,
                messages: 128,
            },
        }

        return NextResponse.json(etablissementWithStats, { headers: { 'Cache-Control': 'no-store, max-age=0' } })
    } catch (error) {
        console.error("[API] etablissement/[id]: Error:", error)
        return NextResponse.json(
            {
                error: "Erreur serveur",
                message: error instanceof Error ? error.message : "Erreur inconnue",
            },
            { status: 500 }
        )
    }
}