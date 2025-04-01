import { NextResponse, type NextRequest } from "next/server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { z } from "zod"
import { Role } from "@prisma/client"

const etablissementUpdateSchema = z.object({
  nom: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }).optional(),
  sousDomaine: z
    .string()
    .min(2, { message: "Le sous-domaine doit contenir au moins 2 caractères" })
    .regex(/^[a-z0-9-]+$/, {
      message: "Le sous-domaine ne peut contenir que des lettres minuscules, des chiffres et des tirets",
    })
    .optional(),
  ville: z.string().nullable().optional(),
  codePostal: z.string().nullable().optional(),
  adresse: z.string().nullable().optional(),
  email: z.string().email({ message: "Format d'email invalide" }).nullable().optional(),
  telephone: z.string().nullable().optional(),
})

type Params = {
    params: {
      id: string
    }
  }
  


export async function PATCH(request: NextRequest,{ params }: { params:  Promise<{ id: string}> }) {
  try {
    // Commentez temporairement la vérification d'authentification pour tester
    // const session = await auth()
    // if (!session?.user?.role || session.user.role !== Role.SUPER_ADMIN) {
    //   return NextResponse.json(
    //     { message: "Non autorisé. Seuls les super administrateurs peuvent modifier des établissements." },
    //     { status: 403 }
    //   )
    // }

    const body = await request.json()

    // Valider les données
    const validatedData = etablissementUpdateSchema.parse(body)

    // Vérifier si l'établissement existe
    const existingEtablissement = await prisma.etablissement.findUnique({
      where: { id: (await params).id },
    })

    if (!existingEtablissement) {
      return NextResponse.json({ message: "Établissement non trouvé" }, { status: 404 })
    }

    // Vérifier si le nom ou le sous-domaine est déjà utilisé par un autre établissement
    if (validatedData.nom || validatedData.sousDomaine) {
      const duplicateCheck = await prisma.etablissement.findFirst({
        where: {
          OR: [
            validatedData.nom ? { nom: validatedData.nom } : {},
            validatedData.sousDomaine ? { sousDomaine: validatedData.sousDomaine } : {},
          ],
          NOT: { id: (await params).id },
        },
      })

      if (duplicateCheck) {
        return NextResponse.json(
          { message: "Un établissement avec ce nom ou ce sous-domaine existe déjà" },
          { status: 400 },
        )
      }
    }

    // Mettre à jour l'établissement
    const updatedEtablissement = await prisma.etablissement.update({
      where: { id: (await params).id },
      data: validatedData,
    })

    return NextResponse.json(updatedEtablissement)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Données invalides", errors: error.errors }, { status: 400 })
    }

    console.error("Error updating etablissement:", error)
    return NextResponse.json(
      { message: "Une erreur est survenue lors de la mise à jour de l'établissement" },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest,{ params }: { params:  Promise<{ id: string}> }) {
  try {
    const session = await auth()

    // Vérifier si l'utilisateur est un SUPER_ADMIN
    if (!session?.user?.role || session.user.role !== Role.SUPER_ADMIN) {
      return NextResponse.json(
        { message: "Non autorisé. Seuls les super administrateurs peuvent supprimer des établissements." },
        { status: 403 },
      )
    }

    // Vérifier si l'établissement existe
    const existingEtablissement = await prisma.etablissement.findUnique({
      where: { id: (await params).id },
    })

    if (!existingEtablissement) {
      return NextResponse.json({ message: "Établissement non trouvé" }, { status: 404 })
    }

    // Supprimer l'établissement
    await prisma.etablissement.delete({
      where: { id: (await params).id },
    })

    return NextResponse.json({ message: "Établissement supprimé avec succès" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting etablissement:", error)
    return NextResponse.json(
      { message: "Une erreur est survenue lors de la suppression de l'établissement" },
      { status: 500 },
    )
  }
}

