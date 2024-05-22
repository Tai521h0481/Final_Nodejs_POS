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
import { ChevronLeft } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  Email: z.string(),
});

export default function ForgotPasswordPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/recover-password/${values.Email}}`,
          {
            ...values,
          }
        )
        .then(function (response) {
          toast.success("Please check your email");
          router.push("/sign-in");
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
        Forgot password
      </Label>
      <div className="w-[400px] border border-zinc-400 px-3 py-5 rounded-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="Email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full !mt-8">
              Send
            </Button>
          </form>
        </Form>
      </div>
      <Link href="/sign-in">
        <div className="flex items-center justify-center p-2 mt-3 gap-x-2">
          <ChevronLeft />
          <span>Back to Sign In</span>
        </div>
      </Link>
    </div>
  );
}
