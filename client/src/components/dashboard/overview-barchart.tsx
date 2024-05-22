"use client";

import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Overview } from "./overview";
import axios from "axios";
import { getCookie } from "cookies-next";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const OverViewBarChart = () => {
  const token = getCookie("token");
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    async function fetchProduct() {
      try {
        await axios
          .get("/api/orders/getOrder/getFiveOrder", {
            baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
            headers: {
              "Content-Type": "Application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setData(response.data.data);
          });
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct();
  }, [token]);
  if (!data) {
    return null;
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Overview />
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
          <CardDescription>
            You made {data?.totalOrderInMonth} sales this month.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* <RecentSales list={data.orders} /> */}
          <div className="space-y-8">
            {data.orders &&
              data.orders?.length >= 0 &&
              data.orders.map((order: any) => (
                <div key={uuidv4()} className="flex items-center">
                  <Avatar className="flex items-center justify-center space-y-0 border h-9 w-9">
                    <AvatarImage src={order?.Avatar} alt="Avatar" />
                    <AvatarFallback>JL</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {order?.EmployeeName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order?.Email}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    +${order?.TotalAmount}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverViewBarChart;
