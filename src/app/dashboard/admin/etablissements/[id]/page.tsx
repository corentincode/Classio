import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import PageReveal from "@/components/animations/page-reveal"
import EtablissementDetailContent, {
  type Etablissement,
} from "@/components/dashboard/admin/etablissement/etablissement-detail-content"

// Modifier la fonction getEtablissement pour ne pas inclure createdAt et updatedAt dans l'objet retourné
async function getEtablissement(id: string): Promise<Etablissement | null> {
  try {
    const etablissementData = await prisma.etablissement.findUnique({
      where: { id },
      include: {
        classes: {
          select: {
            id: true,
            nom: true,
          },
        },
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    })

    if (!etablissementData) return null

    // Convertir les valeurs null en undefined pour correspondre au type Etablissement
    const etablissement: Etablissement = {
      id: etablissementData.id,
      nom: etablissementData.nom,
      sousDomaine: etablissementData.sousDomaine,
      adresse: etablissementData.adresse || undefined,
      codePostal: etablissementData.codePostal || undefined,
      ville: etablissementData.ville || undefined,
      email: etablissementData.email || undefined,
      telephone: etablissementData.telephone || undefined,
      classes: etablissementData.classes,
      users: etablissementData.users,
    }

    return etablissement
  } catch (error) {
    console.error("Erreur lors de la récupération de l'établissement:", error)
    return null
  }
}

export default async function EtablissementDetailPage({
                                                        params,
                                                      }: {
  params: Promise<{ id: string }>
}) {
  // Attendre les paramètres avant de les utiliser
  const resolvedParams = await params
  const etablissement = await getEtablissement(resolvedParams.id)

  if (!etablissement) {
    notFound()
  }

  return (
      <PageReveal>
        <EtablissementDetailContent etablissement={etablissement} />
      </PageReveal>
  )
}
