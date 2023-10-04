'use client'

import useCart from "@/hooks/use-cart";
import { Game } from "@prisma/client";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { MouseEvent } from "react";

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
    <Button size="lg" onClick={onAdd} className="w-full font-semibold text-lg">
      Add to cart
    </Button>
  );
}

export default AddToCartButton;