import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { z } from "zod"
import { Role } from "@prisma/client"

const etablissementSchema = z.object({
  nom: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  sousDomaine: z
    .string()
    .min(2, { message: "Le sous-domaine doit contenir au moins 2 caractères" })
    .regex(/^[a-z0-9-]+$/, {
      message: "Le sous-domaine ne peut contenir que des lettres minuscules, des chiffres et des tirets",
    }),
  ville: z.string().optional(),
  codePostal: z.string().optional(),
  adresse: z.string().optional(),
  email: z.string().email({ message: "Format d'email invalide" }).optional(),
  telephone: z.string().optional(),
})

export async function GET() {
  try {
    const etablissements = await prisma.etablissement.findMany({
      include: {
        users: true, // 🔥 Récupère tous les utilisateurs liés à l'établissement
      },
      orderBy: {
        nom: "asc",
      },
    })

    return NextResponse.json(etablissements)
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

    // Créer l'établissement avec tous les champs
    const etablissement = await prisma.etablissement.create({
      data: {
        nom: validatedData.nom,
        sousDomaine: validatedData.sousDomaine,
        ville: validatedData.ville,
        codePostal: validatedData.codePostal,
        adresse: validatedData.adresse,
        email: validatedData.email,
        telephone: validatedData.telephone,
      },
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

