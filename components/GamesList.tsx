'use client'

import { Game, Wishlist } from "@prisma/client";
import NoResluts from "./ui/no-results";
import GameCard from "./GameCard";
import useSortingStore from "@/hooks/use-sorting-store";

interface GamesListProps {
  games: Game[]
}

const GamesList: React.FC<GamesListProps> = ({ games }) => {
  const { sortedGames } = useSortingStore()

  const items = sortedGames.length > 0 ? sortedGames : games

  return (
    <div className="w-full">      
      {items.length === 0 && <NoResluts />}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
        {items.map((game) => (
          <div key={game.id}>
            <GameCard game={game} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GamesList;