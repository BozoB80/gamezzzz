import Billboard from "@/components/Billboard";
import GamesList from "@/components/GamesList";
import PriceFilters from "@/components/PriceFilters";
import prismadb from "@/lib/prismadb";

interface CategoryNameProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    categoryId: string;
    priceId: string;
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

  const games = await prismadb.game.findMany({
    where: {
      categoryId: params.categoryId,
    },
    orderBy: {
      title: "asc",
    },
  });

  return (
    <div className="bg-catid-bg bg-cover bg-no-repeat bg-center h-full">
      <div className="relative max-w-7xl mx-auto p-1 sm:p-4 xl:px-0 xl:py-4 text-white space-y-8">
        <h1 className="text-6xl font-medium text-start pt-8">
          {category.name}
        </h1>

        <p className="text-xl max-w-2xl">
          Gamezzzz store offers some of the best {category.name} Games. Download
          today and start playing fun and exciting PC {category.name} games.
        </p>

        <Billboard data={category.billboard} />

        <div className="flex mx-auto">
          <div className="flex flex-col">
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

export default CategoryIdPage;
