import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"; // Importez auth au lieu de getServerSession
import { authConfig } from "@/lib/auth"

export async function POST(request: Request) {
    try {
        // Vérifier si l'utilisateur est un administrateur
        const session = await auth()

        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ message: "Non autorisé" }, { status: 403 })
        }

        const { name, email, password, role } = await request.json()

        // Validation des champs
        if (!name || !email || !password) {
            return NextResponse.json({ message: "Tous les champs sont requis" }, { status: 400 })
        }

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json({ message: "Cet email est déjà utilisé" }, { status: 400 })
        }

        // Hachage du mot de passe
        const hashedPassword = await hash(password, 10)

        // Création de l'utilisateur
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: role === "ADMIN" ? "ADMIN" : "USER",
            },
        })

        // Ne pas renvoyer le mot de passe
        const { password: _, ...userWithoutPassword } = user

        return NextResponse.json(
            {
                message: "Utilisateur créé avec succès",
                user: userWithoutPassword,
            },
            { status: 201 },
        )
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur:", error)
        return NextResponse.json(
            { message: "Une erreur s'est produite lors de la création de l'utilisateur" },
            { status: 500 },
        )
    }
}

