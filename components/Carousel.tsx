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
    <div className="relative flex flex-col lg:flex-row items-center h-full pb-10">
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
              className="w-full lg:h-[550px] object-cover rounded-lg transition"
            />
          )}
          <div className="absolute max-lg:top-4 max-lg:left-4 lg:bottom-24 lg:left-14 hidden sm:flex flex-col uppercase text-white">
            <h3 className="text-2xl font-semibold capitalize">Gamezzzz Store</h3>
            <h1 className="text-4xl font-bold text-primary">{currentMonth}</h1>
            <h1 className="text-7xl font-bold mb-6 text-primary">Savings</h1>
            <p className="max-lg:hidden text-xl font-semibold">Last chance to save</p>
            <h2 className="max-lg:hidden text-2xl font-bold w-96 capitalize">Time is running out. Save big on hit Games during the {currentMonth} savings</h2>
          </div>
        </div>
      ))}


      <div className="h-full flex flex-row max-lg:pt-4 lg:flex-col lg:pl-4 xl:pl-8 gap-4">
        {games.slice(0, 5).map((game, index) => (
          <Card
            key={game.id}
            className={cn(
              "border-none shadow-none cursor-pointer hover:bg-secondary-foreground/20 transition",
              index === currentSlide && "bg-muted-foreground/50 text-primary transition"
            )}
          >
            <CardContent className="flex items-center justify-between w-full lg:w-56 gap-6 p-2">
              <Image
                src={game.titleImg!}
                alt="title-img"
                width={200}
                height={300}
                className="lg:w-14 lg:h-20 aspect-[1/1.5] object-cover rounded-md"
              />
              <h1 className="max-lg:hidden text-end">{game.title}</h1>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Carousel;