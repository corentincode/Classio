"use client"

import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#f5f0e8] py-12">
      <div className="container max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <Image src="/test.png" alt="Classio Logo" width={140} height={50} className="h-10 w-auto" />
          <p className="text-sm text-gray-600">Classio est la solution tout-en-un pour les établissements scolaires.</p>
          <div className="flex space-x-4">
            <Link href="#" className="text-gray-500 hover:text-[#c83e3e] transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-[#c83e3e] transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-[#c83e3e] transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 4c0-1.1-0.9-2-2-2H4C2.9 2 2 2.9 2 4v16c0 1.1 0.9 2 2 2h16c1.1 0 2-0.9 2-2V4z" />
                <path d="m22 6-10 7L2 6" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Navigation</h4>
          <ul className="space-y-2">
            <li>
              <Link href="#fonctionnalites" className="text-sm text-gray-600 hover:text-[#c83e3e] transition-colors">
                Fonctionnalités
              </Link>
            </li>
            <li>
              <Link href="#avantages" className="text-sm text-gray-600 hover:text-[#c83e3e] transition-colors">
                Avantages
              </Link>
            </li>
            <li>
              <Link href="#tarifs" className="text-sm text-gray-600 hover:text-[#c83e3e] transition-colors">
                Tarifs
              </Link>
            </li>
            <li>
              <Link href="#temoignages" className="text-sm text-gray-600 hover:text-[#c83e3e] transition-colors">
                Témoignages
              </Link>
            </li>
            <li>
              <Link href="#faq" className="text-sm text-gray-600 hover:text-[#c83e3e] transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="#contact" className="text-sm text-gray-600 hover:text-[#c83e3e] transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Contact</h4>
          <p className="text-sm text-gray-600">11 rue de l'école de MEWO, Metz</p>
          <p className="text-sm text-gray-600">contact@classio.fr</p>
          <p className="text-sm text-gray-600">+33 6 59 31 90 60</p>
        </div>
      </div>
      <div className="container max-w-6xl mx-auto mt-12 border-t border-[#f5f0e8] pt-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Classio. Tous droits réservés.
      </div>
    </footer>
  )
}

