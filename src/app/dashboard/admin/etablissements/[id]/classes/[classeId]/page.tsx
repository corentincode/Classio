import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import PageReveal from "@/components/animations/page-reveal"
import ClasseDetailContent, {
  type Classe,
} from "@/components/dashboard/admin/etablissement/classe/classes-admin-detail-content"

async function getClasse(etablissementId: string, classeId: string): Promise<Classe | null> {
  try {
    // Adjust this query based on your actual Prisma schema
    const classeData = await prisma.classe.findUnique({
      where: {
        id: classeId,
        etablissementId: etablissementId, // Assuming classes are related to establishments
      },
      select: {
        id: true,
        nom: true,
      },
    })

    if (!classeData) return null

    const classe = {
      id: classeData.id,
      nom: classeData.nom,
    }

    return classe
  } catch (error) {
    console.error("Erreur lors de la récupération de la classe:", error)
    return null
  }
}

export default async function ClasseDetailPage({
                                                 params,
                                               }: {
  params: Promise<{ id: string; classeId: string }>
}) {
  // In Next.js App Router, params are already resolved objects, not Promises
  // Await the params Promise to get the actual values
  const resolvedParams = await params
  const classe = await getClasse(resolvedParams.id, resolvedParams.classeId)

  if (!classe) {
    notFound()
  }

  return (
      <PageReveal>
        <ClasseDetailContent classe={classe} />
      </PageReveal>
  )
}
