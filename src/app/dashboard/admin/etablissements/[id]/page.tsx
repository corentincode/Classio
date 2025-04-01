import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import PageReveal from "@/components/animations/page-reveal"
import EtablissementDetailContent, {
  type Etablissement,
} from "@/components/dashboard/admin/etablissement/etablissement-detail-content"

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

