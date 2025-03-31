"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

import type { User } from "./users-content"

interface UserTableProps {
  users: User[]
  onUserSelect: (user: User) => void
}

export default function UserTable({ users, onUserSelect }: UserTableProps) {
  const [sortField, setSortField] = useState<keyof User>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 10

  // Fonction pour trier les utilisateurs
  const sortUsers = (a: User, b: User) => {
    const valueA = a[sortField] ?? ""
    const valueB = b[sortField] ?? ""

    if (valueA < valueB) {
      return sortDirection === "asc" ? -1 : 1
    }
    if (valueA > valueB) {
      return sortDirection === "asc" ? 1 : -1
    }
    return 0
  }

  // Fonction pour changer le tri
  const handleSort = (field: keyof User) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = [...users].sort(sortUsers).slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(users.length / usersPerPage)

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f5f0e8]/30">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort("name")}>
                  Nom
                  {sortField === "name" &&
                    (sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort("email")}>
                  Email
                  {sortField === "email" &&
                    (sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort("role")}>
                  Rôle
                  {sortField === "role" &&
                    (sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort("status")}>
                  Statut
                  {sortField === "status" &&
                    (sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort("joinedAt")}>
                  Inscription
                  {sortField === "joinedAt" &&
                    (sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
                </div>
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr
                key={user.id}
                className="border-t border-[#f5f0e8] hover:bg-[#f5f0e8]/10 cursor-pointer"
                onClick={() => onUserSelect({ ...user, phone: user.phone || "" })}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      {user.role === "Enseignant" && user.subject && (
                        <div className="text-xs text-gray-500">{user.subject}</div>
                      )}
                      {user.role === "Élève" && user.grade && <div className="text-xs text-gray-500">{user.grade}</div>}
                      {user.role === "Administrateur" && user.department && (
                        <div className="text-xs text-gray-500">{user.department}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">{user.email}</td>
                <td className="px-4 py-3">
                  <Badge
                    variant="outline"
                    className={`
                      ${user.role === "Enseignant" ? "bg-blue-50 text-blue-700 border-blue-200" : ""}
                      ${user.role === "Élève" ? "bg-green-50 text-green-700 border-green-200" : ""}
                      ${user.role === "Administrateur" ? "bg-purple-50 text-purple-700 border-purple-200" : ""}
                    `}
                  >
                    {user.role}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge
                    variant="outline"
                    className={`
                      ${user.status === "Actif" ? "bg-green-50 text-green-700 border-green-200" : ""}
                      ${user.status === "Inactif" ? "bg-gray-50 text-gray-700 border-gray-200" : ""}
                    `}
                  >
                    {user.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm">{formatDate(user.joinedAt)}</td>
                <td className="px-4 py-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          onUserSelect({ ...user, phone: user.phone || "" })
                        }}
                      >
                        Voir le profil
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Modifier</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="text-red-600">
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#f5f0e8]">
          <div className="text-sm text-gray-500">
            Affichage de {indexOfFirstUser + 1} à {Math.min(indexOfLastUser, users.length)} sur {users.length}{" "}
            utilisateurs
          </div>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Précédent
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Suivant
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

