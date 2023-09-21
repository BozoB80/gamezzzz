import Carousel from "@/components/Carousel"
import prismadb from "@/lib/prismadb"

export default async function Home() {
  const games = await prismadb.game.findMany({
    include: {
      images: true
    }
  })

  return (
    <main className="w-full h-full">
      <div className="max-w-7xl mx-auto py-10">
        <Carousel
          games={games}
        />

      </div>
    </main>
  )
}
