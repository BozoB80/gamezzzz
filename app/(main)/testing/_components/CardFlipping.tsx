'use client'

import "./index.css"

import { Game } from "@prisma/client";
import { useState } from "react";
import { motion } from 'framer-motion';

interface CardFilppingProps {
  games: Game[]
}

const CardFlipping = ({ games }: CardFilppingProps) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isAnimated, setIsAnimated] = useState(false)

  const handleFlip = () => {
    if (!isAnimated) {
      setIsFlipped(!isFlipped)
      setIsAnimated(true)
    }
  }



  return (
    <div className="flex items-center justify-center bg-black h-[800px] cursor-pointer space-x-4">
      {games.slice(0, 4).map((game) => (
        <div key={game.id} className="flip-card w-[600px] h-[360px] rounded-md" onClick={handleFlip}>
          <motion.div
            initial={false}
            animate={{ rotateX: isFlipped ? 180 : 360 }}
            transition={{ duration: 0.6, animationDirection: "normal" }}
            onAnimationComplete={() => setIsAnimated(false)}
            className="flip-card-inner w-full h-full"
          >
            <div 
              className="flip-card-front w-full h-full bg-cover border-[1px] text-white rounded-lg p-4"
              style={{ backgroundImage: `url(${game.titleImg})`}}
            >
              <h1 className="text-2xl font-bold">Some text</h1>
              <p>Other text</p>

            </div>
            <div 
              className="flip-card-back w-full h-full bg-cover border-[1px] text-white rounded-lg p-4"
              style={{ backgroundImage: `url(${game.titleImg})`}}
            >
              <h1 className="text-2xl font-bold">Some text</h1>
              <p>Other text</p>

            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

export default CardFlipping;