"use client"

import { useState } from "react"
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  startOfWeek,
  endOfWeek,
} from "date-fns"
import { fr } from "date-fns/locale"
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
import { Clock, MapPin, Users } from "lucide-react"
import type { CalendarEvent } from "@/types/calendar"

interface CalendarMonthViewProps {
  currentDate: Date
  events: CalendarEvent[]
}

export function CalendarMonthView({ currentDate, events }: CalendarMonthViewProps) {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 })
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 })

  const days = eachDayOfInterval({ start: startDate, end: endDate })

  const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]

  const getEventsForDay = (day: Date) => {
    return events.filter((event) => {
      const eventStart = new Date(event.start)
      const eventEnd = new Date(event.end)

      return isSameDay(day, eventStart) || (event.allDay && day >= eventStart && day <= eventEnd)
    })
  }

  const getEventColor = (event: CalendarEvent) => {
    if (event.color) return event.color

    switch (event.type) {
      case "cours":
        return "#c83e3e"
      case "reunion":
        return "#3e8ac8"
      case "examen":
        return "#e67e22"
      case "evenement":
        return "#9b59b6"
      case "conge":
        return "#2ecc71"
      default:
        return "#64748b"
    }
  }

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case "cours":
        return "Cours"
      case "reunion":
        return "Réunion"
      case "examen":
        return "Examen"
      case "evenement":
        return "Événement"
      case "conge":
        return "Congé"
      default:
        return type
    }
  }

  const formatEventTime = (event: CalendarEvent) => {
    if (event.allDay) return "Toute la journée"
    return `${format(new Date(event.start), "HH:mm")} - ${format(new Date(event.end), "HH:mm")}`
  }

  return (
    <>
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day) => (
          <div key={day} className="text-center font-medium py-2">
            {day}
          </div>
        ))}

        {days.map((day) => {
          const dayEvents = getEventsForDay(day)
          const isCurrentMonth = isSameMonth(day, currentDate)
          const isToday = isSameDay(day, new Date())

          return (
            <div
              key={day.toString()}
              className={`min-h-24 p-1 border rounded-md ${isCurrentMonth ? "bg-background" : "bg-muted/30"} ${
                isToday ? "border-primary" : "border-border"
              }`}
            >
              <div className="text-right">
                <span
                  className={`inline-block rounded-full w-7 h-7 text-center leading-7 ${
                    isToday ? "bg-primary text-primary-foreground" : ""
                  }`}
                >
                  {format(day, "d")}
                </span>
              </div>

              <div className="mt-1 space-y-1 max-h-[80px] overflow-y-auto">
                {dayEvents.slice(0, 3).map((event) => (
                  <TooltipProvider key={event.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className="text-xs px-1 py-0.5 rounded truncate cursor-pointer"
                          style={{
                            backgroundColor: `${getEventColor(event)}20`,
                            borderLeft: `3px solid ${getEventColor(event)}`,
                          }}
                          onClick={() => setSelectedEvent(event)}
                        >
                          {event.title}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="space-y-1">
                          <p className="font-medium">{event.title}</p>
                          <p className="text-xs">{formatEventTime(event)}</p>
                          {event.location && (
                            <p className="text-xs flex items-center">
                              <MapPin className="h-3 w-3 mr-1" /> {event.location}
                            </p>
                          )}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}

                {dayEvents.length > 3 && (
                  <div className="text-xs text-center text-muted-foreground">+{dayEvents.length - 3} autres</div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        {selectedEvent && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <Badge style={{ backgroundColor: getEventColor(selectedEvent) }} className="text-white">
                  {getEventTypeLabel(selectedEvent.type)}
                </Badge>
                <DialogTitle>{selectedEvent.title}</DialogTitle>
              </div>
              {selectedEvent.description && <DialogDescription>{selectedEvent.description}</DialogDescription>}
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Date et heure</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(selectedEvent.start), "EEEE d MMMM yyyy", { locale: fr })}
                  </p>
                  <p className="text-sm text-muted-foreground">{formatEventTime(selectedEvent)}</p>
                </div>
              </div>

              {selectedEvent.location && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Lieu</p>
                    <p className="text-sm text-muted-foreground">{selectedEvent.location}</p>
                  </div>
                </div>
              )}

              {selectedEvent.participants && selectedEvent.participants.length > 0 && (
                <div className="flex items-start gap-2">
                  <Users className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Participants</p>
                    <div className="text-sm text-muted-foreground">
                      {selectedEvent.participants.map((participant: string, index: number) => (
                        <p key={index}>{participant}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedEvent(null)}>
                Fermer
              </Button>
              <Button>Modifier</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}

