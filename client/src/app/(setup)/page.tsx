"use client";

import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";
import React from "react";

const HomePage = () => {
  const token = getCookie("token");
  if (!token) {
    return redirect("/sign-in");
  }
  return redirect("/customers");
};

export default HomePage;
