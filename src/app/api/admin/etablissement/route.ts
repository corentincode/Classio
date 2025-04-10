import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { z } from "zod"
import { Role } from "@prisma/client"

// Schéma de validation pour la création d'un établissement
const etablissementSchema = z.object({
  nom: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  sousDomaine: z
      .string()
      .min(2, { message: "Le sous-domaine doit contenir au moins 2 caractères" })
      .regex(/^[a-z0-9-]+$/, {
        message: "Le sous-domaine ne peut contenir que des lettres minuscules, des chiffres et des tirets",
      }),
  // Ajoutez ces champs s'ils existent dans votre modèle
  adresse: z.string().optional(),
  codePostal: z.string().optional(),
  ville: z.string().optional(),
  email: z.string().email({ message: "Format d'email invalide" }).optional(),
  telephone: z.string().optional(),
})

export async function GET() {
  try {
    const session = await auth()

    // Vérifier si l'utilisateur est un SUPER_ADMIN
    if (!session?.user?.role || session.user.role !== Role.SUPER_ADMIN) {
      return NextResponse.json(
          { message: "Non autorisé. Seuls les super administrateurs peuvent accéder aux établissements." },
          { status: 403 },
      )
    }

    const etablissements = await prisma.etablissement.findMany({
      include: {
        _count: {
          select: {
            classes: true,
            users: true,
          },
        },
      },
      orderBy: {
        nom: "asc",
      },
    })

    // Transformer les données pour inclure le nombre de classes et d'utilisateurs
    const formattedEtablissements = etablissements.map((etab) => {
      // Créer un objet de base avec les propriétés garanties
      const formattedEtab = {
        id: etab.id,
        nom: etab.nom,
        sousDomaine: etab.sousDomaine,
        nbClasses: etab._count.classes,
        nbUsers: etab._count.users,
        createdAt: etab.createdAt?.toISOString() || new Date().toISOString(),
        updatedAt: etab.updatedAt?.toISOString() || new Date().toISOString(),
      }

      // Ajouter les propriétés optionnelles si elles existent
      // Utilisez une vérification de type pour éviter les erreurs
      const etablissementWithOptionalFields = etab as any

      if ("adresse" in etablissementWithOptionalFields) {
        ;(formattedEtab as any).adresse = etablissementWithOptionalFields.adresse
      }

      if ("codePostal" in etablissementWithOptionalFields) {
        ;(formattedEtab as any).codePostal = etablissementWithOptionalFields.codePostal
      }

      if ("ville" in etablissementWithOptionalFields) {
        ;(formattedEtab as any).ville = etablissementWithOptionalFields.ville
      }

      if ("email" in etablissementWithOptionalFields) {
        ;(formattedEtab as any).email = etablissementWithOptionalFields.email
      }

      if ("telephone" in etablissementWithOptionalFields) {
        ;(formattedEtab as any).telephone = etablissementWithOptionalFields.telephone
      }

      return formattedEtab
    })
    console.log(formattedEtablissements)
    return NextResponse.json(formattedEtablissements)
  } catch (error) {
    console.error("Error fetching etablissements:", error)
    return NextResponse.json(
        { message: "Une erreur est survenue lors de la récupération des établissements" },
        { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()

    // Vérifier si l'utilisateur est un SUPER_ADMIN
    if (!session?.user?.role || session.user.role !== Role.SUPER_ADMIN) {
      return NextResponse.json(
          { message: "Non autorisé. Seuls les super administrateurs peuvent créer des établissements." },
          { status: 403 },
      )
    }

    const body = await request.json()

    // Valider les données
    const validatedData = etablissementSchema.parse(body)

    // Vérifier si un établissement avec le même nom ou sous-domaine existe déjà
    const existingEtablissement = await prisma.etablissement.findFirst({
      where: {
        OR: [{ nom: validatedData.nom }, { sousDomaine: validatedData.sousDomaine }],
      },
    })

    if (existingEtablissement) {
      return NextResponse.json(
          { message: "Un établissement avec ce nom ou ce sous-domaine existe déjà" },
          { status: 400 },
      )
    }

    // Préparer les données pour la création
    const etablissementData: any = {
      nom: validatedData.nom,
      sousDomaine: validatedData.sousDomaine,
    }

    // Ajouter les champs optionnels s'ils sont présents
    if (validatedData.adresse) etablissementData.adresse = validatedData.adresse
    if (validatedData.codePostal) etablissementData.codePostal = validatedData.codePostal
    if (validatedData.ville) etablissementData.ville = validatedData.ville
    if (validatedData.email) etablissementData.email = validatedData.email
    if (validatedData.telephone) etablissementData.telephone = validatedData.telephone

    // Créer l'établissement
    const etablissement = await prisma.etablissement.create({
      data: etablissementData,
    })

    return NextResponse.json({ message: "Établissement créé avec succès", etablissement }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Données invalides", errors: error.errors }, { status: 400 })
    }

    console.error("Error creating etablissement:", error)
    return NextResponse.json(
        { message: "Une erreur est survenue lors de la création de l'établissement" },
        { status: 500 },
    )
  }
}
