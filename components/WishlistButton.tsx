'use client'

import { useState } from "react";
import {Button} from "@nextui-org/button"
import { Heart } from "lucide-react";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem } from "./ui/form";
import axios from "axios";
import { Game, Wishlist } from "@prisma/client";

const formSchema = z.object({
  isWishlisted: z.boolean().default(false),
})

interface WishlistButtonProps {
  game: Game
  wishlisted?: Wishlist[]
}

const WishlistButton = ({ game, wishlisted }: WishlistButtonProps) => {
  const [isWished, setIsWished] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isWishlisted: false,
    },
  })

  const wishId = wishlisted?.map((wish) => wish.id)

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (wishlisted?.map((list) => list.gameId === game.id)) {
        await axios.delete(`/api/wishlist/${wishId}`)
      }
    } catch (error) {
      
    }
  }


  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="isWishlisted"
        render={({ field }) => (
          <FormItem>
            <Button 
              variant="ghost"
              fullWidth
              type="submit"
              startContent={<Heart className="w-5 h-5 mr-2" />}
              className="text-black py-2 rounded-lg"
            >
              {isWished ? "Remove from Wishlist" : "Wishlist it"}
            </Button>
          </FormItem>
        )}
      />
    </form>
  </Form>
    
  );
}

export default WishlistButton;