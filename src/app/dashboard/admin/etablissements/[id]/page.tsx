import { notFound } from "next/navigation"
import PageReveal from "@/components/animations/page-reveal"
import EtablissementDetailContent from "@/components/dashboard/admin/etablissement/etablissement-detail-content"

// Cette fonction serait remplacée par votre véritable fonction de récupération de données
async function getEtablissement(id: string) {
  // Simulation de récupération de données - à remplacer par votre code réel
  try {
    // Remplacer par votre appel à Prisma
    const etablissement = {
      id,
      nom: "Lycée Jean Moulin",
      sousDomaine: "jean-moulin",
      adresse: "123 Rue de l'Éducation",
      ville: "Paris",
      codePostal: "75001",
      telephone: "01 23 45 67 89",
      email: "contact@jean-moulin.edu",
      logo: "/placeholder.svg?height=100&width=100",
      classes: [
        { id: "1", nom: "Seconde A" },
        { id: "2", nom: "Seconde B" },
        { id: "3", nom: "Première S" },
        { id: "4", nom: "Terminale S" },
      ],
      users: [
        { id: "1", name: "Jean Dupont", email: "jean@example.com", role: "ADMIN" },
        { id: "2", name: "Marie Martin", email: "marie@example.com", role: "TEACHER" },
        { id: "3", name: "Pierre Durand", email: "pierre@example.com", role: "TEACHER" },
      ],
    }
    return etablissement
  } catch (error) {
    return null
  }
}

interface PageProps {
  params: {
    id: string
  }
}

export default async function EtablissementDetailPage({ params }: PageProps) {
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

