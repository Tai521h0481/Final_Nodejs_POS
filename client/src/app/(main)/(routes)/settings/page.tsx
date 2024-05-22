"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import ChangeAvatar from "@/components/change-avatar";

const formSchemaPassword = z.object({
  Password: z.string().min(1),
  newPassword: z.string().min(1),
});

type FormValuesPassword = z.infer<typeof formSchemaPassword>;

export default function SettingPage() {
  const token = getCookie("token");
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    axios
      .get("/api/users/avatar/getAvatar", {
        baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAvatar(response.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<FormValuesPassword>({
    resolver: zodResolver(formSchemaPassword),
    defaultValues: {
      Password: "",
      newPassword: "",
    },
  });

  const onSubmitPassword = async (data: FormValuesPassword) => {
    try {
      setLoading(true);
      await axios.patch(`/api/users/profiles/changePassword`, data, {
        baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Password changed successfully");
      deleteCookie("token");
      // deleteCookie("user");
      router.refresh();
      router.push("/sign-in");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <Tabs defaultValue="account" className="w-[900px] mx-auto mt-10">
        <TabsList className="grid w-full grid-cols-3 space-x-4">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your avatar here. Click save when you&apos;re
                done.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {avatar && <ChangeAvatar avatar={avatar}></ChangeAvatar>}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmitPassword)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="Password"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Current password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            disabled={loading}
                            placeholder="Password..."
                            {...field}
                          ></Input>
                        </FormControl>
                        <FormMessage></FormMessage>
                      </FormItem>
                    )}
                  ></FormField>
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>New password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            disabled={loading}
                            placeholder="New password..."
                            {...field}
                          ></Input>
                        </FormControl>
                        <FormMessage></FormMessage>
                      </FormItem>
                    )}
                  ></FormField>

                  <CardFooter>
                    <Button disabled={loading} type="submit">
                      Save password
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="theme">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>
                Toggle the theme between light and dark mode.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch id="airplane-mode" />
                <Label htmlFor="airplane-mode">Mode</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
