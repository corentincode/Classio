"use client"

import { useState, useEffect } from "react"
import Cookies from "js-cookie"

export function useEtablissementId() {
    const [etablissementId, setEtablissementId] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Récupérer l'ID de l'établissement depuis les cookies
        const id = Cookies.get("etablissement_id")
        console.log("etablissementId+ id"+id)

        setEtablissementId(id || null)
        setIsLoading(false)
    }, [])
    return { etablissementId, isLoading }
}
