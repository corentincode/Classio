import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import {auth} from "@/lib/auth";

export async function DELETE(
    request: NextRequest,
    { params }: { params:  Promise<{ id: string; classeId: string; classeUserId: string }> },
) {
    try {
        
        // Vérifier l'authentification et les autorisations
        const session = await auth()

        
        if (!session?.user) {
            return NextResponse.json({ message: "Non autorisé" }, { status: 401 })
        }

        // On attend que params soit résolu
        const resolvedParams = await params;
        const { id: etablissementId, classeId, classeUserId } = resolvedParams;

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

        // Vérifier si la classe existe et appartient à l'établissement
        const classe = await prisma.classe.findFirst({
            where: {
                id: classeId,
                etablissementId,
            },
        })

        if (!classe) {
            return NextResponse.json(
                { message: "Classe non trouvée ou n'appartient pas à cet établissement" },
                { status: 404 },
            )
        }

        // Vérifier si l'association existe
        const classeUser = await prisma.classeUser.findUnique({
            where: {
                id: classeUserId,
            },
        })

        if (!classeUser) {
            return NextResponse.json({ message: "Association utilisateur-classe non trouvée" }, { status: 404 })
        }

        // Vérifier que l'association concerne bien la classe spécifiée
        if (classeUser.classeId !== classeId) {
            return NextResponse.json({ message: "L'association ne correspond pas à la classe spécifiée" }, { status: 400 })
        }

        // Supprimer l'association
        await prisma.classeUser.delete({
            where: {
                id: classeUserId,
            },
        })

        return NextResponse.json({ message: "Utilisateur retiré de la classe avec succès" }, { status: 200 })
    } catch (error) {
        console.error("Erreur lors de la suppression de l'association utilisateur-classe:", error)
        return NextResponse.json({ message: "Une erreur est survenue lors de la suppression" }, { status: 500 })
    }
}

