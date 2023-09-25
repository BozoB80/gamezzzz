import GamesList from "@/components/GamesList";
import PriceFilters from "@/components/PriceFilters";
import { SearchInput } from "@/components/SearchInput";
import SortingFilters from "@/components/SortingFilters";
import prismadb from "@/lib/prismadb";

interface GamesPageProps {
  searchParams: {
    categoryId: string;
    priceId: string;
    title: string
  };
}

const GamesPage = async ({ searchParams }: GamesPageProps) => {
 
  let games = await prismadb.game.findMany({
    where: {
      categoryId: searchParams.categoryId,
      title: {
        contains: searchParams.title
      }
    },
  });

  const categories = await prismadb.category.findMany();

  return (
    <div className="bg-games-bg bg-cover bg-no-repeat bg-center h-full p-0">
      <div className="relative max-w-7xl mx-auto p-1 sm:p-4 xl:px-0 xl:py-4 text-white space-y-8 h-full">
        <h1 className="text-7xl font-bold text-center my-3">
          Explore our top games
        </h1>
        <div className="flex justify-between items-center">
          <SearchInput />
        </div>
        <div className="flex gap-x-4">
          <div className="flex flex-col">
            <SortingFilters
              name="Genres"
              data={categories}
              valueKey="categoryId"
            />
            <PriceFilters
              name="Price"
              data={games}
              valueKey="price"
              selectedValue={searchParams.priceId}
            />
          </div>
          <GamesList games={games} />
        </div>
      </div>
    </div>
  );
};

export default GamesPage;
