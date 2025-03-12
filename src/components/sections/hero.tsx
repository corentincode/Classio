"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

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

export default function Hero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-white">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#f5f0e8] blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#f5f0e8] blur-3xl"></div>
      </div>
      <div className="container max-w-6xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid gap-8 md:grid-cols-2 md:gap-12 items-center"
        >
          <motion.div variants={fadeIn} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full border border-[#c83e3e]/20 bg-[#f5f0e8] px-4 py-1.5 text-sm font-medium text-[#c83e3e]"
            >
              <span>Nouveau</span>
              <div className="mx-2 h-1 w-1 rounded-full bg-[#c83e3e]"></div>
              <span>Tout-en-un pour les établissements scolaires</span>
            </motion.div>
            <motion.h1 variants={fadeIn} className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="text-[#c83e3e]">Une seule plateforme.</span> Toutes vos solutions éducatives.
            </motion.h1>
            <motion.p variants={fadeIn} className="text-xl text-gray-600">
              Classio réunit Pronote, Edusign et Teams en une seule application intuitive et puissante pour simplifier
              la gestion de votre établissement.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group relative overflow-hidden bg-[#c83e3e] hover:bg-[#b53535] text-white">
                <span className="relative z-10">Démarrer maintenant</span>
                <span className="absolute inset-0 bg-[#b53535] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
                <ArrowRight className="ml-2 h-4 w-4 relative z-10 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group border-[#c83e3e]/20 text-[#c83e3e] hover:bg-[#f5f0e8]"
              >
                <span>Demander une démo</span>
              </Button>
            </motion.div>
            <motion.div variants={fadeIn} className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="inline-block h-8 w-8 rounded-full bg-[#c83e3e]/80 ring-2 ring-white"
                  ></motion.div>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-medium">+200</span> établissements nous font confiance
              </p>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#f5f0e8] rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative mx-auto aspect-video overflow-hidden rounded-xl bg-white p-2 shadow-2xl border border-[#f5f0e8]">
              <div className="h-8 w-full bg-[#f5f0e8] flex items-center px-4 rounded-t-lg">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-3 gap-4 h-[calc(100%-2rem)]">
                  <div className="col-span-1 bg-[#f5f0e8] rounded-lg p-3">
                    <div className="h-5 w-20 bg-[#c83e3e]/20 rounded mb-3"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-[#c83e3e]/10 rounded"></div>
                      <div className="h-4 w-3/4 bg-[#c83e3e]/10 rounded"></div>
                      <div className="h-4 w-5/6 bg-[#c83e3e]/10 rounded"></div>
                    </div>
                  </div>
                  <div className="col-span-2 bg-white rounded-lg border border-[#f5f0e8] shadow-sm p-3">
                    <div className="h-5 w-32 bg-[#c83e3e]/20 rounded mb-3"></div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#f5f0e8] rounded-lg p-2">
                        <div className="h-4 w-full bg-[#c83e3e]/10 rounded mb-2"></div>
                        <div className="h-12 w-full bg-[#c83e3e]/10 rounded"></div>
                      </div>
                      <div className="bg-[#f5f0e8] rounded-lg p-2">
                        <div className="h-4 w-full bg-[#c83e3e]/10 rounded mb-2"></div>
                        <div className="h-12 w-full bg-[#c83e3e]/10 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <motion.div
              animate={{
                rotate: [0, 5, 0, -5, 0],
                y: [0, -5, 0, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
              className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-[#c83e3e]/10 blur-xl pointer-events-none"
            ></motion.div>
            <motion.div
              animate={{
                rotate: [0, -5, 0, 5, 0],
                y: [0, 5, 0, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
              className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-[#c83e3e]/10 blur-xl pointer-events-none"
            ></motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

