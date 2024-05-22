"use client";

import { Product, User } from "@/types/general.types";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const MyOrdersPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = useState([]);
  const token = getCookie("token");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const info = getCookie("user");
  useEffect(() => {
    window.scrollTo(0, 0);
    if (info) {
      setUser(JSON.parse(info));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    async function fetchProduct(id: string) {
      try {
        const response = await axios.get(`/api/orders/employee/${id}`, {
          baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.orders);
      } catch (error) {
        console.log(error);
      }
    }
    if (user) {
      fetchProduct(user.id);
    }
  }, [router, token, user]);

  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        searchKey="CustomerPhoneNumber"
      />
    </div>
  );
};

export default MyOrdersPage;
