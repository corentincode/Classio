
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
  Bell,
  BarChart,
  Folder,
  Rocket,
  Target,
  GraduationCap,
  Heart,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";


export default async function HomePage() {

  return (
    <div className="min-h-screen bg-[#fdf2e3]">
      <div className="w-full">
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 ">


            {/* Main Content */}
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute right-10 top-10 text-[#921600]/10">
                <Rocket className="h-32 w-32 -rotate-12 transform" />
              </div>
              <div className="absolute bottom-10 left-10 text-[#921600]/10">
                <Target className="h-24 w-24 rotate-12 transform"  />
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
                    <AvatarFallback>UN</AvatarFallback>
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

function NavItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <Link
      href="#"
      className="group flex items-center gap-3 rounded-xl px-3 py-2 text-gray-700 transition-all hover:bg-[#921600] hover:text-white"
    >
      <span className="transition-transform group-hover:scale-110">{icon}</span>
      <span>{label}</span>
    </Link>
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

