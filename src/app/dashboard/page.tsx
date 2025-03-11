
import type React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import NavItem from "@/components/ui/navItem"; // 🔥 Import du composant Client

import {
  BookOpen,
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  MessageSquare,
  Settings,
  User,
  Bell,
  BarChart,
  Folder,
  Rocket,
  Target,
  GraduationCap,
  Heart,
  EarthLock,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { useRouter } from "next/navigation";


export default async function HomePage() {
  const session = await auth();
  const ROLE_ADMIN =   '"ADMIN"';

  return (
    <div className="min-h-screen bg-[#fdf2e3]">
      <div className="w-full">
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr]">
            {/* Sidebar */}
            <div className="border-r border-[#921600]/10 bg-white/50 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 pb-6">
                <Image
                  src="/image.png"
                  alt="Classio Logo"
                  width={120}
                  height={40}
                  className="h-auto w-auto"
                />
              </div>

              <nav className="space-y-1">
                <NavItem icon={<LayoutDashboard className="h-5 w-5" />} label="Tableau de bord" href="/"/>
                {JSON.stringify(session?.user?.role) === ROLE_ADMIN && (
                    <NavItem icon={<EarthLock  className="h-5 w-5" />} label="Admin" href="/admin" />
                )}
                <NavItem icon={<BookOpen className="h-5 w-5" />} label="Cours" href="/"/>
                <NavItem icon={<Calendar className="h-5 w-5" />} label="Emploi du temps" href="/"/>
                <NavItem icon={<Users className="h-5 w-5" />} label="Élèves" href="/"/>
                <NavItem icon={<User className="h-5 w-5" />} label="Professeurs" href="/"/>
                <NavItem icon={<FileText className="h-5 w-5" />} label="Documents" href="/"/>
                <NavItem icon={<MessageSquare className="h-5 w-5" />} label="Messages" href="/"/>
                <NavItem icon={<Bell className="h-5 w-5" />} label="Notifications" href="/"/>
                <NavItem icon={<BarChart className="h-5 w-5" />} label="Statistiques" href="/"/>
                <NavItem icon={<Folder className="h-5 w-5" />} label="Ressources" href="/"/>
                <NavItem icon={<Settings className="h-5 w-5" />} label="Paramètres" href="/"/>
                <NavItem icon={<LogOut className="h-5 w-5" />} label="Se Déconnecter" href="/signout"/>
              </nav>
            </div>

            {/* Main Content */}
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute right-10 top-10 text-[#921600]/10">
                <Rocket className="h-32 w-32 -rotate-12 transform" />
              </div>
              <div className="absolute bottom-10 left-10 text-[#921600]/10">
                <Target className="h-24 w-24 rotate-12 transform" />
              </div>

              {/* Header */}
              <header className="flex items-center justify-between border-b border-[#921600]/10 bg-white/50 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-8 w-8 text-[#921600]" />
                  <h2 className="text-xl font-bold text-[#921600]">Bienvenue sur Classio</h2>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                    <AvatarFallback>{session?.user?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </div>
              </header>

              {/* Project Overview */}
              <div className="p-8">
                <div className="mb-12 text-center">
                  <h1 className="mb-4 text-4xl font-bold text-[#921600]">
                    La plateforme qui simplifie{" "}
                    <span className="relative">
                      l'éducation
                      <div className="absolute -right-8 top-0">
                        <Heart className="h-6 w-6 text-[#921600]" />
                      </div>
                    </span>
                  </h1>
                  <p className="mx-auto max-w-2xl text-lg text-gray-600">
                    Classio a été conçue dans le but de centraliser la gestion des formations et des interactions entre
                    élèves et professeurs.
                  </p>
                </div>

                {/* Stats Cards */}
                <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <StatsCard title="Utilisateurs" value="1,250" subtitle="Élèves et professeurs" />
                  <StatsCard title="Cours" value="48" subtitle="Formations actives" />
                  <StatsCard title="Documents" value="320" subtitle="Ressources partagées" />
                  <StatsCard title="Messages" value="1,840" subtitle="Échanges cette semaine" />
                </div>

                {/* Features Grid */}
                <div className="mb-12">
                  <h3 className="mb-8 text-center text-2xl font-bold text-[#921600]">Fonctionnalités principales</h3>
                  <div className="grid gap-8 md:grid-cols-2">
                    <FeatureCard
                      icon={<Users className="h-8 w-8" />}
                      title="Gestion des utilisateurs"
                      description="Gérez facilement les élèves, professeurs et administrateurs"
                    />
                    <FeatureCard
                      icon={<BookOpen className="h-8 w-8" />}
                      title="Ressources pédagogiques"
                      description="Centralisez tous vos documents et supports de cours"
                    />
                    <FeatureCard
                      icon={<MessageSquare className="h-8 w-8" />}
                      title="Communication"
                      description="Facilitez les échanges entre élèves et professeurs"
                    />
                    <FeatureCard
                      icon={<BarChart className="h-8 w-8" />}
                      title="Suivi et analyses"
                      description="Visualisez la progression et les performances"
                    />
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="mb-8 text-center text-2xl font-bold text-[#921600]">Technologies utilisées</h3>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    <TechPill emoji="🗂️" label="Notion" />
                    <TechPill emoji="💬" label="Discord" />
                    <TechPill emoji="🌐" label="Next.js" />
                    <TechPill emoji="🎨" label="Tailwind" />
                    <TechPill emoji="🛠️" label="Node.js" />
                    <TechPill emoji="🗄️" label="Prisma" />
                    <TechPill emoji="🔐" label="NextAuth" />
                    <TechPill emoji="🔄" label="GitHub" />
                    <TechPill emoji="📨" label="..." />
                    <TechPill emoji="🚀" label="..." />
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


function StatsCard({ title, value, subtitle }: { title: string; value: string; subtitle: string }) {
  return (
    <Card className="group border-[#921600]/10 transition-all hover:scale-105 hover:border-[#921600]/30 hover:shadow-lg">
      <CardContent className="p-6">
        <h4 className="text-sm font-medium text-[#921600]">{title}</h4>
        <p className="mt-2 text-3xl font-bold text-gray-800">{value}</p>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </CardContent>
    </Card>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="group overflow-hidden border-[#921600]/10">
      <CardContent className="p-6">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#921600]/10 text-[#921600] transition-all group-hover:scale-110 group-hover:bg-[#921600] group-hover:text-white">
          {icon}
        </div>
        <h4 className="mb-2 text-lg font-semibold text-[#921600]">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  )
}

function TechPill({ emoji, label }: { emoji: string; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-[#921600]/10 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:scale-105 hover:border-[#921600]/30 hover:shadow-md">
      <span>{emoji}</span>
      <span>{label}</span>
    </div>
  )
}

