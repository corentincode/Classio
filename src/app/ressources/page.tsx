"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Search, FileText, Video, Download, BookOpen, ChevronRight, Play, Filter } from "lucide-react"
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

// Types pour les ressources
interface Resource {
  id: string
  title: string
  description: string
  type: "guide" | "video" | "document" | "tutorial"
  category: "debutant" | "intermediaire" | "avance" | "administrateur"
  image: string
  link: string
  date: string
}

export default function ResourcesPage() {
  // Données des ressources
  const resources: Resource[] = [
    {
      id: "1",
      title: "Guide de démarrage rapide",
      description: "Apprenez les bases de Classio et commencez à utiliser la plateforme en moins de 30 minutes.",
      type: "guide",
      category: "debutant",
      image: "/placeholder.svg?height=300&width=500",
      link: "#",
      date: "15 janvier 2023",
    },
    {
      id: "2",
      title: "Tutoriel vidéo : Gestion des emplois du temps",
      description: "Découvrez comment créer et modifier facilement les emplois du temps pour toutes les classes.",
      type: "video",
      category: "intermediaire",
      image: "/placeholder.svg?height=300&width=500",
      link: "#",
      date: "22 février 2023",
    },
    {
      id: "3",
      title: "Manuel d'administration",
      description: "Guide complet pour les administrateurs de Classio avec toutes les fonctionnalités avancées.",
      type: "document",
      category: "administrateur",
      image: "/placeholder.svg?height=300&width=500",
      link: "#",
      date: "10 mars 2023",
    },
    {
      id: "4",
      title: "Tutoriel : Système de notation",
      description: "Apprenez à configurer et utiliser le système de notation pour évaluer les élèves efficacement.",
      type: "tutorial",
      category: "intermediaire",
      image: "/placeholder.svg?height=300&width=500",
      link: "#",
      date: "5 avril 2023",
    },
    {
      id: "5",
      title: "Vidéo : Communication avec les parents",
      description: "Comment utiliser les outils de communication pour maintenir un lien efficace avec les parents.",
      type: "video",
      category: "debutant",
      image: "/placeholder.svg?height=300&width=500",
      link: "#",
      date: "18 mai 2023",
    },
    {
      id: "6",
      title: "Guide des fonctionnalités avancées",
      description: "Explorez les fonctionnalités avancées de Classio pour optimiser votre gestion scolaire.",
      type: "guide",
      category: "avance",
      image: "/placeholder.svg?height=300&width=500",
      link: "#",
      date: "7 juin 2023",
    },
    {
      id: "7",
      title: "Modèles de documents administratifs",
      description: "Téléchargez des modèles prêts à l'emploi pour vos documents administratifs.",
      type: "document",
      category: "administrateur",
      image: "/placeholder.svg?height=300&width=500",
      link: "#",
      date: "14 juillet 2023",
    },
    {
      id: "8",
      title: "Tutoriel : Analyse des performances",
      description: "Comment utiliser les outils d'analyse pour suivre les performances des élèves et des classes.",
      type: "tutorial",
      category: "avance",
      image: "/placeholder.svg?height=300&width=500",
      link: "#",
      date: "29 août 2023",
    },
  ]

  // État pour la recherche et le filtrage
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Filtrer les ressources
  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType ? resource.type === selectedType : true
    const matchesCategory = selectedCategory ? resource.category === selectedCategory : true

    return matchesSearch && matchesType && matchesCategory
  })

  // Fonction pour obtenir l'icône selon le type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "guide":
        return <BookOpen className="h-5 w-5" />
      case "video":
        return <Video className="h-5 w-5" />
      case "document":
        return <FileText className="h-5 w-5" />
      case "tutorial":
        return <Play className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  // Fonction pour obtenir le label du type
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "guide":
        return "Guide"
      case "video":
        return "Vidéo"
      case "document":
        return "Document"
      case "tutorial":
        return "Tutoriel"
      default:
        return type
    }
  }

  // Fonction pour obtenir le label de la catégorie
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "debutant":
        return "Débutant"
      case "intermediaire":
        return "Intermédiaire"
      case "avance":
        return "Avancé"
      case "administrateur":
        return "Administrateur"
      default:
        return category
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-white">
          <div className="container max-w-6xl mx-auto">
            <Link href="/" className="inline-flex items-center text-[#c83e3e] mb-8 hover:underline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
                Centre de <span className="text-[#c83e3e]">ressources</span>
              </h1>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Guides, tutoriels et documentation pour vous aider à tirer le meilleur parti de Classio.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Resources */}
        <section className="py-12 bg-[#f5f0e8]/30">
          <div className="container max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold mb-8"
            >
              Ressources populaires
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-md border border-[#f5f0e8] group"
              >
                <div className="relative h-48">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt="Guide de démarrage"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-[#c83e3e] text-white text-xs font-medium px-2 py-1 rounded-full">
                    Guide
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Guide de démarrage rapide</h3>
                  <p className="text-gray-600 mb-4">
                    Apprenez les bases de Classio et commencez à utiliser la plateforme en moins de 30 minutes.
                  </p>
                  <Link href="#" className="inline-flex items-center text-[#c83e3e] font-medium hover:underline">
                    Lire le guide
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-xl overflow-hidden shadow-md border border-[#f5f0e8] group"
              >
                <div className="relative h-48">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt="Tutoriel vidéo"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-[#c83e3e] text-white text-xs font-medium px-2 py-1 rounded-full">
                    Vidéo
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 bg-white/80 rounded-full flex items-center justify-center">
                      <Play className="h-8 w-8 text-[#c83e3e] ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Tutoriel vidéo : Gestion des emplois du temps</h3>
                  <p className="text-gray-600 mb-4">
                    Découvrez comment créer et modifier facilement les emplois du temps pour toutes les classes.
                  </p>
                  <Link href="#" className="inline-flex items-center text-[#c83e3e] font-medium hover:underline">
                    Regarder la vidéo
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-xl overflow-hidden shadow-md border border-[#f5f0e8] group"
              >
                <div className="relative h-48">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt="Documentation"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-[#c83e3e] text-white text-xs font-medium px-2 py-1 rounded-full">
                    Document
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Manuel d'administration</h3>
                  <p className="text-gray-600 mb-4">
                    Guide complet pour les administrateurs de Classio avec toutes les fonctionnalités avancées.
                  </p>
                  <Link href="#" className="inline-flex items-center text-[#c83e3e] font-medium hover:underline">
                    Télécharger le PDF
                    <Download className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-12 bg-white">
          <div className="container max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6 mb-12">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher des ressources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pl-12 border border-[#f5f0e8] rounded-lg focus:ring-[#c83e3e] focus:border-[#c83e3e] outline-none"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="relative">
                  <select
                    value={selectedType || ""}
                    onChange={(e) => setSelectedType(e.target.value || null)}
                    className="appearance-none px-4 py-3 pl-12 border border-[#f5f0e8] rounded-lg focus:ring-[#c83e3e] focus:border-[#c83e3e] outline-none pr-10"
                  >
                    <option value="">Tous les types</option>
                    <option value="guide">Guides</option>
                    <option value="video">Vidéos</option>
                    <option value="document">Documents</option>
                    <option value="tutorial">Tutoriels</option>
                  </select>
                  <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <ChevronRight className="absolute right-4 top-1/2 transform -translate-y-1/2 rotate-90 h-5 w-5 text-gray-400" />
                </div>
                <div className="relative">
                  <select
                    value={selectedCategory || ""}
                    onChange={(e) => setSelectedCategory(e.target.value || null)}
                    className="appearance-none px-4 py-3 pl-12 border border-[#f5f0e8] rounded-lg focus:ring-[#c83e3e] focus:border-[#c83e3e] outline-none pr-10"
                  >
                    <option value="">Tous les niveaux</option>
                    <option value="debutant">Débutant</option>
                    <option value="intermediaire">Intermédiaire</option>
                    <option value="avance">Avancé</option>
                    <option value="administrateur">Administrateur</option>
                  </select>
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <ChevronRight className="absolute right-4 top-1/2 transform -translate-y-1/2 rotate-90 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredResources.length > 0 ? (
                filteredResources.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    getTypeIcon={getTypeIcon}
                    getTypeLabel={getTypeLabel}
                    getCategoryLabel={getCategoryLabel}
                  />
                ))
              ) : (
                <div className="col-span-3 py-12 text-center">
                  <p className="text-gray-600 text-lg">Aucune ressource ne correspond à votre recherche.</p>
                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedType(null)
                      setSelectedCategory(null)
                    }}
                    variant="outline"
                    className="mt-4 border-[#c83e3e]/20 text-[#c83e3e] hover:bg-[#f5f0e8]"
                  >
                    Réinitialiser les filtres
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-[#f5f0e8]/30">
          <div className="container max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-md border border-[#f5f0e8] p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold mb-4">Restez informé</h2>
                  <p className="text-gray-600 mb-6">
                    Abonnez-vous à notre newsletter pour recevoir les dernières ressources, tutoriels et mises à jour de
                    Classio directement dans votre boîte de réception.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="Votre adresse email"
                      className="flex-1 px-4 py-3 border border-[#f5f0e8] rounded-lg focus:ring-[#c83e3e] focus:border-[#c83e3e] outline-none"
                    />
                    <Button className="bg-[#c83e3e] hover:bg-[#b53535] text-white">S'abonner</Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    En vous abonnant, vous acceptez de recevoir des emails de Classio. Vous pouvez vous désabonner à
                    tout moment.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative hidden md:block"
                >
                  <div className="aspect-[4/3] relative rounded-xl overflow-hidden">
                    <Image src="/placeholder.svg?height=400&width=600" alt="Newsletter" fill className="object-cover" />
                  </div>
                  <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-[#c83e3e]/10 blur-xl"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

// Composant pour les cartes de ressources
interface ResourceCardProps {
  resource: Resource
  getTypeIcon: (type: string) => React.ReactNode
  getTypeLabel: (type: string) => string
  getCategoryLabel: (category: string) => string
}

function ResourceCard({ resource, getTypeIcon, getTypeLabel, getCategoryLabel }: ResourceCardProps) {
  return (
    <motion.div
      variants={fadeIn}
      className="bg-white rounded-xl overflow-hidden shadow-md border border-[#f5f0e8] group h-full flex flex-col"
    >
      <div className="relative h-48">
        <Image
          src={resource.image || "/placeholder.svg"}
          alt={resource.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-[#c83e3e] text-white text-xs font-medium px-2 py-1 rounded-full">
          {getTypeLabel(resource.type)}
        </div>
        <div className="absolute top-4 right-4 bg-white/90 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
          {getCategoryLabel(resource.category)}
        </div>
        {resource.type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-16 w-16 bg-white/80 rounded-full flex items-center justify-center">
              <Play className="h-8 w-8 text-[#c83e3e] ml-1" />
            </div>
          </div>
        )}
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
        <p className="text-gray-600 mb-4 flex-1">{resource.description}</p>
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-[#f5f0e8]">
          <span className="text-sm text-gray-500">{resource.date}</span>
          <Link href={resource.link} className="inline-flex items-center text-[#c83e3e] font-medium hover:underline">
            {resource.type === "document" ? "Télécharger" : "Voir"}
            {resource.type === "document" ? (
              <Download className="ml-1 h-4 w-4" />
            ) : (
              <ChevronRight className="ml-1 h-4 w-4" />
            )}
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

