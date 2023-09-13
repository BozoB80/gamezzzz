"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { Category } from "@prisma/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface FilterProps {
  data: Category[];
  name: string;
  valueKey: string;
}

const SortingFilters: React.FC<FilterProps> = ({ data, name, valueKey }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams.get(valueKey);

  const onClick = (id: string) => {
    const current = queryString.parse(searchParams.toString());

    const query = {
      ...current,
      [valueKey]: id,
    };

    if (current[valueKey] === id) {
      query[valueKey] = null;
    }

    const url = queryString.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <Accordion type="single" collapsible className="w-40">
      <AccordionItem value={name}>
        <AccordionTrigger className="p-3 text-lg font-semibold">
          {name}
        </AccordionTrigger>
        <AccordionContent className="flex flex-col flex-wrap gap-2">
          {data.map((filter) => (
            <div
              key={filter.id}
              onClick={() => onClick(filter.id)} 
              className={cn(
                "flex items-center p-3 text-base hover:text-primary cursor-pointer transition",
                selectedValue === filter.id && "bg-primary text-black font-semibold hover:text-secondary rounded-lg"
              )}
            >
              <p>{filter.name}</p>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SortingFilters;
