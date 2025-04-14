import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET(request: Request) {
    console.log("API /user route called with params:", request.url)

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const isMiddlewareRequest = searchParams.get("_middleware") === "true"

    console.log("userId:", userId, "isMiddlewareRequest:", isMiddlewareRequest)

    if (!userId) {
        return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // For middleware requests, bypass authentication
    if (isMiddlewareRequest) {
        console.log("Middleware request detected, bypassing auth")
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

    // For regular requests, check authentication
    const session = await auth()

    // Check if user is authenticated
    if (!session || !session.user) {
        console.log("Authentication failed: No session or user")
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        // Vérifier si l'utilisateur est SUPER_ADMIN ou s'il demande ses propres informations
        const currentUser = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { role: true }
        })

        if (!currentUser) {
            return NextResponse.json({ error: "Current user not found" }, { status: 404 })
        }

        const isSuperAdmin = currentUser.role === "SUPER_ADMIN"
        const isOwnInfo = session.user.id === userId

        if (!isSuperAdmin && !isOwnInfo) {
            return NextResponse.json({ error: "Unauthorized to access this user's information" }, { status: 403 })
        }

        // Find the user by ID
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                role: true,
                etablissementId: true,
                firstName: true,
                name: true,
                email: true,
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