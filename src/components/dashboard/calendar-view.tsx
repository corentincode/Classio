"use client"

import { useState } from "react"
import {
  format,
  addDays,
  subDays,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  parseISO,
} from "date-fns"
import { fr } from "date-fns/locale"
import { CalendarIcon, ChevronLeft, ChevronRight, Filter, Grid, List, Plus, Search, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Types
interface Event {
  id: string
  title: string
  date: string
  startTime: string
  endTime: string
  location: string
  description: string
  type: "class" | "meeting" | "event" | "exam" | "holiday"
}

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
]

// Animations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [view, setView] = useState<"month" | "week" | "day">("month")
  const [events, setEvents] = useState<Event[]>(SAMPLE_EVENTS)
  const [filters, setFilters] = useState({
    class: true,
    meeting: true,
    event: true,
    exam: true,
    holiday: true,
  })
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    date: format(selectedDate, "yyyy-MM-dd"),
    startTime: "08:00",
    endTime: "09:00",
    location: "",
    description: "",
    type: "class",
  })

  // Filter events based on selected filters and date
  const filteredEvents = events.filter(
    (event) => filters[event.type] && (view === "month" || isSameDay(parseISO(event.date), selectedDate)),
  )

  // Get days for the current month view
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Get days for the current week view
  const weekStart = subDays(selectedDate, selectedDate.getDay() === 0 ? 6 : selectedDate.getDay() - 1)
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  // Handle date navigation
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))
  const nextDay = () => setSelectedDate(addDays(selectedDate, 1))
  const prevDay = () => setSelectedDate(subDays(selectedDate, 1))
  const nextWeek = () => setSelectedDate(addDays(selectedDate, 7))
  const prevWeek = () => setSelectedDate(subDays(selectedDate, 7))

  // Handle filter changes
  const toggleFilter = (type: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [type]: !prev[type] }))
  }

  // Handle event creation
  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) return

    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title || "",
      date: newEvent.date || format(selectedDate, "yyyy-MM-dd"),
      startTime: newEvent.startTime || "08:00",
      endTime: newEvent.endTime || "09:00",
      location: newEvent.location || "",
      description: newEvent.description || "",
      type: (newEvent.type as Event["type"]) || "class",
    }

    setEvents((prev) => [...prev, event])
    setIsAddEventOpen(false)
    setNewEvent({
      title: "",
      date: format(selectedDate, "yyyy-MM-dd"),
      startTime: "08:00",
      endTime: "09:00",
      location: "",
      description: "",
      type: "class",
    })
  }

  // Handle event deletion
  const handleDeleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id))
  }

  // Get event type color
  const getEventTypeColor = (type: Event["type"]) => {
    switch (type) {
      case "class":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "meeting":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
      case "event":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "exam":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "holiday":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  // Get event type label
  const getEventTypeLabel = (type: Event["type"]) => {
    switch (type) {
      case "class":
        return "Cours"
      case "meeting":
        return "Réunion"
      case "event":
        return "Événement"
      case "exam":
        return "Examen"
      case "holiday":
        return "Congé"
      default:
        return "Autre"
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
              />
            </div>

            <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-1 bg-[#c83e3e] hover:bg-[#b53535]">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Ajouter un événement</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Ajouter un événement</DialogTitle>
                  <DialogDescription>
                    Créez un nouvel événement dans le calendrier. Remplissez tous les champs requis.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Titre
                    </Label>
                    <Input
                      id="title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="startTime" className="text-right">
                      Heure de début
                    </Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={newEvent.startTime}
                      onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="endTime" className="text-right">
                      Heure de fin
                    </Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={newEvent.endTime}
                      onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right">
                      Lieu
                    </Label>
                    <Input
                      id="location"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Select
                      value={newEvent.type}
                      onValueChange={(value) => setNewEvent({ ...newEvent, type: value as Event["type"] })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="class">Cours</SelectItem>
                        <SelectItem value="meeting">Réunion</SelectItem>
                        <SelectItem value="event">Événement</SelectItem>
                        <SelectItem value="exam">Examen</SelectItem>
                        <SelectItem value="holiday">Congé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleAddEvent} className="bg-[#c83e3e] hover:bg-[#b53535]">
                    Ajouter
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          {/* Calendar Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={view === "month" ? prevMonth : view === "week" ? prevWeek : prevDay}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={view === "month" ? nextMonth : view === "week" ? nextWeek : nextDay}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-bold">
                {view === "month"
                  ? format(currentDate, "MMMM yyyy", { locale: fr })
                  : view === "week"
                    ? `${format(weekStart, "d", { locale: fr })} - ${format(addDays(weekStart, 6), "d MMMM yyyy", { locale: fr })}`
                    : format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <Tabs value={view} onValueChange={(v) => setView(v as "month" | "week" | "day")}>
                <TabsList className="bg-[#f5f0e8]/50">
                  <TabsTrigger value="month" className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    <span className="hidden sm:inline">Mois</span>
                  </TabsTrigger>
                  <TabsTrigger value="week" className="flex items-center gap-1">
                    <Grid className="h-4 w-4" />
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

          {/* Calendar Views */}
          <Card>
            <CardContent className="p-6">
              {/* Month View */}
              {view === "month" && (
                <div className="space-y-6">
                  {/* Days of week header */}
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
                      <div key={day} className="py-2 font-medium text-sm">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {monthDays.map((day, i) => {
                      // Add empty cells for days before the first day of the month
                      const dayOfWeek = day.getDay() === 0 ? 6 : day.getDay() - 1 // Adjust for Monday start
                      if (i === 0) {
                        const emptyCells = Array.from({ length: dayOfWeek }, (_, index) => (
                          <div key={`empty-${index}`} className="h-24 p-1 border border-[#f5f0e8] bg-gray-50/50"></div>
                        ))
                        return [
                          ...emptyCells,
                          <DayCell
                            key={day.toString()}
                            day={day}
                            events={filteredEvents}
                            currentMonth={currentDate}
                            selectedDate={selectedDate}
                            onSelectDate={setSelectedDate}
                          />,
                        ]
                      }
                      return (
                        <DayCell
                          key={day.toString()}
                          day={day}
                          events={filteredEvents}
                          currentMonth={currentDate}
                          selectedDate={selectedDate}
                          onSelectDate={setSelectedDate}
                        />
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Week View */}
              {view === "week" && (
                <div className="space-y-6">
                  {/* Days of week header */}
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {weekDays.map((day) => (
                      <div
                        key={day.toString()}
                        className={`py-2 font-medium text-sm ${isSameDay(day, new Date()) ? "bg-[#c83e3e]/10 rounded-md" : ""}`}
                      >
                        <div>{format(day, "EEE", { locale: fr })}</div>
                        <div className={`text-lg ${isSameDay(day, selectedDate) ? "text-[#c83e3e] font-bold" : ""}`}>
                          {format(day, "d", { locale: fr })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Week schedule */}
                  <div className="grid grid-cols-7 gap-1 min-h-[500px]">
                    {weekDays.map((day) => (
                      <div
                        key={day.toString()}
                        className={`border border-[#f5f0e8] p-2 ${isSameDay(day, selectedDate) ? "bg-[#c83e3e]/5" : ""}`}
                        onClick={() => setSelectedDate(day)}
                      >
                        <div className="space-y-2">
                          {filteredEvents
                            .filter((event) => isSameDay(parseISO(event.date), day))
                            .sort((a, b) => a.startTime.localeCompare(b.startTime))
                            .map((event) => (
                              <div key={event.id} className={`p-2 rounded-md text-xs ${getEventTypeColor(event.type)}`}>
                                <div className="font-medium">{event.title}</div>
                                <div>
                                  {event.startTime} - {event.endTime}
                                </div>
                                <div>{event.location}</div>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Day View */}
              {view === "day" && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-lg font-medium">{format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })}</h3>
                  </div>

                  <div className="space-y-4">
                    {filteredEvents
                      .filter((event) => isSameDay(parseISO(event.date), selectedDate))
                      .sort((a, b) => a.startTime.localeCompare(b.startTime))
                      .map((event) => (
                        <Card key={event.id}>
                          <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className={getEventTypeColor(event.type)}>
                                {getEventTypeLabel(event.type)}
                              </Badge>
                              <CardTitle className="text-lg">{event.title}</CardTitle>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-gray-500 hover:text-red-600"
                              onClick={() => handleDeleteEvent(event.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Horaire:</span>
                                <span>
                                  {event.startTime} - {event.endTime}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Lieu:</span>
                                <span>{event.location}</span>
                              </div>
                              {event.description && (
                                <div className="pt-2">
                                  <p className="text-gray-600">{event.description}</p>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                    {filteredEvents.filter((event) => isSameDay(parseISO(event.date), selectedDate)).length === 0 && (
                      <div className="text-center py-12 text-gray-500">
                        <p>Aucun événement prévu pour cette journée</p>
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={() => {
                            setNewEvent({
                              ...newEvent,
                              date: format(selectedDate, "yyyy-MM-dd"),
                            })
                            setIsAddEventOpen(true)
                          }}
                        >
                          Ajouter un événement
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

// Day Cell Component for Month View
interface DayCellProps {
  day: Date
  events: Event[]
  currentMonth: Date
  selectedDate: Date
  onSelectDate: (date: Date) => void
}

function DayCell({ day, events, currentMonth, selectedDate, onSelectDate }: DayCellProps) {
  const isToday = isSameDay(day, new Date())
  const isSelected = isSameDay(day, selectedDate)
  const isCurrentMonth = isSameMonth(day, currentMonth)

  const dayEvents = events.filter((event) => isSameDay(parseISO(event.date), day))

  return (
    <div
      className={`h-24 p-1 border border-[#f5f0e8] overflow-hidden ${
        !isCurrentMonth ? "bg-gray-50/50" : isSelected ? "bg-[#c83e3e]/10" : isToday ? "bg-blue-50/50" : ""
      }`}
      onClick={() => onSelectDate(day)}
    >
      <div
        className={`text-right mb-1 ${
          isToday ? "bg-[#c83e3e] text-white rounded-full w-6 h-6 flex items-center justify-center ml-auto" : ""
        }`}
      >
        {format(day, "d")}
      </div>
      <div className="space-y-1 overflow-hidden">
        {dayEvents.slice(0, 2).map((event) => (
          <div
            key={event.id}
            className="text-xs truncate rounded px-1 py-0.5 bg-opacity-80"
            style={{
              backgroundColor:
                event.type === "class"
                  ? "#dbeafe"
                  : event.type === "meeting"
                    ? "#f3e8ff"
                    : event.type === "event"
                      ? "#dcfce7"
                      : event.type === "exam"
                        ? "#fee2e2"
                        : event.type === "holiday"
                          ? "#fef3c7"
                          : "#f3f4f6",
            }}
          >
            {event.title}
          </div>
        ))}
        {dayEvents.length > 2 && <div className="text-xs text-gray-500 truncate">+{dayEvents.length - 2} autres</div>}
      </div>
    </div>
  )
}

