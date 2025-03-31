"use client"

import type React from "react"
import { useState } from "react"
import { format } from "date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import type { CalendarEvent, EventType } from "./calendar-content"

interface AddEventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentDate?: Date
}

export function AddEventDialog({ open, onOpenChange, currentDate = new Date() }: AddEventDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState(format(currentDate, "yyyy-MM-dd"))
  const [startTime, setStartTime] = useState("08:00")
  const [endTime, setEndTime] = useState("09:00")
  const [location, setLocation] = useState("")
  const [participants, setParticipants] = useState("")
  const [eventType, setEventType] = useState<EventType>("cours")
  const [allDay, setAllDay] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const start = new Date(`${date}T${startTime}:00`)
    const end = new Date(`${date}T${endTime}:00`)

    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title,
      description: description || undefined,
      start,
      end,
      type: eventType,
      location: location || undefined,
      participants: participants ? participants.split(",").map((p) => p.trim()) : undefined,
    }

    // Ici, vous pourriez ajouter l'événement à votre état ou l'envoyer à une API
    console.log("Nouvel événement créé:", newEvent)

    resetForm()
    onOpenChange(false)
  }

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setDate(format(currentDate, "yyyy-MM-dd"))
    setStartTime("08:00")
    setEndTime("09:00")
    setLocation("")
    setParticipants("")
    setEventType("cours")
    setAllDay(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ajouter un événement</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre *</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Select value={eventType} onValueChange={(value) => setEventType(value as EventType)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cours">Cours</SelectItem>
                  <SelectItem value="reunion">Réunion</SelectItem>
                  <SelectItem value="examen">Examen</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="allDay" checked={allDay} onCheckedChange={(checked) => setAllDay(checked === true)} />
            <Label htmlFor="allDay">Toute la journée</Label>
          </div>

          {!allDay && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Heure de début *</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required={!allDay}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">Heure de fin *</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required={!allDay}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="location">Lieu</Label>
            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="participants">Participants (séparés par des virgules)</Label>
            <Input
              id="participants"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
              placeholder="Ex: M. Dupont, Classe Seconde A"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">Ajouter</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

