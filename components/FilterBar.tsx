'use client'

import { Category, Game } from "@prisma/client";
import FilterNumber from "./filters/FilterNumber";
import { SearchInput } from "./filters/SearchInput";
import SortingFilters from "./filters/SortingFilters";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { ListFilter } from "lucide-react";
import CategoryFilters from "./filters/CategoryFilters";
import PriceFilters from "./filters/PriceFilters";
import { Button } from "./ui/button";

interface FilterBarProps {
  games: Game[]
  categories: Category[]
}

const FilterBar = ({ games, categories }: FilterBarProps) => {
  return (
    <>
      <div className="hidden lg:flex justify-between items-center">
        <SearchInput />
        <p className="py-2 border-b">Results: {games.length}</p>
        <FilterNumber />
        <SortingFilters data={games} />
      </div>

      <div className="flex lg:hidden justify-between items-center">
        <Sheet>
          <SheetTrigger className="flex items-center gap-2">
            Filters
            <ListFilter />
          </SheetTrigger>
          <SheetContent className="w-full flex flex-col justify-between items-center h-full">
            <div className="w-full flex flex-col">
              <SheetTitle><FilterNumber /></SheetTitle>
              <div className="flex flex-col justify-between items-center mt-4">
                <div className="flex flex-col justify-between items-center w-full">
                  <SearchInput />
                  <CategoryFilters name="Genres" data={categories} valueKey="categoryId" />
                  <PriceFilters valueKey="price" />
                </div>
              </div>
            </div>
              <div className="w-full h-auto bg-muted-foreground/20 flex justify-between rounded-xs p-2">
                <Button size="lg" variant="outline">Clear</Button>                
                <Button size="lg">Confirm</Button>                
              </div>
          </SheetContent>
        </Sheet>
        <SortingFilters data={games} />
      </div>
    </>
  );
}

export default FilterBar;