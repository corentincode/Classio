"use client"

import { useState, useEffect } from "react"
import { format, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays } from "date-fns"
import { fr } from "date-fns/locale"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Filter,
  Grid3X3,
  List,
  Search,
  Users,
  BookOpen,
  GraduationCap,
  CalendarPlus2Icon as CalendarIcon2,
} from "lucide-react"
import FadeIn from "@/components/animations/fade-in"
import CalendarMonthView from "@/components/dashboard/calendar-month-view"
import CalendarWeekView from "@/components/dashboard/calendar-week-view"
import CalendarDayView from "@/components/dashboard/calendar-day-view"
import AddEventDialog from "@/components/dashboard/add-event-dialog"
import type { Event, EventType } from "@/types/calendar"

// Sample data
const SAMPLE_EVENTS: Event[] = [
  {
    id: "1",
    title: "Cours de Mathématiques",
    date: "2025-03-12",
    startTime: "08:00",
    endTime: "10:00",
    location: "Salle 102",
    description: "Cours de mathématiques pour la classe de 3ème B",
    type: "class",
    classId: "3B",
    teacherId: "prof1",
  },
  {
    id: "2",
    title: "Réunion des enseignants",
    date: "2025-03-12",
    startTime: "12:00",
    endTime: "13:30",
    location: "Salle de réunion A",
    description: "Réunion hebdomadaire des enseignants",
    type: "meeting",
    participants: ["prof1", "prof2", "prof3"],
  },
  {
    id: "3",
    title: "Conseil de classe",
    date: "2025-03-14",
    startTime: "14:00",
    endTime: "16:00",
    location: "Salle de conférence",
    description: "Conseil de classe du 2ème trimestre pour la classe de 4ème A",
    type: "meeting",
    classId: "4A",
    participants: ["prof1", "prof2", "admin1"],
  },
  {
    id: "4",
    title: "Sortie au musée",
    date: "2025-03-15",
    startTime: "09:00",
    endTime: "17:00",
    location: "Musée d'Histoire",
    description: "Sortie scolaire au musée d'Histoire pour les classes de 5ème",
    type: "event",
    classIds: ["5A", "5B"],
  },
  {
    id: "5",
    title: "Examen de Français",
    date: "2025-03-18",
    startTime: "10:00",
    endTime: "12:00",
    location: "Salle 201",
    description: "Examen de français pour la classe de 3ème A",
    type: "exam",
    classId: "3A",
    teacherId: "prof2",
  },
  {
    id: "6",
    title: "Journée pédagogique",
    date: "2025-03-20",
    startTime: "08:00",
    endTime: "17:00",
    location: "Établissement",
    description: "Journée pédagogique - Pas de cours pour les élèves",
    type: "holiday",
  },
  {
    id: "7",
    title: "Cours de Sciences",
    date: "2025-03-13",
    startTime: "10:00",
    endTime: "12:00",
    location: "Laboratoire 1",
    description: "Cours de sciences avec expériences pratiques",
    type: "class",
    classId: "4B",
    teacherId: "prof3",
  },
  {
    id: "8",
    title: "Réunion parents-professeurs",
    date: "2025-03-19",
    startTime: "17:00",
    endTime: "20:00",
    location: "Hall principal",
    description: "Rencontre trimestrielle entre parents et enseignants",
    type: "meeting",
    participants: ["prof1", "prof2", "prof3", "prof4"],
  },
]

export default function CalendarContent() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [view, setView] = useState<"month" | "week" | "day">("month")
  const [events, setEvents] = useState<Event[]>(SAMPLE_EVENTS)
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(SAMPLE_EVENTS)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    class: true,
    meeting: true,
    event: true,
    exam: true,
    holiday: true,
  })
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"all" | "classes" | "meetings" | "personal">("all")

  // Filter events based on search query, filters, and active tab
  useEffect(() => {
    let filtered = events

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query),
      )
    }

    // Apply type filters
    filtered = filtered.filter((event) => filters[event.type])

    // Apply tab filters
    if (activeTab === "classes") {
      filtered = filtered.filter((event) => event.type === "class")
    } else if (activeTab === "meetings") {
      filtered = filtered.filter((event) => event.type === "meeting")
    } else if (activeTab === "personal") {
      // In a real app, you would filter by the current user's ID
      filtered = filtered.filter(
        (event) => event.teacherId === "prof1" || (event.participants && event.participants.includes("prof1")),
      )
    }

    setFilteredEvents(filtered)
  }, [events, searchQuery, filters, activeTab])

  // Handle date navigation
  const navigateDate = (direction: "prev" | "next") => {
    if (view === "month") {
      setCurrentDate(direction === "prev" ? subMonths(currentDate, 1) : addMonths(currentDate, 1))
    } else if (view === "week") {
      setCurrentDate(direction === "prev" ? subWeeks(currentDate, 1) : addWeeks(currentDate, 1))
      setSelectedDate(direction === "prev" ? subWeeks(selectedDate, 1) : addWeeks(selectedDate, 1))
    } else {
      setCurrentDate(direction === "prev" ? subDays(currentDate, 1) : addDays(currentDate, 1))
      setSelectedDate(direction === "prev" ? subDays(selectedDate, 1) : addDays(selectedDate, 1))
    }
  }

  // Handle filter changes
  const toggleFilter = (type: EventType) => {
    setFilters((prev) => ({ ...prev, [type]: !prev[type] }))
  }

  // Handle event creation
  const handleAddEvent = (newEvent: Omit<Event, "id">) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const event: Event = {
        id: Date.now().toString(),
        ...newEvent,
      }

      setEvents((prev) => [...prev, event])
      setIsAddEventOpen(false)
      setIsLoading(false)
    }, 500)
  }

  // Handle event deletion
  const handleDeleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id))
  }

  // Get formatted date title based on current view
  const getDateTitle = () => {
    if (view === "month") {
      return format(currentDate, "MMMM yyyy", { locale: fr })
    } else if (view === "week") {
      const startOfWeek = subDays(currentDate, currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1)
      const endOfWeek = addDays(startOfWeek, 6)

      if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
        return `${format(startOfWeek, "d")} - ${format(endOfWeek, "d MMMM yyyy", { locale: fr })}`
      } else {
        return `${format(startOfWeek, "d MMM")} - ${format(endOfWeek, "d MMM yyyy", { locale: fr })}`
      }
    } else {
      return format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="border-b border-[#f5f0e8] bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-xl font-bold">Emploi du temps</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Rechercher un événement..."
                className="w-64 rounded-lg border border-[#f5f0e8] bg-white py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#c83e3e]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <AddEventDialog
              isOpen={isAddEventOpen}
              onOpenChange={setIsAddEventOpen}
              onAddEvent={handleAddEvent}
              isLoading={isLoading}
              selectedDate={selectedDate}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <FadeIn className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          {/* Calendar Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateDate("prev")}
                aria-label="Période précédente"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => navigateDate("next")} aria-label="Période suivante">
                <ChevronRight className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-bold capitalize">{getDateTitle()}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setCurrentDate(new Date())
                  setSelectedDate(new Date())
                }}
                className="ml-2 text-sm text-gray-500"
              >
                Aujourd'hui
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Tabs value={view} onValueChange={(v) => setView(v as "month" | "week" | "day")}>
                <TabsList className="bg-[#f5f0e8]/50">
                  <TabsTrigger value="month" className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    <span className="hidden sm:inline">Mois</span>
                  </TabsTrigger>
                  <TabsTrigger value="week" className="flex items-center gap-1">
                    <Grid3X3 className="h-4 w-4" />
                    <span className="hidden sm:inline">Semaine</span>
                  </TabsTrigger>
                  <TabsTrigger value="day" className="flex items-center gap-1">
                    <List className="h-4 w-4" />
                    <span className="hidden sm:inline">Jour</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">Filtres</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56">
                  <div className="space-y-2">
                    <h3 className="font-medium">Types d'événements</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="filter-class"
                          checked={filters.class}
                          onCheckedChange={() => toggleFilter("class")}
                        />
                        <Label htmlFor="filter-class" className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-blue-100 text-blue-800">
                            Cours
                          </Badge>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="filter-meeting"
                          checked={filters.meeting}
                          onCheckedChange={() => toggleFilter("meeting")}
                        />
                        <Label htmlFor="filter-meeting" className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-purple-100 text-purple-800">
                            Réunions
                          </Badge>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="filter-event"
                          checked={filters.event}
                          onCheckedChange={() => toggleFilter("event")}
                        />
                        <Label htmlFor="filter-event" className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            Événements
                          </Badge>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="filter-exam"
                          checked={filters.exam}
                          onCheckedChange={() => toggleFilter("exam")}
                        />
                        <Label htmlFor="filter-exam" className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-red-100 text-red-800">
                            Examens
                          </Badge>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="filter-holiday"
                          checked={filters.holiday}
                          onCheckedChange={() => toggleFilter("holiday")}
                        />
                        <Label htmlFor="filter-holiday" className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-amber-100 text-amber-800">
                            Congés
                          </Badge>
                        </Label>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Calendar Tabs */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeTab === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("all")}
              className={activeTab === "all" ? "bg-[#c83e3e] hover:bg-[#b53535]" : ""}
            >
              <CalendarIcon2 className="h-4 w-4 mr-2" />
              Tous les événements
            </Button>
            <Button
              variant={activeTab === "classes" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("classes")}
              className={activeTab === "classes" ? "bg-[#c83e3e] hover:bg-[#b53535]" : ""}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Cours
            </Button>
            <Button
              variant={activeTab === "meetings" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("meetings")}
              className={activeTab === "meetings" ? "bg-[#c83e3e] hover:bg-[#b53535]" : ""}
            >
              <Users className="h-4 w-4 mr-2" />
              Réunions
            </Button>
            <Button
              variant={activeTab === "personal" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("personal")}
              className={activeTab === "personal" ? "bg-[#c83e3e] hover:bg-[#b53535]" : ""}
            >
              <GraduationCap className="h-4 w-4 mr-2" />
              Mon emploi du temps
            </Button>
          </div>

          {/* Calendar Views */}
          <Card className="shadow-sm">
            {view === "month" && (
              <CalendarMonthView
                currentDate={currentDate}
                selectedDate={selectedDate}
                events={filteredEvents}
                onSelectDate={setSelectedDate}
                onDeleteEvent={handleDeleteEvent}
              />
            )}

            {view === "week" && (
              <CalendarWeekView
                currentDate={currentDate}
                selectedDate={selectedDate}
                events={filteredEvents}
                onSelectDate={setSelectedDate}
                onDeleteEvent={handleDeleteEvent}
              />
            )}

            {view === "day" && (
              <CalendarDayView
                selectedDate={selectedDate}
                events={filteredEvents}
                onDeleteEvent={handleDeleteEvent}
                onAddEvent={() => {
                  setIsAddEventOpen(true)
                }}
              />
            )}
          </Card>
        </div>
      </FadeIn>
    </div>
  )
}

