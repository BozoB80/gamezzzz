"use client";

import { Game } from "@prisma/client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";

interface CarouselProps {
  games: Game[];
}

const Carousel = ({ games }: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const autoScroll = true;
  const intervalTime = 5000;

  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentSlide((currentSlide) =>
      currentSlide === games.length - 1 ? 0 : currentSlide + 1
    );
  };

  const previousSlide = () => {
    setCurrentSlide((currentSlide) =>
      currentSlide === 0 ? games.length - 1 : currentSlide - 1
    );
  };

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      const autoMove = () => {
        slideIntervalRef.current = setInterval(nextSlide, intervalTime);
      };
      autoMove();
    }
    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }
    };
  }, [autoScroll]);

  return (
    <div className="flex items-center">
      {games.slice(0, 4).map((game, index) => (
        <div
          key={index}
          className={`opacity-0 transition-all ${
            index === currentSlide ? "opacity-100" : ""
          }`}
        >
          {index === currentSlide && (
            <Image
              src={game.bannerImg!}
              alt="slide"
              width={1000}
              height={800}
              className="object-cover rounded-lg h-[500px]"
            />
          )}
        </div>
      ))}

      <div className="flex flex-col gap-3 ml-2">
        {games.slice(0, 4).map((game, index) => (
          <Card key={game.id} className={cn("border-none shadow-none", index === currentSlide && "bg-muted-foreground text-primary")}>
            <CardContent className="flex items-center justify-between gap-3 p-2">
              <Image
                src={game.titleImg!}
                alt="title-img"
                width={200}
                height={300}
                className="w-14 h-20 object-cover rounded-md"
              />
              <h1>{game.title}</h1>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
