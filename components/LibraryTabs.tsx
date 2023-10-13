import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category, Game } from "@prisma/client";
import { Heart, ScrollText } from "lucide-react";
import FilterBar from "./FilterBar";
import CategoryFilters from "./filters/CategoryFilters";
import PriceFilters from "./filters/PriceFilters";
import LibraryCard from "./LibraryCard";

interface LibraryTabsProps {
  games: Game[];
  categories: Category[];
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
        <h1 className="text-slate-200 font-semibold text-2xl md:text-5xl">
          My games:
        </h1>
        <>
          <FilterBar games={games} categories={categories} />
          <div className="flex flex-col lg:flex-row gap-x-4">
            <div className="hidden lg:flex flex-col">
              <CategoryFilters
                name="Genres"
                data={categories}
                valueKey="categoryId"
              />
              <PriceFilters valueKey="price" />
            </div>
            <div className="flex flex-col w-full">
              {games.map((game) => (
                <LibraryCard key={game.id} data={game} />
              ))}
            </div>
          </div>
        </>
      </TabsContent>
    </Tabs>
  );
};

export default LibraryTabs;
