export type TSidebarLink = {
  title: string;
  icon: JSX.Element;
  path: string;
  role?: string[];
};

export type User = {
  Email: string;
  Fullname: string;
  IsActive: boolean;
  IsLocked: boolean;
  IsOnline: boolean;
  Orders: [];
  FirstLogin?: boolean;
  Profile_Picture: string;
  Role: string;
  id: string;
};

export type Product = {
  Barcode: string;
  Category: string;
  ImportPrice?: number;
  Name: string;
  Quantity: number;
  RetailPrice: number;
  OrderDetails?: [];
  Image: Image[];
  _id: string;
  Flag: number;
};

export type Image = {
  _id: string;
  url: string;
  productId: string;
};

export type Customer = {
  _id: string;
  Fullname: string;
  PhoneNumber: string;
  Address: string;
};
