import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import {auth} from "@/lib/auth";
import {prisma} from "@/lib/prisma";

// Schéma de validation pour l'ajout d'un utilisateur à une classe
const addUserToClasseSchema = z.object({
    userId: z.string({
        required_error: "L'ID de l'utilisateur est requis",
    }),
    roleInClass: z.enum(["ELEVE", "PROF", "SURVEILLANT", "SECRETAIRE"], {
        required_error: "Le rôle dans la classe est requis",
    }),
})



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

export async function POST(request: NextRequest,{ params }: { params:  Promise<{ id: string; classeId: string }> }) {
    try {

        // Vérifier l'authentification et les autorisations
        const session = await auth()

        if (!session?.user) {
            return NextResponse.json({ message: "Non autorisé" }, { status: 401 })
        }

        // On attend que params soit résolu
        const resolvedParams = await params;
        const { id: etablissementId, classeId } = resolvedParams;


        if (!session?.user) {
            return NextResponse.json({ message: "Non autorisé" }, { status: 401 })
        }

        // Vérifier si l'utilisateur est un SUPER_ADMIN ou ADMIN
        const currentUser = await prisma.user.findUnique({
            where: { email: session.user.email as string },
            select: { role: true, etablissementId: true },
        })

        if (!currentUser || (currentUser.role !== "SUPER_ADMIN" && currentUser.role !== "ADMIN")) {
            return NextResponse.json({ message: "Accès refusé" }, { status: 403 })
        }

        // Vérifier que l'ADMIN ne peut ajouter des utilisateurs que pour son établissement
        if (currentUser.role === "ADMIN" && currentUser.etablissementId !== etablissementId) {
            return NextResponse.json(
                { message: "Non autorisé. Vous ne pouvez gérer que les utilisateurs de votre établissement." },
                { status: 403 },
            )
        }

        // Valider les données de la requête
        const body = await request.json()
        const validationResult = addUserToClasseSchema.safeParse(body)

        if (!validationResult.success) {
            return NextResponse.json(
                { message: "Données invalides", errors: validationResult.error.format() },
                { status: 400 },
            )
        }

        const { userId, roleInClass } = validationResult.data

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

        // Vérifier si l'utilisateur existe et appartient à l'établissement
        const userToAdd = await prisma.user.findFirst({
            where: {
                id: userId,
                etablissementId,
            },
        })

        if (!userToAdd) {
            return NextResponse.json(
                { message: "Utilisateur non trouvé ou n'appartient pas à cet établissement" },
                { status: 404 },
            )
        }

        // Vérifier si l'association existe déjà
        const existingAssociation = await prisma.classeUser.findUnique({
            where: {
                classeId_userId: {
                    classeId,
                    userId,
                },
            },
        })

        if (existingAssociation) {
            return NextResponse.json({ message: "Cet utilisateur est déjà associé à cette classe" }, { status: 409 })
        }

        // Créer l'association
        const classeUser = await prisma.classeUser.create({
            data: {
                classeId,
                userId,
                roleInClass,
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

        // Formater la réponse
        const formattedResponse = {
            id: classeUser.user.id,
            name: classeUser.user.name,
            firstName: classeUser.user.firstName,
            email: classeUser.user.email,
            image: classeUser.user.image,
            globalRole: classeUser.user.role,
            roleInClass: classeUser.roleInClass,
            classeUserId: classeUser.id,
        }

        return NextResponse.json(formattedResponse, { status: 201 })
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur à la classe:", error)
        return NextResponse.json(
            { message: "Une erreur est survenue lors de l'ajout de l'utilisateur à la classe" },
            { status: 500 },
        )
    }
}

