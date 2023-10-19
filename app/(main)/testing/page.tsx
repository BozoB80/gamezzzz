import prismadb from "@/lib/prismadb";
import ImageSlider from "./_components/ImageSlider";
import CardFlipping from "./_components/CardFlipping";

const TestPage = async () => {
  const games = await prismadb.game.findMany()

  return (
    <div>
      <ImageSlider games={games} />
      <CardFlipping games={games} />
    </div>
  );
}

export default TestPage;