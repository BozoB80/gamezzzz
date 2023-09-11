'use client'

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Category, Game } from "@prisma/client";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import { NavigationMenuSub } from "@radix-ui/react-navigation-menu";

interface MainNavProps {
  games: Game[]
  categories: Category[]
}

export const MainNav = ({ games, categories }: MainNavProps) => {  
  const router = useRouter()

  return (
    <NavigationMenu className="max-lg:hidden">
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
            <ul className="grid gap-3 p-6 min-w-[800px] lg:grid-cols-3">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-center rounded-md bg-hero-bg bg-cover bg-no-repeat bg-center p-6 no-underline outline-none focus:shadow-md"
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
              {games.map((game) => {
                const discountedPrice = game.discount ? game.price - (game.price * game.discount / 100) : game.price;

                return (
                <Card key={game.id} onClick={() => router.push(`/games/${game.id}`)} className="w-52 group cursor-pointer">
                  <CardContent className="flex flex-col justify-between items-center h-full p-0 overflow-hidden">
                    {game.titleImg ? (
                      <div className="overflow-hidden flex w-52 h-full">
                        <Image 
                          src={game.titleImg}
                          alt="title image"
                          width={500}
                          height={500}
                          className="w-full h-44 object-cover object-top rounded-t-md hover:scale-105 transition"
                        />
                      </div>
                    ) : (
                      <p>No image available</p>
                    )}
                    <Separator />
                    <div className="flex justify-between items-center w-full px-2">
                      <Image 
                        src="/windows-icon.png"
                        alt="windows icon"
                        width={50}
                        height={50}
                      />
                      {game.discount ? <p>{game.discount}%</p> : ""}
                      {game.discount ? (
                        <>
                          <p className="border px-2 rounded-sm group-hover:hidden">{game.price} EUR</p>
                          <p className="border px-2 rounded-sm hidden group-hover:block group-hover:bg-primary group-hover:font-medium">{discountedPrice.toFixed(2)} EUR</p>
                        </>
                      ) : (
                        <p className="border px-2 rounded-sm group-hover:bg-primary group-hover:font-medium">{game.price} EUR</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )})}              
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            CATEGORIES
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="relative flex flex-col justify-center items-start p-3 w-64 space-y-2">
              <Link href="/categories" legacyBehavior passHref className="font-semibold">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Browse all categories
                </NavigationMenuLink>
              </Link>
              <Separator />

              <NavigationMenuSub defaultValue="Action">
                <NavigationMenuList className="flex flex-col items-start">
                  {categories.map((category) => (
                    <NavigationMenuItem key={category.id} value={category.name} className="flex">
                      <NavigationMenuTrigger>{category.name}</NavigationMenuTrigger>
                      <NavigationMenuContent>Content</NavigationMenuContent>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenuSub>
                
              {/* {categories.map((category) => (
                <NavigationMenuItem key={category.name}>
                  <NavigationMenuTrigger>{category.name}</NavigationMenuTrigger>
                  <NavigationMenuContent>Content</NavigationMenuContent>
                </NavigationMenuItem>
              ))} */}
             
            </div>
           
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

  );
}

