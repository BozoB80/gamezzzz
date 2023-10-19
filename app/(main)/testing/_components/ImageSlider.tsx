"use client";

import { Game } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageSliderProps {
  games: Game[];
}

const ImageSlider = ({ games }: ImageSliderProps) => {
  const [positionIndex, setPositionIndex] = useState([0, 1, 2, 3, 4]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPositionIndex((prevIndexes) => {
        const updatedIndexes = prevIndexes.map(
          (prevIndex) => (prevIndex + 1) % 5
        );
        return updatedIndexes;
      });
    }, 7000)

    return () => {
      clearInterval(intervalId);
    };
  }, [games])
  
  const positions = ["center", "left1", "left", "right", "right1"];

  const imageVariants = {
    center: { x: "0%", scale: 1, zIndex: 5 },
    left1: { x: "-35%", scale: 0.8, zIndex: 2 },
    left: { x: "-70%", scale: 0.6, zIndex: 1 },
    right: { x: "70%", scale: 0.6, zIndex: 1 },
    right1: { x: "35%", scale: 0.8, zIndex: 2 },
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen">
      {games.slice(0, 5).map((game, index) => (
        <motion.div
          key={game.id}
          initial="center"
          animate={positions[positionIndex[index]]}
          variants={imageVariants}
          transition={{ duration: 0.5 }}
          style={{ width: '40%', position: 'absolute' }}
          className="w-[800px] h-[400px]"
        >
          {game.bannerImg && (
            <Image
              src={game.bannerImg}
              alt={game.title}
              fill
              className="rounded-md object-cover"
            />            
          )}
        </motion.div>
      ))}      
    </div>
  );
};

export default ImageSlider;
