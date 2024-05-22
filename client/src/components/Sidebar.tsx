"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { sidebarLinks } from "@/constants/general.const";
import { TSidebarLink } from "@/types/general.types";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { IconLogout } from "./icons";
import { deleteCookie, getCookie } from "cookies-next";
import axios from "axios";
import useCart from "@/hooks/use-cart";

export default function Sidebar() {
  const pathname = usePathname();
  const token = getCookie("token");
  const cart = useCart();
  const [user, setUser] = useState<any>({});
  useEffect(() => {
    const info = getCookie("user");
    if (info) {
      setUser(JSON.parse(info));
    }
  }, []);
  const onLogout = async () => {
    await axios.post(
      "/api/users/logout",
      {},
      {
        baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    cart.removeAll();
    deleteCookie("token");
  };
  let string = "/";
  return (
    <motion.div
      className="bg-gray-200 rounded-br-2xl rounded-tr-2xl"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="flex flex-col w-full h-screen gap-6 p-4 text-lg ">
        {sidebarLinks
          .filter((link) => link.role?.includes(user.Role))
          .map((link) => (
            <SidebarLink
              key={link.title}
              isActive={string
                .concat(pathname.split("/")[1])
                .includes(link.path)}
              link={link}
            ></SidebarLink>
          ))}
        <Link
          href="/sign-in"
          className={cn(
            "flex items-center gap-5 font-bold text-zinc-500 hover:bg-zinc-300/50 hover:text-zinc-600 p-3 rounded-lg transition-all"
          )}
          onClick={() => onLogout()}
        >
          <span>
            <IconLogout />
          </span>
          <span>Logout</span>
        </Link>
      </div>
    </motion.div>
  );
}

interface SidebarLinkProps {
  link: TSidebarLink;
  isActive: boolean;
}

function SidebarLink({ link, isActive }: SidebarLinkProps) {
  return (
    <Link
      href={link.path}
      className={cn(
        "flex items-center gap-5 font-bold text-zinc-500 hover:bg-zinc-300/50 hover:text-zinc-600 p-3 rounded-lg transition-all",
        isActive
          ? "text-zinc-200 bg-slate-700 hover:text-zinc-200 hover:bg-slate-700"
          : ""
      )}
    >
      <span>{link.icon}</span>
      <span>{link.title}</span>
    </Link>
  );
}
