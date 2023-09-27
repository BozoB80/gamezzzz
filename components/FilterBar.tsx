'use client'

import { Game } from "@prisma/client";
import FilterNumber from "./filters/FilterNumber";
import { SearchInput } from "./filters/SearchInput";
import SortingFilters from "./filters/SortingFilters";

interface FilterBarProps {
  games: Game[]
}

const FilterBar = ({ games }: FilterBarProps) => {
  return (
    <div className="flex justify-between items-center">
    <SearchInput />
    <p className="py-2 border-b">Results: {games.length}</p>
    <FilterNumber />
    <SortingFilters data={games} />
  </div>
  );
}

export default FilterBar;