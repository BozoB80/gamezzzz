"use client";

import { Menu, ShieldCheck } from "lucide-react";
import { mobileNavLinks } from "@/constants";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";

const MobileMenu = () => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div className="flex items-center gap-4">
      <Dropdown
        placement="bottom-end"
        className="text-white/90 bg-muted-foreground rounded-xl"
        classNames={{
          base: "bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
        }}
      >
        <DropdownTrigger>
          <Menu className="w-7 h-7" />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="options"
          itemClasses={{
            base: ["text-black", "data-[hover=true]:text-primary"],
          }}
        >
          <DropdownSection showDivider>
            <DropdownItem>
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
            </DropdownItem>
          </DropdownSection>
          <DropdownSection showDivider>
            {mobileNavLinks.map((route) => (
              <DropdownItem
                key={route.route}
                onClick={() => router.push(`${route.route}`)}
                startContent={<route.icon className="w-5 h-5" />}
                className="w-full flex justify-start items-center font-medium sm:text-xl uppercase transition-colors hover:text-primary gap-4"
              >
                {route.label}
              </DropdownItem>
            ))}
          </DropdownSection>

          <DropdownSection>
            <DropdownItem>
              {user && (
                <Button
                  variant="ghost"
                  onClick={() => router.push("/admin")}
                  className="lg:hidden border-black text-black text-md font-medium uppercase animate-bounce"
                >
                  <ShieldCheck fill="red" className="h-6 w-6 mr-2" />
                  Admin
                </Button>
              )}
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default MobileMenu;
