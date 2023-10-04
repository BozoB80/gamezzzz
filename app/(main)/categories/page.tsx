import CategoriesMain from "@/components/CategoriesMain";
import prismadb from "@/lib/prismadb";

const CategoriesPage = async () => {
  const categories = await prismadb.category.findMany({
    include: {
      billboard: true
    },
    orderBy: {
      name: "asc"
    }
  })

  return (
    <div className="bg-cat-bg bg-cover bg-no-repeat bg-center min-h-screen">
      <CategoriesMain categories={categories} />
    </div>
  );
}

export default CategoriesPage;