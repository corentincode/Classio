"use client"

import { useState } from "react"
import { Bell, Download, Search, UserPlus, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarTrigger } from "@/components/ui/sidebar"
import UserTable from "./user-table"
import AddUserDialog from "./add-user-dialog"
import UserDetailsDialog from "./user-details-dialog"

// Export the User interface so it can be imported by other files
export interface User {
  id: string
  name: string
  email: string
  role: string
  status: string
  avatar: string
  joinedAt: string
  lastActive: string
  phone: string
  // Optional properties for different user roles
  subject?: string
  classes?: string[]
  grade?: string
  parents?: string[]
  department?: string
}

// Make sure the rest of the file uses this interface consistently

// Données fictives pour les utilisateurs
const users: User[] = [
  {
    id: "1",
    name: "Sophie Martin",
    email: "sophie.martin@example.com",
    role: "Enseignant",
    subject: "Mathématiques",
    status: "Actif",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "2022-09-01",
    lastActive: "2023-11-05",
    classes: ["Terminale S1", "Première S2"],
    phone: "+33 6 12 34 56 78",
  },
  {
    id: "2",
    name: "Thomas Dubois",
    email: "thomas.dubois@example.com",
    role: "Élève",
    grade: "Terminale S1",
    status: "Actif",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "2022-09-15",
    lastActive: "2023-11-04",
    parents: ["Marie Dubois", "Pierre Dubois"],
    phone: "+33 6 23 45 67 89",
  },
  {
    id: "3",
    name: "Émilie Bernard",
    email: "emilie.bernard@example.com",
    role: "Administrateur",
    department: "Direction",
    status: "Actif",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "2021-08-15",
    lastActive: "2023-11-05",
    phone: "+33 6 34 56 78 90",
  },
  {
    id: "4",
    name: "Lucas Petit",
    email: "lucas.petit@example.com",
    role: "Enseignant",
    subject: "Histoire-Géographie",
    status: "Actif",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "2022-09-01",
    lastActive: "2023-11-03",
    classes: ["Seconde A", "Première ES"],
    phone: "+33 6 45 67 89 01",
  },
  {
    id: "5",
    name: "Chloé Leroy",
    email: "chloe.leroy@example.com",
    role: "Élève",
    grade: "Première ES",
    status: "Actif",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "2022-09-15",
    lastActive: "2023-11-02",
    parents: ["Sophie Leroy", "Marc Leroy"],
    phone: "+33 6 56 78 90 12",
  },
  {
    id: "6",
    name: "Antoine Moreau",
    email: "antoine.moreau@example.com",
    role: "Enseignant",
    subject: "Physique-Chimie",
    status: "Inactif",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "2022-09-01",
    lastActive: "2023-10-15",
    classes: ["Terminale S1", "Terminale S2"],
    phone: "+33 6 67 89 01 23",
  },
  {
    id: "7",
    name: "Léa Fournier",
    email: "lea.fournier@example.com",
    role: "Élève",
    grade: "Seconde A",
    status: "Actif",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "2022-09-15",
    lastActive: "2023-11-05",
    parents: ["Julie Fournier", "Thomas Fournier"],
    phone: "+33 6 78 90 12 34",
  },
  {
    id: "8",
    name: "Nicolas Girard",
    email: "nicolas.girard@example.com",
    role: "Administrateur",
    department: "Vie scolaire",
    status: "Actif",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "2021-08-15",
    lastActive: "2023-11-04",
    phone: "+33 6 89 01 23 45",
  },
]

export default function UsersContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  // Filtrer les utilisateurs en fonction des critères
  const filteredUsers = users.filter((user) => {
    // Filtre par recherche
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())

    // Filtre par rôle (onglet)
    let matchesRole = true
    if (activeTab === "teachers") {
      matchesRole = user.role === "Enseignant"
    } else if (activeTab === "students") {
      matchesRole = user.role === "Élève"
    } else if (activeTab === "admins") {
      matchesRole = user.role === "Administrateur"
    }

    return matchesSearch && matchesRole
  })

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="border-b border-[#f5f0e8] bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-xl font-bold">Utilisateurs</h1>
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
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <TabsList className="bg-[#f5f0e8]/50">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="teachers">Enseignants</TabsTrigger>
              <TabsTrigger value="students">Élèves</TabsTrigger>
              <TabsTrigger value="admins">Administrateurs</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                <span>Exporter</span>
              </Button>
              <Button
                size="sm"
                className="gap-1 bg-[#c83e3e] hover:bg-[#b53535]"
                onClick={() => setIsAddUserOpen(true)}
              >
                <UserPlus className="h-4 w-4" />
                <span>Ajouter un utilisateur</span>
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-[#f5f0e8] overflow-hidden">
            <div className="p-4 border-b border-[#f5f0e8] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#c83e3e]" />
                <h2 className="font-medium">Liste des utilisateurs</h2>
              </div>
              <div className="text-sm text-gray-500">{filteredUsers.length} utilisateurs</div>
            </div>

            <TabsContent value="all" className="m-0">
              <UserTable users={filteredUsers} onUserSelect={(user) => setSelectedUser(user)} />
            </TabsContent>

            <TabsContent value="teachers" className="m-0">
              <UserTable users={filteredUsers} onUserSelect={(user) => setSelectedUser(user)} />
            </TabsContent>

            <TabsContent value="students" className="m-0">
              <UserTable users={filteredUsers} onUserSelect={(user) => setSelectedUser(user)} />
            </TabsContent>

            <TabsContent value="admins" className="m-0">
              <UserTable users={filteredUsers} onUserSelect={(user) => setSelectedUser(user)} />
            </TabsContent>
          </div>
        </Tabs>
      </main>

      <AddUserDialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen} />

      <UserDetailsDialog
        user={selectedUser}
        open={!!selectedUser}
        onOpenChange={(open) => !open && setSelectedUser(null)}
      />
    </div>
  )
}

