"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { redirect, useParams, useRouter } from "next/navigation";
import { BookUser, Lock, MailPlus, MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modal";
import { UserColumn } from "./columns";
import { getCookie } from "cookies-next";

interface CellActionProps {
  data: UserColumn;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const onResendEmail = async () => {
    const token = getCookie("token");
    try {
      setLoading(true);
      const response = await axios.post(
        `/api/users/resendEmail/${data.id}`,
        {},
        {
          baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "Application/json",
          },
        }
      );
      toast.success(`${response.data.message}`);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {}}
        loading={loading}
      ></AlertModal>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-8 h-8 p-0" variant="ghost">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4"></MoreHorizontal>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => router.push(`/users/${data.id}`)}>
            <BookUser className="w-4 h-4 mr-2" />
            User details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onResendEmail()}>
            <MailPlus className="w-4 h-4 mr-2" />
            Resend Email
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
