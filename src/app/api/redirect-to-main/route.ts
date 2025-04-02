import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const hostname = req.headers.get("host") || ""

    // Extraire le domaine principal
    let mainDomain

    if (hostname.includes('localhost')) {
        // Pour localhost, on garde le port
        const port = hostname.split(':')[1] || '3000'
        mainDomain = `http://localhost:${port}`
    } else {
        // Pour les domaines de production
        // Extraire le domaine principal (sans le sous-domaine)
        const domainParts = hostname.split('.')
        domainParts.shift() // Enlever le sous-domaine
        mainDomain = `https://${domainParts.join('.')}`
    }

    console.log("Redirection API vers le domaine principal:", mainDomain)

    // Rediriger vers le domaine principal
    return NextResponse.redirect(mainDomain)
}