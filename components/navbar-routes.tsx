"use client";

import { UserButton } from "@clerk/nextjs"; 
import { usePathname} from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";

import{Button} from "@/components/ui/button";


export const NavbarRoutes = () => {
    const pathname = usePathname();
    

    const isTeacherPage = pathname?.startsWith("/administrator");
    const isPlayerPage = pathname?.includes("/carreras");


    return (
        <div className="flex gap-x-2 ml-auto">
          {isTeacherPage || isPlayerPage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">    
              <LogOut className="h-4 w-4 mr-2" />
               Salir
            </Button>
          </Link>
            ) : (
              <Link href="/administrator/carreras">
               <Button  className="bg-blue-500 text-white" size="sm" variant= "ghost">
                 Modo Administrador
                </Button>
              </Link>       
            )}
            <UserButton
              afterSignOutUrl="/"
            />
        </div>
    )
}