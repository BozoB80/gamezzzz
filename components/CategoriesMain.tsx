'use client'

import { Billboard, Category } from "@prisma/client";
import {Card, CardHeader, Image} from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface CategoriesMainProps {
  categories: (Category & { billboard: Billboard })[]
}

const CategoriesMain = ({ categories }: CategoriesMainProps) => {
  const router = useRouter()

  return (
    <div className="max-w-7xl mx-auto max-2xl:p-6 2xl:py-6 grid grid-cols-12 gap-6">
      {categories.slice(0, 4).map((category) => (
        <Card radius="sm" isPressable onPress={() => router.push(`/categories/${category.id}`)} key={category.id} className="col-span-12 sm:col-span-3 sm:aspect-[3/4] rounded-lg">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-2xl text-white/60 uppercase font-bold">{category.name}</p>
            <h4 className="text-white font-medium text-large">{category.billboard.label}</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover opacity-100 rounded-lg hover:scale-110 transition"
            src={category.billboard.imageUrl}
          />
        </Card>
      ))}
      {categories.slice(4, 5).map((category) => (
        <Card radius="sm" isPressable onPress={() => router.push(`/categories/${category.id}`)} key={category.id} className="col-span-12 sm:col-span-7 rounded-lg">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-2xl text-white/60 uppercase font-bold">{category.name}</p>
            <h4 className="text-white font-medium text-large">{category.billboard.label}</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover opacity-100 rounded-lg hover:scale-110 transition"
            src={category.billboard.imageUrl}
          />
        </Card>
      ))}
      {categories.slice(5, 6).map((category) => (
        <Card radius="sm" isPressable onPress={() => router.push(`/categories/${category.id}`)} key={category.id} className="col-span-12 sm:col-span-5 rounded-lg">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-2xl text-white/60 uppercase font-bold">{category.name}</p>
            <h4 className="text-white font-medium text-large">{category.billboard.label}</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover opacity-100 rounded-lg hover:scale-110 transition"
            src={category.billboard.imageUrl}
          />
        </Card>
      ))}
      {categories.slice(6, 10).map((category) => (
        <Card radius="sm" isPressable onPress={() => router.push(`/categories/${category.id}`)} key={category.id} className="col-span-12 sm:col-span-3 sm:aspect-[3/4] rounded-lg">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-2xl text-white/60 uppercase font-bold">{category.name}</p>
            <h4 className="text-white font-medium text-large">{category.billboard.label}</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover opacity-100 rounded-lg hover:scale-110 transition"
            src={category.billboard.imageUrl}
          />
        </Card>
      ))}

  </div>
  );
}

export default CategoriesMain;