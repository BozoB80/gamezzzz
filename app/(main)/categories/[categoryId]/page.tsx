import Billboard from "@/components/Billboard";
import FilterBar from "@/components/FilterBar";
import GamesList from "@/components/GamesList";
import PriceFilters from "@/components/filters/PriceFilters";
import prismadb from "@/lib/prismadb";

interface CategoryNameProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    categoryId: string;
    price: string;
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
    },
    orderBy: {
      title: "asc",
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

  return (
    <div className="bg-catid-bg bg-cover bg-no-repeat bg-center min-h-screen">
      <div className="relative max-w-7xl mx-auto p-1 sm:p-4 xl:px-0 xl:py-4 text-white space-y-6">
        <h1 className="text-6xl font-medium text-start pt-4">
          {category.name} Games
        </h1>

        <p className="text-xl max-w-2xl">
          Gamezzzz store offers some of the best {category.name} Games. Download
          today and start playing fun and exciting PC {category.name} games.
        </p>

        <Billboard data={category.billboard} />

        <FilterBar games={games} />

        <div className="flex gap-x-4">
          <div className="flex flex-col">
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
