'use client'

import { Menu } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Link from "next/link";
import { mobileNavLinks } from "@/constants";

const MobileMenu = () => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="lg:hidden">
        <Menu className="w-7 h-7" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col justify-center items-center p-2 space-y-2">
          {mobileNavLinks.map((route) => (
            <Link 
              key={route.route} 
              href={route.route}              
              className="w-full flex justify-start items-center font-medium sm:text-xl uppercase transition-colors hover:text-primary gap-2"
            >
              <route.icon className="w-5 h-5" />
              <p className="flex justify-center items-center">{route.label}</p>
            </Link>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MobileMenu;