"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { Category } from "@prisma/client";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

interface FilterProps {
  data: Category[];
  name: string;
  valueKey: string;
}

const CategoryFilters: React.FC<FilterProps> = ({ data, name, valueKey }) => {
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
    <Accordion 
      className="border-b"
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            height: "auto",
            transition: {
              height: {
                type: "spring",
                stiffness: 500,
                damping: 30,
                duration: 1,
              },
              opacity: {
                easings: "ease",
                duration: 1,
              },
            },
          },
          exit: {
            y: -10,
            opacity: 0,
            height: 0,
            transition: {
              height: {
                easings: "ease",
                duration: 0.25,
              },
              opacity: {
                easings: "ease",
                duration: 0.3,
              },
            },
          },
        },
      }}
    >
      <AccordionItem aria-label="Accordion 1" title={<p className="lg:text-white/90 text-md">Genres</p>}>
        {data.map((filter) => (
          <div
            key={filter.id}
            onClick={() => onClick(filter.id)}
            className={cn(
              "flex items-center p-3 max-lg:py-2 text-base hover:text-primary cursor-pointer transition",
              selectedValue === filter.id &&
                "bg-primary text-black font-semibold hover:text-secondary rounded-md lg:rounded-lg"
            )}
          >
            <p>{filter.name}</p>
          </div>
        ))}
      </AccordionItem>
    </Accordion>
  );
};

export default CategoryFilters;
