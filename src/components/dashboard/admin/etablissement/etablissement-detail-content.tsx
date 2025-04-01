"use client"
// Autres imports...

// Types
export type Etablissement = {
  id: string
  nom: string
  sousDomaine: string
  adresse?: string | null
  ville?: string | null
  codePostal?: string | null
  telephone?: string | null
  email?: string | null
  logo?: string | null
  classes: { id: string; nom: string }[]
  users: { id: string; name: string | null; email: string | null; role?: string }[]
}

export interface EtablissementDetailContentProps {
  etablissement: Etablissement
}

export default function EtablissementDetailContent({ etablissement }: EtablissementDetailContentProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="settingsAddress" className="text-sm font-medium">
        Adresse
      </label>
      <input id="settingsAddress" className="w-full p-2 border rounded-md" defaultValue={etablissement.adresse || ""} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="settingsPostal" className="text-sm font-medium">
            Code postal
          </label>
          <input
            id="settingsPostal"
            className="w-full p-2 border rounded-md"
            defaultValue={etablissement.codePostal || ""}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="settingsCity" className="text-sm font-medium">
            Ville
          </label>
          <input id="settingsCity" className="w-full p-2 border rounded-md" defaultValue={etablissement.ville || ""} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="settingsPhone" className="text-sm font-medium">
            Téléphone
          </label>
          <input
            id="settingsPhone"
            className="w-full p-2 border rounded-md"
            defaultValue={etablissement.telephone || ""}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="settingsEmail" className="text-sm font-medium">
            Email
          </label>
          <input
            id="settingsEmail"
            type="email"
            className="w-full p-2 border rounded-md"
            defaultValue={etablissement.email || ""}
          />
        </div>
      </div>
    </div>
  )
}

