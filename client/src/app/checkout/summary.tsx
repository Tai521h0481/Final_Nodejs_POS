"use client";

import axios from "axios";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import CartItem from "./cart-item";
import { CornerDownLeft } from "lucide-react";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const router = useRouter();
  const cart = useCart();
  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  const totalPrice = cart.items.reduce((total, item) => {
    return total + Number(item.RetailPrice) * item.Flag;
  }, 0);

  return (
    <div className="px-4 py-6 mt-0 bg-gray-100 rounded-lg sm:p-6 lg:p-8">
      <div className="lg:col-span-7">
        {cart.items.length === 0 && (
          <p className="text-neutral-500">No items added to cart.</p>
        )}
        <ul>
          {cart.items.map((item) => (
            <CartItem key={item._id} data={item} />
          ))}
        </ul>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button
        onClick={() => router.push("/point-of-sale")}
        className="flex items-center w-full gap-2 mt-6"
      >
        <CornerDownLeft />
        Back to cart
      </Button>
    </div>
  );
};

export default Summary;
