import { type NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"

export async function GET(req: NextRequest) {
    const headersList = headers()
    const etablissementId = headersList.get("x-etablissement-id")

    console.log("[API] current-etablissement - Headers:", Object.fromEntries(headersList.entries()))
    console.log("[API] current-etablissement - Establishment ID from headers:", etablissementId)

    if (!etablissementId) {
        console.log("[API] current-etablissement - No establishment ID found in headers")
        return NextResponse.json({ error: "Établissement non trouvé" }, { status: 404 })
    }

    const mainDomain = process.env.NEXT_PUBLIC_MAIN_DOMAIN || "julianmayer.fr"

    try {
        console.log(`[API] current-etablissement - Fetching data for ID: ${etablissementId}`)

        // Use the existing API route to fetch establishment data
        const etablissementResponse = await fetch(
            `https://${mainDomain}/api/etablissement/${etablissementId}?_middleware=true`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                cache: "no-store",
            },
        )

        if (!etablissementResponse.ok) {
            console.error(`[API] current-etablissement - Error fetching data: ${etablissementResponse.status}`)
            return NextResponse.json(
                { error: "Erreur lors de la récupération des données de l'établissement" },
                { status: etablissementResponse.status },
            )
        }

        const etablissementData = await etablissementResponse.json()
        console.log("[API] current-etablissement - Data retrieved successfully")

        return NextResponse.json(etablissementData)
    } catch (error) {
        console.error("[API] current-etablissement - Error:", error)
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
    }
}
