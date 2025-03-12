"use client"

import type React from "react"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Users, Award, BookOpen, Heart } from "lucide-react"
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

export default function AboutPage() {
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
                Notre mission : <span className="text-[#c83e3e]">Transformer l'éducation</span>
              </h1>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez l'histoire de Classio, notre équipe et notre vision pour l'avenir de l'éducation numérique.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-2xl overflow-hidden shadow-xl mb-20"
            >
              <div className="aspect-[21/9] relative">
                <Image
                  src="/placeholder.svg?height=600&width=1400"
                  alt="L'équipe Classio"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <h2 className="text-3xl font-bold mb-2">Une équipe passionnée</h2>
                  <p className="text-white/90 max-w-2xl">
                    Des experts en éducation et en technologie unis pour créer la meilleure solution pour les
                    établissements scolaires.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Notre Histoire */}
        <section className="py-20 bg-[#f5f0e8]/30">
          <div className="container max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Notre histoire</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                De l'idée à la réalité : comment Classio est devenu la référence des solutions éducatives.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold">Des débuts modestes</h3>
                  <p className="text-gray-600">
                    Fondée en 2018 par Corentin Adelé et Julian Mayer, Classio est née d'une vision simple : créer une
                    plateforme unique qui réunirait toutes les fonctionnalités nécessaires à la gestion d'un
                    établissement scolaire.
                  </p>
                  <p className="text-gray-600">
                    Après deux ans de développement et de tests intensifs dans 5 établissements pilotes, la première
                    version de Classio a été lancée en 2020, en pleine crise sanitaire, apportant une solution cruciale
                    à un moment où l'éducation numérique devenait indispensable.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-square relative rounded-2xl overflow-hidden shadow-lg border border-[#f5f0e8]">
                  <Image
                    src="/placeholder.svg?height=600&width=600"
                    alt="Les débuts de Classio"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-[#c83e3e]/10 blur-xl"></div>
              </motion.div>
            </div>

            <div className="mt-20 grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative order-2 md:order-1"
              >
                <div className="aspect-square relative rounded-2xl overflow-hidden shadow-lg border border-[#f5f0e8]">
                  <Image
                    src="/placeholder.svg?height=600&width=600"
                    alt="Classio aujourd'hui"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-[#c83e3e]/10 blur-xl"></div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="order-1 md:order-2"
              >
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold">Classio aujourd'hui</h3>
                  <p className="text-gray-600">
                    Aujourd'hui, Classio est utilisé par plus de 200 établissements en France et en Europe francophone,
                    de l'école primaire au lycée, en passant par les établissements spécialisés.
                  </p>
                  <p className="text-gray-600">
                    Notre équipe s'est agrandie progressivement avec des collaborateurs passionnés qui partagent notre
                    vision d'une éducation numérique accessible et efficace.
                  </p>
                  <p className="text-gray-600">
                    En 2023, Classio a été reconnue comme l'une des startups EdTech les plus innovantes, confirmant
                    notre position de leader dans le domaine des solutions éducatives intégrées.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Nos Valeurs */}
        <section className="py-20 bg-white">
          <div className="container max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Nos valeurs</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Les principes qui guident nos décisions et notre développement au quotidien.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
            >
              <ValueCard
                icon={<Users className="h-10 w-10 text-[#c83e3e]" />}
                title="Collaboration"
                description="Nous croyons au pouvoir de la collaboration entre tous les acteurs de l'éducation pour créer un environnement d'apprentissage optimal."
              />
              <ValueCard
                icon={<Award className="h-10 w-10 text-[#c83e3e]" />}
                title="Excellence"
                description="Nous visons l'excellence dans chaque aspect de notre produit et de notre service, pour offrir la meilleure expérience possible."
              />
              <ValueCard
                icon={<BookOpen className="h-10 w-10 text-[#c83e3e]" />}
                title="Innovation"
                description="Nous innovons constamment pour anticiper les besoins futurs de l'éducation et proposer des solutions toujours plus pertinentes."
              />
              <ValueCard
                icon={<Heart className="h-10 w-10 text-[#c83e3e]" />}
                title="Engagement"
                description="Nous sommes profondément engagés envers la réussite de chaque élève et le succès de chaque établissement qui nous fait confiance."
              />
            </motion.div>
          </div>
        </section>

        {/* Notre Équipe */}
        <section className="py-20 bg-[#f5f0e8]/30">
          <div className="container max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Les fondateurs</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Une équipe passionnée qui a créé Classio pour révolutionner la gestion des établissements scolaires.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid gap-12 md:grid-cols-2 max-w-3xl mx-auto"
            >
              <TeamMemberCard
                name="Corentin Adelé"
                role="Co-fondateur"
                bio="Expert en technologies éducatives, Corentin a fondé Classio avec la vision de simplifier la vie des établissements scolaires grâce à une solution tout-en-un intuitive."
                imageSrc="/placeholder.svg?height=400&width=400"
              />
              <TeamMemberCard
                name="Julian Mayer"
                role="Co-fondateur"
                bio="Passionné par l'innovation dans l'éducation, Julian apporte son expertise technique et pédagogique pour développer une plateforme qui répond aux besoins réels des écoles."
                imageSrc="/placeholder.svg?height=400&width=400"
              />
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-white">
          <div className="container max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-2xl bg-gradient-to-r from-[#c83e3e] to-[#c83e3e]/80 p-8 md:p-12 shadow-lg relative overflow-hidden text-center"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Rejoignez l'aventure Classio
                </h2>
                <p className="mt-4 text-lg text-white/90">
                  Nous sommes toujours à la recherche de talents passionnés pour nous aider à transformer l'éducation
                  numérique. Découvrez nos opportunités de carrière ou contactez-nous pour en savoir plus.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-[#c83e3e]">
                    Voir nos offres d'emploi
                  </Button>
                  <Button size="lg" variant="outline" className="bg-transparent border-white/20 text-white">
                    Contacter notre équipe
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

// Définition de l'interface pour les props de ValueCard
interface ValueCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

// Composant pour les cartes de valeurs
function ValueCard({ icon, title, description }: ValueCardProps) {
  return (
    <motion.div
      variants={fadeIn}
      className="relative overflow-hidden rounded-xl border border-[#f5f0e8] bg-white p-6 shadow-sm group"
    >
      <div className="absolute top-0 right-0 h-24 w-24 bg-[#f5f0e8] rounded-bl-full opacity-50"></div>
      <div className="relative z-10 space-y-4">
        <div className="p-2 bg-[#f5f0e8] rounded-lg inline-block">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  )
}

// Définition de l'interface pour les props de TeamMemberCard
interface TeamMemberCardProps {
  name: string
  role: string
  bio: string
  imageSrc: string
}

// Composant pour les cartes des membres de l'équipe
function TeamMemberCard({ name, role, bio, imageSrc }: TeamMemberCardProps) {
  return (
    <motion.div
      variants={fadeIn}
      className="relative overflow-hidden rounded-xl border border-[#f5f0e8] bg-white shadow-sm group"
    >
      <div className="aspect-square relative">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-6 space-y-2">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-[#c83e3e] font-medium">{role}</p>
        <p className="text-gray-600 text-sm">{bio}</p>
      </div>
    </motion.div>
  )
}

