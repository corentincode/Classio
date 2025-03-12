"use client"

import { motion } from "framer-motion"

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

export default function LogosSection() {
  return (
    <section className="py-12 border-y border-[#f5f0e8] bg-white">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-xl font-medium text-gray-600">Remplace et intègre vos outils préférés</h2>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
        >
          <motion.div
            variants={fadeIn}
            whileHover={{ scale: 1.05 }}
            className="text-center opacity-70 hover:opacity-100 transition-opacity"
          >
            <div className="text-2xl font-bold text-[#c83e3e]">Pronote</div>
            <div className="text-xs text-gray-600">Gestion des notes</div>
          </motion.div>
          <motion.div
            variants={fadeIn}
            whileHover={{ scale: 1.05 }}
            className="text-center opacity-70 hover:opacity-100 transition-opacity"
          >
            <div className="text-2xl font-bold text-[#c83e3e]">Edusign</div>
            <div className="text-xs text-gray-600">Présence & signatures</div>
          </motion.div>
          <motion.div
            variants={fadeIn}
            whileHover={{ scale: 1.05 }}
            className="text-center opacity-70 hover:opacity-100 transition-opacity"
          >
            <div className="text-2xl font-bold text-[#c83e3e]">Teams</div>
            <div className="text-xs text-gray-600">Collaboration</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

