"use client";

import { User } from "@/types/general.types";
import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = getCookie("token");
  if (!token) {
    redirect("/sign-in");
  }
  if (token) return <>{children}</>;
}
