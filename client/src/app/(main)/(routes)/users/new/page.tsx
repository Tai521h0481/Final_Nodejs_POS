"use client";

import React, { useEffect, useState } from "react";
import UserForm from "./user-form";
import { getCookie } from "cookies-next";
import axios from "axios";
import { User } from "@/types/general.types";

const UserPage = ({ params }: { params: { userId: string } }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    const token = getCookie("token");
    async function fetchProduct() {
      try {
        const response = await axios.get(`/api/users/${params.userId}`, {
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
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <UserForm initialData={user}></UserForm>
      </div>
    </div>
  );
};

export default UserPage;
