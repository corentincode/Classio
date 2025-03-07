import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authConfig } from "@/lib/auth"

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        // Vérifier si l'utilisateur est un administrateur
        const session = await getServerSession(authConfig)

        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ message: "Non autorisé" }, { status: 403 })
        }

        const userId = params.id

        // Vérifier si l'utilisateur existe
        const user = await prisma.user.findUnique({
            where: { id: userId },
        })

        if (!user) {
            return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 })
        }

        // Empêcher la suppression de son propre compte
        if (user.id === session.user.id) {
            return NextResponse.json({ message: "Vous ne pouvez pas supprimer votre propre compte" }, { status: 400 })
        }

        // Supprimer l'utilisateur
        await prisma.user.delete({
            where: { id: userId },
        })

        return NextResponse.json({ message: "Utilisateur supprimé avec succès" }, { status: 200 })
    } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur:", error)
        return NextResponse.json(
            { message: "Une erreur s'est produite lors de la suppression de l'utilisateur" },
            { status: 500 },
        )
    }
}

