"use client"

import {BarChart, Bike, Compass, Layout, } from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";



const guestRoutes = [
    {
        icon: Layout,
        label:"Dashboard",
        href:"/",
    },
    {
        icon: Compass,
        label:"Browse",
        href:"/search",
    },
];
////////////     arrgelo para las rutas del administrador  /////////
const administratorRoutes = [
    {
        icon: Bike,
        label:"Carreras",
        href:"/administrator/carreras",
    },
    {
        icon: BarChart,
        label:"Analytics",
        href:"/administrator/analytics",
    },

]

export const SidebarRoutes = () => {
    const pathname = usePathname();

    const isAdministratorPage = pathname?.includes("/administrator/");
    
    const routes = isAdministratorPage ? administratorRoutes : guestRoutes;
 
    return(
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem
                key={route.href}
                icon={route.icon}
                label={route.label}
                href={route.href}
                />

            ))}
        </div>
    )
}

