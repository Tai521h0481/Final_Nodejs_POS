"use client";

import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function Overview() {
  const token = getCookie("token");
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        await axios
          .get("api/reports/monthly-order-counts", {
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
  data.forEach((item: any) => {
    // TODO: Change month to String
    if (item.month === 1) {
      item.name = "Jan";
    } else if (item.month === 2) {
      item.name = "Feb";
    } else if (item.month === 3) {
      item.name = "Mar";
    } else if (item.month === 4) {
      item.name = "Apr";
    } else if (item.month === 5) {
      item.name = "May";
    } else if (item.month === 6) {
      item.name = "Jun";
    } else if (item.month === 7) {
      item.name = "Jul";
    } else if (item.month === 8) {
      item.name = "Aug";
    } else if (item.month === 9) {
      item.name = "Sep";
    } else if (item.month === 10) {
      item.name = "Oct";
    } else if (item.month === 11) {
      item.name = "Nov";
    } else if (item.month === 12) {
      item.name = "Dec";
    } else {
      item.name = "Unknown";
    }
  });
  return (
    <>
      {data && loading === false && (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </>
  );
}
