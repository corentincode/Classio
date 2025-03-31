"use client"

import React, { useState } from "react"
import { format, setHours, setMinutes, isSameDay } from "date-fns"
import { fr } from "date-fns/locale"
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
import { Clock, MapPin, Users } from "lucide-react"
import type { CalendarEvent } from "./calendar-content"

interface CalendarDayViewProps {
  currentDate: Date
  events: CalendarEvent[]
}

export function CalendarDayView({ currentDate, events }: CalendarDayViewProps) {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  // Heures de début et de fin de la journée
  const dayStartHour = 8
  const dayEndHour = 18

  // Générer les heures
  const hours = Array.from({ length: dayEndHour - dayStartHour + 1 }, (_, i) => dayStartHour + i)

  // Filtrer les événements pour la journée actuelle
  const dayEvents = events
    .filter((event) => isSameDay(currentDate, new Date(event.start)))
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())

  // Événements pour toute la journée
  const allDayEvents = dayEvents.filter((event) => event.allDay)

  // Événements avec des heures spécifiques
  const timedEvents = dayEvents.filter((event) => !event.allDay)

  const getEventsForHour = (hour: number) => {
    const hourStart = setMinutes(setHours(new Date(currentDate), hour), 0)
    const hourEnd = setMinutes(setHours(new Date(currentDate), hour + 1), 0)

    return timedEvents.filter((event) => {
      const eventStart = new Date(event.start)
      const eventEnd = new Date(event.end)

      // Vérifier si l'événement est dans cette heure
      return eventStart <= hourEnd && eventEnd >= hourStart
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
      <div className="space-y-6">
        {/* Événements pour toute la journée */}
        {allDayEvents.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Toute la journée</h3>
            <div className="space-y-1">
              {allDayEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-2 rounded cursor-pointer"
                  style={{
                    backgroundColor: `${getEventColor(event)}20`,
                    borderLeft: `3px solid ${getEventColor(event)}`,
                  }}
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <Badge style={{ backgroundColor: getEventColor(event) }} className="text-white mb-1">
                        {getEventTypeLabel(event.type)}
                      </Badge>
                      <h4 className="font-medium">{event.title}</h4>
                    </div>
                    {event.location && (
                      <div className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="h-4 w-4 mr-1" /> {event.location}
                      </div>
                    )}
                  </div>
                  {event.description && <p className="text-sm text-muted-foreground mt-1">{event.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Grille horaire */}
        <div className="grid grid-cols-[auto,1fr] gap-4">
          {hours.map((hour) => {
            const hourEvents = getEventsForHour(hour)

            return (
              <React.Fragment key={hour}>
                {/* Colonne des heures */}
                <div className="text-right py-2 text-sm text-muted-foreground">{hour}:00</div>

                {/* Cellule pour les événements */}
                <div className="relative border-t min-h-[80px]">
                  {hourEvents.map((event) => {
                    const position = getEventPosition(event, hour)

                    return (
                      <div
                        key={event.id}
                        className="absolute left-0 right-0 px-2 py-1 rounded cursor-pointer"
                        style={{
                          backgroundColor: `${getEventColor(event)}20`,
                          borderLeft: `3px solid ${getEventColor(event)}`,
                          top: position.top,
                          height: position.height,
                          zIndex: 10,
                        }}
                        onClick={() => setSelectedEvent(event)}
                      >
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm">{formatEventTime(event)}</div>
                        {event.location && (
                          <div className="text-sm flex items-center">
                            <MapPin className="h-3 w-3 mr-1" /> {event.location}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </React.Fragment>
            )
          })}
        </div>
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

