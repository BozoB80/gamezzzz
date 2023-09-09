"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";

import { Separator } from "@/components/ui/separator";

import { GamesColumn, columns } from "./columns";
import Heading from "@/components/ui/heading";

interface GamesClientProps {
  data: GamesColumn[];
};

export const GamesClient: React.FC<GamesClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <> 
      <div className="flex items-center justify-between">
        <Heading title={`Games (${data.length})`} description="Manage games for your store" />
        <Button onClick={() => router.push(`/admin/games/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};