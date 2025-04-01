"use client"

import { createContext, useContext, ReactNode, useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"

// Types
interface Etablissement {
  id: string
  nom: string
  sousDomaine?: string
}

interface EtablissementContextType {
  etablissement: Etablissement | null
  loading: boolean
  error: string | null
}

// Créer le contexte
const EtablissementContext = createContext<EtablissementContextType>({
  etablissement: null,
  loading: true,
  error: null
})

// Hook pour utiliser le contexte
export const useEtablissement = () => useContext(EtablissementContext)

// Composant qui utilise useSearchParams et doit être enveloppé dans Suspense
function EtablissementLoader({ children }: { children: ReactNode }) {
  const [etablissement, setEtablissement] = useState<Etablissement | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  
  useEffect(() => {
    const fetchEtablissement = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Récupérer les informations de l'établissement depuis les paramètres de recherche
        const etablissementId = searchParams.get('etablissementId')
        const etablissementNom = searchParams.get('etablissementNom')
        
        if (etablissementId && etablissementNom) {
          setEtablissement({
            id: etablissementId,
            nom: etablissementNom,
          })
          setLoading(false)
          return
        }
        
        // Si nous sommes sur un sous-domaine, essayer de récupérer l'établissement depuis l'API
        if (typeof window !== 'undefined') {
          const hostname = window.location.hostname
          
          if (hostname.includes('.classio.fr') && !['www', 'admin', 'api'].includes(hostname.split('.')[0])) {
            const sousDomaine = hostname.split('.')[0]
            
            const response = await fetch(`/api/etablissements/by-sous-domaine?sousDomaine=${sousDomaine}`)
            
            if (!response.ok) {
              throw new Error('Impossible de récupérer les informations de l\'établissement')
            }
            
            const data = await response.json()
            
            if (data.etablissement) {
              setEtablissement(data.etablissement)
            } else {
              setError('Établissement non trouvé')
            }
          } else if (session?.user?.etablissementId) {
            // Si l'utilisateur est connecté et a un établissement associé, récupérer cet établissement
            const response = await fetch(`/api/etablissements/${session.user.etablissementId}`)
            
            if (!response.ok) {
              throw new Error('Impossible de récupérer les informations de l\'établissement')
            }
            
            const data = await response.json()
            
            if (data) {
              setEtablissement(data)
            } else {
              setError('Établissement non trouvé')
            }
          }
        }
      } catch (err) {
        console.error('Erreur lors de la récupération de l\'établissement:', err)
        setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      } finally {
        setLoading(false)
      }
    }
    
    fetchEtablissement()
  }, [searchParams, session])
  
  return (
    <EtablissementContext.Provider value={{ etablissement, loading, error }}>
      {children}
    </EtablissementContext.Provider>
  )
}

// Provider du contexte avec Suspense
export function EtablissementProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <EtablissementLoader>
        {children}
      </EtablissementLoader>
    </Suspense>
  )
}