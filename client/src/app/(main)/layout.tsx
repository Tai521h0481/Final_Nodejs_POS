"use client";

import Logo from "@/components/Logo";
import Sidebar from "@/components/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SearchBar from "@/components/SearchBar";
import { getCookie, hasCookie } from "cookies-next";
import { User } from "@/types/general.types";
import axios from "axios";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const token = getCookie("token");
  useEffect(() => {
    if (!token) {
      return redirect("/sign-in");
    }
    async function getProfile() {
      const response = await axios.get(`/api/users/profiles`, {
        baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    }
    getProfile();
  }, [token]);
  return (
    <div className="w-full h-full">
      <motion.div
        className="flex items-center justify-between w-full h-full px-8 py-6"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link href="/customers">
          <Logo></Logo>
        </Link>

        <div>
          <SearchBar></SearchBar>
        </div>
        <div className="flex items-center justify-center gap-x-4">
          <p className="text-2xl font-semibold capitalize">{user?.Fullname}</p>
          <Avatar className="w-12 h-12">
            <AvatarImage src={user?.Profile_Picture} alt="avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </motion.div>
      <div className="grid grid-cols-[250px_minmax(0,1fr)] max-h-screen">
        <Sidebar />
        <div className="h-screen px-6">{children} </div>
      </div>
    </div>
  );
};

export default Layout;
