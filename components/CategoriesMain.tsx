import { Billboard, Category } from "@prisma/client";
import Container from "./Container";

interface CategoriesMainProps {
  categories: (Category & { billboard: Billboard })[]
}

const CategoriesMain = ({ categories }: CategoriesMainProps) => {


  return (
    <Container>
      
    </Container>
  );
}

export default CategoriesMain;