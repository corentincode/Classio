import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { Role } from "@prisma/client"
export async function GET(request: Request) {
    // Get the current user session
    const session = await auth()

    // Check if user is authenticated
    if (!session || !session.user) {
        return NextResponse.json({ valid: false, error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const domain = searchParams.get("domain")
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

        if (!etablissement) {
            return NextResponse.json({ valid: false, error: "Establishment not found" })
        }

        // Get the current user with their role
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { role: true, etablissementId: true }
        })

        if (!user) {
            return NextResponse.json({ valid: false, error: "User not found" }, { status: 401 })
        }

        // Check if user is SUPER_ADMIN or belongs to the establishment
        const isSuperAdmin = user.role === Role.SUPER_ADMIN
        const belongsToEstablishment = user.etablissementId === etablissement.id

        if (!isSuperAdmin && !belongsToEstablishment) {
            return NextResponse.json({
                valid: false,
                error: "You don't have permission to access this establishment"
            }, { status: 403 })
        }
        console.log(belongsToEstablishment,isSuperAdmin )
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