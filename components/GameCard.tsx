"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Game, Image as Images } from "@prisma/client";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { useState } from "react";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";

interface GameCardProps {
  game: Game & {
    images?: Images[];
  };
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Link href={`/games/${game.id}`}>
      <Card
        className={`h-full group cursor-pointer shadow-xl ${
          isFlipped ? "card flipped" : ""
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
          <CardContent className="mt-4 flex flex-col justify-between">
            <CardTitle className="text-xl">{game.title}</CardTitle>

            <Separator className="my-2" />
            <CardFooter className="flex justify-between items-center text-lg p-0">
              <p>
                <span className="text-sm">Release date:</span>{" "}
                {game.releaseDate}.
              </p>
              <p className="bg-yellow-400 px-3 py-1 rounded-md font-semibold">
                € {game.price.toFixed(2)}
              </p>
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
            <Button
              size="lg"
              className="w-full font-semibold text-lg"
            >
              Add to cart
            </Button>
            <div className="flex justify-center items-center py-4 gap-2">
              <Heart />
              <p className="text-semibold">Add to wishlist</p>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};

export default GameCard;
