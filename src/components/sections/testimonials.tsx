"use client"

import { motion } from "framer-motion"
import TestimonialCard from "@/components/ui/testimonial-card"
import Image from "next/image"

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

export default function Testimonials() {
  return (
    <section id="temoignages" className="py-20 bg-gradient-to-b from-white to-[#f5f0e8]">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Ce que disent nos utilisateurs</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les témoignages des établissements qui utilisent Classio au quotidien
          </p>
        </motion.div>

        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#f5f0e8] max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <div className="flex mb-4">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                  </div>
                  <blockquote className="text-xl font-medium italic text-gray-900 mb-4">
                    "Classio a transformé notre façon de gérer l'établissement. L'intégration de toutes nos plateformes
                    en une seule a été un véritable gain de temps et d'efficacité pour toute l'équipe pédagogique."
                  </blockquote>
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-[#c83e3e]/20 flex items-center justify-center mr-4">
                      <span className="text-[#c83e3e] font-bold">JD</span>
                    </div>
                    <div>
                      <p className="font-bold">Jean Dupont</p>
                      <p className="text-sm text-gray-600">Directeur, Lycée International de Paris</p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="w-3 h-3 rounded-full bg-[#c83e3e]"></button>
                  <button className="w-3 h-3 rounded-full bg-gray-300"></button>
                  <button className="w-3 h-3 rounded-full bg-gray-300"></button>
                </div>
              </div>
              <div className="bg-[#f5f0e8] relative hidden md:block">
                <div className="absolute inset-0 bg-[#c83e3e]/5 backdrop-blur-sm"></div>
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="Témoignage"
                    width={400}
                    height={400}
                    className="rounded-lg shadow-lg object-cover h-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid gap-8 md:grid-cols-3"
        >
          <TestimonialCard
            quote="L'interface est intuitive et les élèves ont rapidement adopté la plateforme. Le support technique est également très réactif."
            author="Marie Lambert"
            role="Professeure, Collège Saint-Exupéry"
            rating={5}
            imageSrc="/placeholder.svg?height=100&width=100"
          />
          <TestimonialCard
            quote="En tant que parent, j'apprécie de pouvoir suivre la scolarité de mes enfants en temps réel. La communication avec les enseignants est beaucoup plus fluide."
            author="Sophie Martin"
            role="Parent d'élève"
            rating={4}
            imageSrc="/placeholder.svg?height=100&width=100"
          />
          <TestimonialCard
            quote="Nous avons réduit de 40% le temps consacré aux tâches administratives. Les enseignants peuvent se concentrer sur leur cœur de métier."
            author="Claire Dubois"
            role="Directrice adjointe, École primaire Les Peupliers"
            rating={5}
            imageSrc="/placeholder.svg?height=100&width=100"
          />
        </motion.div>
      </div>
    </section>
  )
}

