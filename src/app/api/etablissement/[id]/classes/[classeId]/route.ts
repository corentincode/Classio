import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import {auth} from "@/lib/auth";
import {Role} from "@prisma/client";



// Route pour récupérer toutes les classes d'un établissement
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string; classeId: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
        }

        // On attend que params soit résolu
        const resolvedParams = await params;
        const { id: etablissementId, classeId } = resolvedParams;

        const classe = await prisma.classe.findFirst({
            where: {
                id: classeId,
                etablissementId,
            },
        });

        if (!classe) {
            return NextResponse.json({ message: "Classe non trouvée" }, { status: 404 });
        }

        return NextResponse.json(classe);
    } catch (error) {
        console.error("Erreur lors de la récupération de la classe:", error);
        return NextResponse.json(
            { message: "Une erreur est survenue lors de la récupération de la classe" },
            { status: 500 }
        );
    }
}

