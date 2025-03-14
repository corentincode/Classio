import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com"
    const adminPassword = process.env.ADMIN_PASSWORD || "AdminPassword123"

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
        where: { email: adminEmail },
    })

    if (existingAdmin) {
        console.log(`Admin user with email ${adminEmail} already exists`)
        return
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(adminPassword, 10)

    // Create admin user
    const admin = await prisma.user.create({
        data: {
            name: "Admin",
            email: adminEmail,
            password: hashedPassword,
            role: "SUPER_ADMIN",
        },
    })

    console.log(`Admin user created with email: ${admin.email}`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

