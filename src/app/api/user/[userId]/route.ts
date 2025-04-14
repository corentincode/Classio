import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import {Role} from "@prisma/client";

export async function GET(request: Request) {
    // Vérifier l'authentification
    const session = await auth()
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
        return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Vérifier si l'utilisateur est SUPER_ADMIN ou s'il demande ses propres informations
    const currentUser = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { role: true }
    })

    if (!currentUser) {
        return NextResponse.json({ error: "Current user not found" }, { status: 404 })
    }

    const isSuperAdmin = currentUser.role === Role.SUPER_ADMIN
    const isOwnInfo = session.user.id === userId

    if (!isSuperAdmin && !isOwnInfo) {
        return NextResponse.json({ error: "Unauthorized to access this user's information" }, { status: 403 })
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                role: true,
                etablissementId: true,
            }
        })

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        return NextResponse.json(user)
    } catch (error) {
        console.error("Error fetching user:", error)
        return NextResponse.json({ error: "Database error" }, { status: 500 })
    }
}