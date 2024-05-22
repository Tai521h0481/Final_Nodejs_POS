"use client";

import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types/general.types";

import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

interface CartItemProps {
  data: Product;
}

const CartItem = ({ data }: CartItemProps) => {
  const cart = useCart();
  const onRemove = () => {
    cart.removeItem(data._id);
  };
  return (
    <li className="flex py-6 border-b">
      <div className="relative w-16 h-16 overflow-hidden rounded-md sm:h-24 sm:w-24">
        <Image
          fill
          src={data.Image?.[0]?.url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative flex flex-col justify-between flex-1 ml-4 sm:ml-6">
        <div className="absolute top-0 right-0 z-10">
          <IconButton onClick={() => onRemove()} icon={<X size={15} />} />
        </div>
        <div className="relative sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex flex-col items-start gap-y-3">
            <p className="text-base font-semibold text-black ">{data.Name}</p>
            <Currency value={Number(data.RetailPrice)} />
            <p>{Number(data.Flag)}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
