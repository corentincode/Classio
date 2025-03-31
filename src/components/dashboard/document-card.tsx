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
import { Card, CardContent, CardFooter } from "@/components/ui/card"
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

interface DocumentCardProps {
  document: Document
}

export default function DocumentCard({ document }: DocumentCardProps) {
  const [isFavorite, setIsFavorite] = useState(document.favorite)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)

  const getDocumentIcon = () => {
    switch (document.format) {
      case "pdf":
        return <FileTextIcon className="h-6 w-6 text-red-500" />
      case "docx":
        return <FileText className="h-6 w-6 text-blue-500" />
      case "pptx":
        return <FilePieChart className="h-6 w-6 text-orange-500" />
      case "xlsx":
        return <FileSpreadsheet className="h-6 w-6 text-green-500" />
      case "jpg":
      case "png":
        return <FileImage className="h-6 w-6 text-purple-500" />
      default:
        return <File className="h-6 w-6 text-gray-500" />
    }
  }

  const getDocumentTypeBadge = () => {
    switch (document.type) {
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

  const formattedDate = formatDistanceToNow(new Date(document.updatedAt), {
    addSuffix: true,
    locale: fr,
  })

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-[4/3] bg-[#f5f0e8]/20">
        <div className="absolute inset-0 flex items-center justify-center">{getDocumentIcon()}</div>
        <Button
          variant="ghost"
          size="icon"
          className={`absolute right-2 top-2 ${isFavorite ? "text-yellow-500" : "text-gray-400"}`}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Star className="h-5 w-5 fill-current" />
        </Button>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-medium line-clamp-2">{document.title}</h3>
            <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
              <span>{document.format.toUpperCase()}</span>
              <span>•</span>
              <span>{document.size}</span>
            </div>
          </div>
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
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                <span>Télécharger</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsShareDialogOpen(true)}>
                <Share2 className="mr-2 h-4 w-4" />
                <span>Partager</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Supprimer</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-4 pt-2">
        <div className="flex items-center gap-2">
          {getDocumentTypeBadge()}
          {document.shared && (
            <Badge variant="outline" className="bg-[#f5f0e8]/50">
              Partagé
            </Badge>
          )}
        </div>
        <div className="text-xs text-gray-500">{formattedDate}</div>
      </CardFooter>

      <ShareDocumentDialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen} document={document} />
    </Card>
  )
}

