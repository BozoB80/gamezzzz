'use client'

import {Card, CardFooter, Image, Button} from "@nextui-org/react";
import { Category, Billboard, Game } from "@prisma/client";

interface TestProps {
  games: Game[]
 
}

const TestComp = ({games}: TestProps) => {
  return (
    <div className="flex justify-center items-center">
      {games.map((game) => (
        <Card
        key={game.id}
        isFooterBlurred
        radius="lg"
        className="border-none"
      >
        <Image
          alt="Woman listing to music"
          className="object-cover w-52 h-52 opacity-80"
          height={200}
          src={game?.titleImg}
          width={200}
        />
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className="text-tiny text-white/80">Available soon.</p>
          <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
            Notify me
          </Button>
        </CardFooter>
      </Card>
      ))}
    </div>
  );
}

export default TestComp;