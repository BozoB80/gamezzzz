import TestComp from "@/components/TestComp"
import prismadb from "@/lib/prismadb"



export default async function Home() {
  const games = await prismadb.game.findMany({
    
  })

  return (
    <main>
      <TestComp games={games} />
    </main>
  )
}
