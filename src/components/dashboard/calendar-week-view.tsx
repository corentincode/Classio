"use client"

import React, { useState } from "react"
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, setHours, setMinutes } from "date-fns"
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
import type { CalendarEvent } from "./calendar-content"

interface CalendarWeekViewProps {
  currentDate: Date
  events: CalendarEvent[]
}

export function CalendarWeekView({ currentDate, events }: CalendarWeekViewProps) {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 })
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 })
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd })

  // Heures de début et de fin de la journée
  const dayStartHour = 8
  const dayEndHour = 18

  // Générer les heures
  const hours = Array.from({ length: dayEndHour - dayStartHour + 1 }, (_, i) => dayStartHour + i)

  const getEventsForDayAndHour = (day: Date, hour: number) => {
    const hourStart = setMinutes(setHours(new Date(day), hour), 0)
    const hourEnd = setMinutes(setHours(new Date(day), hour + 1), 0)

    return events.filter((event) => {
      const eventStart = new Date(event.start)
      const eventEnd = new Date(event.end)

      // Vérifier si l'événement est dans cette heure
      return (eventStart <= hourEnd && eventEnd >= hourStart) || (event.allDay && isSameDay(day, eventStart))
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

  const getEventPosition = (event: CalendarEvent, hour: number) => {
    const eventStart = new Date(event.start)
    const eventEnd = new Date(event.end)

    const hourStart = setMinutes(setHours(new Date(eventStart), hour), 0)
    const hourEnd = setMinutes(setHours(new Date(eventStart), hour + 1), 0)

    // Calculer la position de début (en pourcentage de l'heure)
    let startPercent = 0
    if (eventStart > hourStart) {
      const diffMinutes = (eventStart.getTime() - hourStart.getTime()) / (1000 * 60)
      startPercent = (diffMinutes / 60) * 100
    }

    // Calculer la hauteur (en pourcentage de l'heure)
    let heightPercent = 100
    if (eventEnd < hourEnd) {
      const diffMinutes = (eventEnd.getTime() - hourStart.getTime()) / (1000 * 60)
      heightPercent = (diffMinutes / 60) * 100
    } else if (eventStart > hourStart) {
      const diffMinutes = (hourEnd.getTime() - eventStart.getTime()) / (1000 * 60)
      heightPercent = (diffMinutes / 60) * 100
    }

    return {
      top: `${startPercent}%`,
      height: `${heightPercent}%`,
    }
  }

  return (
    <>
      <div className="grid grid-cols-[auto,1fr,1fr,1fr,1fr,1fr,1fr,1fr] gap-1">
        {/* En-tête avec les jours */}
        <div className="h-12"></div> {/* Cellule vide pour l'alignement */}
        {days.map((day) => (
          <div
            key={day.toString()}
            className={`text-center py-2 font-medium ${isSameDay(day, new Date()) ? "bg-primary/10 rounded-t-md" : ""}`}
          >
            <div>{format(day, "EEE", { locale: fr })}</div>
            <div
              className={`inline-block rounded-full w-7 h-7 text-center leading-7 ${
                isSameDay(day, new Date()) ? "bg-primary text-primary-foreground" : ""
              }`}
            >
              {format(day, "d")}
            </div>
          </div>
        ))}
        {/* Grille des heures */}
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            {/* Colonne des heures */}
            <div className="text-right pr-2 py-1 text-sm text-muted-foreground border-t">{hour}:00</div>

            {/* Cellules pour chaque jour */}
            {days.map((day) => {
              const dayEvents = getEventsForDayAndHour(day, hour)
              const isToday = isSameDay(day, new Date())

              return (
                <div
                  key={`${day}-${hour}`}
                  className={`relative border-t min-h-[60px] ${isToday ? "bg-primary/5" : ""}`}
                >
                  {dayEvents.map((event) => {
                    const position = getEventPosition(event, hour)

                    return (
                      <TooltipProvider key={event.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              className="absolute left-0 right-0 mx-1 px-1 py-0.5 rounded text-xs overflow-hidden cursor-pointer"
                              style={{
                                backgroundColor: `${getEventColor(event)}20`,
                                borderLeft: `3px solid ${getEventColor(event)}`,
                                top: position.top,
                                height: position.height,
                                zIndex: 10,
                              }}
                              onClick={() => setSelectedEvent(event)}
                            >
                              <div className="font-medium truncate">{event.title}</div>
                              {!event.allDay && <div className="truncate">{formatEventTime(event)}</div>}
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
                    )
                  })}
                </div>
              )
            })}
          </React.Fragment>
        ))}
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
                      {selectedEvent.participants.map((participant, index) => (
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

