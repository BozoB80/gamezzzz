"use client";

import { Game } from "@prisma/client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface CarouselProps {
  games: Game[];
}

const Carousel = ({ games }: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter()

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevIndex) =>
        prevIndex === games.slice(0, 5).length - 1 ? 0 : prevIndex + 1
      );
    }, 7000);

    return () => {
      clearInterval(intervalId);
    };
  }, [games]);

  const currentMonth = new Date().toLocaleString('en-US', { month: 'long'})

  return (
    <div className="relative flex items-center h-full pb-10">
      {games.slice(0, 5).map((game, index) => (
        <div
          key={index}
          onClick={() => router.push(`games/${game.id}`)}
          className={`opacity-0 transition-all cursor-pointer ${
            index === currentSlide ? "opacity-100 h-full transition" : ""
          }`}
        >
          {index === currentSlide && (
            <Image
              src={game.bannerImg!}
              alt="slide"
              width={1000}
              height={800}
              className="w-full h-[550px] object-cover rounded-lg transition"
            />
          )}
          <div className="absolute bottom-24 left-14 flex flex-col uppercase text-white">
            <h3 className="text-2xl font-semibold capitalize">Gamezzzz Store</h3>
            <h1 className="text-4xl font-bold text-primary">{currentMonth}</h1>
            <h1 className="text-7xl font-bold mb-6 text-primary">Savings</h1>
            <p className="text-xl font-semibold">Last chance to save</p>
            <h2 className="text-2xl font-bold w-96 capitalize">Time is running out. Save big on hit Games during the {currentMonth} savings</h2>
          </div>
        </div>
      ))}


      <div className="h-full flex flex-col pl-8 gap-4">
        {games.slice(0, 5).map((game, index) => (
          <Card
            key={game.id}
            className={cn(
              "border-none shadow-none cursor-pointer hover:bg-secondary-foreground/20 transition",
              index === currentSlide && "bg-muted-foreground/50 text-primary transition"
            )}
          >
            <CardContent className="flex items-center justify-between w-56 gap-6 p-2">
              <Image
                src={game.titleImg!}
                alt="title-img"
                width={200}
                height={300}
                className="w-14 h-20 object-cover rounded-md"
              />
              <h1 className="text-end">{game.title}</h1>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Carousel;