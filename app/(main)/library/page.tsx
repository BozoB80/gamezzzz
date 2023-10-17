import LibraryTabs from "@/components/LibraryTabs";
import prismadb from "@/lib/prismadb";
import { Game } from "@prisma/client";
import { auth } from '@clerk/nextjs';

interface LibraryProps {
  searchParams: {
    categoryId: string;
    price: string;
    title: string
    sort: string
  };
}

const LibraryPage = async ({ searchParams }: LibraryProps) => {
  const { userId } = auth()
  if (!userId) return  

  const orderedGames = await prismadb.orderItem.findMany({
    where: {
      userId: userId,
      game: {
        categoryId: searchParams.categoryId,
        title: {
          contains: searchParams.title,
          mode: "insensitive",
        },
      }
    },
    include: {
      game: {
        include: {
          category: true
        }
      }
    },
  })
 
  let gamesList = orderedGames.map((game) => game.game)

  const wishlistGames = await prismadb.wishlist.findMany({
    where: {
      userId: userId,
      isWishlisted: true,
      game: {
        categoryId: searchParams.categoryId,
        title: {
          contains: searchParams.title,
          mode: "insensitive",
        },
      }
    },
    include: {
      game: {
        include: {
          category: true
        }
      }
    }
  })

  let wishedGamesList = wishlistGames.map((game) => game.game)  
   

  // Price filters
  const priceFilters: Record<string, (game: Game) => boolean> = {
    'free': (game) => (game.discount ? (game.price - (game.price * game.discount / 100)) === 0 : game.price === 0),
    'under10': (game) => (game.discount ? (game.price - (game.price * game.discount / 100)) <= 10 : game.price <= 10),
    'under20': (game) => (game.discount ? (game.price - (game.price * game.discount / 100)) <= 20 : game.price <= 20),
    'under30': (game) => (game.discount ? (game.price - (game.price * game.discount / 100)) <= 30 : game.price <= 30),
    'over14.99': (game) => (game.discount ? (game.price - (game.price * game.discount / 100)) >= 14.99 : game.price >= 14.99),
  };

  if (priceFilters.hasOwnProperty(searchParams.price)) {
    gamesList = gamesList.filter(priceFilters[searchParams.price]);
  }
  if (priceFilters.hasOwnProperty(searchParams.price)) {
    wishedGamesList = wishedGamesList.filter(priceFilters[searchParams.price]);
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
    gamesList.sort(sortOptions[searchParams.sort]);
  }
  if (sortOptions.hasOwnProperty(searchParams.sort)) {
    wishedGamesList.sort(sortOptions[searchParams.sort]);
  }

  const categories = await prismadb.category.findMany();

  return (
    <div className="bg-games-bg  bg-repeat bg-center min-h-screen p-0">
      <div className="relative max-w-7xl mx-auto p-1 sm:p-4 xl:px-0 xl:py-4 space-y-4 text-white/90 h-full">
        <h1 className="text-2xl sm:text-5xl lg:text-7xl font-bold text-center my-3 underline">
          Library
        </h1>
        <LibraryTabs games={gamesList} wishlistGames={wishedGamesList} categories={categories} />
      </div>
    </div>
  );
}

export default LibraryPage;