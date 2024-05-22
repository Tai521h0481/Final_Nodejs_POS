"use client";

import React, { useEffect, useState } from "react";
import ProductForm from "./product-form";
import { getCookie } from "cookies-next";
import axios from "axios";
import { Product } from "@/types/general.types";

const ProductPage = ({ params }: { params: { productId: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  useEffect(() => {
    const token = getCookie("token");
    async function fetchProduct() {
      try {
        const response = await axios.get(`/api/products/${params.productId}`, {
          baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct();
  }, [params.productId]);
  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        {product && <ProductForm initialData={product}></ProductForm>}
        {!product && <ProductForm initialData={product}></ProductForm>}
      </div>
    </div>
  );
};

export default ProductPage;
