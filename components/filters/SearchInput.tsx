'use client'

import qs from "query-string";
import { Search, X } from "lucide-react";
import { ChangeEventHandler, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

interface SearchInputParams {
  value: string
  setValue: (value: string) => void
}

export const SearchInput = ({ value, setValue }: SearchInputParams) => {
  
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId")
  const price = searchParams.get("price")
  const sort = searchParams.get("sort")

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        categoryId: currentCategoryId,
        title: debouncedValue,
        price: price,
        sort: sort
      }
    }, { skipEmptyString: true, skipNull: true });

    router.push(url);
  }, [debouncedValue, currentCategoryId, router, pathname, price, sort])

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value)    
  }

  return (
    <div className="max-lg:w-full relative">
      <Search
        className="h-4 w-4 absolute top-3 left-1"
      />
      <Input
        onChange={onChange}
        value={value}
        className="w-full lg:w-[160px] pl-9 bg-transparent border-x-0 border-t-0 rounded-none focus-visible:ring-offset-0 focus-visible:ring-0"
        placeholder="Search title"
      />
      {value && (
        <X onClick={() => setValue("")} className="h-4 w-4 absolute top-3 right-1 cursor-pointer" />
      )}
    </div>
  )
}