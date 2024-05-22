"use client";

import { User } from "@/types/general.types";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function DemoPage() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const info = getCookie("user");
    if (info) {
      setUser(JSON.parse(info));
    }
    const token = getCookie("token");
    async function fetchProduct() {
      try {
        const response = await axios.get("/api/products", {
          baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <motion.div
      className="h-screen px-8 py-10 mx-auto"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage product for your store"
        ></Heading>
        {user?.Role !== "employee" && (
          <Button onClick={() => router.push(`/products/new`)}>
            <Plus className="w-4 h-4 mr-2"></Plus>
            Add new
          </Button>
        )}
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="Name" />
    </motion.div>
  );
}
