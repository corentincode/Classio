import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import {auth} from "@/lib/auth";

export async function GET(request: NextRequest,{ params }: { params: Promise<{ id: string; classeId: string }> }) {
    try {
        // Attendre les paramètres avant de les utiliser
        const resolvedParams = await params;
        const { id: etablissementId, classeId } = resolvedParams;


        // Vérifier l'authentification
        const session = await auth()

        if (!session?.user) {
            return NextResponse.json({ message: "Non autorisé" }, { status: 401 })
        }

        console.log(
            "Récupération des utilisateurs disponibles pour la classe:",
            classeId,
            "de l'établissement:",
            etablissementId,
        )

        // Vérifier si la classe existe et appartient à l'établissement
        const classe = await prisma.classe.findFirst({
            where: {
                id: classeId,
                etablissementId,
            },
        })

        if (!classe) {
            console.error("Classe non trouvée:", { classeId, etablissementId })
            return NextResponse.json(
                { message: "Classe non trouvée ou n'appartient pas à cet établissement" },
                { status: 404 },
            )
        }

        // Récupérer les IDs des utilisateurs déjà associés à cette classe
        const existingUserIds = await prisma.classeUser.findMany({
            where: {
                classeId,
            },
            select: {
                userId: true,
            },
        })

        const userIdsInClasse = existingUserIds.map((item) => item.userId)
        console.log(`${userIdsInClasse.length} utilisateurs déjà dans la classe`)

        // Récupérer tous les utilisateurs de l'établissement qui ne sont pas dans cette classe
        const availableUsers = await prisma.user.findMany({
            where: {
                etablissementId,
                id: {
                    notIn: userIdsInClasse.length > 0 ? userIdsInClasse : ["dummy-id"], // Éviter une erreur si le tableau est vide
                },
            },
            select: {
                id: true,
                name: true,
                firstName: true,
                email: true,
                image: true,
                role: true,
            },
            orderBy: {
                name: "asc",
            },
        })

        console.log(`Trouvé ${availableUsers.length} utilisateurs disponibles pour la classe ${classeId}`)

        return NextResponse.json(availableUsers)
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs disponibles:", error)
        return NextResponse.json(
            { message: "Une erreur est survenue lors de la récupération des utilisateurs" },
            { status: 500 },
        )
    }
}

