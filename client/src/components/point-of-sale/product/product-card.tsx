"use client";

import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import useCart from "@/hooks/use-cart";
import usePreviewModal from "@/hooks/use-preview-modal";
import { Product } from "@/types/general.types";

import { Expand, ShoppingCart } from "lucide-react";
import Image from "next/image";
import React, { MouseEventHandler } from "react";

interface ProductCardProps {
  data: Product;
}

const ProductCard = ({ data }: ProductCardProps) => {
  const previewModal = usePreviewModal();
  const cart = useCart();
  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  };
  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
  };
  return (
    <div className="p-3 space-y-4 bg-white border cursor-pointer group rounded-xl">
      {/* Image & actions */}
      <div className="relative bg-gray-100 aspect-square rounded-xl">
        <Image
          src={data.Image?.[0]?.url}
          alt=""
          fill
          className="object-cover rounded-md aspect-square"
        />
        <div className="absolute w-full px-6 transition opacity-0 group-hover:opacity-100 bottom-5">
          <div className="flex justify-center gap-x-6">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className="text-lg font-semibold">{data.Name}</p>
        <p className="text-sm text-gray-500">{data.Category}</p>
      </div>
      {/* Price & Reiew */}
      <div className="flex items-center justify-between">
        <Currency value={Number(data.RetailPrice)} />
      </div>
    </div>
  );
};

export default ProductCard;
