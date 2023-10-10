"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Game, Image as Images, Wishlist } from "@prisma/client";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import AddToCartButton from "./AddToCartButton";
import WishlistButton from "./WishlistButton";

interface GameCardProps {
  game: Game & {
    images?: Images[];
  };
  isDeals?: boolean
  wishlisted: Wishlist[]
}

const GameCard: React.FC<GameCardProps> = ({ game, isDeals, wishlisted }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const discountedPrice = game.discount ? game.price - (game.price * game.discount / 100) : game.price;

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Link href={`/games/${game.id}`}>
      <Card
        className={`h-full group cursor-pointer shadow-xl border-none ${
          isFlipped ? "lg:card lg:flipped" : ""
        }`}
        onMouseEnter={handleCardFlip}
        onMouseLeave={handleCardFlip}
      >
        <div className="card-inner">
          <CardHeader className="p-0">
            <div className="relative aspect-square overflow-hidden rounded-t-lg">
              <Image
                src={game?.titleImg || (game.images?.[0]?.url || 'fallbackImageUrl')}
                alt="game-image"
                fill
                className="object-cover lg:hover:scale-110 transition"
              />
            </div>
          </CardHeader>
          <CardContent className="mt-4 flex flex-col justify-between px-1 sm:px-3">
            <CardTitle className={cn("text-xl truncate", isDeals && "truncate")}>{game.title}</CardTitle>

            <Separator className="my-2" />
            <CardFooter className="flex justify-between items-center text-base p-0">
              {isDeals ? (
                  <Badge variant="destructive" className="text-xs sm:text-sm px-2">
                  -{game.discount}%
                  </Badge>           
              ) : (
                <p>
                  <span className="text-xs sm:text-sm">Release date:</span>{" "}
                  {game.releaseDate}.
                </p>
              )}
              {isDeals && (
                <Badge variant="secondary" className="text-xs sm:text-sm line-through px-2">                    
                  €{game.price.toFixed(2)}
                </Badge>
              )}
                <Badge variant="secondary" className="text-xs sm:text-sm lg:text-lg bg-yellow-400 px-2">                    
                €{discountedPrice.toFixed(2)}
                </Badge>
            </CardFooter>
          </CardContent>
        </div>
        <div className="card-inner-back">
          <CardHeader>
            <CardTitle className="text-xl">{game.title}</CardTitle>
            <Separator className="my-2" />
            <CardDescription className="line-clamp-5">
              {game.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Separator className="my-2" />
            <AddToCartButton game={game} onClick={(e) => {
              e.stopPropagation()
            }} />
            <WishlistButton game={game} wishlisted={wishlisted} />
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};

export default GameCard;
