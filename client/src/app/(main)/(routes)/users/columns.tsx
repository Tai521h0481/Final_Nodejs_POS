"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { User } from "@/types/general.types";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Lock,
  MoreHorizontal,
  Power,
  PowerOff,
  ShieldCheck,
  ShieldX,
  Unlock,
} from "lucide-react";
import Image from "next/image";
import CellAction from "./cell-action";

export type UserColumn = {
  Email: string;
  Fullname: string;
  IsActive: boolean;
  IsLocked: boolean;
  IsOnline: boolean;
  Profile_Picture: string;
  Role: string;
  id: string;
};

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: "Profile_Picture",
    header: "Avatar",
    cell: ({ row }) => (
      <Image
        src={row.getValue("Profile_Picture")}
        height={30}
        width={30}
        className="object-cover rounded-full"
        alt="..."
      ></Image>
    ),
  },
  {
    accessorKey: "Fullname",
    header: "Full Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("Fullname")}</div>
    ),
  },
  {
    accessorKey: "Email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("Email")}</div>,
  },
  {
    accessorKey: "Role",
    header: "Role",
    cell: ({ row }) => <div className="lowercase">{row.getValue("Role")}</div>,
  },
  {
    accessorKey: "IsActive",
    header: "Active",
    cell: ({ row }) => (
      <div
        className={cn(
          "capitalize w-fit p-1 rounded-md",
          row.getValue("IsActive") === true
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
        )}
      >
        {row.getValue("IsActive") === true ? (
          <ShieldCheck size={20} />
        ) : (
          <ShieldX size={20} />
        )}
      </div>
    ),
  },
  {
    accessorKey: "IsLocked",
    header: "Locked",
    cell: ({ row }) => (
      <div
        className={cn(
          "capitalize w-fit p-1 rounded-md shadow-md",
          row.getValue("IsLocked") === false
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
        )}
      >
        {row.getValue("IsLocked") === false ? (
          <Unlock size={20} />
        ) : (
          <Lock size={20} />
        )}
      </div>
    ),
  },
  {
    accessorKey: "IsOnline",
    header: "Online",
    cell: ({ row }) => (
      <div
        className={cn(
          "capitalize w-fit p-1 rounded-md",
          row.getValue("IsOnline") === true
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
        )}
      >
        {row.getValue("IsOnline") === true ? (
          <Power size={20} />
        ) : (
          <PowerOff size={20} />
        )}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
