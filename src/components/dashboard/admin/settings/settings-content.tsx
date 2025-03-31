"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Bell,
  ChevronRight,
  Globe,
  HelpCircle,
  Lock,
  LogOut,
  Moon,
  Palette,
  Settings,
  Shield,
  Sun,
  User,
  BookOpen,
  MessageSquare,
} from "lucide-react"
import { signOut } from "next-auth/react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

// Animations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function SettingsContent() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("profile")
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("fr")
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle")

  const handleSave = () => {
    setSaveStatus("saving")
    // Simuler une sauvegarde
    setTimeout(() => {
      setSaveStatus("success")
      setTimeout(() => setSaveStatus("idle"), 2000)
    }, 1000)
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="border-b border-[#f5f0e8] bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-xl font-bold">Paramètres</h1>
          </div>

          <div className="flex items-center gap-4">
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
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
          <motion.div variants={fadeIn} className="flex flex-col md:flex-row gap-6">
            {/* Sidebar Navigation */}
            <Card className="w-full md:w-64 h-fit">
              <CardContent className="p-0">
                <nav className="flex flex-col">
                  <SettingsNavItem
                    icon={<User className="h-4 w-4" />}
                    label="Profil"
                    active={activeTab === "profile"}
                    onClick={() => setActiveTab("profile")}
                  />
                  <SettingsNavItem
                    icon={<Bell className="h-4 w-4" />}
                    label="Notifications"
                    active={activeTab === "notifications"}
                    onClick={() => setActiveTab("notifications")}
                  />
                  <SettingsNavItem
                    icon={<Palette className="h-4 w-4" />}
                    label="Apparence"
                    active={activeTab === "appearance"}
                    onClick={() => setActiveTab("appearance")}
                  />
                  <SettingsNavItem
                    icon={<Lock className="h-4 w-4" />}
                    label="Sécurité"
                    active={activeTab === "security"}
                    onClick={() => setActiveTab("security")}
                  />
                  <SettingsNavItem
                    icon={<Globe className="h-4 w-4" />}
                    label="Langue et région"
                    active={activeTab === "language"}
                    onClick={() => setActiveTab("language")}
                  />
                  <SettingsNavItem
                    icon={<Settings className="h-4 w-4" />}
                    label="Paramètres avancés"
                    active={activeTab === "advanced"}
                    onClick={() => setActiveTab("advanced")}
                  />
                  <SettingsNavItem
                    icon={<HelpCircle className="h-4 w-4" />}
                    label="Aide et support"
                    active={activeTab === "help"}
                    onClick={() => setActiveTab("help")}
                  />
                  <SettingsNavItem
                    icon={<LogOut className="h-4 w-4" />}
                    label="Déconnexion"
                    onClick={handleSignOut}
                    className="text-[#c83e3e]"
                  />
                </nav>
              </CardContent>
            </Card>

            {/* Settings Content */}
            <div className="flex-1">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                {/* Profile Settings */}
                <TabsContent value="profile" className="w-full">
                  <Card>
                    <CardHeader>
                      <CardTitle>Informations du profil</CardTitle>
                      <CardDescription>Gérez vos informations personnelles et vos préférences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="flex flex-col items-center gap-3">
                          <Avatar className="h-24 w-24">
                            <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Avatar" />
                            <AvatarFallback className="bg-[#c83e3e]/20 text-[#c83e3e] text-xl">JD</AvatarFallback>
                          </Avatar>
                          <Button variant="outline" size="sm">
                            Changer la photo
                          </Button>
                        </div>
                        <div className="flex-1 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="firstName">Prénom</Label>
                              <Input id="firstName" defaultValue="Jean" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName">Nom</Label>
                              <Input id="lastName" defaultValue="Dupont" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue="jean.dupont@example.com" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Téléphone</Label>
                            <Input id="phone" type="tel" defaultValue="+33 6 12 34 56 78" />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Informations professionnelles</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="role">Rôle</Label>
                            <Select defaultValue="admin">
                              <SelectTrigger id="role">
                                <SelectValue placeholder="Sélectionner un rôle" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="admin">Administrateur</SelectItem>
                                <SelectItem value="teacher">Enseignant</SelectItem>
                                <SelectItem value="staff">Personnel</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="department">Département</Label>
                            <Select defaultValue="management">
                              <SelectTrigger id="department">
                                <SelectValue placeholder="Sélectionner un département" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="management">Direction</SelectItem>
                                <SelectItem value="science">Sciences</SelectItem>
                                <SelectItem value="literature">Lettres</SelectItem>
                                <SelectItem value="arts">Arts</SelectItem>
                                <SelectItem value="sports">Sports</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bio">Biographie</Label>
                          <Textarea
                            id="bio"
                            placeholder="Parlez-nous de vous..."
                            defaultValue="Administrateur système avec 10 ans d'expérience dans le secteur éducatif."
                            className="min-h-[100px]"
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Annuler</Button>
                      <Button
                        onClick={handleSave}
                        disabled={saveStatus === "saving"}
                        className="bg-[#c83e3e] hover:bg-[#b53535]"
                      >
                        {saveStatus === "saving"
                          ? "Enregistrement..."
                          : saveStatus === "success"
                            ? "Enregistré !"
                            : "Enregistrer les modifications"}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                {/* Notifications Settings */}
                <TabsContent value="notifications" className="w-full">
                  <Card>
                    <CardHeader>
                      <CardTitle>Paramètres de notification</CardTitle>
                      <CardDescription>Gérez comment et quand vous recevez des notifications</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Notifications par email</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="email-messages">Messages</Label>
                              <p className="text-sm text-gray-500">
                                Recevoir un email quand vous recevez un nouveau message
                              </p>
                            </div>
                            <Switch id="email-messages" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="email-announcements">Annonces</Label>
                              <p className="text-sm text-gray-500">Recevoir un email pour les annonces importantes</p>
                            </div>
                            <Switch id="email-announcements" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="email-events">Événements</Label>
                              <p className="text-sm text-gray-500">Recevoir un email pour les rappels d'événements</p>
                            </div>
                            <Switch id="email-events" defaultChecked />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Notifications dans l'application</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="app-messages">Messages</Label>
                              <p className="text-sm text-gray-500">
                                Afficher une notification pour les nouveaux messages
                              </p>
                            </div>
                            <Switch id="app-messages" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="app-tasks">Tâches</Label>
                              <p className="text-sm text-gray-500">
                                Afficher une notification pour les rappels de tâches
                              </p>
                            </div>
                            <Switch id="app-tasks" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="app-system">Système</Label>
                              <p className="text-sm text-gray-500">
                                Afficher une notification pour les mises à jour système
                              </p>
                            </div>
                            <Switch id="app-system" defaultChecked />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Fréquence des notifications</h3>
                        <RadioGroup defaultValue="realtime">
                          <div className="flex items-start space-x-2">
                            <RadioGroupItem value="realtime" id="realtime" />
                            <div className="grid gap-1.5">
                              <Label htmlFor="realtime">Temps réel</Label>
                              <p className="text-sm text-gray-500">
                                Recevoir les notifications dès qu'elles sont générées
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <RadioGroupItem value="daily" id="daily" />
                            <div className="grid gap-1.5">
                              <Label htmlFor="daily">Résumé quotidien</Label>
                              <p className="text-sm text-gray-500">
                                Recevoir un résumé quotidien de toutes les notifications
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <RadioGroupItem value="weekly" id="weekly" />
                            <div className="grid gap-1.5">
                              <Label htmlFor="weekly">Résumé hebdomadaire</Label>
                              <p className="text-sm text-gray-500">
                                Recevoir un résumé hebdomadaire de toutes les notifications
                              </p>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Annuler</Button>
                      <Button
                        onClick={handleSave}
                        disabled={saveStatus === "saving"}
                        className="bg-[#c83e3e] hover:bg-[#b53535]"
                      >
                        {saveStatus === "saving"
                          ? "Enregistrement..."
                          : saveStatus === "success"
                            ? "Enregistré !"
                            : "Enregistrer les modifications"}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                {/* Appearance Settings */}
                <TabsContent value="appearance" className="w-full">
                  <Card>
                    <CardHeader>
                      <CardTitle>Apparence</CardTitle>
                      <CardDescription>Personnalisez l'apparence de votre interface</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Thème</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div
                            className={`border rounded-lg p-4 cursor-pointer transition-all ${!darkMode ? "border-[#c83e3e] bg-[#c83e3e]/5" : "border-gray-200 hover:border-gray-300"}`}
                            onClick={() => setDarkMode(false)}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className="font-medium">Clair</div>
                              <Sun className="h-5 w-5 text-[#c83e3e]" />
                            </div>
                            <div className="h-20 bg-white border border-gray-200 rounded-md"></div>
                          </div>
                          <div
                            className={`border rounded-lg p-4 cursor-pointer transition-all ${darkMode ? "border-[#c83e3e] bg-[#c83e3e]/5" : "border-gray-200 hover:border-gray-300"}`}
                            onClick={() => setDarkMode(true)}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className="font-medium">Sombre</div>
                              <Moon className="h-5 w-5 text-[#c83e3e]" />
                            </div>
                            <div className="h-20 bg-gray-900 border border-gray-700 rounded-md"></div>
                          </div>
                          <div className="border rounded-lg p-4 cursor-pointer transition-all border-gray-200 hover:border-gray-300">
                            <div className="flex items-center justify-between mb-4">
                              <div className="font-medium">Système</div>
                              <Settings className="h-5 w-5 text-[#c83e3e]" />
                            </div>
                            <div className="h-20 bg-gradient-to-r from-white to-gray-900 border border-gray-200 rounded-md"></div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Densité d'affichage</h3>
                        <RadioGroup defaultValue="comfortable">
                          <div className="flex items-start space-x-2">
                            <RadioGroupItem value="comfortable" id="comfortable" />
                            <div className="grid gap-1.5">
                              <Label htmlFor="comfortable">Confortable</Label>
                              <p className="text-sm text-gray-500">Espacement standard entre les éléments</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <RadioGroupItem value="compact" id="compact" />
                            <div className="grid gap-1.5">
                              <Label htmlFor="compact">Compact</Label>
                              <p className="text-sm text-gray-500">Espacement réduit pour afficher plus de contenu</p>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Couleur d'accentuation</h3>
                        <div className="grid grid-cols-6 gap-2">
                          <div className="h-10 w-10 rounded-full bg-[#c83e3e] ring-2 ring-offset-2 ring-[#c83e3e] cursor-pointer"></div>
                          <div className="h-10 w-10 rounded-full bg-blue-600 cursor-pointer"></div>
                          <div className="h-10 w-10 rounded-full bg-green-600 cursor-pointer"></div>
                          <div className="h-10 w-10 rounded-full bg-purple-600 cursor-pointer"></div>
                          <div className="h-10 w-10 rounded-full bg-orange-500 cursor-pointer"></div>
                          <div className="h-10 w-10 rounded-full bg-teal-500 cursor-pointer"></div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Réinitialiser</Button>
                      <Button
                        onClick={handleSave}
                        disabled={saveStatus === "saving"}
                        className="bg-[#c83e3e] hover:bg-[#b53535]"
                      >
                        {saveStatus === "saving"
                          ? "Enregistrement..."
                          : saveStatus === "success"
                            ? "Enregistré !"
                            : "Enregistrer les modifications"}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                {/* Security Settings */}
                <TabsContent value="security" className="w-full">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sécurité</CardTitle>
                      <CardDescription>Gérez vos paramètres de sécurité et de confidentialité</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Mot de passe</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="current-password">Mot de passe actuel</Label>
                            <Input id="current-password" type="password" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="new-password">Nouveau mot de passe</Label>
                            <Input id="new-password" type="password" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                            <Input id="confirm-password" type="password" />
                          </div>
                          <Button className="bg-[#c83e3e] hover:bg-[#b53535]">Mettre à jour le mot de passe</Button>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Authentification à deux facteurs</h3>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Authentification à deux facteurs</Label>
                            <p className="text-sm text-gray-500">
                              Ajouter une couche de sécurité supplémentaire à votre compte
                            </p>
                          </div>
                          <Button variant="outline">Configurer</Button>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Sessions actives</h3>
                        <div className="space-y-4">
                          <div className="rounded-lg border p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">Cet appareil</div>
                                <div className="text-sm text-gray-500">Dernière activité : Aujourd'hui à 14:32</div>
                                <div className="text-sm text-gray-500">Paris, France • Chrome sur Windows</div>
                              </div>
                              <Shield className="h-5 w-5 text-green-500" />
                            </div>
                          </div>
                          <div className="rounded-lg border p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">iPhone de Jean</div>
                                <div className="text-sm text-gray-500">Dernière activité : Hier à 18:45</div>
                                <div className="text-sm text-gray-500">Lyon, France • Safari sur iOS</div>
                              </div>
                              <Button variant="outline" size="sm" className="text-red-500">
                                Déconnecter
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="text-red-500 w-full">
                        Se déconnecter de tous les appareils
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                {/* Language Settings */}
                <TabsContent value="language" className="w-full">
                  <Card>
                    <CardHeader>
                      <CardTitle>Langue et région</CardTitle>
                      <CardDescription>Définissez vos préférences linguistiques et régionales</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Langue de l'application</h3>
                        <div className="space-y-2">
                          <Label htmlFor="language">Langue</Label>
                          <Select value={language} onValueChange={setLanguage}>
                            <SelectTrigger id="language">
                              <SelectValue placeholder="Sélectionner une langue" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fr">Français</SelectItem>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Español</SelectItem>
                              <SelectItem value="de">Deutsch</SelectItem>
                              <SelectItem value="it">Italiano</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Format de date et d'heure</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="date-format">Format de date</Label>
                            <Select defaultValue="dd/mm/yyyy">
                              <SelectTrigger id="date-format">
                                <SelectValue placeholder="Sélectionner un format" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="dd/mm/yyyy">JJ/MM/AAAA</SelectItem>
                                <SelectItem value="mm/dd/yyyy">MM/JJ/AAAA</SelectItem>
                                <SelectItem value="yyyy-mm-dd">AAAA-MM-JJ</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="time-format">Format d'heure</Label>
                            <Select defaultValue="24h">
                              <SelectTrigger id="time-format">
                                <SelectValue placeholder="Sélectionner un format" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="24h">24 heures (14:30)</SelectItem>
                                <SelectItem value="12h">12 heures (2:30 PM)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Fuseau horaire</h3>
                        <div className="space-y-2">
                          <Label htmlFor="timezone">Fuseau horaire</Label>
                          <Select defaultValue="europe-paris">
                            <SelectTrigger id="timezone">
                              <SelectValue placeholder="Sélectionner un fuseau horaire" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="europe-paris">Europe/Paris (UTC+01:00)</SelectItem>
                              <SelectItem value="europe-london">Europe/London (UTC+00:00)</SelectItem>
                              <SelectItem value="america-new_york">America/New_York (UTC-05:00)</SelectItem>
                              <SelectItem value="asia-tokyo">Asia/Tokyo (UTC+09:00)</SelectItem>
                              <SelectItem value="australia-sydney">Australia/Sydney (UTC+10:00)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Annuler</Button>
                      <Button
                        onClick={handleSave}
                        disabled={saveStatus === "saving"}
                        className="bg-[#c83e3e] hover:bg-[#b53535]"
                      >
                        {saveStatus === "saving"
                          ? "Enregistrement..."
                          : saveStatus === "success"
                            ? "Enregistré !"
                            : "Enregistrer les modifications"}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                {/* Advanced Settings */}
                <TabsContent value="advanced" className="w-full">
                  <Card>
                    <CardHeader>
                      <CardTitle>Paramètres avancés</CardTitle>
                      <CardDescription>Configurez les options avancées de l'application</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Exportation de données</h3>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-500">
                            Exportez toutes vos données dans un format téléchargeable
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm">
                              Exporter en CSV
                            </Button>
                            <Button variant="outline" size="sm">
                              Exporter en Excel
                            </Button>
                            <Button variant="outline" size="sm">
                              Exporter en PDF
                            </Button>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Paramètres de cache</h3>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Vider le cache</Label>
                            <p className="text-sm text-gray-500">Effacer les données temporaires stockées localement</p>
                          </div>
                          <Button variant="outline">Vider le cache</Button>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Options de développeur</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="dev-mode">Mode développeur</Label>
                              <p className="text-sm text-gray-500">
                                Activer les fonctionnalités avancées pour les développeurs
                              </p>
                            </div>
                            <Switch id="dev-mode" />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="debug-logs">Journaux de débogage</Label>
                              <p className="text-sm text-gray-500">
                                Enregistrer les journaux détaillés pour le débogage
                              </p>
                            </div>
                            <Switch id="debug-logs" />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-red-500">Zone dangereuse</h3>
                        <div className="space-y-3">
                          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                            <div className="space-y-2">
                              <h4 className="font-medium text-red-600">Supprimer le compte</h4>
                              <p className="text-sm text-red-600">
                                Cette action est irréversible. Toutes vos données seront définitivement supprimées.
                              </p>
                              <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50">
                                Supprimer mon compte
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Help and Support */}
                <TabsContent value="help" className="w-full">
                  <Card>
                    <CardHeader>
                      <CardTitle>Aide et support</CardTitle>
                      <CardDescription>
                        Obtenez de l'aide et des informations sur l'utilisation de Classio
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Centre d'aide</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card className="border border-[#f5f0e8]">
                            <CardContent className="p-4 flex flex-col items-center text-center">
                              <div className="h-12 w-12 rounded-full bg-[#f5f0e8] flex items-center justify-center mb-3">
                                <BookOpen className="h-6 w-6 text-[#c83e3e]" />
                              </div>
                              <h4 className="font-medium mb-1">Documentation</h4>
                              <p className="text-sm text-gray-500 mb-3">Consultez notre documentation détaillée</p>
                              <Button variant="outline" className="w-full">
                                Voir la documentation
                              </Button>
                            </CardContent>
                          </Card>
                          <Card className="border border-[#f5f0e8]">
                            <CardContent className="p-4 flex flex-col items-center text-center">
                              <div className="h-12 w-12 rounded-full bg-[#f5f0e8] flex items-center justify-center mb-3">
                                <MessageSquare className="h-6 w-6 text-[#c83e3e]" />
                              </div>
                              <h4 className="font-medium mb-1">Support technique</h4>
                              <p className="text-sm text-gray-500 mb-3">Contactez notre équipe de support</p>
                              <Button variant="outline" className="w-full">
                                Contacter le support
                              </Button>
                            </CardContent>
                          </Card>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Questions fréquentes</h3>
                        <div className="space-y-3">
                          <div className="rounded-lg border p-4">
                            <div className="font-medium mb-1">Comment modifier mon mot de passe ?</div>
                            <p className="text-sm text-gray-500">
                              Vous pouvez modifier votre mot de passe dans l'onglet "Sécurité" des paramètres.
                            </p>
                          </div>
                          <div className="rounded-lg border p-4">
                            <div className="font-medium mb-1">Comment exporter mes données ?</div>
                            <p className="text-sm text-gray-500">
                              Vous pouvez exporter vos données dans l'onglet "Paramètres avancés".
                            </p>
                          </div>
                          <div className="rounded-lg border p-4">
                            <div className="font-medium mb-1">Comment ajouter un nouvel utilisateur ?</div>
                            <p className="text-sm text-gray-500">
                              Vous pouvez ajouter de nouveaux utilisateurs dans la section "Utilisateurs" du tableau de
                              bord.
                            </p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Nous contacter</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="subject">Sujet</Label>
                            <Input id="subject" placeholder="Entrez le sujet de votre demande" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                              id="message"
                              placeholder="Décrivez votre problème ou votre question..."
                              className="min-h-[150px]"
                            />
                          </div>
                          <Button className="bg-[#c83e3e] hover:bg-[#b53535]">Envoyer le message</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}

// Settings Navigation Item Component
interface SettingsNavItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick: () => void
  className?: string
}

function SettingsNavItem({ icon, label, active, onClick, className }: SettingsNavItemProps) {
  return (
    <button
      className={`flex items-center gap-3 w-full p-3 text-left transition-colors ${
        active ? "bg-[#c83e3e]/10 text-[#c83e3e] font-medium" : "hover:bg-gray-100"
      } ${className || ""}`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
      {active && <ChevronRight className="ml-auto h-4 w-4" />}
    </button>
  )
}

