import prismadb from "@/lib/prismadb"

export default async function Home() {
  const games = await prismadb.game.findMany({
    
  })

  return (
    <main>
      Main page
    </main>
  )
}
