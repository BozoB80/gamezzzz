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
  const { sortDataByDate, sortDataByPrice, setGames, resetSorting } = useSortingStore();
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
    } else if (selectedOption === "All") {
      resetSorting()
    }
  };


  return (
    <div className="flex justify-center items-center">
      <Select defaultValue={sortOption} onValueChange={handleSortChange}>
      <h1 className="whitespace-nowrap">Sort by:</h1>
        <SelectTrigger className="w-[120px] lg:w-[160px] text-sm lg:text-base text-white bg-transparent border-x-0 border-t-0 rounded-none focus:ring-offset-0">
          <SelectValue>
            {sortOption}          
          </SelectValue>
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