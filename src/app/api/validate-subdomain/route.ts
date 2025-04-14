import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const domain = searchParams.get("domain")
    const isMiddlewareRequest = searchParams.get("_middleware") === "true"

    if (!domain) {
        return NextResponse.json({ valid: false, error: "Domain parameter is required" }, { status: 400 })
    }

    try {
        // Find the establishment by subdomain
        const etablissement = await prisma.etablissement.findUnique({
            where: {
                sousDomaine: domain,
            },
            select: { id: true },
        })

        // For middleware requests, just return if the subdomain is valid
        if (isMiddlewareRequest) {
            return NextResponse.json({
                valid: !!etablissement,
                etablissementId: etablissement ? etablissement.id : null,
            })
        }

        // For regular requests, check authentication and permissions
        const session = await auth()

        // Check if user is authenticated
        if (!session || !session.user) {
            return NextResponse.json({ valid: false, error: "Unauthorized" }, { status: 401 })
        }

        if (!etablissement) {
            return NextResponse.json({ valid: false, error: "Establishment not found" })
        }

        // Get the current user with their role and establishment
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: {
                role: true,
                etablissementId: true
            }
        })

        if (!user) {
            return NextResponse.json({ valid: false, error: "User not found" }, { status: 401 })
        }

        // Check if user is SUPER_ADMIN or belongs to the establishment
        const isSuperAdmin = user.role === "SUPER_ADMIN"
        const belongsToEstablishment = user.etablissementId === etablissement.id

        if (!isSuperAdmin && !belongsToEstablishment) {
            // User doesn't belong to this establishment
            let userEstablishment = null;

            // Only try to fetch the user's establishment if they have one
            if (user.etablissementId) {
                userEstablishment = await prisma.etablissement.findUnique({
                    where: { id: user.etablissementId },
                    select: {
                        id: true,
                        sousDomaine: true
                    }
                })
            }

            return NextResponse.json({
                valid: false,
                error: "You don't have permission to access this establishment",
                shouldRedirect: !!userEstablishment,
                userEstablishment: userEstablishment
            }, { status: 403 })
        }

        // User has permission, return valid response
        return NextResponse.json({
            valid: true,
            etablissementId: etablissement.id,
        })
    } catch (error) {
        console.error("Error validating subdomain:", error)
        return NextResponse.json({ valid: false, error: "Database error" }, { status: 500 })
    }
}