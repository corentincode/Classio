"use client"

import { motion } from "framer-motion"
import StepCard from "@/components/ui/step-card"

export default function HowItWorks() {
  return (
    <section id="avantages" className="py-20 bg-white">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Comment ça fonctionne</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Un processus simple pour intégrer Classio dans votre établissement
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-[#c83e3e]/20"></div>
          <div className="space-y-16 relative">
            <StepCard
              number="01"
              title="Souscription"
              description="Choisissez l'offre qui correspond à vos besoins et souscrivez en quelques clics. Notre équipe vous accompagne dans le choix de la formule adaptée à votre établissement."
              isLeft={true}
            />
            <StepCard
              number="02"
              title="Configuration"
              description="Recevez votre domaine personnalisé (votreecole.classio.fr) et les identifiants administrateur. Nous configurons votre environnement selon vos spécifications."
              isLeft={false}
            />
            <StepCard
              number="03"
              title="Création des comptes"
              description="L'administrateur crée les comptes pour le personnel, les enseignants et les élèves. Importation en masse possible depuis vos fichiers existants."
              isLeft={true}
            />
            <StepCard
              number="04"
              title="Formation et support"
              description="Bénéficiez d'une formation complète et d'un support dédié pour vous accompagner. Nos experts sont disponibles pour répondre à toutes vos questions."
              isLeft={false}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

