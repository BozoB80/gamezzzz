'use client'

import useCart from "@/hooks/use-cart";
import { Game } from "@prisma/client";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";

interface AddToCartProps {
  game: Game
}

const AddToCartButton = ({ game }: AddToCartProps) => {
  const { addItem } = useCart()
  const { toast } = useToast()

  const onAdd = () => {
    addItem(game, toast)
  }

  return (
    <Button size="lg" onClick={onAdd} className="w-full font-semibold text-lg">
      Add to cart
    </Button>
  );
}

export default AddToCartButton;