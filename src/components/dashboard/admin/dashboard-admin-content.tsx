"use client"

import type React from "react"

import {useEffect, useState} from "react"
import { motion } from "framer-motion"
import {
  BarChart3,
  Bell,
  BookOpen,
  Calendar,
  Clock,
  Download,
  FileText,
  MessageSquare,
  MoreHorizontal,
  Search,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import Link from "next/link";

// Animations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
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

interface Etablissement {
  id: string;
  nom: string;
  sousDomaine: string;
  users?: { id: string }[]; // Vérifie que `users` est un tableau d'objets contenant `id`
}

export default function DashboardAdminContent() {
  const [etablissements, setEtablissements] = useState<Etablissement[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview")
  const { data: session, status } = useSession();
  const router = useRouter();

// 🔥 Redirection si l'utilisateur n'est pas SUPER_ADMIN
  useEffect(() => {
    if (status === "authenticated" && session?.user?.role !== "SUPER_ADMIN") {
      router.push("/dashboard");
    }

    const fetchEtablissements = async () => {
      try {
        const response = await fetch("/api/admin/etablissement");
        if (!response.ok) throw new Error("Impossible de charger les établissements");

        const data = await response.json();
        setEtablissements(data);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEtablissements();
  }, [status, session, router]);

  // 🔥 Pendant le chargement, affiche un écran de chargement
  if (status === "loading") {
    return <p className="text-center py-6">Chargement...</p>;
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="border-b border-[#f5f0e8] bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-xl font-bold">Tableau de bord Admin</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-64 rounded-lg border border-[#f5f0e8] bg-white py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#c83e3e]"
              />
            </div>

            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#c83e3e] text-[10px] text-white">
                3
              </span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="bg-[#f5f0e8]/50">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="etablissements">Etablissements</TabsTrigger>
              <TabsTrigger value="classes">Classes</TabsTrigger>
              <TabsTrigger value="calendar">Calendrier</TabsTrigger>
              <TabsTrigger value="reports">Rapports</TabsTrigger>
            </TabsList>

            <div className="hidden md:flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <FileText className="h-4 w-4" />
                <span>Exporter</span>
              </Button>
              <Button size="sm" className="gap-1 bg-[#c83e3e] hover:bg-[#b53535]">
                <Download className="h-4 w-4" />
                <span>Télécharger le rapport</span>
              </Button>
            </div>
          </div>

          <TabsContent value="overview" className="space-y-6 w-full">
            {/* Stats Cards */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            >
              <motion.div variants={fadeIn}>
                <StatsCard
                  title="Élèves"
                  value="1,248"
                  change="+2.5%"
                  trend="up"
                  icon={<Users className="h-5 w-5 text-[#c83e3e]" />}
                />
              </motion.div>

              <motion.div variants={fadeIn}>
                <StatsCard
                  title="Classes"
                  value="42"
                  change="0%"
                  trend="neutral"
                  icon={<BookOpen className="h-5 w-5 text-[#c83e3e]" />}
                />
              </motion.div>

              <motion.div variants={fadeIn}>
                <StatsCard
                  title="Présence"
                  value="94.2%"
                  change="-0.8%"
                  trend="down"
                  icon={<Clock className="h-5 w-5 text-[#c83e3e]" />}
                />
              </motion.div>

              <motion.div variants={fadeIn}>
                <StatsCard
                  title="Messages"
                  value="128"
                  change="+12.3%"
                  trend="up"
                  icon={<MessageSquare className="h-5 w-5 text-[#c83e3e]" />}
                />
              </motion.div>
            </motion.div>

            {/* Charts and Activity */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Performance des élèves</CardTitle>
                    <CardDescription>Moyenne des notes par classe</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    {/* Placeholder for chart */}
                    <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed border-[#f5f0e8] bg-[#f5f0e8]/20">
                      <div className="flex flex-col items-center gap-2 text-center">
                        <BarChart3 className="h-10 w-10 text-[#c83e3e]/40" />
                        <div className="text-sm font-medium">Graphique des performances</div>
                        <div className="text-xs text-gray-500">Données de performance par classe</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Activité récente</CardTitle>
                  <CardDescription>Dernières actions effectuées</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <ActivityItem
                      avatar="ML"
                      name="Marie Lambert"
                      action="a ajouté des notes"
                      target="Mathématiques 3ème B"
                      time="Il y a 10 minutes"
                    />
                    <ActivityItem
                      avatar="PD"
                      name="Pierre Durand"
                      action="a signalé une absence"
                      target="Thomas Martin"
                      time="Il y a 25 minutes"
                    />
                    <ActivityItem
                      avatar="SM"
                      name="Sophie Martin"
                      action="a publié un message"
                      target="Parents d'élèves"
                      time="Il y a 42 minutes"
                    />
                    <ActivityItem
                      avatar="JD"
                      name="Jean Dupont"
                      action="a modifié l'emploi du temps"
                      target="Classe de 4ème A"
                      time="Il y a 1 heure"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full text-[#c83e3e]">
                    Voir toutes les activités
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Upcoming Events and Tasks */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Événements à venir</CardTitle>
                  <CardDescription>Prochains rendez-vous et événements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <EventItem
                      title="Conseil de classe"
                      date="Aujourd'hui, 14:00 - 16:00"
                      location="Salle de réunion A"
                      type="meeting"
                    />
                    <EventItem
                      title="Réunion parents-professeurs"
                      date="Demain, 17:30 - 20:00"
                      location="Hall principal"
                      type="parent"
                    />
                    <EventItem
                      title="Sortie scolaire - Musée"
                      date="Vendredi, 09:00 - 17:00"
                      location="Musée d'Histoire"
                      type="event"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full text-[#c83e3e]">
                    Voir tous les événements
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Tâches à faire</CardTitle>
                    <CardDescription>Vos tâches en attente</CardDescription>
                  </div>
                  <Button size="sm" className="bg-[#c83e3e] hover:bg-[#b53535]">
                    Nouvelle tâche
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <TaskItem
                      title="Finaliser les notes du trimestre"
                      dueDate="Aujourd'hui"
                      priority="high"
                      progress={75}
                    />
                    <TaskItem
                      title="Préparer la réunion parents-professeurs"
                      dueDate="Demain"
                      priority="medium"
                      progress={50}
                    />
                    <TaskItem
                      title="Mettre à jour les fiches d'élèves"
                      dueDate="Cette semaine"
                      priority="low"
                      progress={25}
                    />
                    <TaskItem
                      title="Commander les fournitures"
                      dueDate="La semaine prochaine"
                      priority="low"
                      progress={0}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full text-[#c83e3e]">
                    Voir toutes les tâches
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>etablissements

          <TabsContent value="etablissements" className="w-full">
            <div className="w-full">
              <div
                  className="flex flex-col items-center h-full w-full rounded-md border border-dashed border-[#f5f0e8] p-6">
                {loading ? (
                    <p className="text-gray-600">Chargement des établissements...</p>
                ) : etablissements.length > 0 ? (

                    <div className="flex flex-col gap-4 w-full">
                      <div>
                        Rechercher :
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 w-full">
                        {etablissements.map((etablissement) => (
                            <Card key={etablissement.id} className="shadow-md">
                              <CardContent className="p-4">
                                <h2 className="text-lg font-bold text-[#c83e3e]">{etablissement.nom}</h2>
                                <p className="text-gray-600">Sous-domaine: {etablissement.sousDomaine}</p>
                                <p className="text-gray-500">Utilisateurs: {etablissement.users?.length ?? 0}</p>
                                <Button className="mt-4 bg-[#c83e3e] hover:bg-[#b53535] text-white w-full">
                                  <Link href={`/dashboard/admin/etablissements/${etablissement.id}`}>
                                    Voir plus
                                  </Link>
                                </Button>
                              </CardContent>
                            </Card>
                        ))}
                      </div>
                    </div>
                ) : (
                    <div className="text-center">
                      <BookOpen className="h-10 w-10 text-[#c83e3e]/40 mx-auto"/>
                      <p className="text-xl font-medium">Aucun établissement trouvé</p>
                    </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="classes" className="w-full">
            <div
                className="flex h-[400px] w-full items-center justify-center rounded-md border border-dashed border-[#f5f0e8]">
              <div className="flex flex-col items-center gap-2 text-center">
                <BookOpen className="h-10 w-10 text-[#c83e3e]/40"/>
                <div className="text-xl font-medium">Contenu des classes</div>
                <div className="text-sm text-gray-500">Cette section est en cours de développement</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="w-full">
            <div
                className="flex h-[400px] w-full items-center justify-center rounded-md border border-dashed border-[#f5f0e8]">
              <div className="flex flex-col items-center gap-2 text-center">
                <Calendar className="h-10 w-10 text-[#c83e3e]/40"/>
                <div className="text-xl font-medium">Calendrier</div>
                <div className="text-sm text-gray-500">Cette section est en cours de développement</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="w-full">
            <div
                className="flex h-[400px] w-full items-center justify-center rounded-md border border-dashed border-[#f5f0e8]">
              <div className="flex flex-col items-center gap-2 text-center">
                <BarChart3 className="h-10 w-10 text-[#c83e3e]/40" />
                <div className="text-xl font-medium">Rapports</div>
                <div className="text-sm text-gray-500">Cette section est en cours de développement</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

// Stats Card Component
interface StatsCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: React.ReactNode
}

function StatsCard({ title, value, change, trend, icon }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className="rounded-full bg-[#f5f0e8] p-2">{icon}</div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span
            className={`font-medium ${
              trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-600"
            }`}
          >
            {change}
          </span>
          <span className="ml-1 text-gray-500">depuis le mois dernier</span>
        </div>
      </CardContent>
    </Card>
  )
}

// Activity Item Component
interface ActivityItemProps {
  avatar: string
  name: string
  action: string
  target: string
  time: string
}

function ActivityItem({ avatar, name, action, target, time }: ActivityItemProps) {
  return (
    <div className="flex items-start gap-3">
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-[#c83e3e]/20 text-[#c83e3e] text-xs">{avatar}</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <p className="text-sm">
          <span className="font-medium">{name}</span> <span className="text-gray-500">{action}</span>{" "}
          <span className="font-medium">{target}</span>
        </p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  )
}

// Event Item Component
interface EventItemProps {
  title: string
  date: string
  location: string
  type: "meeting" | "parent" | "event"
}

function EventItem({ title, date, location, type }: EventItemProps) {
  const getBadgeColor = () => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "parent":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
      case "event":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  const getTypeLabel = () => {
    switch (type) {
      case "meeting":
        return "Réunion"
      case "parent":
        return "Parents"
      case "event":
        return "Événement"
      default:
        return "Autre"
    }
  }

  return (
    <div className="rounded-lg border border-[#f5f0e8] p-3">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-gray-500">{date}</p>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
        <Badge variant="outline" className={getBadgeColor()}>
          {getTypeLabel()}
        </Badge>
      </div>
    </div>
  )
}

// Task Item Component
interface TaskItemProps {
  title: string
  dueDate: string
  priority: "high" | "medium" | "low"
  progress: number
}

function TaskItem({ title, dueDate, priority, progress }: TaskItemProps) {
  const getPriorityBadge = () => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "medium":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200"
      case "low":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  const getPriorityLabel = () => {
    switch (priority) {
      case "high":
        return "Haute"
      case "medium":
        return "Moyenne"
      case "low":
        return "Basse"
      default:
        return "Inconnue"
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-gray-500">Échéance: {dueDate}</p>
        </div>
        <Badge variant="outline" className={getPriorityBadge()}>
          {getPriorityLabel()}
        </Badge>
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span>Progression</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  )
}

