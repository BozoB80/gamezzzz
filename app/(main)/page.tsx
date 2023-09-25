import Carousel from "@/components/Carousel"
import DealsGames from "@/components/DealsGames"
import prismadb from "@/lib/prismadb"

export default async function Home() {
  const games = await prismadb.game.findMany({
    include: {
      images: true
    }
  })

  const dealsGames = await prismadb.game.findMany({
    where: {
      discount: {
        not: 0
      }
    },
    orderBy: {
      price: "desc"
    }
  })

  return (
    <main className="w-full h-full">
      <div className="max-w-[1500px] mx-auto flex flex-col p-2 sm:p-4 lg:py-10 xl:px-8 2xl:px-0">
        <Carousel
          games={games}
        />
        <DealsGames games={dealsGames} />
      </div>
    </main>
  )
}
