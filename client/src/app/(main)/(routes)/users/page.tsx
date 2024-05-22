"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import axios from "axios";
import Heading from "@/components/ui/heading";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

export default function UsersPage() {
  const router = useRouter();
  const [data, setData] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    const token = getCookie("token");
    async function fetchProduct() {
      try {
        const response = await axios.get("/api/users", {
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
  }, []);
  return (
    <motion.div
      className="h-auto px-8 py-6 mx-auto"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <div className="flex items-center justify-between">
        <Heading
          title={`Users (${data.length})`}
          description="Manage user for your store"
        ></Heading>
        <Button onClick={() => router.push(`/users/new`)}>
          <Plus className="w-4 h-4 mr-2"></Plus>
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
    </motion.div>
  );
}
