"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import ProductList from "@/components/point-of-sale/product/product-list";
import CartItem from "@/components/point-of-sale/cart/cart-item";
import { motion } from "framer-motion";
import axios from "axios";
import { getCookie } from "cookies-next";
import { Product } from "@/types/general.types";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { ScanBarcode, Search } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import Link from "next/link";
import Logo from "@/components/Logo";

const searchNameProductFormSchema = z.object({
  name: z.string(),
});
const searchBarcodeProductFormSchema = z.object({
  barcode: z.string(),
});

const PointOfSalePage = () => {
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const router = useRouter();
  const formName = useForm<z.infer<typeof searchNameProductFormSchema>>({
    resolver: zodResolver(searchNameProductFormSchema),
    defaultValues: {
      name: "",
    },
  });
  const formBarcode = useForm<z.infer<typeof searchBarcodeProductFormSchema>>({
    resolver: zodResolver(searchBarcodeProductFormSchema),
    defaultValues: {
      barcode: "",
    },
  });
  useEffect(() => {
    const token = getCookie("token");
    async function fetchProduct() {
      try {
        const response = await axios.get("/api/products", {
          baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
        setDataFilter(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const cart = useCart();
  const totalPrice = cart.items.reduce((total, item) => {
    return total + Number(item.RetailPrice) * item.Flag;
  }, 0);
  function onSubmitName(
    productName: z.infer<typeof searchNameProductFormSchema>
  ) {
    const res = data.filter((item: Product) =>
      item.Name.includes(productName.name)
    );
    setDataFilter(res);
  }
  function onSubmitBarcode(
    productBarcode: z.infer<typeof searchBarcodeProductFormSchema>
  ) {
    const res = data.filter((item: Product) =>
      item.Barcode.includes(productBarcode.barcode)
    );
    setDataFilter(res);
    if (res.length === 1) {
      cart.addItem(res[0]);
    }
  }

  return (
    <div className="relative flex flex-col gap-y-6">
      <div className="absolute top-5 left-5">
        <Link href="/customers">
          <Logo></Logo>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-5 mt-8">
        <Form {...formName}>
          <form onSubmit={formName.handleSubmit(onSubmitName)}>
            <motion.div
              className="flex items-center gap-5 w-[500px] border border-gray-200 rounded-lg py-2 px-4 "
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="flex-shrink-0 text-gray-500">
                <Search />
              </span>
              <Input
                type="text"
                className="w-full p-0 text-base bg-transparent border-none outline-none focus-visible:ring-transparent focus-visible:ring-offset-0"
                placeholder="Enter your product name..."
                onChange={(e) => onSubmitName({ name: e.target.value })}
              />
            </motion.div>
          </form>
        </Form>
        <Form {...formBarcode}>
          <form onSubmit={formBarcode.handleSubmit(onSubmitBarcode)}>
            <motion.div
              className="flex items-center gap-5 w-[500px] border border-gray-200 rounded-lg py-2 px-4 "
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="flex-shrink-0 text-gray-500">
                <ScanBarcode />
              </span>
              <FormField
                control={formBarcode.control}
                name="barcode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        className="w-full p-0 text-base bg-transparent border-none outline-none focus-visible:ring-transparent focus-visible:ring-offset-0"
                        placeholder="Enter your product name..."
                        onChange={(e) =>
                          onSubmitBarcode({ barcode: e.target.value })
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </motion.div>
          </form>
        </Form>
      </div>

      <motion.div
        className="grid grid-cols-4"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="flex flex-col col-span-3 px-4 gap-y-8 sm:px-6 lg:px-8"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ProductList data={dataFilter} />
        </motion.div>
        {/* start cart */}
        <motion.div
          className="flex flex-col gap-y-8"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
          <div className="px-4 py-6 rounded-lg bg-gray-50 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
            <ul className="flex flex-col gap-y-2">
              {cart.items.length !== 0 ? (
                cart.items.map((item: Product) => (
                  <CartItem key={item._id} data={item} />
                ))
              ) : (
                <p className="text-neutral-500">No items added to cart.</p>
              )}
            </ul>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between pt-4 border-gray-200">
                <div className="text-base font-medium text-gray-900">
                  Order total
                </div>
                <Currency value={totalPrice} />
              </div>
            </div>
            <Button
              onClick={() => router.push("/checkout")}
              className="w-full mt-6"
            >
              Checkout
            </Button>
          </div>
        </motion.div>
        {/* end cart */}
      </motion.div>
    </div>
  );
};

export default PointOfSalePage;
