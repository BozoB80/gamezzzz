import GamesList from "@/components/GamesList";
import PriceFilters from "@/components/filters/PriceFilters";
import prismadb from "@/lib/prismadb";
import CategoryFilters from "@/components/filters/CategoryFilters";
import FilterBar from "@/components/FilterBar";
import { Game } from "@prisma/client";

interface GamesPageProps {
  searchParams: {
    categoryId: string;
    price: string;
    title: string
    sort: string
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

  const categories = await prismadb.category.findMany();

  const wishlisted = await prismadb.wishlist.findMany({
    where: {
      isWishlisted: true
    }
  }) || []

  return (
    <div className="bg-games-bg bg-cover bg-no-repeat bg-center min-h-screen p-0">
      <div className="relative max-w-7xl mx-auto p-1 sm:p-4 xl:px-0 xl:py-4 text-white space-y-4 h-full">
        <h1 className="text-2xl sm:text-5xl lg:text-7xl font-bold text-center my-3 text-muted-foreground underline">
          Best games in our collection
        </h1>
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
          <GamesList games={games} wishlisted={wishlisted} />
        </div>
      </div>
    </div>
  );
};

export default GamesPage;
