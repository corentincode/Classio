"use client"

import { useState } from "react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO } from "date-fns"
import { fr } from "date-fns/locale"
import type { Event } from "@/types/calendar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trash2, MapPin, Clock, CalendarIcon, Info } from "lucide-react"

interface CalendarMonthViewProps {
  currentDate: Date
  selectedDate: Date
  events: Event[]
  onSelectDate: (date: Date) => void
  onDeleteEvent: (id: string) => void
}

export default function CalendarMonthView({
  currentDate,
  selectedDate,
  events,
  onSelectDate,
  onDeleteEvent,
}: CalendarMonthViewProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  // Get days for the current month view
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

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
    <>
      <div className="p-6">
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
            {/* Add empty cells for days before the first day of the month */}
            {Array.from({ length: monthStart.getDay() === 0 ? 6 : monthStart.getDay() - 1 }).map((_, index) => (
              <div key={`empty-start-${index}`} className="h-24 p-1 border border-[#f5f0e8] bg-gray-50/50"></div>
            ))}

            {/* Calendar days */}
            {monthDays.map((day) => {
              const isToday = isSameDay(day, new Date())
              const isSelected = isSameDay(day, selectedDate)
              const isCurrentMonth = isSameMonth(day, currentDate)
              const dayEvents = events.filter((event) => isSameDay(parseISO(event.date), day))

              return (
                <div
                  key={day.toString()}
                  className={`h-24 p-1 border border-[#f5f0e8] overflow-hidden transition-colors ${
                    !isCurrentMonth ? "bg-gray-50/50" : isSelected ? "bg-[#c83e3e]/10" : isToday ? "bg-blue-50/50" : ""
                  }`}
                  onClick={() => onSelectDate(day)}
                >
                  <div
                    className={`text-right mb-1 ${
                      isToday
                        ? "bg-[#c83e3e] text-white rounded-full w-6 h-6 flex items-center justify-center ml-auto"
                        : ""
                    }`}
                  >
                    {format(day, "d")}
                  </div>
                  <div className="space-y-1 overflow-hidden">
                    <TooltipProvider>
                      {dayEvents.slice(0, 3).map((event) => (
                        <Tooltip key={event.id}>
                          <TooltipTrigger asChild>
                            <div
                              className={`text-xs truncate rounded px-1 py-0.5 cursor-pointer ${getEventTypeColor(
                                event.type,
                              )}`}
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedEvent(event)
                              }}
                            >
                              {event.title}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="text-sm">
                              <p className="font-bold">{event.title}</p>
                              <p>
                                {event.startTime} - {event.endTime}
                              </p>
                              <p>{event.location}</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </TooltipProvider>
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-gray-500 truncate">+{dayEvents.length - 3} autres</div>
                    )}
                  </div>
                </div>
              )
            })}

            {/* Add empty cells for days after the last day of the month */}
            {Array.from({
              length: (7 - (((monthStart.getDay() === 0 ? 6 : monthStart.getDay() - 1) + monthDays.length) % 7)) % 7,
            }).map((_, index) => (
              <div key={`empty-end-${index}`} className="h-24 p-1 border border-[#f5f0e8] bg-gray-50/50"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Event Details Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedEvent && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-xl">{selectedEvent.title}</DialogTitle>
                  <Badge variant="outline" className={getEventTypeColor(selectedEvent.type)}>
                    {getEventTypeLabel(selectedEvent.type)}
                  </Badge>
                </div>
                <DialogDescription>
                  {format(parseISO(selectedEvent.date), "EEEE d MMMM yyyy", { locale: fr })}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Horaire</p>
                    <p>
                      {selectedEvent.startTime} - {selectedEvent.endTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Lieu</p>
                    <p>{selectedEvent.location}</p>
                  </div>
                </div>
                {selectedEvent.description && (
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Description</p>
                      <p>{selectedEvent.description}</p>
                    </div>
                  </div>
                )}
                {selectedEvent.classId && (
                  <div className="flex items-start gap-2">
                    <CalendarIcon className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Classe</p>
                      <p>{selectedEvent.classId}</p>
                    </div>
                  </div>
                )}
                {selectedEvent.participants && selectedEvent.participants.length > 0 && (
                  <div className="flex items-start gap-2">
                    <CalendarIcon className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Participants</p>
                      <p>{selectedEvent.participants.join(", ")}</p>
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    onDeleteEvent(selectedEvent.id)
                    setSelectedEvent(null)
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer
                </Button>
                <Button onClick={() => setSelectedEvent(null)}>Fermer</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

