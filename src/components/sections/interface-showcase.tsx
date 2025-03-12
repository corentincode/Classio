"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function InterfaceShowcase() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#f5f0e8]">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Une interface intuitive et moderne
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les différentes facettes de Classio à travers notre interface utilisateur
          </p>
        </motion.div>

        <div className="flex flex-col space-y-4">
          <div className="flex justify-center space-x-4 mb-8">
            {["Tableau de bord", "Emploi du temps", "Notes", "Communication"].map((tab, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === index
                    ? "bg-[#c83e3e] text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-[#f5f0e8]"
                }`}
              >
                {tab}
              </motion.button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto w-full max-w-4xl aspect-[16/9] rounded-xl overflow-hidden shadow-2xl border border-[#f5f0e8]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#c83e3e]/10 via-white to-[#f5f0e8]/50 p-2">
              <div className="h-8 w-full bg-white flex items-center px-4 rounded-t-lg border-b border-[#f5f0e8]">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mx-auto text-sm font-medium text-gray-600">
                  {["Tableau de bord", "Emploi du temps", "Notes", "Communication"][activeTab]} - Classio
                </div>
              </div>
              <div className="h-[calc(100%-2rem)] w-full bg-white rounded-b-lg p-4">
                {activeTab === 0 && (
                  <div className="grid grid-cols-3 gap-4 h-full">
                    <div className="col-span-1 space-y-4">
                      <div className="bg-[#f5f0e8] rounded-lg p-4 h-1/3">
                        <div className="h-5 w-24 bg-[#c83e3e]/20 rounded mb-3"></div>
                        <div className="flex items-center justify-center h-20">
                          <div className="text-3xl font-bold text-[#c83e3e]">86%</div>
                        </div>
                        <div className="h-3 w-full bg-gray-200 rounded-full mt-2">
                          <div className="h-3 w-[86%] bg-[#c83e3e] rounded-full"></div>
                        </div>
                      </div>
                      <div className="bg-[#f5f0e8] rounded-lg p-4 h-2/3">
                        <div className="h-5 w-32 bg-[#c83e3e]/20 rounded mb-3"></div>
                        <div className="space-y-3">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center p-2 bg-white rounded-lg shadow-sm">
                              <div className="h-8 w-8 rounded-full bg-[#c83e3e]/20 mr-3"></div>
                              <div>
                                <div className="h-3 w-24 bg-gray-200 rounded"></div>
                                <div className="h-2 w-16 bg-gray-100 rounded mt-1"></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 space-y-4">
                      <div className="bg-white rounded-lg border border-[#f5f0e8] shadow-sm p-4 h-2/5">
                        <div className="h-5 w-40 bg-[#c83e3e]/20 rounded mb-3"></div>
                        <div className="grid grid-cols-7 gap-2 h-[calc(100%-2rem)]">
                          {Array(7)
                            .fill(0)
                            .map((_, i) => (
                              <div key={i} className="flex flex-col items-center">
                                <div className="text-xs text-gray-600 mb-1">
                                  {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"][i]}
                                </div>
                                <div
                                  className={`h-full w-full rounded-lg ${i === 2 ? "bg-[#c83e3e]/20" : "bg-gray-100"}`}
                                ></div>
                              </div>
                            ))}
                        </div>
                      </div>
                      <div className="bg-white rounded-lg border border-[#f5f0e8] shadow-sm p-4 h-3/5">
                        <div className="h-5 w-32 bg-[#c83e3e]/20 rounded mb-3"></div>
                        <div className="grid grid-cols-2 gap-4 h-[calc(100%-2rem)]">
                          <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                              <div key={i} className="p-3 bg-[#f5f0e8] rounded-lg">
                                <div className="flex justify-between mb-2">
                                  <div className="h-4 w-20 bg-[#c83e3e]/20 rounded"></div>
                                  <div className="h-4 w-12 bg-[#c83e3e]/10 rounded"></div>
                                </div>
                                <div className="h-12 w-full bg-white rounded-lg shadow-sm"></div>
                              </div>
                            ))}
                          </div>
                          <div className="bg-[#f5f0e8] rounded-lg p-4">
                            <div className="h-5 w-32 bg-[#c83e3e]/20 rounded mb-4"></div>
                            <div className="flex flex-col justify-center items-center h-[calc(100%-2rem)]">
                              <div className="h-32 w-32 rounded-full bg-[#c83e3e]/20 flex items-center justify-center">
                                <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center">
                                  <div className="text-2xl font-bold text-[#c83e3e]">92%</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 1 && (
                  <div className="grid grid-cols-7 gap-2 h-full">
                    {Array(7)
                      .fill(0)
                      .map((_, dayIndex) => (
                        <div key={dayIndex} className="flex flex-col">
                          <div className="text-center py-2 font-medium text-sm">
                            {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"][dayIndex]}
                          </div>
                          <div className="flex-1 space-y-2">
                            {dayIndex < 5 &&
                              Array(Math.floor(Math.random() * 4) + 1)
                                .fill(0)
                                .map((_, i) => (
                                  <div
                                    key={i}
                                    className={`p-2 rounded-lg text-xs ${
                                      ["bg-[#c83e3e]/20", "bg-[#f5f0e8]", "bg-blue-100", "bg-yellow-100"][i % 4]
                                    }`}
                                    style={{ height: `${Math.floor(Math.random() * 40) + 40}px` }}
                                  >
                                    <div className="font-medium">Cours {i + 1}</div>
                                  </div>
                                ))}
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                {activeTab === 2 && (
                  <div className="h-full flex flex-col">
                    <div className="flex justify-between mb-4">
                      <div className="flex space-x-2">
                        <div className="px-3 py-1 bg-[#c83e3e] text-white rounded-full text-xs">Trimestre 1</div>
                        <div className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">Trimestre 2</div>
                        <div className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">Trimestre 3</div>
                      </div>
                      <div className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">Filtrer</div>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="p-2 text-left text-xs font-medium text-gray-500">Matière</th>
                            <th className="p-2 text-center text-xs font-medium text-gray-500">Moyenne</th>
                            <th className="p-2 text-center text-xs font-medium text-gray-500">Classe</th>
                            <th className="p-2 text-center text-xs font-medium text-gray-500">Min</th>
                            <th className="p-2 text-center text-xs font-medium text-gray-500">Max</th>
                          </tr>
                        </thead>
                        <tbody>
                          {["Mathématiques", "Français", "Histoire", "Physique", "Anglais"].map((subject, i) => (
                            <tr key={i} className="border-b">
                              <td className="p-2 text-xs">{subject}</td>
                              <td className="p-2 text-center text-xs font-medium text-[#c83e3e]">
                                {12 + Math.floor(Math.random() * 8)}/20
                              </td>
                              <td className="p-2 text-center text-xs text-gray-500">
                                {10 + Math.floor(Math.random() * 6)}/20
                              </td>
                              <td className="p-2 text-center text-xs text-gray-500">
                                {8 + Math.floor(Math.random() * 4)}/20
                              </td>
                              <td className="p-2 text-center text-xs text-gray-500">
                                {14 + Math.floor(Math.random() * 6)}/20
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 3 && (
                  <div className="h-full flex">
                    <div className="w-1/4 border-r border-[#f5f0e8] p-2">
                      <div className="mb-4">
                        <div className="px-3 py-2 bg-[#f5f0e8] rounded-lg text-sm font-medium">Conversations</div>
                      </div>
                      <div className="space-y-2">
                        {["Équipe pédagogique", "Parents d'élèves", "Administration", "Classe de 3ème B"].map(
                          (chat, i) => (
                            <div
                              key={i}
                              className={`p-2 rounded-lg text-xs ${i === 1 ? "bg-[#c83e3e]/20" : "hover:bg-[#f5f0e8]"}`}
                            >
                              <div className="font-medium">{chat}</div>
                              <div className="text-gray-500 text-xs">Dernier message: il y a 2h</div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                    <div className="w-3/4 p-2 flex flex-col">
                      <div className="p-2 border-b border-[#f5f0e8]">
                        <div className="font-medium">Parents d'élèves</div>
                        <div className="text-xs text-gray-500">24 participants</div>
                      </div>
                      <div className="flex-1 p-2 space-y-3 overflow-y-auto">
                        {[1, 2, 3].map((msg, i) => (
                          <div key={i} className="flex gap-2">
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0"></div>
                            <div className="bg-[#f5f0e8] rounded-lg p-2 text-xs max-w-[80%]">
                              <div className="font-medium">Parent {i + 1}</div>
                              <div>Message de discussion {i + 1}</div>
                              <div className="text-right text-gray-500 text-[10px]">10:2{i} AM</div>
                            </div>
                          </div>
                        ))}
                        <div className="flex gap-2 justify-end">
                          <div className="bg-[#c83e3e]/20 rounded-lg p-2 text-xs max-w-[80%]">
                            <div>Réponse à la discussion</div>
                            <div className="text-right text-gray-500 text-[10px]">10:30 AM</div>
                          </div>
                          <div className="h-8 w-8 rounded-full bg-[#c83e3e]/30 flex-shrink-0"></div>
                        </div>
                      </div>
                      <div className="p-2 flex gap-2">
                        <input
                          type="text"
                          className="flex-1 px-3 py-2 rounded-lg border border-[#f5f0e8] text-sm"
                          placeholder="Écrivez votre message..."
                        />
                        <button className="px-3 py-2 bg-[#c83e3e] text-white rounded-lg text-sm">Envoyer</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

