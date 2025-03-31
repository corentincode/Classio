"use client"

import { useState } from "react"
import { format, addDays, parseISO, isSameDay } from "date-fns"
import { fr } from "date-fns/locale"
import type { Event } from "@/types/calendar"
import { Badge } from "@/components/ui/badge"
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

interface CalendarWeekViewProps {
  currentDate: Date
  selectedDate: Date
  events: Event[]
  onSelectDate: (date: Date) => void
  onDeleteEvent: (id: string) => void
}

export default function CalendarWeekView({
  currentDate,
  selectedDate,
  events,
  onSelectDate,
  onDeleteEvent,
}: CalendarWeekViewProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  // Get days for the current week view
  const weekStart = (() => {
    const day = new Date(currentDate)
    const diff = day.getDate() - (day.getDay() === 0 ? 6 : day.getDay() - 1)
    return new Date(day.setDate(diff))
  })()

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

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

  // Hours for the week view
  const hours = Array.from({ length: 12 }, (_, i) => i + 8) // 8:00 to 19:00

  return (
    <>
      <div className="p-6 overflow-auto">
        <div className="min-w-[800px]">
          {/* Days of week header */}
          <div className="grid grid-cols-8 gap-1 text-center border-b border-[#f5f0e8] pb-2">
            <div className="py-2 font-medium text-sm"></div> {/* Empty cell for hours column */}
            {weekDays.map((day) => (
              <div
                key={day.toString()}
                className={`py-2 font-medium ${isSameDay(day, selectedDate) ? "text-[#c83e3e]" : ""}`}
                onClick={() => onSelectDate(day)}
              >
                <div className="text-sm">{format(day, "EEE", { locale: fr })}</div>
                <div
                  className={`text-lg ${isSameDay(day, new Date()) ? "bg-[#c83e3e] text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto" : ""}`}
                >
                  {format(day, "d", { locale: fr })}
                </div>
              </div>
            ))}
          </div>

          {/* Hours and events */}
          <div className="grid grid-cols-8 gap-1 mt-2">
            {/* Hours column */}
            <div className="space-y-16">
              {hours.map((hour) => (
                <div key={hour} className="text-xs text-gray-500 text-right pr-2 pt-2">
                  {hour}:00
                </div>
              ))}
            </div>

            {/* Days columns */}
            {weekDays.map((day) => {
              const dayEvents = events.filter((event) => isSameDay(parseISO(event.date), day))

              return (
                <div
                  key={day.toString()}
                  className={`relative border-l border-[#f5f0e8] min-h-[800px] ${
                    isSameDay(day, selectedDate) ? "bg-[#c83e3e]/5" : ""
                  }`}
                  onClick={() => onSelectDate(day)}
                >
                  {/* Hour grid lines */}
                  {hours.map((hour) => (
                    <div
                      key={hour}
                      className="absolute w-full border-t border-[#f5f0e8] pointer-events-none"
                      style={{ top: `${(hour - 8) * 4}rem` }}
                    ></div>
                  ))}

                  {/* Events */}
                  {dayEvents.map((event) => {
                    const startHour = Number.parseInt(event.startTime.split(":")[0])
                    const startMinute = Number.parseInt(event.startTime.split(":")[1])
                    const endHour = Number.parseInt(event.endTime.split(":")[0])
                    const endMinute = Number.parseInt(event.endTime.split(":")[1])

                    const top = (startHour - 8) * 4 + (startMinute / 60) * 4
                    const height = (endHour - startHour) * 4 + ((endMinute - startMinute) / 60) * 4

                    return (
                      <div
                        key={event.id}
                        className={`absolute left-1 right-1 rounded-md p-2 overflow-hidden shadow-sm cursor-pointer ${getEventTypeColor(
                          event.type,
                        )}`}
                        style={{ top: `${top}rem`, height: `${height}rem` }}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedEvent(event)
                        }}
                      >
                        <div className="font-medium text-xs truncate">{event.title}</div>
                        <div className="text-xs truncate">
                          {event.startTime} - {event.endTime}
                        </div>
                        <div className="text-xs truncate">{event.location}</div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
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

