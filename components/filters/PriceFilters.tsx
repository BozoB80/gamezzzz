"use client";

import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { Game } from "@prisma/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { cn } from "@/lib/utils";

interface FilterProps {
  valueKey: string
}

const PriceFilters: React.FC<FilterProps> = ({
  valueKey,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams.get(valueKey);

  const onClick = (filterType: 'free' | 'under10' | 'under20' | 'under30' | 'over14.99') => {
    const current = queryString.parse(searchParams.toString());

    let query = { ...current };

    if (filterType === 'free') {
      query[valueKey] = 'free'; 
    } else if (filterType === 'under10') {
      query[valueKey] = 'under10'; 
    } else if (filterType === 'under20') {
      query[valueKey] = 'under20'; 
    }else if (filterType === 'under30') {
      query[valueKey] = 'under30'; 
    } else if (filterType === 'over14.99') {
      query[valueKey] = 'over14.99'; 
    }

    if (current[valueKey] === filterType) {
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
    <Accordion type="single" collapsible className="w-full lg:w-40">
      <AccordionItem value="price">
        <AccordionTrigger className="p-3 text-lg font-semibold">
          Price
        </AccordionTrigger>
        <AccordionContent className="flex flex-col flex-wrap gap-2">
          <div
            onClick={() => onClick('free')}
            className={cn(
              "flex items-center p-3 text-base hover:text-primary cursor-pointer transition",
              selectedValue === 'free' && "bg-primary text-black font-semibold hover:text-secondary rounded-lg"
            )}
          >
            <p>Free</p>
          </div>
          <div
            onClick={() => onClick('under10')}
            className={cn(
              "flex items-center p-3 text-base hover:text-primary cursor-pointer transition",
              selectedValue === 'under10' &&
                "bg-primary text-black font-semibold hover:text-secondary rounded-lg"
            )}
          >
            <p>Under €10.00</p>
          </div>
          <div
            onClick={() => onClick('under20')}
            className={cn(
              "flex items-center p-3 text-base hover:text-primary cursor-pointer transition",
              selectedValue === 'under20' &&
                "bg-primary text-black font-semibold hover:text-secondary rounded-lg"
            )}
          >
            <p>Under €20.00</p>
          </div>
          <div
            onClick={() => onClick('under30')}
            className={cn(
              "flex items-center p-3 text-base hover:text-primary cursor-pointer transition",
              selectedValue === 'under30' &&
                "bg-primary text-black font-semibold hover:text-secondary rounded-lg"
            )}
          >
            <p>Under €30.00</p>
          </div>
          <div
            onClick={() => onClick('over14.99')}
            className={cn(
              "flex items-center p-3 text-base hover:text-primary cursor-pointer transition",
              selectedValue === 'over14.99' &&
                "bg-primary text-black font-semibold hover:text-secondary rounded-lg"
            )}
          >
            <p>Over €14.99</p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PriceFilters;
