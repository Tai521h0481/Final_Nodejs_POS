"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { getCookie, setCookie } from "cookies-next";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import axios from "axios";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const formSchema = z.object({
  Email: z.string(),
  Password: z.string(),
});

export default function SignInPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      return redirect("/customers");
    }
    const tokenLogin = searchParams.get("token");
    if (tokenLogin) {
      axios
        .post(
          `/api/sign-in`,
          { token: tokenLogin },
          {
            baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
            headers: {
              "Content-Type": "Application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setCookie("email", response.data.email);
            router.push("/first-sign-in");
          }
        })
        .catch((error) => {
          router.push("/toast");
          toast.error("Invalid token");
        });
    }
  }, [router, searchParams]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Email: "",
      Password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/login`, {
          ...values,
        })
        .then(function (response) {
          const token = response.data.token;
          setCookie("token", token);
          const user = response.data.user;
          setCookie("user", user);
          if (response.status === 200) {
            toast.success("Login successfully");
            router.push("/");
          }
        })
        .catch((response) => {
          toast.error(response.response.data.message);
        });
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center mx-auto mt-20">
      <Label className="mb-10 text-4xl font-semibold text-center">
        Sign in
      </Label>
      <div className="w-[400px] border border-zinc-400 px-3 py-5 rounded-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="Email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link
              href="/forgot-password"
              className="block ml-auto text-end w-fit"
            >
              Forgot Password?
            </Link>
            <Button type="submit" className="w-full !mt-8">
              Sign in
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
