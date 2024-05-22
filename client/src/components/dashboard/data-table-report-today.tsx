"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getCookie } from "cookies-next";
import axios from "axios";
import { motion } from "framer-motion";

const DataTableReportToday = () => {
  const token = getCookie("token");
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        await axios
          .get("api/reports/today", {
            baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
            headers: {
              "Content-Type": "Application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response: any) => {
            setData(response?.data?.orders);
          });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [token]);
  if (!data) {
    return null;
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <DataTable
        columns={columns}
        data={data}
        searchKey="CustomerPhoneNumber"
      />
    </motion.div>
  );
};

export default DataTableReportToday;
