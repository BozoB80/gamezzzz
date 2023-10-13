"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Progress } from "@nextui-org/progress";
import { Category, Game } from "@prisma/client";
import Image from "next/image";
import { Download, MoreHorizontal } from "lucide-react";
import { Chip } from "@nextui-org/chip";
import { formatLastPlayedDate } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";

interface LibraryCardProps {
  data: Game & {
    category?: Category;
  };
}

const LibraryCard: React.FC<LibraryCardProps> = ({ data }) => {
  const [randomPlayTime, setRandomPlayTime] = useState<number>(0);
  const [randomPlayedDate, setRandomPlayedDate] = useState<string>("");
  const [randomAchievments, setRamdomAchievments] = useState<number>(0);

  const discountedPrice = data.discount
    ? data.price - (data.price * data.discount) / 100
    : data.price;

  useEffect(() => {
    const randomValue = Math.floor(Math.random() * (178 - 5 + 1) + 5);
    setRandomPlayTime(randomValue);
  }, []);

  useEffect(() => {
    const randomValue = Math.floor(Math.random() * (184 - 1 + 1) + 1);
    setRamdomAchievments(randomValue);
  }, []);

  useEffect(() => {
    const randomDaysAgo = Math.floor(Math.random() * 16); // Random days between 0 and 15
    const randomLastPlayedDate = new Date();
    randomLastPlayedDate.setDate(
      randomLastPlayedDate.getDate() - randomDaysAgo
    );
    const formattedDate = formatLastPlayedDate(randomLastPlayedDate);
    setRandomPlayedDate(formattedDate);
  }, []);

  return (
    <div className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:w-48 sm:h-48">
        {data.titleImg ? (
          <Image
            src={data.titleImg}
            alt="image"
            fill
            className="object-cover object-center"
          />
        ) : (
          <div>Image not available</div>
        )}
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="flex justify-between items-center">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-white/80">{data.title}</p>
          </div>

          <div className="max-md:hidden mt-1 flex text-sm text-white/70">
            <p>{data.category?.name}</p>
            <p className="ml-2 border-l border-gray-200 pl-2">
              {data.developer}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Dropdown
              placement="bottom-end"
              className="text-white/90 bg-muted-foreground rounded-xl"
              classNames={{
                base: "bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
              }}
            >
              <DropdownTrigger>
                <MoreHorizontal className="cursor-pointer" />
              </DropdownTrigger>
              <DropdownMenu
                aria-label="options"
                itemClasses={{
                  base: ["text-black", "data-[hover=true]:text-primary"],
                }}
              >
                <DropdownItem key="store">Store Page</DropdownItem>
                <DropdownItem key="forums">Forums</DropdownItem>
                <DropdownItem key="groups">Groups</DropdownItem>
                <DropdownItem key="web">Official Website</DropdownItem>
                <DropdownItem key="news">News</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        <div className="flex max-md:flex-col max-md:justify-center max-md:p-4 max-md:gap-2 justify-start items-center md:space-x-6">
          <Chip
            variant="shadow"
            classNames={{
              base: "bg-gradient-to-br from-yellow-300 to-yellow-700 border-small border-white/50 shadow-pink-500/30",
              content: "drop-shadow shadow-black text-white",
            }}
          >
            <span className="uppercase text-sm">Total played:</span>{" "}
            {randomPlayTime} hours
          </Chip>
          <Chip
            variant="shadow"
            classNames={{
              base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
              content: "drop-shadow shadow-black text-white",
            }}
          >
            <span className="uppercase text-sm">Last played:</span>{" "}
            {randomPlayedDate}
          </Chip>
          <Progress
            size="sm"
            radius="lg"
            classNames={{
              base: "max-w-xs",
              track: "drop-shadow-md border border-white/60",
              indicator: "bg-gradient-to-r from-yellow-400 to-yellow-500",
              label: "tracking-wider font-medium text-white/90",
              value: "text-white/90",
            }}
            label="Achievements"
            minValue={1}
            maxValue={184}
            value={randomAchievments}
            showValueLabel={true}
          />
        </div>

        <div className="max-md:hidden flex justify-between items-center">
          <p className="text-white/70 max-sm:hidden">Rating: {data.rating}</p>
          <div className="flex justify-center items-center gap-3 text-lg text-white/80">
            {data.discount ? (
              <Badge className="text-sm">-{data.discount}%</Badge>
            ) : (
              ""
            )}
            <p className={data.discount ? "line-through" : "text-white"}>
              €{data.price}
            </p>
            {data.discount ? (
              <p className="text-white">€{discountedPrice.toFixed(2)}</p>
            ) : (
              ""
            )}
          </div>
          <Button
            variant="bordered"
            startContent={<Download className="mr-2" />}
            className="border border-primary text-white/90 px-3 py-2 rounded-md hover:text-primary"
          >
            Install
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LibraryCard;
