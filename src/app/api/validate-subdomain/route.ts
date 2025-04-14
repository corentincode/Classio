import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const domain = searchParams.get("domain")
    const isMiddlewareRequest = searchParams.get("source") === "middleware"

    // Get request headers to check if it's an internal request
    const headersList = headers()
    const referer = headersList.get("referer") || ""
    const host = headersList.get("host") || ""

    // Check if this is a request from our own middleware
    const isInternalRequest = isMiddlewareRequest &&
        (referer.includes(host) || referer === "" || !referer)

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
        if (isInternalRequest) {
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

        // Get the current user with their role
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { role: true, etablissementId: true }
        })

        if (!user) {
            return NextResponse.json({ valid: false, error: "User not found" }, { status: 401 })
        }

        // Check if user is SUPER_ADMIN or belongs to the establishment
        const isSuperAdmin = user.role === "SUPER_ADMIN"
        const belongsToEstablishment = user.etablissementId === etablissement.id

        if (!isSuperAdmin && !belongsToEstablishment) {
            return NextResponse.json({
                valid: false,
                error: "You don't have permission to access this establishment"
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