import GamesList from "@/components/GamesList";
import PriceFilters from "@/components/filters/PriceFilters";
import { SearchInput } from "@/components/filters/SearchInput";

import FilterNumber from "@/components/filters/FilterNumber";
import prismadb from "@/lib/prismadb";
import CategoryFilters from "@/components/filters/CategoryFilters";
import SortingFilters from "@/components/filters/SortingFilters";
import FilterBar from "@/components/FilterBar";

interface GamesPageProps {
  searchParams: {
    categoryId: string;
    price: string;
    title: string
  };
}

const GamesPage = async ({ searchParams }: GamesPageProps) => {
 
  let games = await prismadb.game.findMany({
    where: {
      categoryId: searchParams.categoryId,
      title: {
        contains: searchParams.title,
        mode: "insensitive",
      },
    },
  });

  if (searchParams.price === 'free') {
    games = games.filter((game) => game.discount ? (game.price - (game.price * game.discount / 100)) === 0 : game.price === 0);
  } else if (searchParams.price === 'under10') {
    games = games.filter((game) => game.discount ? (game.price - (game.price * game.discount / 100)) <= 10 : game.price <= 10);
  } else if (searchParams.price === 'under20') {
    games = games.filter((game) => game.discount ? (game.price - (game.price * game.discount / 100)) <= 20 : game.price <= 20);
  } else if (searchParams.price === 'under30') {
    games = games.filter((game) => game.discount ? (game.price - (game.price * game.discount / 100)) <= 30 : game.price <= 30);
  } else if (searchParams.price === 'over14.99') {
    games = games.filter((game) => game.discount ? (game.price - (game.price * game.discount / 100)) >= 14.99 : game.price >= 14.99);
  }

  const categories = await prismadb.category.findMany();

  return (
    <div className="bg-games-bg bg-cover bg-no-repeat bg-center min-h-screen p-0">
      <div className="relative max-w-7xl mx-auto p-1 sm:p-4 xl:px-0 xl:py-4 text-white space-y-4 h-full">
        <h1 className="text-5xl lg:text-7xl font-bold text-center my-3">
          Best games in our collection
        </h1>
        <FilterBar games={games} />
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
          <GamesList games={games} />
        </div>
      </div>
    </div>
  );
};

export default GamesPage;
