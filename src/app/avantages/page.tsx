"use client"

import { useState } from "react"

import type React from "react"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  Database,
  FileText,
  LineChart,
  MessageSquare,
  Shield,
  Smartphone,
  Users,
  Zap,
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

export default function AvantagesPage() {
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
                Les <span className="text-[#c83e3e]">avantages</span> de Classio
              </h1>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez comment Classio transforme la gestion scolaire et améliore l'expérience de tous les acteurs de
                l'éducation
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
                  alt="Avantages de Classio"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <h2 className="text-3xl font-bold mb-2">Une solution complète</h2>
                  <p className="text-white/90 max-w-2xl">
                    Classio réunit toutes les fonctionnalités essentielles pour les établissements scolaires en une
                    seule plateforme intuitive et puissante.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Key Benefits Section */}
        <section className="py-20 bg-[#f5f0e8]/30">
          <div className="container max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Avantages clés</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Classio offre de nombreux avantages qui font la différence au quotidien
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              <AdvantageCard
                icon={<Clock className="h-10 w-10 text-[#c83e3e]" />}
                title="Gain de temps considérable"
                description="Réduisez jusqu'à 40% le temps consacré aux tâches administratives grâce à l'automatisation et à la centralisation des informations."
              />
              <AdvantageCard
                icon={<Database className="h-10 w-10 text-[#c83e3e]" />}
                title="Centralisation des données"
                description="Toutes vos données sont centralisées et accessibles en un seul endroit, éliminant les silos d'information et les doublons."
              />
              <AdvantageCard
                icon={<MessageSquare className="h-10 w-10 text-[#c83e3e]" />}
                title="Communication améliorée"
                description="Facilitez les échanges entre enseignants, élèves, parents et administration grâce à des outils de communication intégrés."
              />
              <AdvantageCard
                icon={<Shield className="h-10 w-10 text-[#c83e3e]" />}
                title="Sécurité renforcée"
                description="Protégez les données sensibles avec un chiffrement de bout en bout et une conformité totale au RGPD."
              />
              <AdvantageCard
                icon={<LineChart className="h-10 w-10 text-[#c83e3e]" />}
                title="Suivi précis des performances"
                description="Analysez les performances des élèves et des classes avec des tableaux de bord intuitifs et des rapports détaillés."
              />
              <AdvantageCard
                icon={<Smartphone className="h-10 w-10 text-[#c83e3e]" />}
                title="Accessibilité mobile"
                description="Accédez à toutes les fonctionnalités depuis n'importe quel appareil, à tout moment et en tout lieu."
              />
            </motion.div>
          </div>
        </section>

        {/* For Each User Type */}
        <section className="py-20 bg-white">
          <div className="container max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Avantages pour chaque utilisateur</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Classio apporte des bénéfices spécifiques à chaque acteur de l'établissement
              </p>
            </motion.div>

            <div className="space-y-16">
              <UserTypeSection
                title="Pour les administrateurs"
                description="Simplifiez la gestion globale de votre établissement"
                imageSrc="/placeholder.svg?height=400&width=600"
                imageAlt="Administrateurs utilisant Classio"
                benefits={[
                  "Vue d'ensemble complète de l'établissement",
                  "Gestion simplifiée des emplois du temps",
                  "Suivi des absences et retards en temps réel",
                  "Rapports statistiques détaillés",
                  "Gestion documentaire centralisée",
                  "Communication facilitée avec tous les acteurs",
                ]}
                isImageRight={false}
              />

              <UserTypeSection
                title="Pour les enseignants"
                description="Concentrez-vous sur l'enseignement, pas sur l'administration"
                imageSrc="/placeholder.svg?height=400&width=600"
                imageAlt="Enseignants utilisant Classio"
                benefits={[
                  "Saisie et gestion des notes simplifiées",
                  "Suivi des présences automatisé",
                  "Communication directe avec les élèves et parents",
                  "Partage de ressources pédagogiques",
                  "Planification des cours et devoirs",
                  "Analyse des performances des élèves",
                ]}
                isImageRight={true}
              />

              <UserTypeSection
                title="Pour les élèves"
                description="Suivez votre scolarité et restez organisé"
                imageSrc="/placeholder.svg?height=400&width=600"
                imageAlt="Élèves utilisant Classio"
                benefits={[
                  "Accès à l'emploi du temps en temps réel",
                  "Consultation des notes et évaluations",
                  "Remise des devoirs en ligne",
                  "Communication avec les enseignants",
                  "Accès aux ressources pédagogiques",
                  "Suivi de la progression personnelle",
                ]}
                isImageRight={false}
              />

              <UserTypeSection
                title="Pour les parents"
                description="Restez impliqués dans la scolarité de vos enfants"
                imageSrc="/placeholder.svg?height=400&width=600"
                imageAlt="Parents utilisant Classio"
                benefits={[
                  "Suivi des notes et résultats en temps réel",
                  "Notifications d'absences et retards",
                  "Communication directe avec les enseignants",
                  "Consultation de l'emploi du temps",
                  "Suivi des devoirs et échéances",
                  "Prise de rendez-vous simplifiée",
                ]}
                isImageRight={true}
              />
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-20 bg-[#f5f0e8]/30">
          <div className="container max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Classio vs. Solutions traditionnelles</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez pourquoi Classio surpasse les solutions traditionnelles et fragmentées
              </p>
            </motion.div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-xl shadow-md border border-[#f5f0e8]">
                <thead>
                  <tr className="bg-[#f5f0e8]">
                    <th className="py-4 px-6 text-left font-bold">Fonctionnalité</th>
                    <th className="py-4 px-6 text-center font-bold">Classio</th>
                    <th className="py-4 px-6 text-center font-bold">Solutions traditionnelles</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#f5f0e8]">
                    <td className="py-4 px-6 font-medium">Intégration des fonctionnalités</td>
                    <td className="py-4 px-6 text-center text-green-600">
                      <CheckCircle className="inline h-5 w-5 mr-1" /> Tout-en-un
                    </td>
                    <td className="py-4 px-6 text-center text-gray-500">Multiples logiciels séparés</td>
                  </tr>
                  <tr className="border-b border-[#f5f0e8]">
                    <td className="py-4 px-6 font-medium">Facilité d'utilisation</td>
                    <td className="py-4 px-6 text-center text-green-600">
                      <CheckCircle className="inline h-5 w-5 mr-1" /> Interface intuitive
                    </td>
                    <td className="py-4 px-6 text-center text-gray-500">Interfaces complexes et disparates</td>
                  </tr>
                  <tr className="border-b border-[#f5f0e8]">
                    <td className="py-4 px-6 font-medium">Temps de formation</td>
                    <td className="py-4 px-6 text-center text-green-600">
                      <CheckCircle className="inline h-5 w-5 mr-1" /> Minimal (1-2 heures)
                    </td>
                    <td className="py-4 px-6 text-center text-gray-500">Important (plusieurs jours)</td>
                  </tr>
                  <tr className="border-b border-[#f5f0e8]">
                    <td className="py-4 px-6 font-medium">Accessibilité mobile</td>
                    <td className="py-4 px-6 text-center text-green-600">
                      <CheckCircle className="inline h-5 w-5 mr-1" /> Complète
                    </td>
                    <td className="py-4 px-6 text-center text-gray-500">Limitée ou inexistante</td>
                  </tr>
                  <tr className="border-b border-[#f5f0e8]">
                    <td className="py-4 px-6 font-medium">Mises à jour</td>
                    <td className="py-4 px-6 text-center text-green-600">
                      <CheckCircle className="inline h-5 w-5 mr-1" /> Automatiques et régulières
                    </td>
                    <td className="py-4 px-6 text-center text-gray-500">Manuelles et peu fréquentes</td>
                  </tr>
                  <tr className="border-b border-[#f5f0e8]">
                    <td className="py-4 px-6 font-medium">Coût total</td>
                    <td className="py-4 px-6 text-center text-green-600">
                      <CheckCircle className="inline h-5 w-5 mr-1" /> Abordable et prévisible
                    </td>
                    <td className="py-4 px-6 text-center text-gray-500">Élevé et variable</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium">Support technique</td>
                    <td className="py-4 px-6 text-center text-green-600">
                      <CheckCircle className="inline h-5 w-5 mr-1" /> Réactif et dédié
                    </td>
                    <td className="py-4 px-6 text-center text-gray-500">Lent et fragmenté</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ROI Section */}
        <section className="py-20 bg-white">
          <div className="container max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Retour sur investissement</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Classio offre un retour sur investissement rapide et mesurable
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold">Des économies concrètes</h3>
                  <p className="text-gray-600">En moyenne, les établissements qui utilisent Classio constatent :</p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Zap className="h-6 w-6 text-[#c83e3e] mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">40% de réduction</span> du temps consacré aux tâches administratives
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Zap className="h-6 w-6 text-[#c83e3e] mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">30% d'économies</span> sur les coûts logiciels par rapport à
                        l'utilisation de multiples solutions
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Zap className="h-6 w-6 text-[#c83e3e] mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">60% de réduction</span> des erreurs administratives grâce à la
                        centralisation des données
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Zap className="h-6 w-6 text-[#c83e3e] mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">50% d'amélioration</span> de la communication entre les différents
                        acteurs
                      </div>
                    </li>
                  </ul>
                  <p className="text-gray-600">
                    Ces économies se traduisent par un retour sur investissement généralement constaté en moins de 6
                    mois d'utilisation.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-[#f5f0e8]/30 rounded-xl p-8 border border-[#f5f0e8]">
                  <h3 className="text-2xl font-bold mb-6">Calculateur de ROI</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre d'élèves dans votre établissement
                      </label>
                      <input
                        type="number"
                        placeholder="Ex: 500"
                        className="w-full px-4 py-2 border border-[#f5f0e8] rounded-lg focus:ring-[#c83e3e] focus:border-[#c83e3e] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre d'heures administratives par semaine
                      </label>
                      <input
                        type="number"
                        placeholder="Ex: 40"
                        className="w-full px-4 py-2 border border-[#f5f0e8] rounded-lg focus:ring-[#c83e3e] focus:border-[#c83e3e] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Coût horaire moyen du personnel administratif (€)
                      </label>
                      <input
                        type="number"
                        placeholder="Ex: 25"
                        className="w-full px-4 py-2 border border-[#f5f0e8] rounded-lg focus:ring-[#c83e3e] focus:border-[#c83e3e] outline-none"
                      />
                    </div>
                    <Button className="w-full bg-[#c83e3e] hover:bg-[#b53535] text-white">
                      Calculer mon économie annuelle
                    </Button>
                    <div className="p-4 bg-white rounded-lg border border-[#f5f0e8] text-center">
                      <p className="text-sm text-gray-600 mb-1">Économie annuelle estimée</p>
                      <p className="text-3xl font-bold text-[#c83e3e]">€ 0</p>
                      <p className="text-xs text-gray-500 mt-1">Remplissez le formulaire pour obtenir une estimation</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-[#f5f0e8]/30">
          <div className="container max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ce que disent nos utilisateurs</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Des établissements qui ont transformé leur gestion grâce à Classio
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md border border-[#f5f0e8]"
              >
                <div className="flex items-start mb-4">
                  <div className="h-12 w-12 rounded-full bg-[#c83e3e]/20 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-[#c83e3e] font-bold">JD</span>
                  </div>
                  <div>
                    <p className="font-bold">Jean Dupont</p>
                    <p className="text-sm text-gray-600">Directeur, Lycée International de Paris</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Depuis que nous avons adopté Classio, la gestion administrative de notre établissement a été
                  complètement transformée. Nous avons gagné un temps précieux que nous pouvons désormais consacrer à
                  l'accompagnement pédagogique des élèves."
                </p>
                <div className="mt-4 text-sm text-gray-500">Utilisateur depuis 2 ans</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-xl p-6 shadow-md border border-[#f5f0e8]"
              >
                <div className="flex items-start mb-4">
                  <div className="h-12 w-12 rounded-full bg-[#c83e3e]/20 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-[#c83e3e] font-bold">ML</span>
                  </div>
                  <div>
                    <p className="font-bold">Marie Lambert</p>
                    <p className="text-sm text-gray-600">Professeure, Collège Saint-Exupéry</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "L'interface est intuitive et les élèves ont rapidement adopté la plateforme. Je peux désormais me
                  concentrer sur mon enseignement plutôt que sur les tâches administratives. Le support technique est
                  également très réactif."
                </p>
                <div className="mt-4 text-sm text-gray-500">Utilisatrice depuis 18 mois</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-xl p-6 shadow-md border border-[#f5f0e8]"
              >
                <div className="flex items-start mb-4">
                  <div className="h-12 w-12 rounded-full bg-[#c83e3e]/20 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-[#c83e3e] font-bold">SM</span>
                  </div>
                  <div>
                    <p className="font-bold">Sophie Martin</p>
                    <p className="text-sm text-gray-600">Parent d'élève</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "En tant que parent, j'apprécie de pouvoir suivre la scolarité de mes enfants en temps réel. La
                  communication avec les enseignants est beaucoup plus fluide et je me sens davantage impliquée dans
                  leur parcours scolaire."
                </p>
                <div className="mt-4 text-sm text-gray-500">Utilisatrice depuis 1 an</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-xl p-6 shadow-md border border-[#f5f0e8]"
              >
                <div className="flex items-start mb-4">
                  <div className="h-12 w-12 rounded-full bg-[#c83e3e]/20 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-[#c83e3e] font-bold">CD</span>
                  </div>
                  <div>
                    <p className="font-bold">Claire Dubois</p>
                    <p className="text-sm text-gray-600">Directrice adjointe, École primaire Les Peupliers</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Nous avons réduit de 40% le temps consacré aux tâches administratives. Les enseignants peuvent se
                  concentrer sur leur cœur de métier et la communication avec les parents s'est considérablement
                  améliorée."
                </p>
                <div className="mt-4 text-sm text-gray-500">Utilisatrice depuis 2 ans</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Questions fréquentes</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Tout ce que vous devez savoir sur les avantages de Classio
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="max-w-3xl mx-auto space-y-4"
            >
              <FaqItem
                question="Comment Classio peut-il réduire la charge administrative ?"
                answer="Classio automatise de nombreuses tâches administratives comme la gestion des présences, la création des emplois du temps et la génération de rapports. Cette automatisation permet de réduire jusqu'à 40% le temps consacré aux tâches administratives, permettant au personnel de se concentrer sur des activités à plus forte valeur ajoutée."
              />
              <FaqItem
                question="Combien de temps faut-il pour déployer Classio dans un établissement ?"
                answer="Le déploiement de Classio est rapide et efficace. Pour un établissement de taille moyenne, le processus complet prend généralement entre 2 et 4 semaines, incluant la configuration, l'importation des données et la formation des utilisateurs. Notre équipe vous accompagne à chaque étape pour assurer une transition en douceur."
              />
              <FaqItem
                question="Classio est-il compatible avec nos systèmes existants ?"
                answer="Oui, Classio a été conçu pour s'intégrer facilement avec les systèmes existants. Nous proposons des connecteurs pour les principales solutions utilisées dans l'éducation, permettant d'importer vos données existantes et de maintenir des synchronisations si nécessaire. Notre équipe technique peut également développer des connecteurs personnalisés selon vos besoins spécifiques."
              />
              <FaqItem
                question="Comment Classio protège-t-il les données sensibles ?"
                answer="La sécurité des données est notre priorité absolue. Classio utilise un chiffrement de bout en bout pour toutes les données, des contrôles d'accès stricts basés sur les rôles, et des audits de sécurité réguliers. Nous sommes entièrement conformes au RGPD et nos serveurs sont hébergés en France, garantissant que vos données restent sous la juridiction européenne."
              />
              <FaqItem
                question="Quelle formation est nécessaire pour utiliser Classio ?"
                answer="Classio est conçu pour être intuitif et facile à prendre en main. La plupart des utilisateurs peuvent commencer à utiliser les fonctionnalités de base après seulement 1 à 2 heures de formation. Nous proposons des sessions de formation en ligne, des tutoriels vidéo et une documentation complète. Pour les établissements qui le souhaitent, nous offrons également des formations sur site plus approfondies."
              />
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#f5f0e8]/30">
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
                  Prêt à transformer votre établissement ?
                </h2>
                <p className="mt-4 text-lg text-white/90">
                  Rejoignez les centaines d'établissements qui ont déjà adopté Classio et découvrez comment notre
                  solution peut répondre à vos besoins spécifiques.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-[#c83e3e]">
                    <span>Démarrer l'essai gratuit</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="bg-transparent border-white/20 text-white">
                    <span>Demander une démo</span>
                  </Button>
                </div>
                <p className="mt-6 text-sm text-white/80">
                  Essai gratuit de 30 jours • Aucune carte de crédit requise • Annulation à tout moment
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-20 bg-white">
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
                Découvrez comment Classio peut s'adapter à vos besoins spécifiques
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-md border border-[#f5f0e8] group"
              >
                <div className="p-6">
                  <div className="p-2 bg-[#f5f0e8] rounded-lg inline-block mb-4">
                    <FileText className="h-6 w-6 text-[#c83e3e]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Études de cas</h3>
                  <p className="text-gray-600 mb-4">
                    Découvrez comment d'autres établissements similaires au vôtre utilisent Classio et les résultats
                    qu'ils ont obtenus.
                  </p>
                  <Link
                    href="/ressources"
                    className="inline-flex items-center text-[#c83e3e] font-medium hover:underline"
                  >
                    Voir les études de cas
                    <ArrowRight className="ml-1 h-4 w-4" />
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
                <div className="p-6">
                  <div className="p-2 bg-[#f5f0e8] rounded-lg inline-block mb-4">
                    <Users className="h-6 w-6 text-[#c83e3e]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Témoignages vidéo</h3>
                  <p className="text-gray-600 mb-4">
                    Écoutez les témoignages de directeurs, enseignants, élèves et parents qui utilisent Classio au
                    quotidien.
                  </p>
                  <Link
                    href="/ressources"
                    className="inline-flex items-center text-[#c83e3e] font-medium hover:underline"
                  >
                    Regarder les témoignages
                    <ArrowRight className="ml-1 h-4 w-4" />
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
                <div className="p-6">
                  <div className="p-2 bg-[#f5f0e8] rounded-lg inline-block mb-4">
                    <LineChart className="h-6 w-6 text-[#c83e3e]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Rapport d'impact</h3>
                  <p className="text-gray-600 mb-4">
                    Consultez notre rapport détaillé sur l'impact de Classio dans les établissements scolaires et les
                    bénéfices mesurables.
                  </p>
                  <Link
                    href="/ressources"
                    className="inline-flex items-center text-[#c83e3e] font-medium hover:underline"
                  >
                    Télécharger le rapport
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

// Composant pour les cartes d'avantages
interface AdvantageCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function AdvantageCard({ icon, title, description }: AdvantageCardProps) {
  return (
    <motion.div
      variants={fadeIn}
      whileHover={{ scale: 1.03 }}
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

// Composant pour les sections par type d'utilisateur
interface UserTypeSectionProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  benefits: string[]
  isImageRight: boolean
}

function UserTypeSection({ title, description, imageSrc, imageAlt, benefits, isImageRight }: UserTypeSectionProps) {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: isImageRight ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`${isImageRight ? "order-1" : "order-1 md:order-2"}`}
      >
        <div className="space-y-6">
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-gray-600">{description}</p>
          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#c83e3e] mr-3 flex-shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: isImageRight ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`relative ${isImageRight ? "order-2" : "order-2 md:order-1"}`}
      >
        <div className="aspect-square relative rounded-2xl overflow-hidden shadow-lg border border-[#f5f0e8]">
          <Image src={imageSrc || "/placeholder.svg"} alt={imageAlt} fill className="object-cover" />
        </div>
        <div
          className={`absolute ${isImageRight ? "-bottom-6 -right-6" : "-bottom-6 -left-6"} h-24 w-24 rounded-full bg-[#c83e3e]/10 blur-xl`}
        ></div>
      </motion.div>
    </div>
  )
}

// Composant pour les éléments FAQ
interface FaqItemProps {
  question: string
  answer: string
}

function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div variants={fadeIn} className="border border-[#f5f0e8] rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-[#f5f0e8]/50 transition-colors"
      >
        <span className="font-medium">{question}</span>
        <ArrowRight className={`h-5 w-5 text-[#c83e3e] transition-transform ${isOpen ? "rotate-90" : ""}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-4 pt-0 text-gray-600">{answer}</div>
      </motion.div>
    </motion.div>
  )
}

