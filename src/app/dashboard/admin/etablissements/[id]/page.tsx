import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import PageReveal from "@/components/animations/page-reveal"
import EtablissementDetailContent from "@/components/dashboard/admin/etablissement/etablissement-detail-content"

// Type pour l'établissement avec ses relations
interface Etablissement {
  id: string
  nom: string
  sousDomaine: string
  adresse?: string | null
  ville?: string | null
  codePostal?: string | null
  telephone?: string | null
  email?: string | null
  logo?: string | null
  classes: {
    id: string
    nom: string
  }[]
  users: {
    id: string
    name?: string | null
    email?: string | null
    role?: string
  }[]
}

// Fonction pour récupérer les données d'un établissement avec Prisma
async function getEtablissement(id: string): Promise<Etablissement | null> {
  try {
    const etablissement = await prisma.etablissement.findUnique({
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

    return etablissement
  } catch (error) {
    console.error("Erreur lors de la récupération de l'établissement:", error)
    return null
  }
}

export default async function EtablissementDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const etablissement = await getEtablissement(params.id)

  if (!etablissement) {
    notFound()
  }

  return (
    <PageReveal>
      <EtablissementDetailContent etablissement={etablissement} />
    </PageReveal>
  )
}

