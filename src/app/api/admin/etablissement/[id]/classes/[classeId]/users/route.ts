import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import {auth} from "@/lib/auth";
import {prisma} from "@/lib/prisma";

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

export async function GET(request: NextRequest,{ params }: { params:  Promise<{ id: string; classeId: string }> }) {
    try {

        // Vérifier l'authentification et les autorisations
        const session = await auth()

        if (!session?.user) {
            return NextResponse.json({ message: "Non autorisé" }, { status: 401 })
        }

        // On attend que params soit résolu
        const resolvedParams = await params;
        const { id: etablissementId, classeId } = resolvedParams;

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
                    { message: "Non autorisé. Vous ne pouvez consulter que les données de votre établissement." },
                    { status: 403 }
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
                { status: 404 }
            )
        }

        // Récupérer les utilisateurs associés à la classe avec leurs rôles
        const classeUsers = await prisma.classeUser.findMany({
            where: {
                classeId,
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
            orderBy: [
                { roleInClass: 'asc' },
                { user: { name: 'asc' } }
            ],
        })

        // Formater les données pour une meilleure lisibilité
        const formattedUsers = classeUsers.map(cu => ({
            id: cu.user.id,
            name: cu.user.name,
            firstName: cu.user.firstName,
            email: cu.user.email,
            image: cu.user.image,
            globalRole: cu.user.role,
            roleInClass: cu.roleInClass,
            classeUserId: cu.id
        }))
        console.log(formattedUsers)
        return NextResponse.json(formattedUsers)
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs de la classe:", error)
        return NextResponse.json(
            { message: "Une erreur est survenue lors de la récupération des utilisateurs" },
            { status: 500 }
        )
    }
}
