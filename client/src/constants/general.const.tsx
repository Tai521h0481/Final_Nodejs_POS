import {
  IconHome,
  IconLogout,
  IconSetting,
  IconChart,
  IconUser,
  IconUsers,
} from "@/components/icons";
import { TSidebarLink } from "@/types/general.types";

export const sidebarLinks: TSidebarLink[] = [
  {
    title: "Customers",
    icon: <IconHome />,
    path: "/customers",
    role: ["employee", "admin"],
  },
  {
    title: "Dashboard",
    icon: <IconChart />,
    path: "/dashboard",
    role: ["admin", "employee"],
  },
  {
    title: "POS",
    icon: <IconHome />,
    path: "/point-of-sale",
    role: ["employee"],
  },
  {
    title: "Users",
    icon: <IconUsers />,
    path: "/users",
    role: ["admin"],
  },
  {
    title: "Products",
    icon: <IconChart />,
    path: "/products",
    role: ["employee", "admin"],
  },
  {
    title: "My Order",
    icon: <IconChart />,
    path: "/orders",
    role: ["employee"],
  },
  {
    title: "Profile",
    icon: <IconUser />,
    path: "/profile",
    role: ["employee", "admin"],
  },
  {
    title: "Settings",
    icon: <IconSetting />,
    path: "/settings",
    role: ["employee", "admin"],
  },
];
