import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { motion } from "framer-motion";

const DataTableReportRange = ({ data }: any) => {
  const { orders } = data;
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <DataTable
        columns={columns}
        data={orders}
        searchKey="CustomerPhoneNumber"
      />
    </motion.div>
  );
};

export default DataTableReportRange;
