"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { cn } from "@/lib/utils";
import { Save, ShieldCheck, ShieldX } from "lucide-react";
import toast from "react-hot-toast";

export type ProductColumn = {
  Fullname: string;
  PhoneNumber: string;
  Address: string;
  _id: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "Fullname",
    header: "Full name",
  },
  {
    accessorKey: "PhoneNumber",
    header: "PhoneNumber",
  },
  {
    accessorKey: "Address",
    header: "Address",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
