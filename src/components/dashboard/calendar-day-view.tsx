"use client"

import { useState } from "react"
import { format, parseISO } from "date-fns"
import { fr } from "date-fns/locale"
import type { Event } from "@/types/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2, Clock, MapPin, CalendarIcon, Info, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

interface CalendarDayViewProps {
  selectedDate: Date
  events: Event[]
  onDeleteEvent: (id: string) => void
  onAddEvent: () => void
}

export default function CalendarDayView({ selectedDate, events, onDeleteEvent, onAddEvent }: CalendarDayViewProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

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

  // Filter events for the selected date
  const dayEvents = events
    .filter((event) => format(parseISO(event.date), "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd"))
    .sort((a, b) => a.startTime.localeCompare(b.startTime))

  return (
    <>
      <div className="p-6">
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-medium capitalize">
              {format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })}
            </h3>
          </div>

          <div className="space-y-4">
            {dayEvents.length > 0 ? (
              dayEvents.map((event) => (
                <Card key={event.id} className="shadow-sm hover:shadow transition-shadow">
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
                      onClick={() => onDeleteEvent(event.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>
                          {event.startTime} - {event.endTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{event.location}</span>
                      </div>
                      {event.description && (
                        <div className="pt-2">
                          <p className="text-gray-600">{event.description}</p>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {event.classId && (
                          <Badge variant="outline" className="bg-gray-100">
                            Classe: {event.classId}
                          </Badge>
                        )}
                        {event.teacherId && (
                          <Badge variant="outline" className="bg-gray-100">
                            Enseignant: {event.teacherId}
                          </Badge>
                        )}
                        {event.participants && event.participants.length > 0 && (
                          <Badge variant="outline" className="bg-gray-100">
                            {event.participants.length} participant(s)
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>Aucun événement prévu pour cette journée</p>
                <Button variant="outline" className="mt-4" onClick={onAddEvent}>
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un événement
                </Button>
              </div>
            )}
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

