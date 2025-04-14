import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const domain = searchParams.get("domain")
    if (!domain) {
        return NextResponse.json({ valid: false, error: "Domain parameter is required" }, { status: 400 })
    }

    try {
        const etablissement = await prisma.etablissement.findUnique({
            where: {
                sousDomaine: domain,
            },
            select: { id: true },
        })

        const isValid = !!etablissement
        console.log(
            "Résultat de la validation en base de données:",
            isValid,
            etablissement ? `ID: ${etablissement.id}` : "Non trouvé",
        )

        return NextResponse.json({
            valid: isValid,
            etablissementId: etablissement ? etablissement.id : null,
        })
    } catch (error) {
        console.error("Error validating subdomain:", error)
        return NextResponse.json({ valid: false, error: "Database error" }, { status: 500 })
    }
}
