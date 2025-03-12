"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, AlertCircle, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Animations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Identifiants invalides. Veuillez vérifier votre email et mot de passe.")
        setIsLoading(false)
        return
      }

      router.push("/dashboard")
      router.refresh()
    } catch (error) {
      setError("Une erreur s'est produite lors de la connexion. Veuillez réessayer.")
      setIsLoading(false)
    }
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      <Card className="border border-[#f5f0e8] shadow-lg overflow-hidden">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <Image src="/test.png" alt="Classio Logo" width={180} height={40} className="h-auto w-auto mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-2">Connexion à votre compte</h1>
            <p className="text-gray-600">Accédez à votre espace Classio</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-start"
            >
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adresse email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-[#f5f0e8] rounded-lg focus:ring-[#c83e3e] focus:border-[#c83e3e] outline-none"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <Link href="/mot-de-passe-oublie" className="text-xs text-[#c83e3e] hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-[#f5f0e8] rounded-lg focus:ring-[#c83e3e] focus:border-[#c83e3e] outline-none"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#c83e3e] hover:bg-[#b53535] text-white relative overflow-hidden group"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connexion en cours...
                </span>
              ) : (
                <>
                  <span className="relative z-10">Se connecter</span>
                  <span className="absolute inset-0 bg-[#b53535] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
                  <ArrowRight className="ml-2 h-4 w-4 relative z-10 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Vous n'avez pas encore de compte ?{" "}
              <Link href="/inscription" className="text-[#c83e3e] font-medium hover:underline">
                Créer un compte
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[#f5f0e8]">
            <p className="text-xs text-gray-500 text-center">
              En vous connectant, vous acceptez nos{" "}
              <Link href="/mentions-legales#conditions-utilisation" className="text-[#c83e3e] hover:underline">
                Conditions d'utilisation
              </Link>{" "}
              et notre{" "}
              <Link href="/mentions-legales#politique-confidentialite" className="text-[#c83e3e] hover:underline">
                Politique de confidentialité
              </Link>
              .
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

