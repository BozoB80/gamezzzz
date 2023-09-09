import prismadb from "@/lib/prismadb";
import GameForm from "./components/GameForm";


const GameIdPage = async ({ params }: { params: { gameId: string }}) => {
  let game = null

  if (params.gameId !== "new") {
    game = await prismadb.game.findUnique({
      where: {
        id: params.gameId
      },
      include: {
        images: true
      }
    })
  }

  const categories = await prismadb.category.findMany()

  return (
    <div className="flex-1 flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <GameForm
          initialData={game}
          categories={categories} 
        />
      </div>      
    </div>
  );
}

export default GameIdPage;