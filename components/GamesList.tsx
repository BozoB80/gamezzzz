import { Game } from "@prisma/client";
import NoResluts from "./ui/no-results";
import GameCard from "./GameCard";

interface GamesListProps {
  games: Game[]
}

const GamesList: React.FC<GamesListProps> = ({ games }) => {
  return (
    <div className="w-full">      
      {games.length === 0 && <NoResluts />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {games.map((game) => (
          <div key={game.id}>
            <GameCard game={game} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GamesList;