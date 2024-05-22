"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type OrderColumn = {
  AmountPaidByCustomer: number;
  ChangeReturnedToCustomer: number;
  TotalAmount: number;
  OrderDetails: [];
  OrderDetailSize: number;
  CustomerName: string;
  CustomerPhoneNumber: string;
  _id: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "CustomerName",
    header: "Customer",
  },
  {
    accessorKey: "CustomerPhoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "AmountPaidByCustomer",
    header: "AmountPaidByCustomer",
  },
  {
    accessorKey: "ChangeReturnedToCustomer",
    header: "ReturnedToCustomer",
  },
  {
    accessorKey: "createdAt",
    header: "createdAt",
  },
  {
    accessorKey: "OrderDetailSize",
    header: "Quantity",
    cell: ({ row }) => (
      <div className="">{row.getValue("OrderDetailSize")}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
