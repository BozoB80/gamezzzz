import Billboard from "@/components/Billboard";
import FilterBar from "@/components/FilterBar";
import GamesList from "@/components/GamesList";
import PriceFilters from "@/components/filters/PriceFilters";
import prismadb from "@/lib/prismadb";
import { Game } from "@prisma/client";

interface CategoryNameProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    categoryId: string;
    price: string;
    title: string
    sort: string
  };
}

const CategoryIdPage = async ({ params, searchParams }: CategoryNameProps) => {
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
    include: {
      billboard: true,
    },
  });

  if (!category) {
    return null;
  }

  let games = await prismadb.game.findMany({
    where: {
      categoryId: params.categoryId,
      title: {
        contains: searchParams.title,
        mode: "insensitive"
      }
    },
    orderBy: {
      title: "asc",
    },
  });

  // Price filters
  const priceFilters: Record<string, (game: Game) => boolean> = {
    'free': (game) => (game.discount ? (game.price - (game.price * game.discount / 100)) === 0 : game.price === 0),
    'under10': (game) => (game.discount ? (game.price - (game.price * game.discount / 100)) <= 10 : game.price <= 10),
    'under20': (game) => (game.discount ? (game.price - (game.price * game.discount / 100)) <= 20 : game.price <= 20),
    'under30': (game) => (game.discount ? (game.price - (game.price * game.discount / 100)) <= 30 : game.price <= 30),
    'over14.99': (game) => (game.discount ? (game.price - (game.price * game.discount / 100)) >= 14.99 : game.price >= 14.99),
  };

  if (priceFilters.hasOwnProperty(searchParams.price)) {
    games = games.filter(priceFilters[searchParams.price]);
  }

  // Sorting filters
  const sortOptions: { [key: string]: (a: Game, b: Game) => number } = {
    'high-low': (a, b) => (b.discount ? b.price - (b.price * b.discount / 100) : b.price) - (a.discount ? a.price - (a.price * a.discount / 100) : a.price),
    'low-high': (a, b) => (a.discount ? a.price - (a.price * a.discount / 100) : a.price) - (b.discount ? b.price - (b.price * b.discount / 100) : b.price),
    'newest': (a, b) => b.releaseDate - a.releaseDate,
    'oldest': (a, b) => a.releaseDate - b.releaseDate,
    'all': (a, b) => 0
  };
  
  if (sortOptions.hasOwnProperty(searchParams.sort)) {
    games.sort(sortOptions[searchParams.sort]);
  }

  return (
    <div className="bg-catid-bg bg-cover bg-no-repeat bg-center min-h-screen">
      <div className="relative max-w-7xl mx-auto p-1 sm:p-4 xl:px-0 xl:py-4 text-white space-y-3 md:space-y-6">
        <h1 className="text-4xl md:text-6xl font-medium text-center md:text-start pt-4">
          {category.name} Games
        </h1>

        <p className="text-lg md:text-xl max-w-2xl">
          Gamezzzz store offers some of the best {category.name} Games. Download
          today and start playing fun and exciting PC {category.name} games.
        </p>

        <Billboard data={category.billboard} />

        <FilterBar games={games} />

        <div className="flex gap-x-4">
          <div className="hidden md:flex flex-col">
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

export default CategoryIdPage;
