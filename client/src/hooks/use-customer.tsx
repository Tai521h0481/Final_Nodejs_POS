import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import toast from "react-hot-toast";
import { Customer } from "@/types/general.types";

interface CustomerSave {
  customer: Customer;
  addCustomer: (data: Customer | null) => void;
  removeAll: () => void;
}

const useCustomer = create(
  persist<CustomerSave>(
    (set, get) => ({
      customer: {} as Customer,
      addCustomer: (data: Customer | null) => {
        if (!data) return;
        set({ customer: data });
        toast.success("Save customer successfully");
      },

      removeAll: () => set({ customer: {} as Customer }),
    }),
    {
      name: "customer-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCustomer;
