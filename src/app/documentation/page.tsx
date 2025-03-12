"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowLeft,
  Search,
  Book,
  Code,
  Server,
  Layers,
  Settings,
  Users,
  Shield,
  HelpCircle,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/sections/header"
import Footer from "@/components/sections/footer"

// Animations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function DocumentationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeSection, setActiveSection] = useState("introduction")

  // Fonction pour gérer le défilement vers une section
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      const yOffset = -100 // Ajustement pour le header fixe
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-white">
          <div className="container max-w-6xl mx-auto">
            <Link href="/" className="inline-flex items-center text-[#c83e3e] mb-8 hover:underline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
                Documentation <span className="text-[#c83e3e]">Classio</span>
              </h1>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Guide complet pour comprendre, installer et utiliser la plateforme Classio
              </p>
            </motion.div>

            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher dans la documentation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-[#f5f0e8] rounded-lg focus:ring-[#c83e3e] focus:border-[#c83e3e] outline-none"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </section>

        {/* Documentation Content */}
        <section className="py-8 bg-[#f5f0e8]/10">
          <div className="container max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar Navigation */}
              <div className="lg:w-1/4">
                <div className="sticky top-24 bg-white rounded-xl border border-[#f5f0e8] shadow-sm p-4">
                  <h3 className="font-bold text-lg mb-4">Table des matières</h3>
                  <nav className="space-y-1">
                    <SidebarLink
                      icon={<Book className="h-4 w-4" />}
                      title="Introduction"
                      active={activeSection === "introduction"}
                      onClick={() => scrollToSection("introduction")}
                    />
                    <SidebarLink
                      icon={<Layers className="h-4 w-4" />}
                      title="Architecture"
                      active={activeSection === "architecture"}
                      onClick={() => scrollToSection("architecture")}
                    />
                    <SidebarLink
                      icon={<Code className="h-4 w-4" />}
                      title="Installation"
                      active={activeSection === "installation"}
                      onClick={() => scrollToSection("installation")}
                    />
                    <SidebarLink
                      icon={<Settings className="h-4 w-4" />}
                      title="Configuration"
                      active={activeSection === "configuration"}
                      onClick={() => scrollToSection("configuration")}
                    />
                    <SidebarLink
                      icon={<Server className="h-4 w-4" />}
                      title="API"
                      active={activeSection === "api"}
                      onClick={() => scrollToSection("api")}
                    />
                    <SidebarLink
                      icon={<Users className="h-4 w-4" />}
                      title="Authentification"
                      active={activeSection === "authentication"}
                      onClick={() => scrollToSection("authentication")}
                    />
                    <SidebarLink
                      icon={<Shield className="h-4 w-4" />}
                      title="Sécurité"
                      active={activeSection === "security"}
                      onClick={() => scrollToSection("security")}
                    />
                    <SidebarLink
                      icon={<HelpCircle className="h-4 w-4" />}
                      title="Dépannage"
                      active={activeSection === "troubleshooting"}
                      onClick={() => scrollToSection("troubleshooting")}
                    />
                  </nav>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:w-3/4">
                <div className="bg-white rounded-xl border border-[#f5f0e8] shadow-sm p-6 md:p-8">
                  {/* Introduction */}
                  <section id="introduction" className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-[#f5f0e8]">Introduction</h2>
                    <div className="prose max-w-none">
                      <p className="mb-4">
                        Classio est une plateforme tout-en-un pour les établissements scolaires qui réunit les
                        fonctionnalités de gestion des notes, des absences, des emplois du temps et de communication en
                        une seule application.
                      </p>
                      <p className="mb-4">
                        Cette documentation est destinée aux développeurs et administrateurs qui souhaitent installer,
                        configurer et personnaliser la plateforme Classio pour leurs besoins spécifiques.
                      </p>
                      <h3 className="text-xl font-bold mt-6 mb-3">Fonctionnalités principales</h3>
                      <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>Gestion des emplois du temps avec synchronisation automatique</li>
                        <li>Suivi des notes et évaluations avec tableaux de bord personnalisés</li>
                        <li>Système de pointage numérique pour la gestion des présences</li>
                        <li>Outils de communication intégrés entre tous les acteurs</li>
                        <li>Organisation et suivi des devoirs avec remise en ligne</li>
                        <li>Tableaux de bord analytiques pour le suivi des performances</li>
                        <li>Portail dédié aux parents pour suivre la scolarité</li>
                        <li>Gestion documentaire centralisée et sécurisée</li>
                      </ul>
                      <h3 className="text-xl font-bold mt-6 mb-3">Technologies utilisées</h3>
                      <p className="mb-4">Classio est développé avec les technologies modernes suivantes :</p>
                      <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>
                          <strong>Frontend :</strong> Next.js, React, TypeScript, Tailwind CSS, Framer Motion
                        </li>
                        <li>
                          <strong>Backend :</strong> Next.js API Routes, Node.js
                        </li>
                        <li>
                          <strong>Authentification :</strong> NextAuth.js
                        </li>
                        <li>
                          <strong>Base de données :</strong> PostgreSQL (via Supabase)
                        </li>
                        <li>
                          <strong>Déploiement :</strong> Vercel
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* Architecture */}
                  <section id="architecture" className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-[#f5f0e8]">Architecture</h2>
                    <div className="prose max-w-none">
                      <p className="mb-4">
                        Classio suit une architecture moderne basée sur Next.js avec l'App Router, qui permet de créer
                        des applications web performantes et évolutives.
                      </p>
                      <h3 className="text-xl font-bold mt-6 mb-3">Structure du projet</h3>
                      <p className="mb-4">Le projet est organisé selon la structure suivante :</p>
                      <div className="bg-gray-50 p-4 rounded-lg mb-6 font-mono text-sm overflow-x-auto">
                        <pre>
                          {`classio/
├── app/                  # Répertoire principal de l'application Next.js
│   ├── api/              # Routes API
│   ├── (auth)/           # Routes liées à l'authentification
│   │   ├── login/        # Page de connexion
│   │   └── inscription/  # Page d'inscription
│   ├── dashboard/        # Interface d'administration
│   ├── contact/          # Page de contact
│   ├── a-propos/         # Page à propos
│   ├── ressources/       # Centre de ressources
│   ├── tarification/     # Page de tarification
│   ├── mentions-legales/ # Mentions légales
│   ├── documentation/    # Documentation
│   ├── layout.tsx        # Layout principal
│   └── page.tsx          # Page d'accueil
├── components/           # Composants React réutilisables
│   ├── auth/             # Composants d'authentification
│   ├── sections/         # Sections de page
│   └── ui/               # Composants d'interface utilisateur
├── lib/                  # Bibliothèques et utilitaires
│   ├── auth.ts           # Configuration de l'authentification
│   └── utils.ts          # Fonctions utilitaires
├── public/               # Fichiers statiques
└── ...                   # Autres fichiers de configuration`}
                        </pre>
                      </div>
                      <h3 className="text-xl font-bold mt-6 mb-3">Flux de données</h3>
                      <p className="mb-4">
                        Classio utilise une architecture client-serveur avec des composants React côté client et des API
                        Routes côté serveur. Voici comment les données circulent dans l'application :
                      </p>
                      <ol className="list-decimal pl-6 mb-4 space-y-2">
                        <li>L'utilisateur interagit avec l'interface utilisateur (composants React)</li>
                        <li>Les actions déclenchent des appels API vers les routes API de Next.js</li>
                        <li>Les routes API communiquent avec la base de données</li>
                        <li>Les données sont renvoyées au client et affichées dans l'interface</li>
                      </ol>
                      <div className="bg-[#f5f0e8]/30 p-4 rounded-lg mb-6 border border-[#f5f0e8]">
                        <h4 className="font-bold mb-2">Note sur les Server Components</h4>
                        <p>
                          Classio utilise largement les Server Components de Next.js pour améliorer les performances et
                          réduire la taille du bundle JavaScript envoyé au client. Les composants marqués avec "use
                          client" sont des Client Components qui s'exécutent côté client.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Installation */}
                  <section id="installation" className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-[#f5f0e8]">Installation</h2>
                    <div className="prose max-w-none">
                      <p className="mb-4">
                        Suivez ces étapes pour installer et exécuter Classio localement sur votre machine.
                      </p>
                      <h3 className="text-xl font-bold mt-6 mb-3">Prérequis</h3>
                      <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>Node.js 18.x ou supérieur</li>
                        <li>npm ou yarn</li>
                        <li>Git</li>
                      </ul>
                      <h3 className="text-xl font-bold mt-6 mb-3">Étapes d'installation</h3>
                      <ol className="list-decimal pl-6 mb-4 space-y-4">
                        <li>
                          <p className="font-medium">Cloner le dépôt</p>
                          <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-2">
                            git clone https://github.com/votre-organisation/classio.git
                          </div>
                        </li>
                        <li>
                          <p className="font-medium">Accéder au répertoire du projet</p>
                          <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-2">cd classio</div>
                        </li>
                        <li>
                          <p className="font-medium">Installer les dépendances</p>
                          <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-2">
                            npm install
                            <br /># ou
                            <br />
                            yarn install
                          </div>
                        </li>
                        <li>
                          <p className="font-medium">Configurer les variables d'environnement</p>
                          <p className="mb-2">
                            Créez un fichier <code>.env.local</code> à la racine du projet avec les variables suivantes
                            :
                          </p>
                          <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-2">
                            # Authentification NEXTAUTH_SECRET=votre_secret_nextauth NEXTAUTH_URL=http://localhost:3000
                            # Base de données (si applicable) DATABASE_URL=votre_url_de_base_de_donnees
                          </div>
                        </li>
                        <li>
                          <p className="font-medium">Démarrer le serveur de développement</p>
                          <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-2">
                            npm run dev
                            <br /># ou
                            <br />
                            yarn dev
                          </div>
                        </li>
                      </ol>
                      <p className="mb-4">
                        L'application sera accessible à l'adresse{" "}
                        <a href="http://localhost:3000" className="text-[#c83e3e] hover:underline">
                          http://localhost:3000
                        </a>
                        .
                      </p>
                      <h3 className="text-xl font-bold mt-6 mb-3">Installation en production</h3>
                      <p className="mb-4">
                        Pour un déploiement en production, nous recommandons d'utiliser Vercel, qui est optimisé pour
                        les applications Next.js.
                      </p>
                      <ol className="list-decimal pl-6 mb-4 space-y-4">
                        <li>
                          <p className="font-medium">
                            Créez un compte sur{" "}
                            <a href="https://vercel.com" className="text-[#c83e3e] hover:underline">
                              Vercel
                            </a>{" "}
                            si vous n'en avez pas déjà un
                          </p>
                        </li>
                        <li>
                          <p className="font-medium">Importez votre projet depuis GitHub, GitLab ou Bitbucket</p>
                        </li>
                        <li>
                          <p className="font-medium">
                            Configurez les variables d'environnement dans l'interface Vercel
                          </p>
                        </li>
                        <li>
                          <p className="font-medium">Déployez l'application</p>
                        </li>
                      </ol>
                    </div>
                  </section>

                  {/* Configuration */}
                  <section id="configuration" className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-[#f5f0e8]">Configuration</h2>
                    <div className="prose max-w-none">
                      <p className="mb-4">
                        Cette section explique comment configurer différents aspects de Classio pour l'adapter à vos
                        besoins.
                      </p>
                      <h3 className="text-xl font-bold mt-6 mb-3">Variables d'environnement</h3>
                      <p className="mb-4">
                        Voici la liste complète des variables d'environnement que vous pouvez configurer :
                      </p>
                      <table className="min-w-full border border-[#f5f0e8] mb-6">
                        <thead className="bg-[#f5f0e8]">
                          <tr>
                            <th className="py-2 px-4 border-b border-[#f5f0e8] text-left">Variable</th>
                            <th className="py-2 px-4 border-b border-[#f5f0e8] text-left">Description</th>
                            <th className="py-2 px-4 border-b border-[#f5f0e8] text-left">Obligatoire</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-2 px-4 border-b border-[#f5f0e8] font-mono text-sm">NEXTAUTH_SECRET</td>
                            <td className="py-2 px-4 border-b border-[#f5f0e8]">Clé secrète pour NextAuth.js</td>
                            <td className="py-2 px-4 border-b border-[#f5f0e8]">Oui</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4 border-b border-[#f5f0e8] font-mono text-sm">NEXTAUTH_URL</td>
                            <td className="py-2 px-4 border-b border-[#f5f0e8]">URL de base de l'application</td>
                            <td className="py-2 px-4 border-b border-[#f5f0e8]">Oui (en production)</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4 border-b border-[#f5f0e8] font-mono text-sm">DATABASE_URL</td>
                            <td className="py-2 px-4 border-b border-[#f5f0e8]">
                              URL de connexion à la base de données
                            </td>
                            <td className="py-2 px-4 border-b border-[#f5f0e8]">Oui (si DB utilisée)</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4 border-b border-[#f5f0e8] font-mono text-sm">EMAIL_SERVER</td>
                            <td className="py-2 px-4 border-b border-[#f5f0e8]">Configuration du serveur SMTP</td>
                            <td className="py-2 px-4 border-b border-[#f5f0e8]">Non</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4 border-b border-[#f5f0e8] font-mono text-sm">EMAIL_FROM</td>
                            <td className="py-2 px-4 border-b border-[#f5f0e8]">Adresse email d'expédition</td>
                            <td className="py-2 px-4 border-b border-[#f5f0e8]">Non</td>
                          </tr>
                        </tbody>
                      </table>
                      <h3 className="text-xl font-bold mt-6 mb-3">Personnalisation du thème</h3>
                      <p className="mb-4">
                        Classio utilise Tailwind CSS pour le styling. Vous pouvez personnaliser les couleurs, les
                        polices et d'autres aspects visuels en modifiant le fichier <code>tailwind.config.js</code> :
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg mb-6 font-mono text-sm overflow-x-auto">
                        <pre>
                          {`// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#c83e3e',  // Couleur principale
          dark: '#b53535',     // Variante foncée
          light: '#e57373',    // Variante claire
        },
        secondary: {
          DEFAULT: '#f5f0e8',  // Couleur secondaire
        },
        // Ajoutez d'autres couleurs personnalisées ici
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        // Ajoutez d'autres polices personnalisées ici
      },
    },
  },
  // ...
}`}
                        </pre>
                      </div>
                      <h3 className="text-xl font-bold mt-6 mb-3">Configuration de l'authentification</h3>
                      <p className="mb-4">
                        L'authentification est gérée par NextAuth.js. Vous pouvez configurer différents fournisseurs
                        d'authentification en modifiant le fichier <code>lib/auth.ts</code> :
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg mb-6 font-mono text-sm overflow-x-auto">
                        <pre>
                          {`// lib/auth.ts
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    // Authentification par identifiants
    Credentials({
      // Configuration...
    }),
    // Authentification Google
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Ajoutez d'autres fournisseurs ici
  ],
  // ...
})`}
                        </pre>
                      </div>
                    </div>
                  </section>

                  {/* API */}
                  <section id="api" className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-[#f5f0e8]">API</h2>
                    <div className="prose max-w-none">
                      <p className="mb-4">
                        Classio expose plusieurs API pour interagir avec les données de l'application. Cette section
                        décrit les endpoints disponibles et comment les utiliser.
                      </p>
                      <h3 className="text-xl font-bold mt-6 mb-3">Structure des API</h3>
                      <p className="mb-4">
                        Les API de Classio sont organisées selon le modèle RESTful et sont accessibles via le préfixe{" "}
                        <code>/api</code>.
                      </p>
                      <h3 className="text-xl font-bold mt-6 mb-3">Authentification API</h3>
                      <p className="mb-4">
                        Toutes les requêtes API (à l'exception des endpoints publics) nécessitent une authentification.
                        Vous devez inclure un token JWT valide dans l'en-tête <code>Authorization</code> :
                      </p>
                      <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
                        Authorization: Bearer votre_token_jwt
                      </div>
                      <h3 className="text-xl font-bold mt-6 mb-3">Endpoints disponibles</h3>
                      <h4 className="text-lg font-bold mt-4 mb-2">Utilisateurs</h4>
                      <table className="min-w-full border border-[#f5f0e8] mb-6">
                        <thead className="bg-[#f5f0e8]">
                          <tr>
                            <th className="py-2 px-4 border-b border-[#f5f0e8] text-left">Endpoint</th>
                            <th className="py-2 px-4 border-b border-[#f5f0e8] text-left">Méthode</th>
                            <th className="py-2 px-4 border-b border-[#f5f0e8] text-left">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-2 px-4 border-b border-[#f5f0e8] font-mono text-sm">/api/users</td>
                            <td className="py-2 px-4 border-b border-[#f5f0e8]">GET</td>
                            <td className="py-2 px-4 border-b border-[#f5f0e8]">Récupérer la liste des utilisateurs</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4 border-b border-[#f5f0e8] font-mono text-sm">/api/users/:id</td>
                            <td className="py-2 px-4 border-b border-[#f5f0e8]">GET</td>
                            <td className="py-2 px-4 border-b border-[#f5f0e8]">Récupérer un utilisateur spécifique</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4 border-b border-[#f5f0e8] font-mono text-sm">/api/users</td>
                            <td className="py-2 px-4 border-b border-[#f5f0e8]">POST</td>
                            <td className="py-2 px-4 border-b border-[#f5f0e8]">Créer un nouvel utilisateur</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4 border-b border-[#f5f0e8] font-mono text-sm">/api/users/:id</td>
                            <td className="py-2 px-4 border-b border-[#f5f0e8]">PUT</td>
                            <td className="py-2 px-4 border-b border-[#f5f0e8]">Mettre à jour un utilisateur</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4 border-b border-[#f5f0e8] font-mono text-sm">/api/users/:id</td>
                            <td className="py-2 px-4 border-b border-[#f5f0e8]">DELETE</td>
                            <td className="py-2 px-4 border-b border-[#f5f0e8]">Supprimer un utilisateur</td>
                          </tr>
                        </tbody>
                      </table>
                      <h4 className="text-lg font-bold mt-4 mb-2">Cours</h4>
                      <table className="min-w-full border border-[#f5f0e8] mb-6">
                        <thead className="bg-[#f5f0e8]">
                          <tr>
                            <th className="py-2 px-4 border-b border-[#f5f0e8] text-left">Endpoint</th>
                            <th className="py-2 px-4 border-b border-[#f5f0e8] text-left">Méthode</th>
                            <th className="py-2 px-4 border-b border-[#f5f0e8] text-left">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-2 px-4 border-b border-[#f5f0e8] font-mono text-sm">/api/courses</td>
                            <td className="py-2 px-4 border-b border-[#f5f0e8]">GET</td>
                            <td className="py-2 px-4 border-b border-[#f5f0e8]">Récupérer la liste des cours</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4 border-b border-[#f5f0e8] font-mono text-sm">/api/courses/:id</td>
                            <td className="py-2 px-4 border-b border-[#f5f0e8]">GET</td>
                            <td className="py-2 px-4 border-b border-[#f5f0e8]">Récupérer un cours spécifique</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4 border-b border-[#f5f0e8] font-mono text-sm">/api/courses</td>
                            <td className="py-2 px-4 border-b border-[#f5f0e8]">POST</td>
                            <td className="py-2 px-4 border-b border-[#f5f0e8]">Créer un nouveau cours</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4 border-b border-[#f5f0e8] font-mono text-sm">/api/courses/:id</td>
                            <td className="py-2 px-4 border-b border-[#f5f0e8]">PUT</td>
                            <td className="py-2 px-4 border-b border-[#f5f0e8]">Mettre à jour un cours</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4 border-b border-[#f5f0e8] font-mono text-sm">/api/courses/:id</td>
                            <td className="py-2 px-4 border-b border-[#f5f0e8]">DELETE</td>
                            <td className="py-2 px-4 border-b border-[#f5f0e8]">Supprimer un cours</td>
                          </tr>
                        </tbody>
                      </table>
                      <h3 className="text-xl font-bold mt-6 mb-3">Exemple d'utilisation</h3>
                      <p className="mb-4">Voici un exemple de requête pour récupérer la liste des utilisateurs :</p>
                      <div className="bg-gray-50 p-4 rounded-lg mb-6 font-mono text-sm overflow-x-auto">
                        <pre>
                          {`// Exemple avec fetch
const fetchUsers = async () => {
  const response = await fetch('/api/users', {
    method: 'GET',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des utilisateurs');
  }
  
  const data = await response.json();
  return data;
};`}
                        </pre>
                      </div>
                    </div>
                  </section>

                  {/* Authentication */}
                  <section id="authentication" className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-[#f5f0e8]">Authentification</h2>
                    <div className="prose max-w-none">
                      <p className="mb-4">
                        Classio utilise NextAuth.js pour gérer l'authentification des utilisateurs. Cette section
                        explique comment configurer et utiliser le système d'authentification.
                      </p>
                      <h3 className="text-xl font-bold mt-6 mb-3">Configuration de base</h3>
                      <p className="mb-4">
                        L'authentification est configurée dans le fichier <code>lib/auth.ts</code>. Par défaut, Classio
                        prend en charge l'authentification par identifiants (email/mot de passe), mais vous pouvez
                        facilement ajouter d'autres fournisseurs.
                      </p>
                      <h3 className="text-xl font-bold mt-6 mb-3">Flux d'authentification</h3>
                      <ol className="list-decimal pl-6 mb-4 space-y-2">
                        <li>
                          L'utilisateur accède à la page de connexion (<code>/login</code>)
                        </li>
                        <li>L'utilisateur saisit ses identifiants</li>
                        <li>NextAuth.js vérifie les identifiants et crée une session</li>
                        <li>L'utilisateur est redirigé vers le tableau de bord</li>
                      </ol>
                      <h3 className="text-xl font-bold mt-6 mb-3">Protection des routes</h3>
                      <p className="mb-4">
                        Pour protéger une route et exiger que l'utilisateur soit authentifié, utilisez le middleware
                        d'authentification :
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg mb-6 font-mono text-sm overflow-x-auto">
                        <pre>
                          {`// app/dashboard/page.tsx
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth()
  
  // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  if (!session) {
    redirect("/login")
  }
  
  // Contenu de la page pour les utilisateurs authentifiés
  return (
    <div>
      <h1>Tableau de bord</h1>
      <p>Bienvenue, {session.user.name}</p>
      {/* Reste du contenu */}
    </div>
  )
}`}
                        </pre>
                      </div>
                      <h3 className="text-xl font-bold mt-6 mb-3">Gestion des rôles</h3>
                      <p className="mb-4">
                        Classio prend en charge différents rôles d'utilisateurs (administrateur, enseignant, élève,
                        parent). Vous pouvez vérifier le rôle d'un utilisateur comme suit :
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg mb-6 font-mono text-sm overflow-x-auto">
                        <pre>
                          {`// Vérification du rôle dans un composant serveur
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function AdminPage() {
  const session = await auth()
  
  // Vérifier si l'utilisateur est authentifié et a le rôle d'administrateur
  if (!session || session.user.role !== "admin") {
    redirect("/access-denied")
  }
  
  // Contenu de la page pour les administrateurs
  return (
    <div>
      <h1>Administration</h1>
      {/* Contenu réservé aux administrateurs */}
    </div>
  )
}`}
                        </pre>
                      </div>
                    </div>
                  </section>

                  {/* Security */}
                  <section id="security" className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-[#f5f0e8]">Sécurité</h2>
                    <div className="prose max-w-none">
                      <p className="mb-4">
                        La sécurité est une priorité pour Classio, qui traite des données sensibles liées aux
                        établissements scolaires et aux élèves. Cette section décrit les mesures de sécurité mises en
                        place et les bonnes pratiques à suivre.
                      </p>
                      <h3 className="text-xl font-bold mt-6 mb-3">Protection des données</h3>
                      <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>Toutes les données sensibles sont chiffrées en transit (HTTPS) et au repos</li>
                        <li>Les mots de passe sont hachés avec bcrypt</li>
                        <li>Les sessions utilisateur sont gérées de manière sécurisée via JWT</li>
                        <li>Les tokens d'authentification ont une durée de vie limitée</li>
                      </ul>
                      <h3 className="text-xl font-bold mt-6 mb-3">Protection contre les attaques courantes</h3>
                      <p className="mb-4">Classio intègre des protections contre les attaques web courantes :</p>
                      <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>
                          <strong>XSS (Cross-Site Scripting) :</strong> Échappement automatique des données dans React
                        </li>
                        <li>
                          <strong>CSRF (Cross-Site Request Forgery) :</strong> Tokens CSRF générés par NextAuth.js
                        </li>
                        <li>
                          <strong>Injection SQL :</strong> Utilisation de requêtes paramétrées et d'ORM
                        </li>
                        <li>
                          <strong>Clickjacking :</strong> En-têtes de sécurité appropriés
                        </li>
                      </ul>
                      <div className="bg-[#f5f0e8]/30 p-4 rounded-lg mb-6 border border-[#f5f0e8]">
                        <h4 className="font-bold mb-2">Conformité RGPD</h4>
                        <p>
                          Classio est conçu pour être conforme au Règlement Général sur la Protection des Données
                          (RGPD). Assurez-vous de configurer correctement les paramètres de confidentialité et de mettre
                          en place les procédures nécessaires pour respecter les droits des utilisateurs concernant
                          leurs données personnelles.
                        </p>
                      </div>
                      <h3 className="text-xl font-bold mt-6 mb-3">Bonnes pratiques de sécurité</h3>
                      <ol className="list-decimal pl-6 mb-4 space-y-2">
                        <li>Utilisez des mots de passe forts pour tous les comptes administrateurs</li>
                        <li>Activez l'authentification à deux facteurs lorsque c'est possible</li>
                        <li>Maintenez toutes les dépendances à jour pour éviter les vulnérabilités connues</li>
                        <li>Effectuez des audits de sécurité réguliers</li>
                        <li>Limitez les permissions des utilisateurs au strict nécessaire</li>
                        <li>Mettez en place une politique de sauvegarde régulière des données</li>
                      </ol>
                    </div>
                  </section>

                  {/* Troubleshooting */}
                  <section id="troubleshooting" className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-[#f5f0e8]">Dépannage</h2>
                    <div className="prose max-w-none">
                      <p className="mb-4">
                        Cette section fournit des solutions aux problèmes courants que vous pourriez rencontrer lors de
                        l'utilisation de Classio.
                      </p>
                      <h3 className="text-xl font-bold mt-6 mb-3">Problèmes d'installation</h3>
                      <div className="space-y-6">
                        <div className="bg-white p-4 rounded-lg border border-[#f5f0e8] shadow-sm">
                          <h4 className="font-bold mb-2">Erreur : "Module not found"</h4>
                          <p className="mb-2">
                            Cette erreur se produit généralement lorsqu'une dépendance n'est pas installée correctement.
                          </p>
                          <p className="font-medium">Solution :</p>
                          <ol className="list-decimal pl-6 mb-2 space-y-1">
                            <li>
                              Vérifiez que toutes les dépendances sont installées : <code>npm install</code>
                            </li>
                            <li>
                              Supprimez le dossier <code>node_modules</code> et réinstallez les dépendances
                            </li>
                            <li>Vérifiez que le chemin d'importation est correct</li>
                          </ol>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-[#f5f0e8] shadow-sm">
                          <h4 className="font-bold mb-2">Erreur : "NEXTAUTH_SECRET must be defined"</h4>
                          <p className="mb-2">
                            Cette erreur se produit lorsque la variable d'environnement NEXTAUTH_SECRET n'est pas
                            définie.
                          </p>
                          <p className="font-medium">Solution :</p>
                          <ol className="list-decimal pl-6 mb-2 space-y-1">
                            <li>
                              Créez un fichier <code>.env.local</code> à la racine du projet
                            </li>
                            <li>
                              Ajoutez la ligne <code>NEXTAUTH_SECRET=votre_secret</code>
                            </li>
                            <li>Redémarrez le serveur de développement</li>
                          </ol>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mt-6 mb-3">Problèmes d'authentification</h3>
                      <div className="space-y-6">
                        <div className="bg-white p-4 rounded-lg border border-[#f5f0e8] shadow-sm">
                          <h4 className="font-bold mb-2">Erreur : "Invalid credentials"</h4>
                          <p className="mb-2">
                            Cette erreur se produit lorsque les identifiants de connexion sont incorrects.
                          </p>
                          <p className="font-medium">Solution :</p>
                          <ol className="list-decimal pl-6 mb-2 space-y-1">
                            <li>Vérifiez que l'email et le mot de passe sont corrects</li>
                            <li>Assurez-vous que l'utilisateur existe dans la base de données</li>
                            <li>Vérifiez les logs du serveur pour plus de détails</li>
                          </ol>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-[#f5f0e8] shadow-sm">
                          <h4 className="font-bold mb-2">Erreur : "Session expired"</h4>
                          <p className="mb-2">Cette erreur se produit lorsque la session de l'utilisateur a expiré.</p>
                          <p className="font-medium">Solution :</p>
                          <ol className="list-decimal pl-6 mb-2 space-y-1">
                            <li>Reconnectez-vous à l'application</li>
                            <li>Augmentez la durée de vie des sessions dans la configuration de NextAuth.js</li>
                          </ol>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mt-6 mb-3">Problèmes de performance</h3>
                      <div className="space-y-6">
                        <div className="bg-white p-4 rounded-lg border border-[#f5f0e8] shadow-sm">
                          <h4 className="font-bold mb-2">Problème : "Application lente à charger"</h4>
                          <p className="mb-2">
                            Ce problème peut avoir plusieurs causes, notamment des composants non optimisés ou des
                            requêtes API inefficaces.
                          </p>
                          <p className="font-medium">Solution :</p>
                          <ol className="list-decimal pl-6 mb-2 space-y-1">
                            <li>Utilisez les Server Components de Next.js lorsque c'est possible</li>
                            <li>Optimisez les images avec next/image</li>
                            <li>Mettez en cache les résultats des requêtes API</li>
                            <li>Utilisez React.memo pour les composants qui se re-rendent fréquemment</li>
                          </ol>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mt-6 mb-3">Obtenir de l'aide</h3>
                      <p className="mb-4">
                        Si vous rencontrez un problème qui n'est pas couvert dans cette section, vous pouvez obtenir de
                        l'aide de plusieurs façons :
                      </p>
                      <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>
                          Consultez les{" "}
                          <a href="#" className="text-[#c83e3e] hover:underline">
                            forums de la communauté Classio
                          </a>
                        </li>
                        <li>
                          Ouvrez une issue sur le{" "}
                          <a href="#" className="text-[#c83e3e] hover:underline">
                            dépôt GitHub
                          </a>
                        </li>
                        <li>
                          Contactez le{" "}
                          <a href="#" className="text-[#c83e3e] hover:underline">
                            support technique
                          </a>{" "}
                          (pour les clients avec un abonnement)
                        </li>
                      </ul>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        <section className="py-16 bg-white">
          <div className="container max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ressources complémentaires</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Explorez ces ressources pour approfondir vos connaissances sur Classio et les technologies associées
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid gap-8 md:grid-cols-3"
            >
              <ResourceCard
                icon={<Book className="h-10 w-10 text-[#c83e3e]" />}
                title="Guide de l'utilisateur"
                description="Guide complet pour les utilisateurs finaux de Classio, avec des tutoriels étape par étape."
                link="#"
              />
              <ResourceCard
                icon={<Code className="h-10 w-10 text-[#c83e3e]" />}
                title="Référence API"
                description="Documentation technique détaillée de toutes les API disponibles dans Classio."
                link="#"
              />
              <ResourceCard
                icon={<Server className="h-10 w-10 text-[#c83e3e]" />}
                title="Guide de déploiement"
                description="Instructions détaillées pour déployer Classio dans différents environnements."
                link="#"
              />
            </motion.div>

            <div className="mt-16 text-center">
              <p className="text-gray-600 mb-6">
                Vous ne trouvez pas ce que vous cherchez ? Contactez notre équipe de support.
              </p>
              <Button className="bg-[#c83e3e] hover:bg-[#b53535] text-white">Contacter le support</Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

// Composant pour les liens de la sidebar
interface SidebarLinkProps {
  icon: React.ReactNode
  title: string
  active: boolean
  onClick: () => void
}

function SidebarLink({ icon, title, active, onClick }: SidebarLinkProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-3 py-2 rounded-lg text-sm transition-colors ${
        active ? "bg-[#c83e3e]/10 text-[#c83e3e] font-medium" : "hover:bg-[#f5f0e8] text-gray-700"
      }`}
    >
      <span className="mr-2">{icon}</span>
      {title}
    </button>
  )
}

// Composant pour les cartes de ressources
interface ResourceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  link: string
}

function ResourceCard({ icon, title, description, link }: ResourceCardProps) {
  return (
    <motion.div
      variants={fadeIn}
      className="bg-white rounded-xl overflow-hidden shadow-md border border-[#f5f0e8] group"
    >
      <div className="p-6">
        <div className="p-2 bg-[#f5f0e8] rounded-lg inline-block mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link href={link} className="inline-flex items-center text-[#c83e3e] font-medium hover:underline">
          Consulter
          <ExternalLink className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  )
}

