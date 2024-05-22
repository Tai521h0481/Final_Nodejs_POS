"use client";

import { Product, User } from "@/types/general.types";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/heading";

const MyOrdersPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const params = useParams();
  const [data, setData] = useState([]);
  const token = getCookie("token");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const info = getCookie("user");

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchProduct() {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/orders/customer/${params.customerId}`,
          {
            baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
            headers: {
              "Content-Type": "Application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data.orders);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [params.customerId, token]);
  if (!data) {
    return null;
  }
  return (
    <motion.div
      className="h-screen px-8 py-10 mx-auto"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <div className="flex items-center justify-between">
        <Heading
          title={`Orders customer (${data.length})`}
          description="Manage customer for your store"
        ></Heading>
      </div>
      <Separator />
      {loading === false && (
        <DataTable
          columns={columns}
          data={data}
          searchKey="CustomerPhoneNumber"
        />
      )}
    </motion.div>
  );
};

export default MyOrdersPage;
