"use client";

import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type User = {
    id: string;
    name: string | null;
    firstName: string | null;
    email: string;
    roleInClass: string;
    image?: string | null;
};

type ClasseUser = {
    firstName: string;
    name?: string | null;
    id: string
    userId: string
    classeId: string
    roleInClass: string
    email: string
    image: string
    user: {
        id: string;
        firstName?: string | null;
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
}


type UsersTableProps = {
    users: ClasseUser[];
};

export function UsersTable({ users }: UsersTableProps) {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Prénom</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Rôle</TableHead>
                        <TableHead>Image</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.firstName}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <Badge variant="secondary">{user.roleInClass}</Badge>
                            </TableCell>
                            <TableCell>
                                <Avatar className="h-8 w-8">
                                    {user.image ? (
                                        <AvatarImage src={user.image} alt={user.name ?? "Avatar"} />
                                    ) : (
                                        <AvatarFallback>{user.name ? user.name.charAt(0) : "U"}</AvatarFallback>
                                    )}
                                </Avatar>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
