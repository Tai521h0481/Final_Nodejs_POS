"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type ProductColumn = {
  Barcode: string;
  Name: string;
  ImportPrice: number;
  RetailPrice: number;
  Category: string;
  Quantity: number;
  _id: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "Barcode",
    header: "Barcode",
  },
  {
    accessorKey: "Name",
    header: "Name",
  },
  {
    accessorKey: "ImportPrice",
    header: "ImportPrice",
  },
  {
    accessorKey: "RetailPrice",
    header: "RetailPrice",
  },
  {
    accessorKey: "Category",
    header: "Category",
  },
  {
    accessorKey: "Quantity",
    header: "Quantity",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
