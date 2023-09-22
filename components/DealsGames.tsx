'use client'

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { Game } from "@prisma/client";
import GameCard from "./GameCard";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 6,
    partialVisibilityGutter: 40
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

interface DealsGamesProps {
  games: Game[]
}

const DealsGames = ({ games }: DealsGamesProps) => {

  return (
    <div className="">
      <div>
        <h1 className="text-2xl font-medium mb-4">September Savings Spotlight</h1>
        
      </div>
      <Carousel
        responsive={responsive}
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
       
        removeArrowOnDeviceType={["tablet", "mobile"]}
        
      >
        {games.map((game) => (
          <div key={game.id} className="mx-2 pb-10">
            <GameCard game={game} isDeals />
          </div>
        ))}      
      </Carousel>
    </div>
  );
}

export default DealsGames;