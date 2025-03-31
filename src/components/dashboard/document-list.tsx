"use client"

import { useState } from "react"
import {
  FileText,
  Download,
  Share2,
  MoreVertical,
  Star,
  Trash2,
  Edit,
  Eye,
  File,
  FileImage,
  FileSpreadsheet,
  FileTextIcon,
  FilePieChart,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ShareDocumentDialog from "./share-document-dialog"

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

interface DocumentListProps {
  documents: Document[]
}

export default function DocumentList({ documents }: DocumentListProps) {
  const [favorites, setFavorites] = useState<Record<string, boolean>>(
    documents.reduce((acc, doc) => ({ ...acc, [doc.id]: doc.favorite }), {}),
  )
  const [shareDialogOpen, setShareDialogOpen] = useState<Record<string, boolean>>(
    documents.reduce((acc, doc) => ({ ...acc, [doc.id]: false }), {}),
  )

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleShareDialog = (id: string) => {
    setShareDialogOpen((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const getDocumentIcon = (format: string) => {
    switch (format) {
      case "pdf":
        return <FileTextIcon className="h-5 w-5 text-red-500" />
      case "docx":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "pptx":
        return <FilePieChart className="h-5 w-5 text-orange-500" />
      case "xlsx":
        return <FileSpreadsheet className="h-5 w-5 text-green-500" />
      case "jpg":
      case "png":
        return <FileImage className="h-5 w-5 text-purple-500" />
      default:
        return <File className="h-5 w-5 text-gray-500" />
    }
  }

  const getDocumentTypeBadge = (type: string) => {
    switch (type) {
      case "cours":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Cours</Badge>
      case "exercice":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Exercice</Badge>
      case "evaluation":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Évaluation</Badge>
      case "presentation":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">Présentation</Badge>
      case "fiche":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Fiche</Badge>
      case "projet":
        return <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">Projet</Badge>
      default:
        return <Badge variant="outline">Document</Badge>
    }
  }

  return (
    <div className="rounded-md border">
      <div className="grid grid-cols-12 gap-2 border-b bg-[#f5f0e8]/20 p-3 font-medium">
        <div className="col-span-6">Document</div>
        <div className="col-span-2">Type</div>
        <div className="col-span-2">Taille</div>
        <div className="col-span-2">Modifié</div>
      </div>
      <div className="divide-y">
        {documents.map((doc) => (
          <div key={doc.id} className="grid grid-cols-12 items-center gap-2 p-3 hover:bg-[#f5f0e8]/10">
            <div className="col-span-6 flex items-center gap-2">
              <div className="flex items-center gap-2">
                {getDocumentIcon(doc.format)}
                <span className="font-medium">{doc.title}</span>
              </div>
            </div>
            <div className="col-span-2">{getDocumentTypeBadge(doc.type)}</div>
            <div className="col-span-2 text-sm text-gray-500">{doc.size}</div>
            <div className="col-span-2 text-sm text-gray-500">
              {formatDistanceToNow(new Date(doc.updatedAt), {
                addSuffix: true,
                locale: fr,
              })}
            </div>
            <div className="absolute right-3 flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 ${favorites[doc.id] ? "text-yellow-500" : "text-gray-400"}`}
                onClick={() => toggleFavorite(doc.id)}
              >
                <Star className="h-4 w-4 fill-current" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => {}}>
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleShareDialog(doc.id)}>
                <Share2 className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    <span>Aperçu</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Modifier</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Supprimer</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <ShareDocumentDialog
                open={shareDialogOpen[doc.id]}
                onOpenChange={() => toggleShareDialog(doc.id)}
                document={doc}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

