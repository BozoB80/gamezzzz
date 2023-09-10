'use client'

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

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
    <NavigationMenu>
      <NavigationMenuList>

        <NavigationMenuItem>
        <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              DISCOVER
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            STORE
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-hero-bg bg-cover bg-no-repeat bg-center p-6 no-underline outline-none focus:shadow-md"
                    href="/games"
                  >                    
                    <div className="mb-2 mt-4 text-xl font-medium text-white">
                      Browse all games
                    </div>
                    <p className="text-sm leading-tight text-primary">
                      Discover the latest titles:
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            ABOUT
          </NavigationMenuTrigger>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            ORDERS
          </NavigationMenuTrigger>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>

    // <nav className={cn("hidden sm:flex items-center space-x-4 lg:space-x-6", className)}>
    //   {routes.map((route) => (
    //     <Link 
    //       key={route.href} 
    //       href={route.href} 
    //       {...props}
    //       className={cn(
    //         "font-medium sm:text-xl uppercase transition-colors hover:text-primary",
    //         route.active ? "text-black dark:text-white" : "text-muted-foreground")}
    //     >
    //       {route.label}
    //     </Link>
    //   ))}
    // </nav>
  );
}

