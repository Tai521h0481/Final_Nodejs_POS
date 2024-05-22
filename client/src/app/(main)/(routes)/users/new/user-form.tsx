"use client";

import * as z from "zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { User } from "@/types/general.types";
import { getCookie } from "cookies-next";

const formSchema = z.object({
  Email: z.string().min(1).email("Cannot type email"),
  Fullname: z.string().min(1),
});

type UserFormValues = z.infer<typeof formSchema>;

interface UserFormProps {
  initialData: User | null;
}

const UserForm: React.FC<UserFormProps> = ({ initialData }) => {
  const token = getCookie("token");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      Email: "",
      Fullname: "",
    },
  });
  const onSubmit = async (data: UserFormValues) => {
    try {
      setLoading(true);
      await axios.post(`/api/users/register`, data, {
        baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      router.refresh();
      toast.success("Send email successfully");
      router.push(`/users`);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-start">
        <Heading title="Create user" description="Add a new user"></Heading>
      </div>
      <Separator></Separator>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormField
            control={form.control}
            name="Email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    type="email"
                    placeholder="Email"
                    {...field}
                  ></Input>
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          ></FormField>
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="Fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Full name"
                      {...field}
                    ></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            ></FormField>
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Create
          </Button>
        </form>
      </Form>
    </>
  );
};

export default UserForm;
