"use client"

import { motion } from "framer-motion"
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Users,
  BarChart,
  MessageSquare,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import FeatureCard from "@/components/ui/feature-card"

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

export default function FeaturesSection() {
  return (
    <section id="fonctionnalites" className="py-20 bg-white">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Toutes les fonctionnalités dont vous avez besoin
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Une plateforme complète qui simplifie la gestion scolaire et améliore la communication entre tous les
            acteurs
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <FeatureCard
            icon={<Calendar className="h-10 w-10 text-[#c83e3e]" />}
            title="Emplois du temps"
            description="Gestion flexible des emplois du temps avec synchronisation automatique pour tous les utilisateurs. Modification en temps réel et notifications de changements."
          />
          <FeatureCard
            icon={<BookOpen className="h-10 w-10 text-[#c83e3e]" />}
            title="Notes et évaluations"
            description="Suivi complet des performances avec tableaux de bord personnalisés pour élèves, parents et enseignants. Analyses statistiques et rapports détaillés."
          />
          <FeatureCard
            icon={<Clock className="h-10 w-10 text-[#c83e3e]" />}
            title="Présence et retards"
            description="Système de pointage numérique avec notifications instantanées et rapports détaillés. Gestion des justificatifs et suivi des absences récurrentes."
          />
          <FeatureCard
            icon={<Users className="h-10 w-10 text-[#c83e3e]" />}
            title="Collaboration"
            description="Outils de communication intégrés pour faciliter les échanges entre tous les membres de l'établissement. Visioconférences, messagerie et partage de documents."
          />
          <FeatureCard
            icon={<CheckCircle className="h-10 w-10 text-[#c83e3e]" />}
            title="Devoirs et rendus"
            description="Organisation et suivi des devoirs avec système de remise en ligne et correction simplifiée. Détection de plagiat et feedback personnalisé."
          />
          <FeatureCard
            icon={<BarChart className="h-10 w-10 text-[#c83e3e]" />}
            title="Statistiques avancées"
            description="Tableaux de bord analytiques pour suivre les performances des élèves, des classes et de l'établissement. Identification précoce des difficultés."
          />
          <FeatureCard
            icon={<MessageSquare className="h-10 w-10 text-[#c83e3e]" />}
            title="Communication parents"
            description="Portail dédié aux parents pour suivre la scolarité de leurs enfants. Prise de rendez-vous avec les enseignants et notifications personnalisées."
          />
          <FeatureCard
            icon={<FileText className="h-10 w-10 text-[#c83e3e]" />}
            title="Gestion documentaire"
            description="Centralisation de tous les documents administratifs et pédagogiques. Signatures électroniques et archivage sécurisé conforme au RGPD."
          />
          <motion.div
            variants={fadeIn}
            whileHover={{ scale: 1.03 }}
            className="relative overflow-hidden rounded-xl border border-[#f5f0e8] bg-white p-6 shadow-sm"
          >
            <div className="flex h-full flex-col justify-between">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border border-[#c83e3e]/20 bg-[#f5f0e8] px-3 py-1 text-xs font-medium text-[#c83e3e]">
                  Bientôt disponible
                </div>
                <h3 className="text-xl font-bold">Et bien plus encore...</h3>
                <p className="text-gray-600">
                  De nouvelles fonctionnalités sont régulièrement ajoutées selon vos besoins
                </p>
              </div>
              <Button
                variant="ghost"
                className="mt-4 justify-start p-0 text-[#c83e3e] hover:bg-transparent hover:text-[#b53535] group"
              >
                Suggérer une fonctionnalité
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

