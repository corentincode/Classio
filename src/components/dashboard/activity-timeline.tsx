"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, FileText, MessageSquare, UserPlus } from "lucide-react"

interface ActivityTimelineProps {
  extended?: boolean
}

export function ActivityTimeline({ extended = false }: ActivityTimelineProps) {
  // Données fictives pour l'activité
  const activities = [
    {
      id: 1,
      user: {
        name: "Marie Dupont",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MD",
      },
      action: "a créé un document",
      target: "Cours de mathématiques - Fonctions",
      time: "Il y a 35 minutes",
      icon: <FileText className="h-4 w-4" />,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      user: {
        name: "Thomas Martin",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "TM",
      },
      action: "a ajouté un événement",
      target: "Réunion parents-professeurs",
      time: "Il y a 2 heures",
      icon: <Calendar className="h-4 w-4" />,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: 3,
      user: {
        name: "Sophie Petit",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SP",
      },
      action: "a commenté",
      target: "Projet de sciences - Écosystèmes",
      time: "Il y a 4 heures",
      icon: <MessageSquare className="h-4 w-4" />,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: 4,
      user: {
        name: "Jean Dubois",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JD",
      },
      action: "a ajouté un nouvel élève",
      target: "Lucas Bernard",
      time: "Il y a 1 jour",
      icon: <UserPlus className="h-4 w-4" />,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
  ]

  // Activités supplémentaires pour la vue étendue
  const extendedActivities = [
    {
      id: 5,
      user: {
        name: "Claire Moreau",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "CM",
      },
      action: "a modifié un document",
      target: "Évaluation - Histoire contemporaine",
      time: "Il y a 1 jour",
      icon: <FileText className="h-4 w-4" />,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 6,
      user: {
        name: "Paul Leroy",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "PL",
      },
      action: "a annulé un événement",
      target: "Sortie scolaire - Musée",
      time: "Il y a 2 jours",
      icon: <Calendar className="h-4 w-4" />,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      id: 7,
      user: {
        name: "Émilie Blanc",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "EB",
      },
      action: "a partagé un document",
      target: "Fiche de révision - Conjugaison",
      time: "Il y a 3 jours",
      icon: <FileText className="h-4 w-4" />,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 8,
      user: {
        name: "Antoine Girard",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "AG",
      },
      action: "a ajouté un commentaire",
      target: "Projet de groupe - Écosystèmes",
      time: "Il y a 4 jours",
      icon: <MessageSquare className="h-4 w-4" />,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ]

  const displayActivities = extended ? [...activities, ...extendedActivities] : activities

  return (
    <div className="space-y-4">
      {displayActivities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center">
              <span className="font-medium">{activity.user.name}</span>
              <span className="ml-1">{activity.action}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`rounded-full p-1 ${activity.iconBg}`}>
                <span className={activity.iconColor}>{activity.icon}</span>
              </div>
              <span className="text-sm font-medium">{activity.target}</span>
            </div>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

