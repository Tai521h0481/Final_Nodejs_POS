"use client";

import { User } from "@/types/general.types";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const OrderDetailPage = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [user, setUser] = useState<User>();
  const token = getCookie("token");
  useEffect(() => {
    const user = getCookie("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);
  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await axios.get(`/api/orders/employee/${user?.id}`, {
          baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.orders);
        console.log(
          "🚀 ~ fetchOrder ~ response.data.orders:",
          response.data.orders
        );
      } catch (error) {
        console.log(error);
      }
    }
    if (user) {
      fetchOrder();
    }
  }, [token, user]);
  if (!data) {
    return null;
  }
  return (
    <div className="flex flex-wrap items-start justify-between gap-5">
      {data
        .filter((order: any) => order._id === params.orderId)
        .map((order: any) => (
          <div
            key={order._id}
            className="bg-white rounded-lg shadow-lg px-8 py-10 w-[600px] mx-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="text-2xl font-bold text-gray-700">
                  POS Services
                </div>
              </div>
              <div className="text-gray-700">
                <div className="mb-2 text-xl font-bold">INVOICE</div>
                <div className="text-sm">
                  Date: {order.createdAt.split("T")[0]}
                </div>
                <div className="text-sm">
                  Invoice #: {order._id.slice(0, 7)}...
                </div>
              </div>
            </div>
            <div className="pb-8 mb-8 border-b-2 border-gray-300">
              <h2 className="mb-2 text-2xl font-bold">Bill From:</h2>
              <div className="mb-4 text-gray-700">{order?.EmployeeName}</div>
              <h2 className="mb-2 text-2xl font-bold">Bill To:</h2>
              <div className="mb-2 text-gray-700">{order?.CustomerName}</div>
              <div className="mb-2 text-gray-700">
                Address: {order.Customer.Address}
              </div>
              <div className="text-gray-700">
                Phone: {order.CustomerPhoneNumber}
              </div>
            </div>
            <table className="w-full mb-8 text-left">
              <thead>
                <tr>
                  <th className="py-2 font-bold text-gray-700 uppercase">
                    Description
                  </th>
                  <th className="py-2 font-bold text-gray-700 uppercase">
                    Quantity
                  </th>
                  <th className="py-2 font-bold text-gray-700 uppercase">
                    Price
                  </th>
                  <th className="py-2 font-bold text-gray-700 uppercase">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.OrderDetails.length > 0 &&
                  order.OrderDetails.map((item: any) => (
                    <tr key={item._id}>
                      <td className="py-4 text-gray-700">
                        Product {item.Product?.Name}
                      </td>
                      <td className="py-4 text-gray-700">{item?.Quantity}</td>
                      <td className="py-4 text-gray-700">
                        ${item.Product?.RetailPrice}
                      </td>
                      <td className="py-4 text-gray-700">
                        {item.Product?.RetailPrice * item?.Quantity}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="flex justify-end mb-8">
              <div className="mr-2 text-gray-700">Total:</div>
              <div className="text-xl font-bold text-gray-700">
                ${order.TotalAmount}
              </div>
            </div>
            <div className="flex justify-end mb-8">
              <div className="mr-2 text-gray-700">Cus given:</div>
              <div className="text-xl font-bold text-gray-700">
                ${order.AmountPaidByCustomer}
              </div>
            </div>
            <div className="flex justify-end mb-8 ">
              <div className="mr-2 text-gray-700">Change:</div>
              <div className="text-xl font-bold text-gray-700">
                ${order.ChangeReturnedToCustomer}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default OrderDetailPage;
