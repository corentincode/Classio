"use client"

import * as React from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    SortingState,
    getSortedRowModel,
    ExpandedState,
    getExpandedRowModel,
} from "@tanstack/react-table"
import {ArrowUpDown, ChevronDown, ChevronRight, MoreHorizontal, Pencil, Plus, Trash, User} from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {CreateClasseForm} from "@/components/dashboard/admin/etablissement/[id]/create-classe-form";
import {AddUserToClasseForm} from "@/components/dashboard/admin/etablissement/[id]/add-user-to-class-form";
import {number} from "zod";

type ClasseUser = {
    id: string
    userId: string
    classeId: string
    roleInClass: string
    user: {
        id: string
        name: string | null
        email: string | null
        image: string | null
    }
}

type Classe = {
    id: string
    nom: string
    classeUsers?: ClasseUser[]
}

type nbrClasseUsers = {
    id: number

}

export function ClassesTable({ classes, etablissementId }: { classes: Classe[], etablissementId: string }) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [expanded, setExpanded] = React.useState<ExpandedState>({})
    const [classesWithUsers, setClassesWithUsers] = useState<Classe[]>(classes)
    const [isAddEventOpen, setIsAddEventOpen] = useState(false)
    const [isAddUserClasseOpen, setIsAddUserClasseOpen] = useState(false)

    // Fonction pour rafraîchir les classes après ajout
    const refreshClasses = async () => {

    }
    // Fonction pour charger les utilisateurs d'une classe lorsqu'elle est dépliée
    const fetchClasseUsers = async (etablissementId: string, classeId: string) => {
        try {
            const response = await fetch(`/api/admin/etablissement/${etablissementId}/classes/${classeId}/users`)
            if (response.ok) {
                const classeUsers = await response.json()

                // Mettre à jour les classes avec les utilisateurs chargés
                setClassesWithUsers(prev =>
                    prev.map(classe =>
                        classe.id === classeId
                            ? { ...classe, classeUsers }
                            : classe
                    )
                )

            }
        } catch (error) {
            console.error("Erreur lors du chargement des utilisateurs de la classe:", error)
        }
    }



    const columns: ColumnDef<Classe>[] = [
        {
            id: "expander",
            header: () => null,
            cell: ({ row }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => row.toggleExpanded()}
                        className="p-0 h-8 w-8"
                    >
                        {row.getIsExpanded() ? (
                            <ChevronDown className="h-4 w-4" />
                        ) : (
                            <ChevronRight className="h-4 w-4" />
                        )}
                    </Button>
                )
            },
        },

        {
            accessorKey: "nom",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Nom
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="font-medium">{row.getValue("nom")}</div>,
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const classe = row.original

                return (
                    <div>
                        <div>
                            <DropdownMenu>

                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Ouvrir menu</span>
                                        <MoreHorizontal className="h-4 w-4"/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem
                                        onClick={() => setIsAddUserClasseOpen(true)}
                                    >
                                        Ajouter un utilisateur

                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                        onClick={() => navigator.clipboard.writeText(classe.id)}
                                    >

                                        Copier l'ID
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem>
                                        <Pencil className="mr-2 h-4 w-4"/>
                                        Modifier
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive">
                                        <Trash className="mr-2 h-4 w-4"/>
                                        Supprimer
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                    </div>
                )
            },
        },
    ]

    const table = useReactTable({
        data: classesWithUsers,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onExpandedChange: setExpanded,
        getExpandedRowModel: getExpandedRowModel(),
        state: {
            sorting,
            expanded,
        },
    })

    // Composant pour afficher les utilisateurs d'une classe
    const ClasseUsersDetail = ({classe}: { classe: Classe,  }) => {


        if (!classe.classeUsers) {
            fetchClasseUsers(etablissementId,classe.id)
            return <div className="py-2 px-4">
                <Button
                    onClick={() => setIsAddUserClasseOpen(true)}
                >
                    Ajouter un utilisateur

                </Button>
                <AddUserToClasseForm
                    etablissementId={etablissementId}
                    classeId={classe.id}
                    isOpen={isAddUserClasseOpen}
                    onOpenChange={setIsAddUserClasseOpen}
                    onSuccess={refreshClasses}
                />
                Chargement des utilisateurs...{JSON.stringify(classe.id)}</div>
        }

        if (classe.classeUsers.length === 0) {
            return <div className="py-2 px-4 text-muted-foreground">Aucun utilisateur associé à cette classe</div>
        }

        return (
            <div className="py-2 px-4 bg-muted/30">

                <h4 className="font-medium mb-2 flex items-center">
                    <User className="h-4 w-4 mr-2"/>
                    Utilisateurs de la classe
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {classe.classeUsers.map((classeUser) => (
                        <div
                            key={classeUser.id}
                            className="flex items-center p-2 border rounded-md bg-background"
                        >
                            <Badge variant="outline" className="ml-2">
                                <span>
                                    {classeUser.firstName || ""}
                                    &nbsp;
                                    {classeUser.name || classeUser.email}
                                </span>
                            </Badge>
                        </div>
                    ))}
                </div>

            </div>
        )
    }

    const AddUserToClasseFormImpl = ({classe}: { classe: Classe }) => {
        if (!classe.classeUsers) {
            return <div className="py-2 px-4">Chargement des utilisateurs...</div>
        }

        if (classe.classeUsers.length === 0) {
            return <div className="py-2 px-4 text-muted-foreground">Aucun utilisateur associé à cette classe</div>
        }

        return (
            <div className="py-2 px-4 bg-muted/30">
                <h4 className="font-medium mb-2 flex items-center">
                    <User className="h-4 w-4 mr-2"/>
                    Utilisateurs de la classe
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {classe.classeUsers.map((classeUser) => (
                        <div key={classeUser.id} className="flex items-center p-2 border rounded-md bg-background">
                            <Avatar className="h-8 w-8 mr-2">
                                {classeUser.user.image ? (
                                    <AvatarImage src={classeUser.user.image} alt={classeUser.user.name || ""} />
                                ) : (
                                    <AvatarFallback>
                                        {classeUser.user.name ? classeUser.user.name.charAt(0).toUpperCase() : "U"}
                                    </AvatarFallback>
                                )}
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{classeUser.user.name || "Sans nom"}</p>
                                <p className="text-xs text-muted-foreground truncate">{classeUser.user.email}</p>
                            </div>
                            <Badge variant="outline" className="ml-2">
                                {classeUser.roleInClass}
                            </Badge>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="rounded-md border">

                <Table>

                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>

                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (

                                <React.Fragment key={row.id}>

                                    <TableRow
                                        data-state={row.getIsExpanded() ? "expanded" : row.getIsSelected() && "selected"}
                                        className="cursor-pointer"
                                        onClick={() => row.toggleExpanded()}
                                    >

                                        {row.getVisibleCells().map((cell) => (

                                            <TableCell key={cell.id}>

                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                    {row.getIsExpanded() && (
                                        <TableRow>
                                            <TableCell colSpan={columns.length} className="p-0">
                                                <AddUserToClasseForm
                                                    etablissementId={etablissementId}
                                                    classeId={row.original.id}
                                                    isOpen={isAddUserClasseOpen}
                                                    onOpenChange={setIsAddUserClasseOpen}
                                                    onSuccess={refreshClasses}
                                                />
                                                <ClasseUsersDetail classe={row.original}  />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Aucune classe trouvée.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Précédent
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Suivant
                </Button>
            </div>
        </div>
    )
}
