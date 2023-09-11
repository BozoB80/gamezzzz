"use client";

import { Category, Game, Image as Images } from "@prisma/client";
import Container from "./Container";
import Image from "next/image";
import { Heart, Star, PlusCircleIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

interface GameDetailsProps {
  game: Game & {
    images: Images[];
  } & {
    category: Category
  }
}

const GameDetails: React.FC<GameDetailsProps> = ({ game }: GameDetailsProps) => {
  const discountedPrice = game.discount ? game.price - (game.price * game.discount / 100) : game.price;
  const router = useRouter()  
  const { user } = useUser();

  return (
    <Container>
      <div className="w-96 h-56 sticky top-10 left-10 z-10">
        {game.logoImg && (
          <Image
            src={game.logoImg}
            alt="title"
            fill
            className="object-contain sticky"
          />
        )}
      </div>

      <div className="absolute inset-0 mx-auto w-full">
        {game.bannerImg && (
          <Image
            src={game.bannerImg}
            alt="banner"
            width={1000}
            height={1000}
            className="w-full h-[550px] object-cover overflow-hidden shadow-2xl"
          />
        )}
        {user?.username === "admin_b" && 
          <Button
            onClick={() => router.push(`/admin/games/${game.id}`)}
            className="gap-2 bg-yellow-400 text-black absolute top-4 right-4"
          >
            <PlusCircleIcon className="h-6 w-6" />
            Edit Game
          </Button>
        }  
      </div>

      <div className="relative max-w-7xl mx-auto mt-80 mb-5 flex justify-between">
        <div className="flex flex-col justify-center items-start">
          <p className="text-4xl font-bold">{game.title}</p>
          <div className="flex justify-start items-start gap-4">
            <Star className="w-4 h-4 ml-2 fill-black" />
            <p>{game.rating}/5</p>
            <Separator orientation="vertical" />
            <p>English & 8 more</p>
          </div>
        </div>

        <div>
          <Card className="w-96 -mt-20 px-4 py-2 rounded-sm">
            <CardTitle className="flex justify-start items-end pt-2">
              {!game.discount ? (
                <p className="text-3xl">€ {game.price.toFixed(2)}</p>
              ) : (
                <div className="flex justify-between items-center w-full">
                  <Badge variant="destructive" className="text-3xl">
                    <p>-{game.discount}%</p>
                  </Badge>
                  <h1 className="text-3xl font-normal line-through text-muted-foreground">
                    € {game.price.toFixed(2)}
                  </h1>
                  <h1 className="text-3xl">€ {discountedPrice?.toFixed(2)}</h1>
                </div>
              )}
            </CardTitle>
            <Separator className="my-4" />
            <CardContent className="w-full p-0">
              <Button
                size="lg"
                className="w-full font-semibold text-lg"
              >
                Add to cart
              </Button>
              <div className="flex justify-center items-center py-4 gap-2">
                <Heart />
                <p className="text-semibold">Wishlist it</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator className="max-w-7xl mx-auto my-10" />

      <div className="flex max-w-7xl mx-auto ">
        <div className="w-1/2 space-y-4">
          {game?.images.length > 0 && (
            <Image
              src={game?.images[0].url}
              alt="featured"
              width={700}
              height={700}
              className="object-contain"
            />
          )}
          <h1 className="text-2xl border-b">Description</h1>
          <p className="text-foreground text-lg px-2 font-light">
            {game?.description}
          </p>
          {game?.images.length > 0 && (
            <Image
              src={game?.images[1].url}
              alt="featured"
              width={700}
              height={700}
              className="object-contain"
            />
          )}
          <h1 className="text-2xl border-b">Features</h1>
          <p className="text-foreground text-lg px-2 font-light">
            {game?.features}
          </p>
        </div>
        <Separator orientation="vertical" decorative className="h-full mx-4" />
        <div className="w-1/2 space-y-4">
          <h1 className="text-2xl border-b">Game Details</h1>
          <div className="grid grid-cols-2 gap-4">            
              <p>Genre:</p>  
              <p>{game.category?.name}</p>
              <p>Works on:</p>
              <p>Windows (10, 11), PS</p>
              <p>Release date:</p>
              <p>{game.releaseDate}</p>                       
              <p>Company:</p>
              <p>{game.developer}</p>                       
              <p>Size:</p>
              <p>{game.size} GB</p>                       
              <p>Rating:</p>
              <p>PEGI Rating: 12+</p>                       
          </div>
          {game?.images.length > 0 && (
            <Image
              src={game?.images[2].url}
              alt="featured"
              width={700}
              height={700}
              className="object-contain"
            />
          )}

        </div>
      </div>
    </Container>
  );
};

export default GameDetails;
