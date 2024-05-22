"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";

const formSchema = z.object({
  password: z.string(),
  passwordConfirm: z.string(),
});

export default function SignInPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.password === values.passwordConfirm) {
      try {
        const email = getCookie("email");
        axios
          .patch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/employees/firstChangePassword`,
            {
              Password: values.password,
              Email: email,
            }
          )
          .then(function (response) {
            const token = response.data.token;
            setCookie("token", token);
            const user = response.data.user;
            setCookie("user", user);
            if (response.status === 200) {
              toast.success("Login successfully");
              router.push("/customers");
            }
          })
          .catch((response) => {
            toast.error(response.response.data.message);
          });
      } catch (error: any) {
        console.log(error);
      }
    } else {
      toast.error("Password confirm not match");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center mx-auto mt-20">
      <Label className="mb-10 text-4xl font-semibold text-center">
        Change password
      </Label>
      <div className="w-[400px] border border-zinc-400 px-3 py-5 rounded-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
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
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password confirm</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password confirm"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full !mt-8">
              Sign in
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
