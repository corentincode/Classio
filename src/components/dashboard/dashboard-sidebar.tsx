"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import {
  BarChart3,
  BookOpen,
  Calendar,
  ChevronDown,
  Clock,
  FileText,
  Home,
  LogOut,
  MessageSquare,
  Settings,
  User,
  Users,
  EarthLock,
  School
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {auth} from "@/lib/auth";
import { useSession } from "next-auth/react";
import {Role} from "@prisma/client"
export default function DashboardSidebar() {
  const { data: session } = useSession(); // 🔥 Récupère la session utilisateur



  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    classes: true,
    communications: false,
  })

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }))
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-3">
          <div className="h-8 w-8 rounded-full bg-[#c83e3e] flex items-center justify-center text-white font-bold">
            C
          </div>
          <div className="font-bold text-lg">Classio</div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/dashboard")}>
              <Link href="/dashboard">
                <Home className="h-4 w-4" />
                <span>Tableau de bord</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {session?.user?.role === Role.SUPER_ADMIN && (
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard/admin/etablissements")}>
                  <Link href="/dashboard/admin/etablissements">
                    <School className="h-4 w-4" />
                    <span>Etablissements</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
          )}
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/dashboard/calendar")}>
              <Link href="/dashboard/calendar">
                <Calendar className="h-4 w-4" />
                <span>Emploi du temps</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <Collapsible open={openMenus.classes} onOpenChange={() => toggleMenu("classes")} className="w-full">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                  <BookOpen className="h-4 w-4" />
                  <span>Classes & Notes</span>
                  <ChevronDown className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild isActive={isActive("/dashboard/classes")}>
                      <Link href="/dashboard/classes">Toutes les classes</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild isActive={isActive("/dashboard/grades")}>
                      <Link href="/dashboard/grades">Gestion des notes</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild isActive={isActive("/dashboard/assignments")}>
                      <Link href="/dashboard/assignments">Devoirs & Rendus</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/dashboard/attendance")}>
              <Link href="/dashboard/attendance">
                <Clock className="h-4 w-4" />
                <span>Présences & Retards</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <Collapsible
            open={openMenus.communications}
            onOpenChange={() => toggleMenu("communications")}
            className="w-full"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                  <MessageSquare className="h-4 w-4" />
                  <span>Communication</span>
                  <ChevronDown className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild isActive={isActive("/dashboard/messages")}>
                      <Link href="/dashboard/messages">Messages</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild isActive={isActive("/dashboard/announcements")}>
                      <Link href="/dashboard/announcements">Annonces</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild isActive={isActive("/dashboard/meetings")}>
                      <Link href="/dashboard/meetings">Réunions</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/dashboard/users")}>
              <Link href="/dashboard/users">
                <Users className="h-4 w-4" />
                <span>Utilisateurs</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/dashboard/reports")}>
              <Link href="/dashboard/reports">
                <BarChart3 className="h-4 w-4" />
                <span>Rapports & Statistiques</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/dashboard/documents")}>
              <Link href="/dashboard/documents">
                <FileText className="h-4 w-4" />
                <span>Documents</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/dashboard/settings")}>
              <Link href="/dashboard/settings">
                <Settings className="h-4 w-4" />
                <span>Paramètres</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {session?.user?.role === Role.SUPER_ADMIN && (
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard/admin")}>
                  <Link href="/dashboard/admin">
                    <EarthLock className="h-4 w-4" />
                    <span>Super Admin</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
          )}

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/dashboard/profile")}>
              <Link href="/dashboard/profile">
                <User className="h-4 w-4" />
                <span>Mon profil</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => signOut({ callbackUrl: "/signout" })}>
              <LogOut className="h-4 w-4" />
              <span>Déconnexion</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {session && (
            <div className="px-3 py-2 mt-2">
              <div className="flex items-center gap-3 rounded-lg border border-[#f5f0e8] p-2 bg-white">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                  <AvatarFallback className="bg-[#c83e3e]/20 text-[#c83e3e]">
                    {session?.user?.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{session.user.name}</span>
                  <span className="text-xs text-gray-500">
                  {session.user.role}
                </span>
                </div>
              </div>
            </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}

