"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CtaSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl bg-gradient-to-r from-[#c83e3e] to-[#c83e3e]/80 p-8 md:p-12 shadow-lg relative overflow-hidden"
        >
          <motion.div
            animate={{
              rotate: [0, 10, 0, -10, 0],
              scale: [1, 1.05, 1, 1.05, 1],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
            className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"
          ></motion.div>
          <motion.div
            animate={{
              rotate: [0, -10, 0, 10, 0],
              scale: [1, 1.05, 1, 1.05, 1],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
            className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"
          ></motion.div>
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Prêt à simplifier la gestion de votre établissement ?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Rejoignez les établissements qui ont déjà adopté Classio et découvrez comment notre solution peut
              transformer votre gestion scolaire. Démarrez votre essai gratuit dès aujourd'hui.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-[#c83e3e]">
                <span>Démarrer l'essai gratuit</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white/20 text-white">
                <span>Contacter l'équipe commerciale</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

