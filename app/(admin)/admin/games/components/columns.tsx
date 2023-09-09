"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type GamesColumn = {
  id: string
  name: string;
  price: number;
  category: string;
  size: number;
  rating: number;
  releaseDate: number;
  createdAt: string;
}

export const columns: ColumnDef<GamesColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
  {
    accessorKey: "releaseDate",
    header: "Release date",
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];