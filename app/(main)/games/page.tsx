import Container from "@/components/Container";
import GamesList from "@/components/GamesList";
import prismadb from "@/lib/prismadb";

const GamesPage = async () => {
  const games = await prismadb.game.findMany({
    include: {
      images: true
    }
  }) 

  return (
    <Container>
      <GamesList title="Explore our top games" games={games}  />
    </Container>
  );
}

export default GamesPage;