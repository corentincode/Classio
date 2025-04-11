import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import {auth} from "@/lib/auth";

// Route pour récupérer un ClasseUser spécifique
export async function GET(request: NextRequest,{ params }: { params:  Promise<{ id: string; classeId: string , classeUserId: string}> }) {
    try {
        const session = await auth()

        if (!session?.user) {
            return NextResponse.json({ message: "Non autorisé" }, { status: 401 })
        }

        // On attend que params soit résolu
        const resolvedParams = await params;
        const { id: etablissementId, classeId, classeUserId } = resolvedParams;


        if (!classeUserId) {
            return NextResponse.json({ message: "L'ID ClasseUser est requis" }, { status: 400 })
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

        // Récupérer le ClasseUser spécifique
        const classeUser = await prisma.classeUser.findUnique({
            where: {
                id: classeUserId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        firstName: true,
                        email: true,
                        image: true,
                        role: true,
                    },
                },
            },
        })

        if (!classeUser) {
            return NextResponse.json({ message: "Association utilisateur-classe non trouvée" }, { status: 404 })
        }

        // Vérifier que ce ClasseUser correspond bien à la classe spécifiée
        if (classeUser.classeId !== classeId) {
            return NextResponse.json({ message: "L'association ne correspond pas à la classe spécifiée" }, { status: 403 })
        }

        return NextResponse.json({
            id: classeUser.id,
            userId: classeUser.userId,
            classeId: classeUser.classeId,
            roleInClass: classeUser.roleInClass,
            user: classeUser.user,
        })
    } catch (error) {
        console.error("Erreur lors de la récupération du ClasseUser:", error)
        return NextResponse.json({ message: "Une erreur est survenue lors de la récupération" }, { status: 500 })
    }
}

