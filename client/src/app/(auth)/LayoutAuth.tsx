"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { hasCookie } from "cookies-next";

const LayoutAuth = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (hasCookie("token")) {
      router.push("/customer");
    } else {
      router.push("/sign-in");
    }
  }, [router, token]);
  return <>{children}</>;
};

export default LayoutAuth;
