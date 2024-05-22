"use client";

import React, { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ImageUpload from "./ui/image-upload";
import { CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import axios from "axios";
import { motion } from "framer-motion";
import { getCookie, setCookie } from "cookies-next";

const formSchemaAvatar = z.object({
  imageUrl: z.string().min(1),
});

type FormValuesAvatar = z.infer<typeof formSchemaAvatar>;

const ChangeAvatar = (avatar: { avatar: string }) => {
  const router = useRouter();
  const token = getCookie("token");
  const [loading, setLoading] = useState(false);
  const formAvatar = useForm<FormValuesAvatar>({
    resolver: zodResolver(formSchemaAvatar),
    defaultValues: {
      imageUrl: avatar.avatar || "",
    },
  });
  const onSubmitAvatar = async (data: FormValuesAvatar) => {
    try {
      setLoading(true);
      await axios
        .patch(`/api/users/profiles/avatars`, data, {
          baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Avatar changed successfully");
          window.location.reload();
          router.refresh();
        })
        .then(() => {
          router.push("/profile");
        });
    } catch (error) {
      console.log(error);
    } finally {
      router.push("/profile");
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <Form {...formAvatar}>
        <form
          onSubmit={formAvatar.handleSubmit(onSubmitAvatar)}
          className="w-full space-y-8"
        >
          <FormField
            control={formAvatar.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <CardFooter>
            <Button disabled={loading} type="submit">
              Save change
            </Button>
          </CardFooter>
        </form>
      </Form>
    </motion.div>
  );
};

export default ChangeAvatar;
