"use client";

import { UserButton, useUser } from "@clerk/nextjs";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import MobileMenu from "./MobileMenu";
import { ShieldCheck } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import NavCart from "./NavCart";

const NavRight = () => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div className="ml-auto flex items-center space-x-4">
      {user?.username === "admin_b" && (
        <Button
          variant="ghost"
          onClick={() => router.push("/admin")}
          className="border-black text-black text-md font-medium uppercase"
        >
          <ShieldCheck className="h-6 w-6 mr-2" />
          Admin
        </Button>
      )}
      <ThemeToggle />
      <NavCart />

      <div className="max-lg:hidden">
        {user ? (  
          <UserButton afterSignOutUrl="/" />
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
      </div>
      <MobileMenu />
    </div>
  );
};

export default NavRight;
