"use client"

import { useState } from "react"
import { format } from "date-fns"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Event } from "@/types/calendar"

// Form schema
const eventSchema = z.object({
  title: z.string().min(2, { message: "Le titre doit contenir au moins 2 caractères" }),
  date: z.string().min(1, { message: "La date est requise" }),
  startTime: z.string().min(1, { message: "L'heure de début est requise" }),
  endTime: z.string().min(1, { message: "L'heure de fin est requise" }),
  location: z.string().min(1, { message: "Le lieu est requis" }),
  description: z.string().optional(),
  type: z.enum(["class", "meeting", "event", "exam", "holiday"]),
  classId: z.string().optional(),
  teacherId: z.string().optional(),
  participants: z.array(z.string()).optional(),
})

type EventFormValues = z.infer<typeof eventSchema>

interface AddEventDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onAddEvent: (event: Omit<Event, "id">) => void
  isLoading: boolean
  selectedDate: Date
}

export default function AddEventDialog({
  isOpen,
  onOpenChange,
  onAddEvent,
  isLoading,
  selectedDate,
}: AddEventDialogProps) {
  const [error, setError] = useState<string | null>(null)

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      date: format(selectedDate, "yyyy-MM-dd"),
      startTime: "08:00",
      endTime: "09:00",
      location: "",
      description: "",
      type: "class",
      classId: "",
      teacherId: "",
      participants: [],
    },
  })

  // Update date when selectedDate changes
  useState(() => {
    form.setValue("date", format(selectedDate, "yyyy-MM-dd"))
  })

  function onSubmit(values: EventFormValues) {
    setError(null)

    try {
      onAddEvent(values)
      form.reset({
        title: "",
        date: format(selectedDate, "yyyy-MM-dd"),
        startTime: "08:00",
        endTime: "09:00",
        location: "",
        description: "",
        type: "class",
        classId: "",
        teacherId: "",
        participants: [],
      })
    } catch (error) {
      setError("Une erreur est survenue. Veuillez réessayer.")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1 bg-[#c83e3e] hover:bg-[#b53535]">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Ajouter un événement</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Ajouter un événement</DialogTitle>
          <DialogDescription>
            Créez un nouvel événement dans le calendrier. Remplissez tous les champs requis.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input placeholder="Cours de mathématiques" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="class">Cours</SelectItem>
                        <SelectItem value="meeting">Réunion</SelectItem>
                        <SelectItem value="event">Événement</SelectItem>
                        <SelectItem value="exam">Examen</SelectItem>
                        <SelectItem value="holiday">Congé</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Heure de début</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Heure de fin</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lieu</FormLabel>
                  <FormControl>
                    <Input placeholder="Salle 102" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("type") === "class" && (
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="classId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Classe</FormLabel>
                      <FormControl>
                        <Input placeholder="3ème B" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="teacherId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enseignant</FormLabel>
                      <FormControl>
                        <Input placeholder="M. Dupont" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description de l'événement..." className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)} type="button">
                Annuler
              </Button>
              <Button type="submit" disabled={isLoading} className="bg-[#c83e3e] hover:bg-[#b53535]">
                {isLoading ? "Création en cours..." : "Ajouter"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

