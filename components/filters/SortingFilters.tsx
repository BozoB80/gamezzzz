'use client'

import useSortingStore from "@/hooks/use-sorting-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react";
import { Game } from "@prisma/client";

interface SortingFiltersProps {
  data: Game[]
}

const SortingFilters = ({ data }: SortingFiltersProps) => {
  const { sortDataByDate, sortDataByPrice, setGames } = useSortingStore();
  const [sortOption, setSortOption] = useState<string>("All");

  useEffect(() => {
    setGames(data);
  }, [data, setGames]);

  const handleSortChange = (selectedOption: string) => {
    setSortOption(selectedOption);

    if (selectedOption === "Price: High to Low") {
      sortDataByPrice("desc");
    } else if (selectedOption === "Price: Low to High") {
      sortDataByPrice("asc");
    } else if (selectedOption === "New Release") {
      sortDataByDate("desc");
    } else if (selectedOption === "Oldest") {
      sortDataByDate("asc");
    }
    // You may add a case for "default" to reset sorting to the initial state if needed.
  };

  return (
    <div className="flex justify-center items-center">
      <h1 className="whitespace-nowrap">Sort by:</h1>
      <Select defaultValue={sortOption} onValueChange={handleSortChange}>
        <SelectTrigger className="w-full md:w-[160px] text-base text-white bg-transparent border-x-0 border-t-0 rounded-none focus:ring-offset-0">
          <SelectValue>{sortOption}</SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-gray-200">
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="Price: High to Low">Price: High to Low</SelectItem>
          <SelectItem value="Price: Low to High">Price: Low to High</SelectItem>
          <SelectItem value="New Release">New Release</SelectItem>
          <SelectItem value="Oldest">Oldest</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default SortingFilters;