"use client"

import { useState, useEffect } from "react"

export function useLocalStorageEtablissement() {
    const [etablissementId, setEtablissementId] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Récupérer l'ID de l'établissement depuis le localStorage
        const id = localStorage.getItem("etablissement_id")
        console.log("etablissementId+ id"+id)
        setEtablissementId(id)
        setIsLoading(false)

        // Vérifier si un cookie etablissement_id existe et le synchroniser avec localStorage
        const cookieValue = document.cookie
            .split("; ")
            .find((row) => row.startsWith("etablissement_id="))
            ?.split("=")[1]

        if (cookieValue && cookieValue !== id) {
            localStorage.setItem("etablissement_id", cookieValue)
            setEtablissementId(cookieValue)
        }
    }, [])

    // Fonction pour mettre à jour l'ID de l'établissement dans le localStorage
    const updateEtablissementId = (id: string) => {
        localStorage.setItem("etablissement_id", id)
        setEtablissementId(id)
    }

    return { etablissementId, isLoading, updateEtablissementId }
}
