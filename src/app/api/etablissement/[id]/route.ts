import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string; }> },
) {
    try {
        // Check if this is a middleware request
        const isMiddlewareRequest = request.nextUrl.searchParams.get("_middleware") === "true"

        // On attend que params soit résolu
        const resolvedParams = await params;
        const { id: etablissementId } = resolvedParams;

        console.log("Recherche de l'établissement avec ID:", etablissementId)

        // For middleware requests, skip authentication
        if (!isMiddlewareRequest) {
            const session = await auth()

            if (!session?.user) {
                return NextResponse.json({ message: "Non autorisé" }, { status: 401 })
            }

            // Check if user has permission to access this establishment
            const user = await prisma.user.findUnique({
                where: { id: session.user.id },
                select: { role: true, etablissementId: true }
            })

            if (!user) {
                return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 })
            }

            const isSuperAdmin = user.role === "SUPER_ADMIN"
            const belongsToEstablishment = user.etablissementId === etablissementId

            if (!isSuperAdmin && !belongsToEstablishment) {
                return NextResponse.json({
                    error: "Vous n'avez pas la permission d'accéder à cet établissement"
                }, { status: 403 })
            }
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
            console.log("Établissement non trouvé pour l'ID:", etablissementId)
            return NextResponse.json({ error: "Établissement non trouvé" }, { status: 404 })
        }

        console.log("Établissement trouvé:", etablissement.nom)

        // For middleware requests, return just the basic establishment info
        if (isMiddlewareRequest) {
            return NextResponse.json(etablissement)
        }

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

        return NextResponse.json(etablissementWithStats)
    } catch (error) {
        console.error("Erreur lors de la récupération de l'établissement:", error)
        return NextResponse.json(
            {
                error: "Erreur serveur",
                message: error instanceof Error ? error.message : "Erreur inconnue",
            },
            { status: 500 },
        )
    }
}