"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Check, X, HelpCircle, Download, Shield, Clock, Users, Zap, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/sections/header"
import Footer from "@/components/sections/footer"
import React from "react"

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

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly")
  const [showComparison, setShowComparison] = useState(false)

  // Données des forfaits
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
      color: "bg-white",
      borderColor: "border-[#f5f0e8]",
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
      color: "bg-[#f5f0e8]",
      borderColor: "border-[#c83e3e]",
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
      color: "bg-white",
      borderColor: "border-[#f5f0e8]",
    },
  ]

  // Données de comparaison détaillée
  const comparisonFeatures = [
    {
      category: "Fonctionnalités de base",
      features: [
        { name: "Gestion des notes", essentiel: true, premium: true, etablissement: true },
        { name: "Gestion des absences", essentiel: true, premium: true, etablissement: true },
        { name: "Emploi du temps", essentiel: "Basique", premium: "Avancé", etablissement: "Avancé" },
        { name: "Communication interne", essentiel: true, premium: true, etablissement: true },
        { name: "Messagerie instantanée", essentiel: true, premium: true, etablissement: true },
      ],
    },
    {
      category: "Fonctionnalités avancées",
      features: [
        { name: "Statistiques et analyses", essentiel: false, premium: true, etablissement: true },
        { name: "Espace parents personnalisé", essentiel: false, premium: true, etablissement: true },
        { name: "Gestion documentaire", essentiel: "Basique", premium: "Avancé", etablissement: "Avancé" },
        { name: "Intégration calendrier", essentiel: true, premium: true, etablissement: true },
        { name: "Notifications personnalisées", essentiel: false, premium: true, etablissement: true },
      ],
    },
    {
      category: "Support et formation",
      features: [
        { name: "Support technique", essentiel: "Email", premium: "Email & Téléphone", etablissement: "24/7 Dédié" },
        { name: "Temps de réponse", essentiel: "48h", premium: "24h", etablissement: "4h" },
        { name: "Formation en ligne", essentiel: "Basique", premium: "Complète", etablissement: "Complète" },
        { name: "Formation sur site", essentiel: false, premium: "En option", etablissement: true },
        { name: "Gestionnaire de compte dédié", essentiel: false, premium: false, etablissement: true },
      ],
    },
    {
      category: "Personnalisation",
      features: [
        { name: "Logo et couleurs", essentiel: false, premium: true, etablissement: true },
        { name: "Domaine personnalisé", essentiel: false, premium: true, etablissement: true },
        { name: "Modules personnalisés", essentiel: false, premium: "En option", etablissement: true },
        { name: "API d'intégration", essentiel: false, premium: "Limitée", etablissement: "Complète" },
        { name: "Rapports personnalisés", essentiel: false, premium: "Limités", etablissement: "Illimités" },
      ],
    },
  ]

  // FAQ sur la tarification
  const pricingFaqs = [
    {
      question: "Comment fonctionne la tarification par élève ?",
      answer:
        "Notre tarification est basée sur le nombre d'élèves inscrits dans votre établissement. Vous ne payez que pour les élèves actifs, ce qui rend notre solution économique et adaptée à votre taille. Les comptes pour les enseignants et le personnel administratif sont inclus sans frais supplémentaires.",
    },
    {
      question: "Puis-je changer de forfait en cours d'année ?",
      answer:
        "Oui, vous pouvez passer à un forfait supérieur à tout moment. Le changement prend effet immédiatement et la facturation est ajustée au prorata. Pour passer à un forfait inférieur, le changement prendra effet à la fin de votre période de facturation en cours.",
    },
    {
      question: "Y a-t-il des frais de mise en service ?",
      answer:
        "Non, il n'y a aucun frais de mise en service pour les forfaits Essentiel et Premium. Pour le forfait Établissement, des frais peuvent s'appliquer selon le niveau de personnalisation et d'intégration requis, mais ils sont toujours discutés et approuvés à l'avance.",
    },
    {
      question: "Proposez-vous des remises pour les établissements publics ?",
      answer:
        "Oui, nous proposons des tarifs spéciaux pour les établissements publics et les groupes scolaires. Contactez notre équipe commerciale pour discuter de votre situation spécifique et obtenir un devis personnalisé.",
    },
    {
      question: "Que se passe-t-il à la fin de la période d'essai ?",
      answer:
        "À la fin de votre période d'essai de 30 jours, vous pouvez choisir le forfait qui vous convient et commencer votre abonnement. Si vous décidez de ne pas continuer, votre compte sera automatiquement désactivé sans aucun frais. Vos données sont conservées pendant 30 jours supplémentaires au cas où vous changeriez d'avis.",
    },
  ]

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
                Tarifs <span className="text-[#c83e3e]">transparents</span> et flexibles
              </h1>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Des forfaits adaptés à tous les établissements, quelle que soit leur taille ou leurs besoins
                spécifiques.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-12 bg-[#f5f0e8]/30">
          <div className="container max-w-6xl mx-auto">
            <div className="flex justify-center mb-12">
              <div className="bg-white p-1 rounded-full inline-flex shadow-sm">
                <button
                  onClick={() => setBillingPeriod("monthly")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    billingPeriod === "monthly"
                      ? "bg-[#c83e3e] text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Mensuel
                </button>
                <button
                  onClick={() => setBillingPeriod("annual")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    billingPeriod === "annual"
                      ? "bg-[#c83e3e] text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Annuel <span className="text-xs font-normal">-10%</span>
                </button>
              </div>
            </div>

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
                  whileHover={{ scale: 1.02 }}
                  className={`relative overflow-hidden rounded-xl border ${
                    plan.popular ? plan.borderColor + " shadow-lg" : plan.borderColor
                  } ${plan.color} p-6`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0">
                      <div className="text-xs font-medium text-white bg-[#c83e3e] px-3 py-1 rounded-bl-lg">
                        Populaire
                      </div>
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
                      className={`w-full ${
                        plan.popular
                          ? "bg-[#c83e3e] hover:bg-[#b53535] text-white"
                          : "border-[#c83e3e]/20 text-[#c83e3e] hover:bg-[#f5f0e8]"
                      }`}
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
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 text-center"
            >
              <Button
                onClick={() => setShowComparison(!showComparison)}
                variant="outline"
                className="border-[#c83e3e]/20 text-[#c83e3e] hover:bg-[#f5f0e8]"
              >
                {showComparison ? "Masquer la comparaison détaillée" : "Voir la comparaison détaillée"}
                <ArrowRight className={`ml-2 h-4 w-4 transition-transform ${showComparison ? "rotate-90" : ""}`} />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Comparison Table */}
        <motion.section
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: showComparison ? "auto" : 0,
            opacity: showComparison ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="py-0 bg-white overflow-hidden"
        >
          <div className="container max-w-6xl mx-auto py-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showComparison ? 1 : 0, y: showComparison ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl font-bold mb-8 text-center"
            >
              Comparaison détaillée des fonctionnalités
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showComparison ? 1 : 0, y: showComparison ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="overflow-x-auto"
            >
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#f5f0e8]">
                    <th className="p-4 text-left font-medium text-gray-700 border-b border-[#f5f0e8]">
                      Fonctionnalité
                    </th>
                    <th className="p-4 text-center font-medium text-gray-700 border-b border-[#f5f0e8]">Essentiel</th>
                    <th className="p-4 text-center font-medium text-gray-700 border-b border-[#f5f0e8] bg-[#f5f0e8]/80">
                      Premium
                    </th>
                    <th className="p-4 text-center font-medium text-gray-700 border-b border-[#f5f0e8]">
                      Établissement
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((category, categoryIndex) => (
                    <React.Fragment key={`category-group-${categoryIndex}`}>
                      <tr className="bg-[#f5f0e8]/30">
                        <td colSpan={4} className="p-3 font-medium">
                          {category.category}
                        </td>
                      </tr>
                      {category.features.map((feature, featureIndex) => (
                        <motion.tr
                          key={`feature-${categoryIndex}-${featureIndex}`}
                          className="border-b border-[#f5f0e8]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.1 * (featureIndex + categoryIndex * 5) }}
                        >
                          <td className="p-4 text-gray-700">{feature.name}</td>
                          <td className="p-4 text-center">
                            {typeof feature.essentiel === "boolean" ? (
                              feature.essentiel ? (
                                <Check className="h-5 w-5 text-[#c83e3e] mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-gray-300 mx-auto" />
                              )
                            ) : (
                              <span className="text-sm">{feature.essentiel}</span>
                            )}
                          </td>
                          <td className="p-4 text-center bg-[#f5f0e8]/20">
                            {typeof feature.premium === "boolean" ? (
                              feature.premium ? (
                                <Check className="h-5 w-5 text-[#c83e3e] mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-gray-300 mx-auto" />
                              )
                            ) : (
                              <span className="text-sm">{feature.premium}</span>
                            )}
                          </td>
                          <td className="p-4 text-center">
                            {typeof feature.etablissement === "boolean" ? (
                              feature.etablissement ? (
                                <Check className="h-5 w-5 text-[#c83e3e] mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-gray-300 mx-auto" />
                              )
                            ) : (
                              <span className="text-sm">{feature.etablissement}</span>
                            )}
                          </td>
                        </motion.tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </motion.section>

        {/* Benefits Section */}
        <section className="py-16 bg-[#f5f0e8]/30">
          <div className="container max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Tous nos forfaits incluent</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Des avantages essentiels pour vous garantir une expérience optimale
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
            >
              <BenefitCard
                icon={<Shield className="h-10 w-10 text-[#c83e3e]" />}
                title="Sécurité maximale"
                description="Toutes vos données sont chiffrées et sécurisées selon les normes les plus strictes. Conformité RGPD garantie."
              />
              <BenefitCard
                icon={<Clock className="h-10 w-10 text-[#c83e3e]" />}
                title="Essai gratuit de 30 jours"
                description="Testez toutes les fonctionnalités sans engagement pendant 30 jours. Aucune carte de crédit requise."
              />
              <BenefitCard
                icon={<Users className="h-10 w-10 text-[#c83e3e]" />}
                title="Comptes illimités"
                description="Nombre illimité de comptes pour les enseignants et le personnel administratif, quel que soit votre forfait."
              />
              <BenefitCard
                icon={<Zap className="h-10 w-10 text-[#c83e3e]" />}
                title="Mises à jour régulières"
                description="Accédez aux dernières fonctionnalités et améliorations sans frais supplémentaires."
              />
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Questions fréquentes sur la tarification
              </h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Tout ce que vous devez savoir sur nos forfaits et conditions
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="max-w-3xl mx-auto space-y-6"
            >
              {pricingFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="bg-[#f5f0e8]/30 rounded-xl p-6 border border-[#f5f0e8]"
                >
                  <h3 className="text-lg font-bold mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#f5f0e8]/30">
          <div className="container max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-2xl bg-gradient-to-r from-[#c83e3e] to-[#c83e3e]/80 p-8 md:p-12 shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

              <div className="relative z-10 max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Prêt à transformer votre établissement ?
                </h2>
                <p className="mt-4 text-lg text-white/90">
                  Démarrez votre essai gratuit de 30 jours dès maintenant. Aucune carte de crédit requise.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-[#c83e3e]">
                    <span>Démarrer l'essai gratuit</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="bg-transparent border-white/20 text-white">
                    <span>Contacter l'équipe commerciale</span>
                  </Button>
                </div>
                <p className="mt-6 text-sm text-white/80">
                  Vous avez des questions ? Appelez-nous au <span className="font-medium">+33 1 23 45 67 89</span>
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Resources Section */}
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
                    <Download className="h-6 w-6 text-[#c83e3e]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Guide de tarification</h3>
                  <p className="text-gray-600 mb-4">
                    Téléchargez notre guide complet de tarification avec des exemples concrets pour différents types
                    d'établissements.
                  </p>
                  <Link href="#" className="inline-flex items-center text-[#c83e3e] font-medium hover:underline">
                    Télécharger le PDF
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
                  <h3 className="text-xl font-bold mb-2">Études de cas</h3>
                  <p className="text-gray-600 mb-4">
                    Découvrez comment d'autres établissements similaires au vôtre utilisent Classio et les résultats
                    qu'ils ont obtenus.
                  </p>
                  <Link href="#" className="inline-flex items-center text-[#c83e3e] font-medium hover:underline">
                    Voir les études de cas
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
                    <HelpCircle className="h-6 w-6 text-[#c83e3e]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Consultation personnalisée</h3>
                  <p className="text-gray-600 mb-4">
                    Prenez rendez-vous avec un conseiller pour discuter de vos besoins spécifiques et obtenir un devis
                    sur mesure.
                  </p>
                  <Link href="#" className="inline-flex items-center text-[#c83e3e] font-medium hover:underline">
                    Prendre rendez-vous
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
interface BenefitCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function BenefitCard({ icon, title, description }: BenefitCardProps) {
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

