"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { getCookie } from "cookies-next";
import axios from "axios";
import { BadgeDollarSign, BaggageClaim, PartyPopper } from "lucide-react";
import LoadingDashboard from "./loading";
import { motion } from "framer-motion";

const TotalRevenue7Day = () => {
  const token = getCookie("token");
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        await axios
          .get("api/reports/this-month", {
            baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
            headers: {
              "Content-Type": "Application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setData(response.data);
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
    <>
      {data && loading === false ? (
        <motion.div
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Amount Received
              </CardTitle>
              <BadgeDollarSign className="text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="mt-3 text-2xl font-bold">
                ${data?.totalAmountReceived}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <BadgeDollarSign className="text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="mt-3 text-2xl font-bold">${data.totalProfit}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Order</CardTitle>
              <BaggageClaim className="text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="mt-3 text-2xl font-bold">
                {data?.numberOfOrders}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Total Product
              </CardTitle>
              <PartyPopper className="text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="mt-3 text-2xl font-bold">
                {data?.numberOfProducts}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <LoadingDashboard></LoadingDashboard>
      )}
    </>
  );
};

export default TotalRevenue7Day;
