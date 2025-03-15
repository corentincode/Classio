"use client";

import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

type User = {
    id: string;
    name: string | null;
    firstName: string | null;
    email: string;
    image?: string | null;
    globalRole: string;
    roleInClass: string;
    classeUserId: string;
};

type UsersSelectProps = {
    users: any; // ou utilisez User[] si vous êtes sûr(e) du type
};

export function UsersSelect({ users }: UsersSelectProps) {
    // Vérifiez dans la console que users est bien un tableau
    console.log("Users:", users);

    // Définir une valeur par défaut pour éviter l'erreur si users n'est pas un tableau
    const safeUsers = Array.isArray(users) ? users : [];

    return (
        <Select>
            <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un utilisateur" />
            </SelectTrigger>
            <SelectContent>
                {JSON.stringify(users)}
            </SelectContent>
        </Select>
    );
}
