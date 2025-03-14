import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import {auth} from "@/lib/auth";
import {Role} from "@prisma/client";



// Route pour récupérer toutes les classes d'un établissement
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string; classeId: string } }
) {
    console.log("Params reçus :", params);
    try {
        const { id: etablissementId, classeId } = params;

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
