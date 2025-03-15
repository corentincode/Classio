import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import {auth} from "@/lib/auth";

// Route pour supprimer complètement un utilisateur
export async function DELETE(request: NextRequest,{ params }: { params:  Promise<{ id: string; userId: string}> }) {
    try {
        const session = await auth()

        if (!session?.user) {
            return NextResponse.json({ message: "Non autorisé" }, { status: 401 })
        }

        // On attend que params soit résolu
        const resolvedParams = await params;
        const { id: etablissementId, userId } = resolvedParams;

        if (!session?.user) {
            return NextResponse.json({ message: "Non autorisé" }, { status: 401 })
        }

        // Récupérer le rôle de l'utilisateur connecté
        const currentUser = await prisma.user.findUnique({
            where: { email: session.user.email as string },
            select: { role: true, etablissementId: true },
        })

        if (!currentUser) {
            return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 })
        }

        // Vérifier les autorisations en fonction du rôle
        if (currentUser.role !== "SUPER_ADMIN") {
            if (currentUser.role === "ADMIN" && currentUser.etablissementId !== etablissementId) {
                return NextResponse.json(
                    { message: "Non autorisé. Vous ne pouvez modifier que les données de votre établissement." },
                    { status: 403 },
                )
            }
        }

        // Vérifier si l'utilisateur à supprimer existe et appartient à l'établissement
        const userToDelete = await prisma.user.findFirst({
            where: {
                id: userId,
                etablissementId,
            },
        })

        if (!userToDelete) {
            return NextResponse.json(
                { message: "Utilisateur non trouvé ou n'appartient pas à cet établissement" },
                { status: 404 },
            )
        }

        // Empêcher la suppression d'un ADMIN ou SUPER_ADMIN par un ADMIN
        if (currentUser.role === "ADMIN" && (userToDelete.role === "ADMIN" || userToDelete.role === "SUPER_ADMIN")) {
            return NextResponse.json(
                { message: "Non autorisé. Vous ne pouvez pas supprimer un administrateur." },
                { status: 403 },
            )
        }

        // Utiliser une transaction pour supprimer toutes les associations de l'utilisateur avant de le supprimer
        await prisma.$transaction(async (prisma) => {
            // 1. Supprimer toutes les associations ClasseUser
            await prisma.classeUser.deleteMany({
                where: {
                    userId,
                },
            })

            // 2. Supprimer l'utilisateur
            await prisma.user.delete({
                where: {
                    id: userId,
                },
            })
        })

        return NextResponse.json({ message: "Utilisateur supprimé avec succès" }, { status: 200 })
    } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur:", error)
        return NextResponse.json({ message: "Une erreur est survenue lors de la suppression" }, { status: 500 })
    }
}

