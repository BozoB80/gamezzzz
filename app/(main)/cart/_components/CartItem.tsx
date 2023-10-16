'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useCart from "@/hooks/use-cart";
import { Category, Game } from "@prisma/client";
import { X } from "lucide-react";
import Image from "next/image";

interface CartItemProps {
  data: Game & {
    category?: Category
  }
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart()
  const { toast } = useToast()
  const discountedPrice = data.discount ? data.price - (data.price * data.discount / 100) : data.price;

  const onRemove = () => {
    cart.removeItem(data.id, toast)
  }

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:w-48 sm:h-48">
        {data.titleImg ? (
          <Image
            src={data.titleImg}
            alt="image"
            fill
            className="object-cover object-center"
          />
        ) : (
          <div>Image not available</div>
        )}
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <Button size="icon" onClick={onRemove}>
            <X />
          </Button>
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-white/80">
              {data.title}
            </p>
          </div>

          <div className="mt-1 flex text-sm text-white/70">
            <p>{data.category?.name}</p>
            <p className="ml-2 border-l border-gray-200 pl-2">{data.developer}</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-white/70 max-sm:hidden">Rating: {data.rating}</p>
          <div className="flex justify-center items-center gap-3 text-lg text-white/80">
            {data.discount ? (
              <Badge className="text-sm">-{data.discount}%</Badge>
            ) : ""}
            <p className={data.discount ? "line-through" : "text-white"}>€{data.price}</p>
            {data.discount ? (
              <p className="text-white">€{discountedPrice.toFixed(2)}</p>
            ) : ""}
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartItem;