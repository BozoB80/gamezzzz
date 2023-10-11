"use client";

import { sidebarLinks } from "@/constants";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Image, Link } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "../ThemeToggle";
import { Separator } from "../ui/separator";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Navbar
      isBordered
      isBlurred={false}
      onMenuOpenChange={setIsMenuOpen}
      className="md:hidden"
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>
      <NavbarContent justify="center">
        <NavbarBrand onClick={() => router.push("/")}>
          <Image
            src={"/logo.png"}
            alt="logo"
            width={150}
            height={150}
            className="cursor-pointer"
          />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <ThemeToggle />
      </NavbarContent>

      <NavbarMenu>
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.route;

          return (
            <NavbarMenuItem key={link.label}>
              <Link
                href={link.route}
                color="foreground"
                className={`relative dark:text-white/80 flex justify-start gap-4 rounded-md p-4 ${
                  isActive && "bg-primary text-black font-bold"
                }`}
              >
                <link.icon className="w-6 h-6" />
                <p className="font-medium text-lg">{link.label}</p>
              </Link>
            </NavbarMenuItem>
          );
        })}
        <Separator />

        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="flex cursor-pointer gap-4 p-4 text-black dark:text-white/80">
              <LogOut />
              <p className="font-medium text-lg">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </NavbarMenu>
    </Navbar>
  );
};

export default AdminNavbar;
