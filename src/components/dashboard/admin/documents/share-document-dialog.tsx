"use client"

import { useState } from "react"
import { Copy, Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Document {
  id: string
  title: string
  type: string
  format: string
  size: string
  createdAt: string
  updatedAt: string
  thumbnail: string
  shared: boolean
  folder: string
  favorite: boolean
}

interface ShareDocumentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  document: Document
}

// Données fictives pour les utilisateurs
const users = [
  { id: "1", name: "Marie Lambert", email: "marie.lambert@example.com", avatar: "ML" },
  { id: "2", name: "Pierre Durand", email: "pierre.durand@example.com", avatar: "PD" },
  { id: "3", name: "Sophie Martin", email: "sophie.martin@example.com", avatar: "SM" },
  { id: "4", name: "Jean Dupont", email: "jean.dupont@example.com", avatar: "JD" },
]

export default function ShareDocumentDialog({ open, onOpenChange, document }: ShareDocumentDialogProps) {
  const [publicLink, setPublicLink] = useState(false)
  const [newEmail, setNewEmail] = useState("")
  const [newPermission, setNewPermission] = useState("view")
  const [sharedWith, setSharedWith] = useState<
    Array<{ id: string; name: string; email: string; avatar: string; permission: string }>
  >([
    { ...users[0], permission: "edit" },
    { ...users[2], permission: "view" },
  ])

  const handleAddUser = () => {
    if (newEmail) {
      // Dans une application réelle, vous vérifieriez si l'utilisateur existe
      const user = users.find((u) => u.email === newEmail)
      if (user) {
        setSharedWith([...sharedWith, { ...user, permission: newPermission }])
        setNewEmail("")
      }
    }
  }

  const handleRemoveUser = (id: string) => {
    setSharedWith(sharedWith.filter((user) => user.id !== id))
  }

  const handleUpdatePermission = (id: string, permission: string) => {
    setSharedWith(sharedWith.map((user) => (user.id === id ? { ...user, permission } : user)))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Partager le document</DialogTitle>
          <DialogDescription>Partagez "{document.title}" avec d'autres utilisateurs.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="public-link">Lien public</Label>
              <Switch id="public-link" checked={publicLink} onCheckedChange={setPublicLink} />
            </div>
            {publicLink && (
              <div className="flex items-center gap-2">
                <Input value={`https://classio.app/documents/${document.id}`} readOnly />
                <Button variant="outline" size="icon" className="shrink-0">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <div className="grid gap-2">
            <Label>Ajouter des personnes</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Adresse e-mail"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="flex-1"
              />
              <Select value={newPermission} onValueChange={setNewPermission}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Permission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="view">Lecture</SelectItem>
                  <SelectItem value="comment">Commentaire</SelectItem>
                  <SelectItem value="edit">Édition</SelectItem>
                </SelectContent>
              </Select>
              <Button type="button" variant="outline" size="icon" onClick={handleAddUser}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Partagé avec</Label>
            <div className="rounded-md border">
              {sharedWith.length > 0 ? (
                <div className="divide-y">
                  {sharedWith.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user.name} />
                          <AvatarFallback className="bg-[#c83e3e]/20 text-[#c83e3e]">{user.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Select
                          value={user.permission}
                          onValueChange={(value) => handleUpdatePermission(user.id, value)}
                        >
                          <SelectTrigger className="h-8 w-[100px]">
                            <SelectValue placeholder="Permission" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="view">Lecture</SelectItem>
                            <SelectItem value="comment">Commentaire</SelectItem>
                            <SelectItem value="edit">Édition</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleRemoveUser(user.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-20 items-center justify-center text-sm text-gray-500">
                  Ce document n'est partagé avec personne.
                </div>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button className="bg-[#c83e3e] hover:bg-[#b53535]">Enregistrer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

