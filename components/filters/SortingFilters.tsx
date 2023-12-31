'use client'

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SortingFiltersProps {
  sortOption: string
  setSortOption: (sortOption: string) => void
}

const SortingFilters = ({ sortOption, setSortOption }: SortingFiltersProps) => {
  
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname();

  const updateSortOptionFromQuery = () => {
    const currentSortOption = searchParams.get("sort");
    if (currentSortOption) {
      setSortOption(sortOption);
    } else {
      setSortOption("All");
    }
  };

  useEffect(() => {
    updateSortOptionFromQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  

  const handleSortChange = (selectedOption: string) => {
    setSortOption(selectedOption);
    const current = queryString.parse(searchParams.toString())
    
    let query = { ...current }

    if (selectedOption === "Price: High to Low") {
      query["sort"] = 'high-low'      
    } else if (selectedOption === "Price: Low to High") {
      query["sort"] = 'low-high'
    } else if (selectedOption === "New Release") {
      query["sort"] = 'newest'
    } else if (selectedOption === "Oldest") {
      query["sort"] = 'oldest'
    } else if (selectedOption === "All") {
      query["sort"] = 'all'
    }

    const url = queryString.stringifyUrl(
      {
        url: pathname,
        query
      },
      {skipNull: true}
    )
    
    router.push(url)
  };

  return (
    <div className="flex justify-center items-center">
      <Select defaultValue={sortOption} onValueChange={handleSortChange}>
      <h1 className="whitespace-nowrap">Sort by:</h1>
        <SelectTrigger className="w-[120px] lg:w-[160px] text-sm lg:text-base text-white/90 bg-transparent border-x-0 border-t-0 rounded-none focus:ring-offset-0">
          <SelectValue>
            {sortOption}          
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-primary dark:text-black">
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