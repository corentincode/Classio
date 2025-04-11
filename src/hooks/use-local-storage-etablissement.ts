"use client"

import { useState, useEffect, useCallback } from "react"

export function useLocalStorageEtablissement() {
    const [etablissementId, setEtablissementId] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [etablissementData, setEtablissementData] = useState<any>(null)

    // Utiliser useCallback pour mémoriser la fonction
    const getEtablissementById = useCallback(async (id: string) => {
        try {
            // Vérifier si les données sont déjà en cache dans le localStorage
            const cachedData = localStorage.getItem(`etablissement_data_${id}`)
            const cacheTimestamp = localStorage.getItem(`etablissement_data_timestamp_${id}`)

            // Si nous avons des données en cache et qu'elles datent de moins d'une heure
            if (cachedData && cacheTimestamp) {
                const timestamp = Number.parseInt(cacheTimestamp, 10)
                const now = Date.now()
                const oneHour = 60 * 60 * 1000

                if (now - timestamp < oneHour) {
                    setEtablissementData(JSON.parse(cachedData))
                    return JSON.parse(cachedData)
                }
            }

            // Sinon, récupérer les données depuis l'API
            const response = await fetch(`/api/etablissement/${id}/`)

            if (!response.ok) {
                throw new Error(`Erreur lors de la récupération des données: ${response.status}`)
            }

            const data = await response.json()

            // Mettre en cache les données
            localStorage.setItem(`etablissement_data_${id}`, JSON.stringify(data))
            localStorage.setItem(`etablissement_data_timestamp_${id}`, Date.now().toString())

            setEtablissementData(data)
            return data
        } catch (err) {
            console.error("Erreur lors de la récupération des données de l'établissement:", err)
            return null
        }
    }, [])

    useEffect(() => {
        // Fonction pour initialiser les données
        const initEtablissement = async () => {
            // Récupérer l'ID de l'établissement depuis le localStorage
            const id = localStorage.getItem("etablissement_id")

            // Vérifier si un cookie etablissement_id existe
            const cookieValue = document.cookie
                .split("; ")
                .find((row) => row.startsWith("etablissement_id="))
                ?.split("=")[1]

            // Déterminer quel ID utiliser
            const effectiveId = cookieValue || id

            if (effectiveId) {
                // Si le cookie est différent du localStorage, mettre à jour le localStorage
                if (cookieValue && cookieValue !== id) {
                    localStorage.setItem("etablissement_id", cookieValue)
                }

                setEtablissementId(effectiveId)

                // Récupérer les données de l'établissement
                await getEtablissementById(effectiveId)
            }

            setIsLoading(false)
        }

        initEtablissement()
    }, [getEtablissementById])

    // Fonction pour mettre à jour l'ID de l'établissement dans le localStorage
    const updateEtablissementId = async (id: string) => {
        localStorage.setItem("etablissement_id", id)
        setEtablissementId(id)
        await getEtablissementById(id)
    }

    return {
        etablissementId,
        isLoading,
        updateEtablissementId,
        etablissementData,
    }
}
