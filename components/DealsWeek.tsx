import { Game } from "@prisma/client";
import {Card, CardHeader, CardFooter} from "@nextui-org/card";
import {Button} from "@nextui-org/button";
import {Image} from "@nextui-org/image";
import { Link } from "@nextui-org/link";

interface DealsWeekProps {
  games: Game[]
}

const DealsWeek = ({ games }: DealsWeekProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {games.slice(7, 10).map((game) => (
        <Card 
          key={game.id}
          isFooterBlurred
          radius="lg"
          className="aspect-video relative rounded-lg overflow-hidden"
        >
          <CardHeader className="absolute z-50 top-1 flex-col items-start">
            <p className="text-xl xl:text-3xl text-primary uppercase font-bold">DEALS OF THE WEEK</p>
            <h4 className="text-white/90 font-medium text-tiny max-xl:hidden">Get it while it lasts</h4>
          </CardHeader>
          {game.titleImg && (
            <Image 
              src={game.titleImg}
              alt={game.title}
              isZoomed
              className="object-cover w-full h-full"              
            />
          )}
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 space-x-8">
            <div className="flex flex-grow gap-2 items-center max-lg:truncate">
              <div className="flex flex-col">
                <p className="text-tiny text-white/60 truncate">{game.title}</p>
                <p className="max-lg:hidden text-tiny text-white/60">Release year: {game.releaseDate}</p>
              </div>
            </div>
            <Button href={`/games/${game.id}`} as={Link} radius="full" size="sm" className="text-white px-3 bg-primary">BUY NOW</Button>
          </CardFooter>
        </Card>            

      ))}
    </div>
  );
}

export default DealsWeek;