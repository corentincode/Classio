import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import PageTransition from "@/components/page-transition"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Classio - La solution tout-en-un pour les établissements scolaires",
  description:
    "Classio réunit Pronote, Edusign et Teams en une seule application intuitive et puissante pour simplifier la gestion de votre établissement.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  )
}

