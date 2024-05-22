"use client";

import { ColumnDef } from "@tanstack/react-table";

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
    header: "Paid By Customer",
  },
  {
    accessorKey: "ChangeReturnedToCustomer",
    header: "Change Amount",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "EmployeeName",
    header: "Created By",
  },
];
