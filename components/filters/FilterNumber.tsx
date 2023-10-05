"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

const FilterNumber = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = Object.fromEntries(useSearchParams());
  const paramsCount = Object.keys(searchParams).length;

  const resetSearchParams = () => {
    router.replace(pathname)
    router.refresh()
  };

  return (
    <div className="flex gap-x-6 lg:gap-x-12 justify-between items-center lg:border-b">
      <div className="flex justify-center items-center gap-x-2">
        <p>Filters</p>
        <p>({paramsCount})</p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        disabled={paramsCount === 0}
        onClick={resetSearchParams}
        className="max-lg:hidden lg:block hover:bg-black hover:text-muted-foreground"
      >
        RESET
      </Button>
    </div>
  );
};

export default FilterNumber;
