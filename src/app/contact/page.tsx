"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"
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

// Types pour le formulaire
interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    // Simuler un envoi de formulaire
    try {
      // Dans un cas réel, vous feriez un appel API ici
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (err) {
      setError("Une erreur est survenue lors de l'envoi du formulaire. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
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
                Contactez <span className="text-[#c83e3e]">Classio</span>
              </h1>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Nous sommes à votre écoute pour répondre à vos questions et vous accompagner dans votre projet.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-12 bg-[#f5f0e8]/30">
          <div className="container max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Informations de contact */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-6">Nos coordonnées</h2>
                  <p className="text-gray-600 mb-8">
                    N'hésitez pas à nous contacter directement par téléphone, email ou en nous rendant visite dans nos
                    bureaux.
                  </p>
                </div>

                <div className="space-y-6">
                  <ContactInfo
                    icon={<Phone className="h-6 w-6 text-[#c83e3e]" />}
                    title="Téléphone"
                    content="+33 1 23 45 67 89"
                    link="tel:+33123456789"
                  />

                  <ContactInfo
                    icon={<Mail className="h-6 w-6 text-[#c83e3e]" />}
                    title="Email"
                    content="contact@classio.fr"
                    link="mailto:contact@classio.fr"
                  />

                  <ContactInfo
                    icon={<MapPin className="h-6 w-6 text-[#c83e3e]" />}
                    title="Adresse"
                    content="123 Rue de la Liberté, 75001 Paris, France"
                    link="https://maps.google.com/?q=123+Rue+de+la+Liberté,+75001+Paris,+France"
                  />
                </div>

                <div className="pt-6">
                  <h3 className="text-xl font-bold mb-4">Horaires d'ouverture</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>Lundi - Vendredi: 9h00 - 18h00</p>
                    <p>Samedi - Dimanche: Fermé</p>
                  </div>
                </div>
              </motion.div>

              {/* Formulaire de contact */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-white rounded-xl shadow-lg border border-[#f5f0e8] p-8">
                  <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Message envoyé !</h3>
                      <p className="text-gray-600 mb-6">
                        Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.
                      </p>
                      <Button
                        onClick={() => setIsSubmitted(false)}
                        className="bg-[#c83e3e] hover:bg-[#b53535] text-white"
                      >
                        Envoyer un autre message
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Nom complet
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-[#f5f0e8] rounded-lg focus:ring-[#c83e3e] focus:border-[#c83e3e] outline-none"
                            placeholder="Votre nom"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-[#f5f0e8] rounded-lg focus:ring-[#c83e3e] focus:border-[#c83e3e] outline-none"
                            placeholder="votre@email.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                          Sujet
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formState.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-[#f5f0e8] rounded-lg focus:ring-[#c83e3e] focus:border-[#c83e3e] outline-none"
                        >
                          <option value="">Sélectionnez un sujet</option>
                          <option value="demo">Demande de démonstration</option>
                          <option value="pricing">Informations sur les tarifs</option>
                          <option value="support">Support technique</option>
                          <option value="partnership">Partenariat</option>
                          <option value="other">Autre</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full px-4 py-2 border border-[#f5f0e8] rounded-lg focus:ring-[#c83e3e] focus:border-[#c83e3e] outline-none resize-none"
                          placeholder="Comment pouvons-nous vous aider ?"
                        ></textarea>
                      </div>

                      {error && (
                        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">{error}</div>
                      )}

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#c83e3e] hover:bg-[#b53535] text-white flex items-center justify-center"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Envoi en cours...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            Envoyer le message
                            <Send className="ml-2 h-4 w-4" />
                          </span>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
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
                Vous avez des questions ? Nous avons les réponses.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto"
            >
              <FaqCard
                question="Comment puis-je obtenir une démonstration de Classio ?"
                answer="Vous pouvez demander une démonstration en remplissant le formulaire de contact ci-dessus ou en nous appelant directement. Un membre de notre équipe vous contactera pour organiser une session personnalisée."
              />
              <FaqCard
                question="Combien de temps dure la période d'essai ?"
                answer="La période d'essai gratuite de Classio dure 30 jours, sans engagement. Vous aurez accès à toutes les fonctionnalités pendant cette période."
              />
              <FaqCard
                question="Proposez-vous des formations pour les utilisateurs ?"
                answer="Oui, nous proposons des sessions de formation en ligne pour tous les utilisateurs, ainsi que des formations sur site pour les établissements qui le souhaitent."
              />
              <FaqCard
                question="Comment fonctionne le support technique ?"
                answer="Notre équipe de support est disponible par email, chat et téléphone selon votre forfait. Les clients Premium et Établissement bénéficient d'un support prioritaire."
              />
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

// Composant pour les informations de contact
interface ContactInfoProps {
  icon: React.ReactNode
  title: string
  content: string
  link: string
}

function ContactInfo({ icon, title, content, link }: ContactInfoProps) {
  return (
    <div className="flex items-start">
      <div className="p-3 bg-[#f5f0e8] rounded-lg mr-4">{icon}</div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <a
          href={link}
          className="text-gray-600 hover:text-[#c83e3e] transition-colors"
          target={link.startsWith("http") ? "_blank" : undefined}
          rel={link.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {content}
        </a>
      </div>
    </div>
  )
}

// Composant pour les cartes FAQ
interface FaqCardProps {
  question: string
  answer: string
}

function FaqCard({ question, answer }: FaqCardProps) {
  return (
    <motion.div variants={fadeIn} className="bg-[#f5f0e8]/30 rounded-xl p-6 border border-[#f5f0e8]">
      <h3 className="text-lg font-bold mb-3">{question}</h3>
      <p className="text-gray-600">{answer}</p>
    </motion.div>
  )
}

