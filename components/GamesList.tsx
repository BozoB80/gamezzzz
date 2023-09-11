import { Game } from "@prisma/client";
import NoResluts from "./ui/no-results";
import GameCard from "./GameCard";

interface GamesListProps {
  title: string
  games: Game[]
}

const GamesList: React.FC<GamesListProps> = ({ title, games }) => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-7xl font-bold text-center my-3">{title}</h1>
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