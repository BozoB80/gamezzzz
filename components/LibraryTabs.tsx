import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Category, Game } from "@prisma/client";
import { Heart, Library, ScrollText } from "lucide-react";
import FilterBar from "./FilterBar";
import CategoryFilters from "./filters/CategoryFilters";
import PriceFilters from "./filters/PriceFilters";
import Link from "next/link";
import CartItem from "@/app/(main)/cart/_components/CartItem";

interface LibraryTabsProps {
  games: Game[]
  categories: Category[]
}

const LibraryTabs = ({ games, categories }: LibraryTabsProps) => {
  
  return (
    <Tabs defaultValue="orders" className="w-full transition">
      <TabsList className="flex justify center md:justify-end items-center max-md:bg-black/20">
        <TabsTrigger value="orders">
          <ScrollText className="mr-2" />
          Orders
        </TabsTrigger>
        <TabsTrigger value="wishlist">
          <Heart className="mr-2" />
          Wishlist
        </TabsTrigger>
      </TabsList>

      <TabsContent value="orders">
        <h1 className="text-slate-200 font-semibold text-2xl md:text-5xl">My games:</h1>
        {/* {games.length === 0 ? (
          <div className="w-full h-full flex flex-col justify-center items-center text-white space-y-8">
            <Library size={80} />
            <h1 className="text-5xl">You did not purchase any games!</h1>
            <Link href="/" className="text-xl text-white/60 underline underline-offset-4 hover:text-white hover:underline">
              Shop for our finest selection
            </Link>
          </div>
        ) : ( */}
          <>
            <FilterBar games={games} categories={categories} />
            <div className="flex flex-col lg:flex-row gap-x-4">
              <div className="hidden lg:flex flex-col">
                <CategoryFilters
                  name="Genres"
                  data={categories}
                  valueKey="categoryId"
                />
                <PriceFilters
                  valueKey="price"
                />
              </div>
              <div className="flex flex-col w-full">
                {games.map((game) => (
                  <CartItem key={game.id} data={game} />
                ))}
              </div>
              
            </div>          
          </>
        {/* )} */}
      </TabsContent>
    </Tabs>
  );
}

export default LibraryTabs;