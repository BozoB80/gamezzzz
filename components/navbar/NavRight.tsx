"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { ThemeToggle } from "../ThemeToggle";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const NavRight = () => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div className="ml-auto flex items-center space-x-4">
      {user?.username === "admin_b" && (
        <Button
          variant="link"
          onClick={() => router.push("/admin")}
          className="border-black text-black text-md font-medium"
        >
          Admin
        </Button>
      )}
      <ThemeToggle />
      {user ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <div>
          <p>{}</p>
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
  );
};

export default NavRight;
