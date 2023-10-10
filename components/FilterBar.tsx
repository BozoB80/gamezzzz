'use client'

import { Category, Game } from "@prisma/client";
import FilterNumber from "./filters/FilterNumber";
import { SearchInput } from "./filters/SearchInput";
import SortingFilters from "./filters/SortingFilters";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { ListFilter } from "lucide-react";
import CategoryFilters from "./filters/CategoryFilters";
import PriceFilters from "./filters/PriceFilters";
import { Button } from "./ui/button";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ScrollArea } from "./ui/scroll-area";

interface FilterBarProps {
  games: Game[]
  categories?: Category[]
}

const FilterBar = ({ games, categories }: FilterBarProps) => {
  const [value, setValue] = useState("")
  const [sortOption, setSortOption] = useState<string>("All");

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = Object.fromEntries(useSearchParams());
  const paramsCount = Object.keys(searchParams).length;

  const resetSearchParams = () => {
    router.replace(pathname)
    setValue("")
    setSortOption("All")
    router.refresh()
  };

  return (
    <>
      <div className="hidden lg:flex justify-between items-center">
        <SearchInput value={value} setValue={setValue} />
        <p className="py-2 border-b">Results: {games.length}</p>
        <FilterNumber setValue={setValue} setSortOption={setSortOption} />
        <SortingFilters sortOption={sortOption} setSortOption={setSortOption} />
      </div>

      <div className="flex lg:hidden justify-between items-center">
        <Sheet>
          <SheetTrigger className="flex items-center gap-2">
            Filters
            <ListFilter />
          </SheetTrigger>
          <SheetContent className="w-full flex flex-col justify-between items-center h-full">
            <ScrollArea className="w-full flex flex-col">
              <SheetTitle><FilterNumber setValue={setValue} setSortOption={setSortOption} /></SheetTitle>
              <div className="flex flex-col justify-between items-center mt-4">
                <div className="flex flex-col justify-between items-center w-full">
                  <SearchInput value={value} setValue={setValue} />
                  {categories && categories.length > 0 && (
                    <CategoryFilters name="Genres" data={categories} valueKey="categoryId" />
                  )}
                  <PriceFilters valueKey="price" />
                </div>
              </div>
            </ScrollArea>
              <div className="w-full h-auto bg-muted-foreground/10 flex justify-between rounded-xs p-2">
                <Button size="lg" variant="outline" disabled={paramsCount === 0} onClick={resetSearchParams}>Clear</Button>  
                <SheetClose>
                <Button size="lg" disabled={paramsCount === 0}>Confirm</Button>                
                
                </SheetClose>              
              </div>
          </SheetContent>
        </Sheet>
        <SortingFilters sortOption={sortOption} setSortOption={setSortOption} />
      </div>
    </>
  );
}

export default FilterBar;