export interface Supplier {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  sku: string;
  description: string;
  unit: string;
}

export interface PriceEntry {
  id: string;
  productId: string;
  supplierId: string;
  price: number;
  date: string;
  notes: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  date: string;
  read: boolean;
}