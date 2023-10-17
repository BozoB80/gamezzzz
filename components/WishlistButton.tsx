"use client";

import { Button } from "@nextui-org/button";
import { Heart } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem } from "./ui/form";
import axios from "axios";
import { Game, Wishlist } from "@prisma/client";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  isWishlisted: z.boolean().default(false),
  gameId: z.string(),
});

interface WishlistButtonProps {
  game: Game & {
    wishlist?: Wishlist[];
  };
}

const WishlistButton = ({ game }: WishlistButtonProps) => {
  const { toast } = useToast();
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isWishlisted: false,
      gameId: game.id,
    },
  });

  const isWished = game.wishlist?.some((item) => item.isWishlisted);
  console.log(isWished);
  

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (!isWished) {
        data.isWishlisted = true;
        await axios.post("/api/wishlist", data);
        toast({ description: "Game added to wishlist" });
      } else {
        await axios.delete(`/api/wishlist/${game.id}`)
        toast({ description: "Game removed from wishlist" });
      }
      router.refresh()    
      
    } catch (error) {
      toast({ variant: "destructive", description: "Something went wrong" });
    }
  };

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
                value={field.value.toString()}
                onChange={field.onChange}
                startContent={<Heart className={cn("w-6 h-6 mr-2", isWished && "fill-green-500 text-green-500")} />}
                className="text-black py-2 rounded-lg hover:bg-muted-foreground/50"
              >
                {isWished ? "Wishlisted" : "Wishlist it"}
              </Button>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default WishlistButton;
