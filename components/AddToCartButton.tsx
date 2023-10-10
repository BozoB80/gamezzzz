'use client'

import useCart from "@/hooks/use-cart";
import { Game } from "@prisma/client";
import { useToast } from "./ui/use-toast";
import { Button } from "@nextui-org/button";
import { MouseEvent } from "react";
import { ShoppingBag } from "lucide-react";

interface AddToCartProps {
  game: Game
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

const AddToCartButton = ({ game, onClick }: AddToCartProps) => {
  const { addItem } = useCart()
  const { toast } = useToast()

  const onAdd = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(game, toast)
    if (onClick) {
      onClick(e);
    }
  }

  return (
    <Button color="primary" radius="lg" size="lg" variant="solid" fullWidth onClick={onAdd} className="p-2 rounded-lg w-full flex justify-center items-center font-semibold text-lg">
      <ShoppingBag className="w-4 h-4 mr-2" />
      <p>Add to cart</p>
    </Button>
  );
}

export default AddToCartButton;