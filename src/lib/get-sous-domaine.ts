/**
 * Extracts the subdomain from a hostname
 * @param hostname The full hostname (e.g., "jean-moulin.example.com" or "jean-moulin.localhost:3000")
 * @returns The subdomain or null if on the main domain
 */
export function getSousDomaine(hostname: string): string | null {
    // Define your main domain (without www)
    const MAIN_DOMAIN = process.env.NEXT_PUBLIC_MAIN_DOMAIN || "julianmayer.fr"
    const isDev = MAIN_DOMAIN.includes("localhost")

    // Remove port if present for comparison
    const host = hostname.split(":")[0]
    const mainDomainWithoutPort = MAIN_DOMAIN.split(":")[0]

    // Handle localhost development environment
    if (isDev) {
        // For localhost development with custom subdomains (e.g., jean-moulin.localhost:3000)
        const parts = hostname.split(".")
        if (parts.length > 1 && parts[parts.length - 1].includes("localhost")) {
            return parts[0]
        }
        return null
    }

    // Production environment
    if (host.endsWith(`.${mainDomainWithoutPort}`)) {
        // Extract the subdomain part
        const subdomain = host.replace(`.${mainDomainWithoutPort}`, "")
        return subdomain
    }

    // Return null if we're on the main domain
    return null
}
