import { PrismaClient } from "@prisma/client"
import { hash } from "bcrypt"
import * as readline from "readline"

const prisma = new PrismaClient()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

async function main() {
    console.log("Création d'un compte administrateur initial")

    // Demander les informations de l'administrateur
    const name = await question("Nom: ")
    const email = await question("Email: ")
    const password = await question("Mot de passe: ")

    try {
        // Vérifier si l'email existe déjà
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            console.log("Cet email est déjà utilisé.")
            return
        }

        // Hacher le mot de passe
        const hashedPassword = await hash(password, 10)

        // Créer l'administrateur
        const admin = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: "ADMIN",
            },
        })

        console.log(`Administrateur créé avec succès: ${admin.email}`)
    } catch (error) {
        console.error("Erreur lors de la création de l'administrateur:", error)
    } finally {
        await prisma.$disconnect()
        rl.close()
    }
}

function question(query: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(query, (answer) => {
            resolve(answer)
        })
    })
}

main()

