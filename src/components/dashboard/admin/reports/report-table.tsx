"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Définir le type pour les données d'élève
interface Student {
  id: string
  name: string
  class: string
  average: number
  attendance: number
  progress: "improving" | "stable" | "declining"
  lastEvaluation: string
}

// Données fictives pour les élèves
const data: Student[] = [
  {
    id: "1",
    name: "Emma Martin",
    class: "3ème A",
    average: 15.7,
    attendance: 98,
    progress: "improving",
    lastEvaluation: "2023-10-15",
  },
  {
    id: "2",
    name: "Lucas Bernard",
    class: "3ème A",
    average: 12.3,
    attendance: 85,
    progress: "stable",
    lastEvaluation: "2023-10-12",
  },
  {
    id: "3",
    name: "Chloé Dubois",
    class: "3ème B",
    average: 17.2,
    attendance: 100,
    progress: "improving",
    lastEvaluation: "2023-10-18",
  },
  {
    id: "4",
    name: "Nathan Petit",
    class: "3ème B",
    average: 10.8,
    attendance: 78,
    progress: "declining",
    lastEvaluation: "2023-10-10",
  },
  {
    id: "5",
    name: "Léa Moreau",
    class: "3ème C",
    average: 14.5,
    attendance: 92,
    progress: "stable",
    lastEvaluation: "2023-10-14",
  },
  {
    id: "6",
    name: "Hugo Leroy",
    class: "3ème C",
    average: 16.1,
    attendance: 95,
    progress: "improving",
    lastEvaluation: "2023-10-17",
  },
  {
    id: "7",
    name: "Manon Roux",
    class: "3ème A",
    average: 13.9,
    attendance: 88,
    progress: "stable",
    lastEvaluation: "2023-10-11",
  },
  {
    id: "8",
    name: "Théo Fournier",
    class: "3ème B",
    average: 11.5,
    attendance: 82,
    progress: "improving",
    lastEvaluation: "2023-10-13",
  },
  {
    id: "9",
    name: "Camille Girard",
    class: "3ème C",
    average: 18.3,
    attendance: 97,
    progress: "stable",
    lastEvaluation: "2023-10-16",
  },
  {
    id: "10",
    name: "Maxime Lambert",
    class: "3ème A",
    average: 9.7,
    attendance: 75,
    progress: "declining",
    lastEvaluation: "2023-10-09",
  },
]

// Définir les colonnes du tableau
const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "name",
    header: "Nom de l'élève",
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "class",
    header: "Classe",
    cell: ({ row }) => <div>{row.getValue("class")}</div>,
  },
  {
    accessorKey: "average",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-end">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Moyenne
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => <div className="text-right">{row.getValue("average")}/20</div>,
  },
  {
    accessorKey: "attendance",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-end">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Présence
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => <div className="text-right">{row.getValue("attendance")}%</div>,
  },
  {
    accessorKey: "progress",
    header: "Progression",
    cell: ({ row }) => {
      const progress = row.getValue("progress") as string
      return (
        <div className="flex justify-center">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              progress === "improving"
                ? "bg-green-100 text-green-800"
                : progress === "stable"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-red-100 text-red-800"
            }`}
          >
            {progress === "improving" ? "En progression" : progress === "stable" ? "Stable" : "En baisse"}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "lastEvaluation",
    header: "Dernière évaluation",
    cell: ({ row }) => {
      const date = new Date(row.getValue("lastEvaluation"))
      return <div className="text-center">{date.toLocaleDateString("fr-FR")}</div>
    },
  },
]

export function ReportTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un élève..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Filtrer par classe <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              checked={table.getColumn("class")?.getFilterValue() === undefined}
              onCheckedChange={() => table.getColumn("class")?.setFilterValue(undefined)}
            >
              Toutes les classes
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={table.getColumn("class")?.getFilterValue() === "3ème A"}
              onCheckedChange={() => table.getColumn("class")?.setFilterValue("3ème A")}
            >
              3ème A
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={table.getColumn("class")?.getFilterValue() === "3ème B"}
              onCheckedChange={() => table.getColumn("class")?.setFilterValue("3ème B")}
            >
              3ème B
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={table.getColumn("class")?.getFilterValue() === "3ème C"}
              onCheckedChange={() => table.getColumn("class")?.setFilterValue("3ème C")}
            >
              3ème C
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Aucun résultat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} sur {table.getPageCount()}
        </div>
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Précédent
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Suivant
        </Button>
      </div>
    </div>
  )
}

