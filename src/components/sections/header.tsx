"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function Header() {
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#f5f0e8] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container max-w-6xl mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image src="/image.png" alt="Classio Logo" width={140} height={50} className="h-10 w-auto" />
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-[#c83e3e] transition-colors">
            Accueil
          </Link>
          <Link href="/avantages" className="text-sm font-medium hover:text-[#c83e3e] transition-colors">
            Avantages
          </Link>
          <Link href="/tarification" className="text-sm font-medium hover:text-[#c83e3e] transition-colors">
            Tarifs
          </Link>
          <div className="relative">
            <button
              className="flex items-center text-sm font-medium hover:text-[#c83e3e] transition-colors"
              onClick={() => setIsResourcesOpen(!isResourcesOpen)}
              onBlur={() => setTimeout(() => setIsResourcesOpen(false), 100)}
            >
              Ressources
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isResourcesOpen ? "rotate-180" : ""}`} />
            </button>
            {isResourcesOpen && (
              <div className="absolute top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#f5f0e8] py-2 z-50">
                <Link
                  href="/ressources"
                  className="block px-4 py-2 text-sm hover:bg-[#f5f0e8] hover:text-[#c83e3e] transition-colors"
                >
                  Centre de ressources
                </Link>
                <Link
                  href="/documentation"
                  className="block px-4 py-2 text-sm hover:bg-[#f5f0e8] hover:text-[#c83e3e] transition-colors"
                >
                  Documentation
                </Link>
                <Link
                  href="/a-propos"
                  className="block px-4 py-2 text-sm hover:bg-[#f5f0e8] hover:text-[#c83e3e] transition-colors"
                >
                  À propos
                </Link>
                <Link
                  href="/mentions-legales"
                  className="block px-4 py-2 text-sm hover:bg-[#f5f0e8] hover:text-[#c83e3e] transition-colors"
                >
                  Mentions légales
                </Link>
              </div>
            )}
          </div>
          <Link href="/contact" className="text-sm font-medium hover:text-[#c83e3e] transition-colors">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium hover:text-[#c83e3e] transition-colors hidden sm:inline-flex"
          >
            Connexion
          </Link>
          <Button className="relative overflow-hidden group bg-[#c83e3e] hover:bg-[#b53535] text-white">
            <span className="relative z-10">Essai gratuit</span>
            <span className="absolute inset-0 bg-[#b53535] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
          </Button>
        </div>
      </div>
    </header>
  )
}

