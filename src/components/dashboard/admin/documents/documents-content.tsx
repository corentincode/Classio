"use client"

import { useState } from "react"
import { Bell, Grid, List, Plus, Search, FolderPlus, SortAsc, SortDesc, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarTrigger } from "@/components/ui/sidebar"
import DocumentCard from "./document-card"
import DocumentList from "./document-list"
import CreateDocumentDialog from "./create-document-dialog"
import CreateFolderDialog from "./create-folder-dialog"

// Données fictives pour les documents
const documents = [
  {
    id: "1",
    title: "Cours de mathématiques - Algèbre",
    type: "cours",
    format: "pdf",
    size: "2.4 MB",
    createdAt: "2023-10-15",
    updatedAt: "2023-11-02",
    thumbnail: "/placeholder.svg?height=400&width=300",
    shared: true,
    folder: "Mathématiques",
    favorite: true,
  },
  {
    id: "2",
    title: "Exercices - Géométrie",
    type: "exercice",
    format: "docx",
    size: "1.8 MB",
    createdAt: "2023-09-28",
    updatedAt: "2023-10-05",
    thumbnail: "/placeholder.svg?height=400&width=300",
    shared: false,
    folder: "Mathématiques",
    favorite: false,
  },
  {
    id: "3",
    title: "Évaluation - Histoire contemporaine",
    type: "evaluation",
    format: "pdf",
    size: "3.2 MB",
    createdAt: "2023-10-10",
    updatedAt: "2023-10-10",
    thumbnail: "/placeholder.svg?height=400&width=300",
    shared: true,
    folder: "Histoire",
    favorite: true,
  },
  {
    id: "4",
    title: "Présentation - Système solaire",
    type: "presentation",
    format: "pptx",
    size: "5.7 MB",
    createdAt: "2023-09-15",
    updatedAt: "2023-10-20",
    thumbnail: "/placeholder.svg?height=400&width=300",
    shared: true,
    folder: "Sciences",
    favorite: false,
  },
  {
    id: "5",
    title: "Fiche de révision - Conjugaison",
    type: "fiche",
    format: "pdf",
    size: "0.8 MB",
    createdAt: "2023-10-25",
    updatedAt: "2023-10-25",
    thumbnail: "/placeholder.svg?height=400&width=300",
    shared: false,
    folder: "Français",
    favorite: true,
  },
  {
    id: "6",
    title: "Projet de groupe - Écosystèmes",
    type: "projet",
    format: "docx",
    size: "4.1 MB",
    createdAt: "2023-09-05",
    updatedAt: "2023-11-01",
    thumbnail: "/placeholder.svg?height=400&width=300",
    shared: true,
    folder: "Sciences",
    favorite: false,
  },
]

// Données fictives pour les dossiers
const folders = [
  { id: "1", name: "Mathématiques", count: 12 },
  { id: "2", name: "Français", count: 8 },
  { id: "3", name: "Histoire", count: 5 },
  { id: "4", name: "Sciences", count: 10 },
  { id: "5", name: "Anglais", count: 6 },
]

export default function DocumentsContent() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [documentType, setDocumentType] = useState<string>("all")
  const [isCreateDocumentOpen, setIsCreateDocumentOpen] = useState(false)
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  // Filtrer les documents en fonction des critères
  const filteredDocuments = documents.filter((doc) => {
    // Filtre par recherche
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase())

    // Filtre par dossier
    const matchesFolder = selectedFolder ? doc.folder === selectedFolder : true

    // Filtre par type
    const matchesType = documentType === "all" ? true : doc.type === documentType

    return matchesSearch && matchesFolder && matchesType
  })

  // Trier les documents
  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    const dateA = new Date(a.updatedAt).getTime()
    const dateB = new Date(b.updatedAt).getTime()
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA
  })

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="border-b border-[#f5f0e8] bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-xl font-bold">Documents</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-64 rounded-lg border border-[#f5f0e8] bg-white py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#c83e3e]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#c83e3e] text-[10px] text-white">
                3
              </span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="bg-[#f5f0e8]/50">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="recent">Récents</TabsTrigger>
              <TabsTrigger value="shared">Partagés</TabsTrigger>
              <TabsTrigger value="favorites">Favoris</TabsTrigger>
            </TabsList>

            <div className="hidden md:flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Upload className="h-4 w-4" />
                <span>Importer</span>
              </Button>
              <Button size="sm" className="gap-1 bg-[#c83e3e] hover:bg-[#b53535]">
                <Plus className="h-4 w-4" />
                <span>Nouveau document</span>
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-64 space-y-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">Dossiers</div>
                <Button variant="ghost" size="sm" onClick={() => setIsCreateFolderOpen(true)}>
                  <FolderPlus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${selectedFolder === null ? "bg-[#f5f0e8]/50 text-[#c83e3e]" : ""}`}
                  onClick={() => setSelectedFolder(null)}
                >
                  Tous les documents
                </Button>
                {folders.map((folder) => (
                  <Button
                    key={folder.id}
                    variant="ghost"
                    className={`w-full justify-start ${selectedFolder === folder.name ? "bg-[#f5f0e8]/50 text-[#c83e3e]" : ""}`}
                    onClick={() => setSelectedFolder(folder.name)}
                  >
                    {folder.name} ({folder.count})
                  </Button>
                ))}
              </div>

              <div className="pt-4">
                <div className="font-medium mb-2">Filtres</div>
                <div className="space-y-3">
                  <Select value={documentType} onValueChange={setDocumentType}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Type de document" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      <SelectItem value="cours">Cours</SelectItem>
                      <SelectItem value="exercice">Exercices</SelectItem>
                      <SelectItem value="evaluation">Évaluations</SelectItem>
                      <SelectItem value="presentation">Présentations</SelectItem>
                      <SelectItem value="fiche">Fiches</SelectItem>
                      <SelectItem value="projet">Projets</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Trier par date</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                      className="h-8 w-8 p-0"
                    >
                      {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Vue</span>
                    <div className="flex border rounded-md">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className={`h-8 w-8 p-0 rounded-none ${viewMode === "grid" ? "bg-[#f5f0e8]" : ""}`}
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className={`h-8 w-8 p-0 rounded-none ${viewMode === "list" ? "bg-[#f5f0e8]" : ""}`}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <TabsContent value="all" className="m-0">
                {viewMode === "grid" ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {sortedDocuments.map((doc) => (
                      <DocumentCard key={doc.id} document={doc} />
                    ))}
                  </div>
                ) : (
                  <DocumentList documents={sortedDocuments} />
                )}
              </TabsContent>
              <TabsContent value="recent" className="m-0">
                {viewMode === "grid" ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {sortedDocuments
                      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                      .slice(0, 6)
                      .map((doc) => (
                        <DocumentCard key={doc.id} document={doc} />
                      ))}
                  </div>
                ) : (
                  <DocumentList
                    documents={sortedDocuments
                      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                      .slice(0, 6)}
                  />
                )}
              </TabsContent>
              <TabsContent value="shared" className="m-0">
                {viewMode === "grid" ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {sortedDocuments
                      .filter((doc) => doc.shared)
                      .map((doc) => (
                        <DocumentCard key={doc.id} document={doc} />
                      ))}
                  </div>
                ) : (
                  <DocumentList documents={sortedDocuments.filter((doc) => doc.shared)} />
                )}
              </TabsContent>
              <TabsContent value="favorites" className="m-0">
                {viewMode === "grid" ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {sortedDocuments
                      .filter((doc) => doc.favorite)
                      .map((doc) => (
                        <DocumentCard key={doc.id} document={doc} />
                      ))}
                  </div>
                ) : (
                  <DocumentList documents={sortedDocuments.filter((doc) => doc.favorite)} />
                )}
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </main>

      <CreateDocumentDialog open={isCreateDocumentOpen} onOpenChange={setIsCreateDocumentOpen} folders={folders} />

      <CreateFolderDialog open={isCreateFolderOpen} onOpenChange={setIsCreateFolderOpen} />
    </div>
  )
}

