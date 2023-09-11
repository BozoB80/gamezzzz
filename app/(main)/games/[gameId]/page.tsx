import GameDetails from "@/components/GameDetails";
import prismadb from "@/lib/prismadb";

const GamesIdPage = async ({ params }: { params: { gameId: string}}) => {
  const game = await prismadb.game.findUnique({
    where: {
      id: params.gameId
    },
    include: {
      images: true,
      category: true
    }
  })

  if (!game) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <GameDetails game={game} />
    </div>
  );
}

export default GamesIdPage;