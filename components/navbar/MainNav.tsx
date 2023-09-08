'use client'

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const MainNav = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname()

  const routes = [
    {
      href: `/`,
      label: 'Home',
      active: pathname === `/`
    },
    {
      href: `/games`,
      label: 'Games',
      active: pathname === `/games`
    },
    {
      href: `/categories`,
      label: 'Categories',
      active: pathname === `/categories`
    },
    {
      href: `/orders`,
      label: 'Orders',
      active: pathname === `/orders`
    },
  ]

  return (
    <nav className={cn("hidden sm:flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link 
          key={route.href} 
          href={route.href} 
          {...props}
          className={cn(
            "font-medium sm:text-xl uppercase transition-colors hover:text-primary",
            route.active ? "text-black dark:text-white" : "text-muted-foreground")}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}

