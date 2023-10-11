import { format } from 'date-fns'
import prismadb from "@/lib/prismadb";
import { GamesClient } from './components/client';
import { GamesColumn } from './components/columns';

const GamesPage = async () => {
  const games = await prismadb.game.findMany({
    include: {
      category: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  const formattedGames: GamesColumn[] = games.map((game) => ({
    id: game.id,
    name: game.title,
    price: game.price,
    category: game.category.name,
    size: game.size,
    rating: game.rating,
    releaseDate: game.releaseDate,
    createdAt: format(game.createdAt, "MMMM do, yyyy")
  }))


  return (
    <div className="flex-1 flex-col">
      <div className="flex-1 space-y-4 p-2 md:p-8 pt-6">
        <GamesClient data={formattedGames} />
      </div>
    </div>
  );
}

export default GamesPage;