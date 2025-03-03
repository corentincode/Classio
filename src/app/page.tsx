"use client"

import type React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import {
  BookOpen,
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  MessageSquare,
  Settings,
  User,
  School,
  Bell,
  BarChart,
  Folder,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="w-full">
        <div className="overflow-hidden bg-white">
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr]">
            {/* Sidebar */}
            <div className="border-r p-6">
              <div className="flex items-center gap-2 pb-6">
                <School className="h-8 w-8" />
                <h1 className="text-2xl font-bold">Classio</h1>
              </div>

              <nav className="space-y-1">
                <NavItem icon={<LayoutDashboard className="h-5 w-5" />} label="Tableau de bord" />
                <NavItem icon={<BookOpen className="h-5 w-5" />} label="Cours" />
                <NavItem icon={<Calendar className="h-5 w-5" />} label="Emploi du temps" />
                <NavItem icon={<Users className="h-5 w-5" />} label="Élèves" />
                <NavItem icon={<User className="h-5 w-5" />} label="Professeurs" />
                <NavItem icon={<FileText className="h-5 w-5" />} label="Documents" />
                <NavItem icon={<MessageSquare className="h-5 w-5" />} label="Messages" />
                <NavItem icon={<Bell className="h-5 w-5" />} label="Notifications" />
                <NavItem icon={<BarChart className="h-5 w-5" />} label="Statistiques" />
                <NavItem icon={<Folder className="h-5 w-5" />} label="Ressources" />
                <NavItem icon={<Settings className="h-5 w-5" />} label="Paramètres" />
              </nav>
            </div>

            {/* Main Content */}
            <div className="p-0">
              {/* Header */}
              <header className="flex items-center justify-between border-b p-6">
                <h2 className="text-xl font-bold">#CLASSIO PROJET</h2>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                </div>
              </header>

              {/* Project Overview */}
              <div className="p-6">
                <div className="mb-8">
                  <h3 className="text-lg font-medium">Présentation du projet</h3>
                  <p className="mt-2 text-gray-600">
                    Classio a été conçue dans le but de centraliser la gestion des formations et des interactions entre
                    élèves et professeurs.
                  </p>
                </div>

                {/* Objectives */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium">Objectifs</h3>
                  <ul className="mt-2 list-inside space-y-1 text-gray-600">
                    <li>• Offrir une plateforme intuitive permettant la gestion des formations.</li>
                    <li>• Faciliter la communication entre élèves et enseignants.</li>
                    <li>• Centraliser les ressources pédagogiques et administratives.</li>
                  </ul>
                </div>

                {/* Stats Cards */}
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <StatsCard title="Utilisateurs" value="1,250" subtitle="Élèves et professeurs" />
                  <StatsCard title="Cours" value="48" subtitle="Formations actives" />
                  <StatsCard title="Documents" value="320" subtitle="Ressources partagées" />
                  <StatsCard title="Messages" value="1,840" subtitle="Échanges cette semaine" />
                </div>

                {/* Stakeholders */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium">Parties prenantes</h3>
                  <p className="mt-2 text-gray-600">
                    <strong>Public cible :</strong> Le projet est adapté à tout type de structure éducative, allant des
                    écoles primaires jusqu'à l'enseignement supérieur.
                  </p>

                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium">Élèves</h4>
                        <p className="text-sm text-gray-600">
                          Accès aux cours, emploi du temps, documents, discussions avec les professeurs.
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium">Parents</h4>
                        <p className="text-sm text-gray-600">Accès aux cours, emploi du temps, documents.</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium">Professeurs</h4>
                        <p className="text-sm text-gray-600">
                          Gestion des cours, gestion des absences, échanges avec les élèves, suivi des notes.
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium">Administrateurs</h4>
                        <p className="text-sm text-gray-600">
                          Gestion des utilisateurs, des formations et des paramètres de la plateforme.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-lg font-medium">Technologies et outils utilisés</h3>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <TechCard emoji="🗂️" title="Gestion des tâches" value="Notion" />
                    <TechCard emoji="💬" title="Communication" value="Discord" />
                    <TechCard emoji="📝" title="Documentation" value="Notion" />
                    <TechCard emoji="🌐" title="Front-End" value="Next.js & Tailwind" />
                    <TechCard emoji="🛠️" title="Back-End" value="Node.js" />
                    <TechCard emoji="🗄️" title="Base de Données" value="Prisma & Neon (PostgreSQL)" />
                    <TechCard emoji="🔐" title="Authentification" value="NextAuth" />
                    <TechCard emoji="🔄" title="Gestion de versions" value="Git avec GitHub" />
                    <TechCard emoji="📨" title="Real Time Chat" value="..." />
                    <TechCard emoji="🚀" title="Déploiement" value="..." />
                    <TechCard emoji="🧪" title="Tests" value="..." />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function NavItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <Link href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100">
      {icon}
      <span>{label}</span>
    </Link>
  )
}

function StatsCard({ title, value, subtitle }: { title: string; value: string; subtitle: string }) {
  return (
    <Card>
      <CardContent className="p-6">
        <h4 className="text-sm font-medium text-gray-500">{title}</h4>
        <p className="mt-2 text-3xl font-bold">{value}</p>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </CardContent>
    </Card>
  )
}

function TechCard({ emoji, title, value }: { emoji: string; title: string; value: string }) {
  return (
    <Card>
      <CardContent className="flex items-start gap-3 p-4">
        <div className="text-2xl">{emoji}</div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">{title}</h4>
          <p className="font-medium">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

