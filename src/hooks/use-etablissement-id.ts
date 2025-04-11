"use client"

import { useState, useEffect } from "react"
import { useLocalStorageEtablissement } from "./use-local-storage-etablissement"

// Type pour les données de l'établissement
export interface Etablissement {
    id: string
    nom: string
    sousDomaine: string
    adresse?: string
    ville?: string
    codePostal?: string
    telephone?: string
    email?: string
    logo?: string
    stats?: {
        eleves: number
        classes: number
        presence: number
        messages: number
    }
}

export function useEtablissementId() {
    const { etablissementId, isLoading: isLoadingId } = useLocalStorageEtablissement()
    const [etablissement, setEtablissement] = useState<Etablissement | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        // Si l'ID n'est pas encore chargé ou n'existe pas, ne rien faire
        if (isLoadingId || !etablissementId) {
            setIsLoading(false)
            return
        }

        const fetchEtablissement = async () => {
            try {
                setIsLoading(true)

                // Vérifier si les données sont déjà en cache dans le localStorage
                const cachedData = localStorage.getItem(`etablissement_data_${etablissementId}`)
                const cacheTimestamp = localStorage.getItem(`etablissement_data_timestamp_${etablissementId}`)

                // Si nous avons des données en cache et qu'elles datent de moins d'une heure
                if (cachedData && cacheTimestamp) {
                    const timestamp = Number.parseInt(cacheTimestamp, 10)
                    const now = Date.now()
                    const oneHour = 60 * 60 * 1000

                    if (now - timestamp < oneHour) {
                        setEtablissement(JSON.parse(cachedData))
                        setIsLoading(false)
                        return
                    }
                }

                // Sinon, récupérer les données depuis l'API
                const response = await fetch(`/api/etablissements/${etablissementId}`)

                if (!response.ok) {
                    throw new Error(`Erreur lors de la récupération des données: ${response.status}`)
                }

                const data = await response.json()

                // Mettre en cache les données
                localStorage.setItem(`etablissement_data_${etablissementId}`, JSON.stringify(data))
                localStorage.setItem(`etablissement_data_timestamp_${etablissementId}`, Date.now().toString())

                setEtablissement(data)
            } catch (err) {
                console.error("Erreur lors de la récupération des données de l'établissement:", err)
                setError(err instanceof Error ? err : new Error("Erreur inconnue"))
            } finally {
                setIsLoading(false)
            }
        }

        fetchEtablissement()
    }, [etablissementId, isLoadingId])

    return { etablissement, isLoading, error }
}
