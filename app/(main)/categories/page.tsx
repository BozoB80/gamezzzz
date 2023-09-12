import CategoriesMain from "@/components/CategoriesMain";
import prismadb from "@/lib/prismadb";

const CategoriesPage = () => {
  const categories = prismadb.category.findMany({
    include: {
      billboard: true
    }
  })

  return (
    <div className="bg-secondary">
      <CategoriesMain categories={categories} />
    </div>
  );
}

export default CategoriesPage;