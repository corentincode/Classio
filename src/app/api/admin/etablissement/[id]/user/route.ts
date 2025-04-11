import {NextRequest, NextResponse} from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { auth } from "@/lib/auth"
import { Role } from "@prisma/client"

// Schéma de validation pour la création d'un utilisateur
const createUserSchema = z.object({
    email: z.string().email("L'email doit être valide"),
    firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    role: z.enum(["SUPER_ADMIN", "ADMIN", "PROF", "ELEVE"]).default("ELEVE"),
    classeId: z.string().optional(),
    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    roleInClass: z.enum(["ELEVE", "PROF", "SURVEILLANT", "SECRETAIRE"]).optional(),
})

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string; }> }) {
    try {
        const session = await auth()

        // Vérifier si l'utilisateur est authentifié
        if (!session?.user) {
            return NextResponse.json({ message: "Non autorisé" }, { status: 401 })
        }

        const resolvedParams = await params
        const { id: etablissementId } = resolvedParams

        // Récupérer le rôle de l'utilisateur connecté
        const currentUser = await prisma.user.findUnique({
            where: { email: session.user.email as string },
            select: { role: true, etablissementId: true },
        })

        if (!currentUser) {
            return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 })
        }

        // Définir les conditions de recherche en fonction du rôle et de l'établissement
        let whereCondition: any = {}

        if (currentUser.role === "SUPER_ADMIN") {
            // Le SUPER_ADMIN peut voir tous les utilisateurs, filtrer par établissement si spécifié
            whereCondition = { etablissementId }
        } else if (currentUser.role === "ADMIN") {
            // L'ADMIN ne peut voir que les utilisateurs de son établissement
            if (currentUser.etablissementId !== etablissementId) {
                return NextResponse.json({ message: "Accès refusé" }, { status: 403 })
            }
            whereCondition = { etablissementId }
        } else {
            // Les autres rôles ne peuvent pas accéder à cette API
            return NextResponse.json({ message: "Non autorisé" }, { status: 403 })
        }

        const users = await prisma.user.findMany({
            where: whereCondition,
            select: {
                id: true,
                name: true,
                firstName: true,
                email: true,
                role: true,
                image: true,
            },
            orderBy: {
                name: "asc",
            },
        })

        return NextResponse.json(users)
    } catch (error) {
        console.error("Error fetching users:", error)
        return NextResponse.json(
            { message: "Une erreur est survenue lors de la récupération des utilisateurs" },
            { status: 500 },
        )
    }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string; }> }) {
    try {
        const session = await auth()

        // 🔥 Vérifier si l'utilisateur est bien authentifié
        if (!session?.user) {
            console.error("🔴 ERREUR : Tentative de création sans session")
            return NextResponse.json({ message: "Non autorisé" }, { status: 401 })
        }

        console.log("🟢 Session utilisateur :", session.user)

        // Vérifier si l'utilisateur est un SUPER_ADMIN ou ADMIN
        if (!session?.user?.role || (session.user.role !== Role.SUPER_ADMIN && session.user.role !== Role.ADMIN)) {
            return NextResponse.json(
                { message: "Non autorisé. Seuls les administrateurs peuvent créer des utilisateurs." },
                { status: 403 },
            )
        }


        const resolvedParams = await params
        const { id: etablissementId } = resolvedParams

        // Vérifier si l'établissement existe
        const etablissement = await prisma.etablissement.findUnique({
            where: { id: etablissementId },
        })

        if (!etablissement) {
            console.error("🔴 ERREUR : Établissement non trouvé - ID :", etablissementId)
            return NextResponse.json({ message: "Établissement non trouvé" }, { status: 404 })
        }

        // Vérifier que l'ADMIN ne peut créer des utilisateurs que pour son établissement
        if (session.user.role === Role.ADMIN && session.user?.etablissementId !== etablissementId) {
            console.error("🔴 ERREUR : Un ADMIN tente de créer un utilisateur pour un autre établissement")
            return NextResponse.json(
                { message: "Non autorisé. Vous ne pouvez créer des utilisateurs que pour votre établissement." },
                { status: 403 },
            )
        }

        const body = await request.json()
        console.log("🟢 Données reçues :", body)

        // Valider avec Zod
        const validationResult = createUserSchema.safeParse(body)

        if (!validationResult.success) {
            console.error("🔴 ERREUR DE VALIDATION :", validationResult.error.errors)
            return NextResponse.json(
                { message: "Données invalides", errors: validationResult.error.format() },
                { status: 400 },
            )
        }

        const validatedData = validationResult.data
        console.log("🟢 Données validées :", validatedData)

        // 🔥 Empêcher la création d'un ADMIN/SUPER_ADMIN par un ADMIN
        if (session.user.role === Role.ADMIN && (validatedData.role === "ADMIN" || validatedData.role === "SUPER_ADMIN")) {
            console.error("🔴 ERREUR : Un ADMIN ne peut pas créer un autre ADMIN")
            return NextResponse.json(
                { message: "Non autorisé. Vous ne pouvez pas créer d'administrateurs." },
                { status: 403 },
            )
        }

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await prisma.user.findUnique({
            where: { email: validatedData.email },
        })

        if (existingUser) {
            console.error("🔴 ERREUR : Utilisateur déjà existant", existingUser)
            return NextResponse.json({ message: "Un utilisateur avec cet email existe déjà" }, { status: 400 })
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(validatedData.password, 10)
        console.log("🟢 Mot de passe haché avec succès")

        // Préparer les données pour la création
        const userData: any = {
            email: validatedData.email,
            firstName: validatedData.firstName,
            name: validatedData.name,
            password: hashedPassword,
            role: validatedData.role,
            etablissementId,
        }

        // Créer l'utilisateur
        const user = await prisma.user.create({
            data: userData,
            select: {
                id: true,
                name: true,
                firstName: true,
                email: true,
                role: true,
                etablissementId: true,
            },
        })

        // Si classeId est fourni, créer l'association avec la classe
        let classeUser = null
        if (validatedData.classeId && validatedData.roleInClass) {
            classeUser = await prisma.classeUser.create({
                data: {
                    userId: user.id,
                    classeId: validatedData.classeId,
                    roleInClass: validatedData.roleInClass,
                },
                include: {
                    classe: {
                        select: {
                            id: true,
                            nom: true,
                        },
                    },
                },
            })
        }

        console.log("🟢 Utilisateur créé avec succès :", user)
        return NextResponse.json({ message: "Utilisateur créé avec succès", user }, { status: 201 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("🔴 ERREUR DE VALIDATION :", error.errors)
            return NextResponse.json({ message: "Données invalides", errors: error.errors }, { status: 400 })
        }

        console.error("🔴 ERREUR SERVEUR :", error)
        return NextResponse.json({ message: "Erreur interne du serveur" }, { status: 500 })
    }
}
