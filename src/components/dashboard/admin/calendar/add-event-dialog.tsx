"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, Clock } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { CalendarEvent, EventType } from "@/types/calendar"

interface AddEventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentDate?: Date
}

export function AddEventDialog({ open, onOpenChange, currentDate = new Date() }: AddEventDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [eventType, setEventType] = useState<EventType>("cours")
  const [location, setLocation] = useState("")
  const [allDay, setAllDay] = useState(false)
  const [startDate, setStartDate] = useState(format(currentDate, "yyyy-MM-dd"))
  const [startTime, setStartTime] = useState("09:00")
  const [endDate, setEndDate] = useState(format(currentDate, "yyyy-MM-dd"))
  const [endTime, setEndTime] = useState("10:00")
  const [participants, setParticipants] = useState("")

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setEventType("cours")
    setLocation("")
    setAllDay(false)
    setStartDate(format(currentDate, "yyyy-MM-dd"))
    setStartTime("09:00")
    setEndDate(format(currentDate, "yyyy-MM-dd"))
    setEndTime("10:00")
    setParticipants("")
  }

  const handleSubmit = () => {
    // Créer l'objet événement
    const newEvent: Omit<CalendarEvent, "id"> = {
      title,
      description,
      type: eventType,
      location,
      allDay,
      start: allDay ? new Date(`${startDate}T00:00:00`) : new Date(`${startDate}T${startTime}:00`),
      end: allDay ? new Date(`${endDate}T23:59:59`) : new Date(`${endDate}T${endTime}:00`),
      participants: participants ? participants.split(",").map((p) => p.trim()) : undefined,
    }

    // Ici, vous enverriez les données au serveur
    console.log("Nouvel événement:", newEvent)

    // Fermer le dialogue et réinitialiser le formulaire
    onOpenChange(false)
    resetForm()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Ajouter un événement</DialogTitle>
          <DialogDescription>Créez un nouvel événement dans le calendrier.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              placeholder="Titre de l'événement"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Description de l'événement"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="event-type">Type d'événement</Label>
              <Select value={eventType} onValueChange={(value) => setEventType(value as EventType)}>
                <SelectTrigger id="event-type">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cours">Cours</SelectItem>
                  <SelectItem value="reunion">Réunion</SelectItem>
                  <SelectItem value="examen">Examen</SelectItem>
                  <SelectItem value="evenement">Événement</SelectItem>
                  <SelectItem value="conge">Congé</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Lieu</Label>
              <Input
                id="location"
                placeholder="Lieu de l'événement"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 py-2">
            <Checkbox id="all-day" checked={allDay} onCheckedChange={(checked) => setAllDay(checked as boolean)} />
            <Label htmlFor="all-day">Toute la journée</Label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="start-date">Date de début</Label>
              <div className="flex">
                <div className="relative flex-1">
                  <CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input
                    id="start-date"
                    type="date"
                    className="pl-10"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                {!allDay && (
                  <div className="relative ml-2 w-24">
                    <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                      type="time"
                      className="pl-10"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="end-date">Date de fin</Label>
              <div className="flex">
                <div className="relative flex-1">
                  <CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input
                    id="end-date"
                    type="date"
                    className="pl-10"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                {!allDay && (
                  <div className="relative ml-2 w-24">
                    <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input type="time" className="pl-10" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="participants">Participants</Label>
            <Input
              id="participants"
              placeholder="Participants (séparés par des virgules)"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleSubmit} disabled={!title}>
            Ajouter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

