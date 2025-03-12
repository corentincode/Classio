"use client"

import { motion } from "framer-motion"
import { X, Check, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

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

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly")

  const pricingPlans = [
    {
      name: "Essentiel",
      description: "Idéal pour les petits établissements",
      monthlyPrice: "3,90 €",
      annualPrice: "3,50 €",
      priceDescription: "par élève/mois",
      features: [
        { name: "Jusqu'à 500 élèves", included: true },
        { name: "Gestion des notes et absences", included: true },
        { name: "Emploi du temps basique", included: true },
        { name: "Communication interne", included: true },
        { name: "Support par email", included: true },
        { name: "Statistiques avancées", included: false },
        { name: "Espace parents personnalisé", included: false },
        { name: "Formation sur site", included: false },
      ],
      cta: "Démarrer l'essai gratuit",
      popular: false,
    },
    {
      name: "Premium",
      description: "Pour les établissements en croissance",
      monthlyPrice: "5,90 €",
      annualPrice: "5,30 €",
      priceDescription: "par élève/mois",
      features: [
        { name: "Jusqu'à 1000 élèves", included: true },
        { name: "Gestion des notes et absences", included: true },
        { name: "Emploi du temps avancé", included: true },
        { name: "Communication interne", included: true },
        { name: "Support prioritaire", included: true },
        { name: "Statistiques avancées", included: true },
        { name: "Espace parents personnalisé", included: true },
        { name: "Formation sur site", included: false },
      ],
      cta: "Démarrer l'essai gratuit",
      popular: true,
    },
    {
      name: "Établissement",
      description: "Solution complète et personnalisée",
      monthlyPrice: "Sur mesure",
      annualPrice: "Sur mesure",
      priceDescription: "Contactez-nous",
      features: [
        { name: "Nombre d'élèves illimité", included: true },
        { name: "Gestion des notes et absences", included: true },
        { name: "Emploi du temps avancé", included: true },
        { name: "Communication interne", included: true },
        { name: "Support 24/7", included: true },
        { name: "Statistiques avancées", included: true },
        { name: "Espace parents personnalisé", included: true },
        { name: "Formation sur site", included: true },
      ],
      cta: "Contacter l'équipe commerciale",
      popular: false,
    },
  ]

  return (
    <section id="tarifs" className="py-20 bg-white">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Des offres adaptées à tous les établissements
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Choisissez la formule qui correspond à vos besoins et à votre budget
          </p>

          <div className="flex justify-center mt-8">
            <div className="bg-[#f5f0e8] p-1 rounded-full inline-flex">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  billingPeriod === "monthly"
                    ? "bg-white shadow-sm text-[#c83e3e]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Mensuel
              </button>
              <button
                onClick={() => setBillingPeriod("annual")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  billingPeriod === "annual" ? "bg-white shadow-sm text-[#c83e3e]" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Annuel <span className="text-xs text-[#c83e3e] font-normal">-10%</span>
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid gap-8 md:grid-cols-3"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              whileHover={{ scale: 1.03 }}
              className={`relative overflow-hidden rounded-xl border ${
                plan.popular ? "border-[#c83e3e] shadow-lg" : "border-[#f5f0e8]"
              } bg-white p-6`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="text-xs font-medium text-white bg-[#c83e3e] px-3 py-1 rounded-bl-lg">Populaire</div>
                </div>
              )}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
                </div>

                <div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">
                      {billingPeriod === "monthly" ? plan.monthlyPrice : plan.annualPrice}
                    </span>
                    {plan.name !== "Établissement" && (
                      <span className="text-sm text-gray-600 ml-2">{plan.priceDescription}</span>
                    )}
                  </div>
                  {plan.name === "Établissement" && (
                    <p className="text-sm text-gray-600 mt-1">{plan.priceDescription}</p>
                  )}
                </div>

                <div className="space-y-3 pt-4 border-t border-[#f5f0e8]">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-[#c83e3e] mr-2 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-gray-300 mr-2 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${feature.included ? "" : "text-gray-500"}`}>{feature.name}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full ${plan.popular ? "bg-[#c83e3e] hover:bg-[#b53535] text-white" : "border-[#c83e3e]/20 text-[#c83e3e] hover:bg-[#f5f0e8]"}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <div className="bg-[#f5f0e8] rounded-lg p-6 max-w-3xl mx-auto">
            <div className="flex items-start">
              <HelpCircle className="h-6 w-6 text-[#c83e3e] mr-3 flex-shrink-0 mt-1" />
              <div className="text-left">
                <h3 className="font-medium mb-2">Besoin d'aide pour choisir ?</h3>
                <p className="text-gray-600 mb-4">
                  Tous nos forfaits incluent un essai gratuit de 30 jours sans engagement. Notre équipe est disponible
                  pour vous aider à choisir la formule adaptée à vos besoins.
                </p>
                <Button variant="outline" size="sm" className="border-[#c83e3e]/20 text-[#c83e3e] hover:bg-[#f5f0e8]">
                  Prendre rendez-vous avec un conseiller
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

