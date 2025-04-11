import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string; }> }, // Correction du type de params
) {
    try {
        const session = await auth()

        // Vous pouvez commenter cette vérification pendant le développement si nécessaire
        // if (!session?.user) {
        //   return NextResponse.json({ message: "Non autorisé" }, { status: 401 })
        // }

        // On attend que params soit résolu
        const resolvedParams = await params;
        const { id: etablissementId } = resolvedParams;

        console.log("Recherche de l'établissement avec ID:", etablissementId)

        // Récupérer les données de l'établissement depuis la base de données
        const etablissement = await prisma.etablissement.findUnique({
            where: { id: etablissementId }, // Correction: utiliser id et non etablissementId
            select: {
                id: true,
                nom: true,
                sousDomaine: true,
                adresse: true,
                ville: true,
                codePostal: true,

                // Vous pouvez ajouter d'autres champs selon votre modèle de données
            },
        })

        if (!etablissement) {
            console.log("Établissement non trouvé pour l'ID:", etablissementId)
            return NextResponse.json({ error: "Établissement non trouvé" }, { status: 404 })
        }

        console.log("Établissement trouvé:", etablissement.nom)

        // Récupérer des statistiques supplémentaires
        // Note: Adaptez ces requêtes selon votre modèle de données
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
                presence: 94.2, // Exemple de valeur statique, à remplacer par une vraie donnée
                messages: 128, // Exemple de valeur statique, à remplacer par une vraie donnée
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
