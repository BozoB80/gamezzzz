'use client'

import { Menu, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { mobileNavLinks } from "@/constants";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Separator } from "../ui/separator";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const MobileMenu = () => {
  const { user } = useUser()
  const router = useRouter()

  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">
        <Menu className="w-7 h-7" />
      </SheetTrigger>
      <SheetContent>
        <SheetTitle>
          {user ? (  
            <div className="flex items-center justify-start gap-2">
              <UserButton afterSignOutUrl="/" />
              <p className="text-md">{user.username}</p>
            </div>
          ) : (
            <div>
              <Button
                variant="link"
                onClick={() => router.push("/sign-in")}
                className="border-black text-black text-md font-medium"
              >
                My account
              </Button>
            </div>
          )}
        </SheetTitle>
        <Separator className="my-4" />
        <div className="flex flex-col justify-center items-center p-2 space-y-4 ">
          {mobileNavLinks.map((route) => (
            <SheetClose 
              key={route.route} 
              onClick={() => router.push(`${route.route}`)}              
              className="w-full flex justify-start items-center font-medium sm:text-xl uppercase transition-colors hover:text-primary gap-4"
            >
              <route.icon className="w-5 h-5" />
              <p className="flex justify-center items-center">{route.label}</p>
            </SheetClose>
          ))}
        </div>
        {user && (
          <Button
            variant="ghost"
            onClick={() => router.push("/admin")}
            className="lg:hidden border-black text-black text-md font-medium uppercase animate-bounce mt-8"
          >
            <ShieldCheck fill="red" className="h-6 w-6 mr-2" />
            Admin
          </Button>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default MobileMenu;