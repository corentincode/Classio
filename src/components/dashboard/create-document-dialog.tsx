"use client"

import type React from "react"

import { useState } from "react"
import { FileText, Upload } from "lucide-react"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Folder {
  id: string
  name: string
  count: number
}

interface CreateDocumentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  folders: Folder[]
}

export default function CreateDocumentDialog({ open, onOpenChange, folders }: CreateDocumentDialogProps) {
  const [documentType, setDocumentType] = useState("cours")
  const [documentTitle, setDocumentTitle] = useState("")
  const [selectedFolder, setSelectedFolder] = useState(folders[0]?.id || "")
  const [activeTab, setActiveTab] = useState("create")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Logique pour créer un nouveau document
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Créer un nouveau document</DialogTitle>
          <DialogDescription>Créez un nouveau document ou importez un fichier existant.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="create" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Créer</TabsTrigger>
            <TabsTrigger value="upload">Importer</TabsTrigger>
          </TabsList>
          <TabsContent value="create" className="space-y-4 py-4">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Titre du document</Label>
                  <Input
                    id="title"
                    placeholder="Entrez un titre"
                    value={documentTitle}
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="type">Type de document</Label>
                    <Select value={documentType} onValueChange={setDocumentType}>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Sélectionnez un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cours">Cours</SelectItem>
                        <SelectItem value="exercice">Exercice</SelectItem>
                        <SelectItem value="evaluation">Évaluation</SelectItem>
                        <SelectItem value="presentation">Présentation</SelectItem>
                        <SelectItem value="fiche">Fiche</SelectItem>
                        <SelectItem value="projet">Projet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="folder">Dossier</Label>
                    <Select value={selectedFolder} onValueChange={setSelectedFolder}>
                      <SelectTrigger id="folder">
                        <SelectValue placeholder="Sélectionnez un dossier" />
                      </SelectTrigger>
                      <SelectContent>
                        {folders.map((folder) => (
                          <SelectItem key={folder.id} value={folder.id}>
                            {folder.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Modèle</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col items-center gap-1 rounded-lg border border-[#f5f0e8] p-2 hover:bg-[#f5f0e8]/20 cursor-pointer">
                      <div className="rounded bg-[#f5f0e8]/50 p-2">
                        <FileText className="h-6 w-6 text-[#c83e3e]" />
                      </div>
                      <span className="text-xs">Vide</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 rounded-lg border border-[#f5f0e8] p-2 hover:bg-[#f5f0e8]/20 cursor-pointer">
                      <div className="rounded bg-[#f5f0e8]/50 p-2">
                        <FileText className="h-6 w-6 text-[#c83e3e]" />
                      </div>
                      <span className="text-xs">Cours</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 rounded-lg border border-[#f5f0e8] p-2 hover:bg-[#f5f0e8]/20 cursor-pointer">
                      <div className="rounded bg-[#f5f0e8]/50 p-2">
                        <FileText className="h-6 w-6 text-[#c83e3e]" />
                      </div>
                      <span className="text-xs">Évaluation</span>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Annuler
                </Button>
                <Button type="submit" className="bg-[#c83e3e] hover:bg-[#b53535]">
                  Créer
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
          <TabsContent value="upload" className="space-y-4 py-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="upload-title">Titre du document</Label>
                <Input
                  id="upload-title"
                  placeholder="Entrez un titre"
                  value={documentTitle}
                  onChange={(e) => setDocumentTitle(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="upload-folder">Dossier</Label>
                <Select value={selectedFolder} onValueChange={setSelectedFolder}>
                  <SelectTrigger id="upload-folder">
                    <SelectValue placeholder="Sélectionnez un dossier" />
                  </SelectTrigger>
                  <SelectContent>
                    {folders.map((folder) => (
                      <SelectItem key={folder.id} value={folder.id}>
                        {folder.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Fichier</Label>
                <div className="flex h-32 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-[#f5f0e8] bg-[#f5f0e8]/10 p-4">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <div className="text-center">
                    <p className="text-sm font-medium">Glissez-déposez un fichier ici</p>
                    <p className="text-xs text-gray-500">ou</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Parcourir
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button className="bg-[#c83e3e] hover:bg-[#b53535]">Importer</Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

