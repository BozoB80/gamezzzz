import prismadb from "@/lib/prismadb";

interface CategoryNameProps {
  params: {
    categoryId: string
  }
}

const CategoryIdPage = async ({ params }: CategoryNameProps) => {
  const category = await prismadb.category.findFirst({
    where: {
      id: params.categoryId
    }
  })  

  const games = await prismadb.game.findMany({
    where: {
      categoryId: params.categoryId
    }
  })


  return (
    <div>
      {category?.name}
      {games.map((game) => (
        <p key={game.id}>{game.title}</p>
      ))}
    </div>
  );
}

export default CategoryIdPage;