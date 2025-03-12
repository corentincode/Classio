"use client"

import { motion } from "framer-motion"
import FaqItem from "@/components/ui/faq-item"

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

export default function FaqSection() {
  return (
    <section id="faq" className="py-20 bg-[#f5f0e8]/50">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Questions fréquentes</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">Tout ce que vous devez savoir sur Classio</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-3xl mx-auto space-y-4"
        >
          <FaqItem
            question="Comment fonctionne la période d'essai ?"
            answer="Vous bénéficiez d'un accès complet à toutes les fonctionnalités pendant 30 jours. Aucune carte de crédit n'est requise pour démarrer l'essai. À la fin de la période, vous pouvez choisir l'offre qui vous convient ou arrêter sans engagement."
          />
          <FaqItem
            question="Est-il possible de migrer nos données existantes ?"
            answer="Oui, nous proposons un service de migration depuis la plupart des plateformes éducatives (Pronote, Edusign, Teams, etc.). Notre équipe vous accompagne tout au long du processus pour garantir une transition en douceur."
          />
          <FaqItem
            question="Quelles sont les mesures de sécurité mises en place ?"
            answer="Classio respecte les normes les plus strictes en matière de sécurité des données. Toutes les informations sont chiffrées, nous effectuons des sauvegardes quotidiennes et nos serveurs sont hébergés en France, en conformité avec le RGPD."
          />
          <FaqItem
            question="Proposez-vous des formations pour les utilisateurs ?"
            answer="Absolument. Nous offrons des sessions de formation en ligne pour tous les utilisateurs, ainsi que des formations sur site pour les établissements qui le souhaitent. Des tutoriels vidéo et une documentation complète sont également disponibles."
          />
          <FaqItem
            question="Comment fonctionne le support technique ?"
            answer="Notre équipe de support est disponible par email, chat et téléphone selon votre forfait. Les clients Premium et Établissement bénéficient d'un support prioritaire avec des temps de réponse garantis."
          />
          <FaqItem
            question="Peut-on personnaliser l'interface aux couleurs de notre établissement ?"
            answer="Oui, les forfaits Premium et Établissement permettent de personnaliser l'interface avec votre logo et vos couleurs. Le forfait Établissement offre des options de personnalisation encore plus poussées."
          />
        </motion.div>
      </div>
    </section>
  )
}

