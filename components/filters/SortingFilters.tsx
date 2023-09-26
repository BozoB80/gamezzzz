'use client'

import useSortingStore from "@/hooks/use-sorting-store";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChangeEvent, useEffect, useState } from "react";
import { Game } from "@prisma/client";

interface SortingFiltersProps {
  data: Game[]
}

const SortingFilters = ({ data }: SortingFiltersProps) => {
  const { sortDataByDate, sortDataByPrice, setGames, sortedGames } = useSortingStore();
  const [sortOption, setSortOption] = useState<string>("default");

  useEffect(() => {
    // When the 'data' prop changes, update the 'games' in the Zustand store
    setGames(data);
  }, [data, setGames]);

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    setSortOption(selectedOption);

    if (selectedOption === "highestPrice") {
      sortDataByPrice("desc");
    } else if (selectedOption === "lowestPrice") {
      sortDataByPrice("asc");
    } else if (selectedOption === "newest") {
      sortDataByDate("desc");
    } else if (selectedOption === "oldest") {
      sortDataByDate("asc");
    }
    // You may add a case for "default" to reset sorting to the initial state if needed.
  };
  
  console.log(sortedGames);
  

  return (
    <div className="text-black">
      <label>Sort by:</label>
      <select value={sortOption} onChange={handleSortChange}>
        <option value="default">Default</option>
        <option value="highestPrice">Highest Price</option>
        <option value="lowestPrice">Lowest Price</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
}

export default SortingFilters;