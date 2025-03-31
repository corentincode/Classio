"use client"

import { useState } from "react"
import { Bell, ChevronLeft, ChevronRight, Plus, Search, CalendarIcon, Clock } from "lucide-react"
import { format, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays, isSameDay } from "date-fns"
import { fr } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CalendarMonthView } from "./calendar-month-view"
import { CalendarWeekView } from "./calendar-week-view"
import { CalendarDayView } from "./calendar-day-view"
import { AddEventDialog } from "./add-event-dialog"

// Types pour les événements du calendrier
export type EventType = "cours" | "reunion" | "examen" | "autre"

export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  type: EventType
  location?: string
  description?: string
  participants?: string[]
}

// Données fictives pour les événements
const events: CalendarEvent[] = [
  {
    id: "1",
    title: "Cours de mathématiques",
    start: new Date(2023, 10, 15, 9, 0),
    end: new Date(2023, 10, 15, 10, 30),
    type: "cours",
    location: "Salle 101",
    description: "Algèbre linéaire",
    participants: ["Classe de 3ème A"],
  },
  {
    id: "2",
    title: "Réunion parents-professeurs",
    start: new Date(2023, 10, 16, 18, 0),
    end: new Date(2023, 10, 16, 20, 0),
    type: "reunion",
    location: "Salle de conférence",
    description: "Réunion trimestrielle",
    participants: ["Parents", "Professeurs principaux"],
  },
  {
    id: "3",
    title: "Examen de français",
    start: new Date(2023, 10, 17, 14, 0),
    end: new Date(2023, 10, 17, 16, 0),
    type: "examen",
    location: "Salle 205",
    description: "Contrôle de grammaire et conjugaison",
    participants: ["Classe de 4ème B"],
  },
  {
    id: "4",
    title: "Sortie scolaire - Musée",
    start: new Date(2023, 10, 20, 9, 0),
    end: new Date(2023, 10, 20, 17, 0),
    type: "autre",
    location: "Musée d'Histoire",
    description: "Visite guidée et atelier pédagogique",
    participants: ["Classe de 5ème C", "Professeurs accompagnateurs"],
  },
  {
    id: "5",
    title: "Conseil de classe",
    start: new Date(2023, 10, 22, 17, 30),
    end: new Date(2023, 10, 22, 19, 0),
    type: "reunion",
    location: "Salle des professeurs",
    description: "Bilan du premier trimestre",
    participants: ["Équipe pédagogique", "Délégués de classe", "Représentants des parents"],
  },
]

export default function CalendarContent() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"month" | "week" | "day">("month")
  const [eventType, setEventType] = useState<string>("all")
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Navigation dans le calendrier
  const navigatePrevious = () => {
    if (view === "month") {
      setCurrentDate(subMonths(currentDate, 1))
    } else if (view === "week") {
      setCurrentDate(subWeeks(currentDate, 1))
    } else if (view === "day") {
      setCurrentDate(subDays(currentDate, 1))
    }
  }

  const navigateNext = () => {
    if (view === "month") {
      setCurrentDate(addMonths(currentDate, 1))
    } else if (view === "week") {
      setCurrentDate(addWeeks(currentDate, 1))
    } else if (view === "day") {
      setCurrentDate(addDays(currentDate, 1))
    }
  }

  const navigateToday = () => {
    setCurrentDate(new Date())
  }

  // Filtrer les événements
  const filteredEvents = events.filter((event) => {
    // Filtre par recherche
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.description && event.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (event.location && event.location.toLowerCase().includes(searchQuery.toLowerCase()))

    // Filtre par type
    const matchesType = eventType === "all" ? true : event.type === eventType

    // Filtre par onglet
    const matchesTab =
      activeTab === "all"
        ? true
        : activeTab === "cours"
          ? event.type === "cours"
          : activeTab === "reunions"
            ? event.type === "reunion"
            : activeTab === "examens"
              ? event.type === "examen"
              : activeTab === "today"
                ? isSameDay(event.start, new Date())
                : true

    return matchesSearch && matchesType && matchesTab
  })

  // Formatage du titre de la période en cours
  const getPeriodTitle = () => {
    if (view === "month") {
      return format(currentDate, "MMMM yyyy", { locale: fr })
    } else if (view === "week") {
      const startOfWeek = format(currentDate, "d", { locale: fr })
      const endOfWeek = format(addDays(currentDate, 6), "d MMMM yyyy", { locale: fr })
      return `${startOfWeek} - ${endOfWeek}`
    } else {
      return format(currentDate, "EEEE d MMMM yyyy", { locale: fr })
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="border-b border-[#f5f0e8] bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-xl font-bold">Calendrier</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un événement..."
                className="w-64 rounded-lg border border-[#f5f0e8] bg-white py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#c83e3e]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#c83e3e] text-[10px] text-white">
                2
              </span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={navigatePrevious}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={navigateToday}>
              Aujourd'hui
            </Button>
            <Button variant="outline" size="sm" onClick={navigateNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold capitalize">{getPeriodTitle()}</h2>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex border rounded-md">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setView("month")}
                className={`px-3 py-1 rounded-none ${view === "month" ? "bg-[#f5f0e8]" : ""}`}
              >
                Mois
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setView("week")}
                className={`px-3 py-1 rounded-none ${view === "week" ? "bg-[#f5f0e8]" : ""}`}
              >
                Semaine
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setView("day")}
                className={`px-3 py-1 rounded-none ${view === "day" ? "bg-[#f5f0e8]" : ""}`}
              >
                Jour
              </Button>
            </div>

            <Button size="sm" className="gap-1 bg-[#c83e3e] hover:bg-[#b53535]" onClick={() => setIsAddEventOpen(true)}>
              <Plus className="h-4 w-4" />
              <span>Nouvel événement</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 space-y-4">
            <div className="font-medium">Filtres</div>
            <div className="space-y-3">
              <Select value={eventType} onValueChange={setEventType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Type d'événement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="cours">Cours</SelectItem>
                  <SelectItem value="reunion">Réunions</SelectItem>
                  <SelectItem value="examen">Examens</SelectItem>
                  <SelectItem value="autre">Autres</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4">
              <div className="font-medium mb-2">Légende</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-500 hover:bg-blue-600">Cours</Badge>
                  <span className="text-sm text-gray-600">Cours et TD</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500 hover:bg-green-600">Réunions</Badge>
                  <span className="text-sm text-gray-600">Réunions et conseils</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-500 hover:bg-red-600">Examens</Badge>
                  <span className="text-sm text-gray-600">Contrôles et évaluations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-purple-500 hover:bg-purple-600">Autres</Badge>
                  <span className="text-sm text-gray-600">Sorties et événements</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <div className="font-medium mb-2">Prochains événements</div>
              <div className="space-y-3">
                {events
                  .filter((event) => event.start > new Date())
                  .sort((a, b) => a.start.getTime() - b.start.getTime())
                  .slice(0, 3)
                  .map((event) => (
                    <div key={event.id} className="rounded-lg border p-3 text-sm">
                      <div className="font-medium">{event.title}</div>
                      <div className="flex items-center gap-1 text-gray-500 mt-1">
                        <CalendarIcon className="h-3 w-3" />
                        <span>{format(event.start, "d MMMM", { locale: fr })}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>
                          {format(event.start, "HH:mm", { locale: fr })} - {format(event.end, "HH:mm", { locale: fr })}
                        </span>
                      </div>
                      {event.location && <div className="text-gray-500 mt-1">{event.location}</div>}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="bg-[#f5f0e8]/50">
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="cours">Cours</TabsTrigger>
                <TabsTrigger value="reunions">Réunions</TabsTrigger>
                <TabsTrigger value="examens">Examens</TabsTrigger>
                <TabsTrigger value="today">Aujourd'hui</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                {view === "month" && <CalendarMonthView currentDate={currentDate} events={filteredEvents} />}
                {view === "week" && <CalendarWeekView currentDate={currentDate} events={filteredEvents} />}
                {view === "day" && <CalendarDayView currentDate={currentDate} events={filteredEvents} />}
              </TabsContent>

              <TabsContent value="cours" className="mt-0">
                {view === "month" && <CalendarMonthView currentDate={currentDate} events={filteredEvents} />}
                {view === "week" && <CalendarWeekView currentDate={currentDate} events={filteredEvents} />}
                {view === "day" && <CalendarDayView currentDate={currentDate} events={filteredEvents} />}
              </TabsContent>

              <TabsContent value="reunions" className="mt-0">
                {view === "month" && <CalendarMonthView currentDate={currentDate} events={filteredEvents} />}
                {view === "week" && <CalendarWeekView currentDate={currentDate} events={filteredEvents} />}
                {view === "day" && <CalendarDayView currentDate={currentDate} events={filteredEvents} />}
              </TabsContent>

              <TabsContent value="examens" className="mt-0">
                {view === "month" && <CalendarMonthView currentDate={currentDate} events={filteredEvents} />}
                {view === "week" && <CalendarWeekView currentDate={currentDate} events={filteredEvents} />}
                {view === "day" && <CalendarDayView currentDate={currentDate} events={filteredEvents} />}
              </TabsContent>

              <TabsContent value="today" className="mt-0">
                {view === "month" && <CalendarMonthView currentDate={currentDate} events={filteredEvents} />}
                {view === "week" && <CalendarWeekView currentDate={currentDate} events={filteredEvents} />}
                {view === "day" && <CalendarDayView currentDate={currentDate} events={filteredEvents} />}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <AddEventDialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen} currentDate={currentDate} />
    </div>
  )
}

