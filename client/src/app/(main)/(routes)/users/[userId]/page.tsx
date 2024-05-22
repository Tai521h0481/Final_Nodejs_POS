"use client";

import { User } from "@/types/general.types";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Lock, Unlock } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const UserPage = () => {
  const [user, setUser] = useState<User>();
  const params = useParams();
  const [data, setData] = useState([]);
  const token = getCookie("token");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  let id = params.userId;
  const onLock = async (id: string) => {
    const token = getCookie("token");
    try {
      setLoading(true);
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/lock/${id}`,
        {},
        {
          baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "Application/json",
          },
        }
      );
      toast.success(`${response.data.message}`);
      router.refresh();
      router.push("/users");
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchUser() {
      try {
        const response = await axios.get(`/api/users/${id}`, {
          baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await axios.get(`/api/orders/employee/${id}`, {
          baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.orders);
        console.log(
          "🚀 ~ fetchOrder ~ response.data.orders:",
          response.data.orders
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetchOrder();
  }, [id, token]);
  return (
    <motion.div
      className="h-auto px-8 py-6 mx-auto"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <div className="flex items-center justify-between mb-3 gap-x-6">
        <Heading
          title="User Profile"
          description={`Profile ${user?.Fullname}`}
        ></Heading>
        <div className="flex items-center justify-center gap-x-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={user?.Profile_Picture} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {user && (
            <Button
              onClick={() => onLock(user?.id)}
              disabled={loading}
              variant={user?.IsLocked ? "destructive" : "ghost"}
            >
              {user?.IsLocked ? <Lock /> : <Unlock />}
            </Button>
          )}
        </div>
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={data}
        searchKey="CustomerPhoneNumber"
      />
    </motion.div>
  );
};

export default UserPage;
