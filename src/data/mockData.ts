import { Supplier, Product, PriceEntry, Category, Notification } from '../types';

export const suppliers: Supplier[] = [
  {
    id: '1',
    name: 'GlobalMart Supplies',
    contact: 'John Smith',
    phone: '(555) 123-4567',
    email: 'john@globalmart.com',
    address: '123 Supply Chain Rd, Commerce City',
    notes: 'Best for bulk orders'
  },
  {
    id: '2',
    name: 'City Wholesalers',
    contact: 'Maria Garcia',
    phone: '(555) 987-6543',
    email: 'maria@citywholesalers.com',
    address: '456 Warehouse Blvd, Metro City',
    notes: 'Good prices on electronics'
  },
  {
    id: '3',
    name: 'Valley Distributors',
    contact: 'Robert Chen',
    phone: '(555) 234-5678',
    email: 'robert@valleydist.com',
    address: '789 Valley Drive, Riverside',
    notes: 'Reliable delivery schedule'
  }
];

export const categories: Category[] = [
  { id: '1', name: 'Electronics' },
  { id: '2', name: 'Groceries' },
  { id: '3', name: 'Clothing' },
  { id: '4', name: 'Home Goods' },
  { id: '5', name: 'Stationery' }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Smartphone Charger',
    category: '1',
    sku: 'ELEC-001',
    description: 'Universal USB-C smartphone charger',
    unit: 'piece'
  },
  {
    id: '2',
    name: 'Bluetooth Speaker',
    category: '1',
    sku: 'ELEC-002',
    description: 'Portable wireless speaker',
    unit: 'piece'
  },
  {
    id: '3',
    name: 'Rice (25kg)',
    category: '2',
    sku: 'GROC-001',
    description: 'Premium basmati rice',
    unit: 'bag'
  },
  {
    id: '4',
    name: 'Cooking Oil (5L)',
    category: '2',
    sku: 'GROC-002',
    description: 'Vegetable cooking oil',
    unit: 'bottle'
  },
  {
    id: '5',
    name: 'T-Shirt (M)',
    category: '3',
    sku: 'CLTH-001',
    description: 'Cotton round neck t-shirt',
    unit: 'piece'
  },
  {
    id: '6',
    name: 'Kitchen Towels',
    category: '4',
    sku: 'HOME-001',
    description: 'Set of 3 kitchen towels',
    unit: 'pack'
  },
  {
    id: '7',
    name: 'Notebook',
    category: '5',
    sku: 'STAT-001',
    description: 'A5 lined notebook, 200 pages',
    unit: 'piece'
  }
];

export const priceEntries: PriceEntry[] = [
  {
    id: '1',
    productId: '1',
    supplierId: '1',
    price: 5.99,
    date: '2025-05-01',
    notes: ''
  },
  {
    id: '2',
    productId: '1',
    supplierId: '2',
    price: 6.49,
    date: '2025-05-01',
    notes: ''
  },
  {
    id: '3',
    productId: '1',
    supplierId: '3',
    price: 5.89,
    date: '2025-05-01',
    notes: ''
  },
  {
    id: '4',
    productId: '1',
    supplierId: '1',
    price: 5.79,
    date: '2025-04-15',
    notes: 'Price drop'
  },
  {
    id: '5',
    productId: '2',
    supplierId: '1',
    price: 24.99,
    date: '2025-05-01',
    notes: ''
  },
  {
    id: '6',
    productId: '2',
    supplierId: '2',
    price: 22.99,
    date: '2025-05-01',
    notes: ''
  },
  {
    id: '7',
    productId: '3',
    supplierId: '2',
    price: 35.99,
    date: '2025-05-01',
    notes: ''
  },
  {
    id: '8',
    productId: '3',
    supplierId: '3',
    price: 33.49,
    date: '2025-05-01',
    notes: ''
  },
  {
    id: '9',
    productId: '4',
    supplierId: '2',
    price: 12.99,
    date: '2025-05-01',
    notes: ''
  },
  {
    id: '10',
    productId: '4',
    supplierId: '3',
    price: 11.99,
    date: '2025-05-01',
    notes: ''
  },
  {
    id: '11',
    productId: '5',
    supplierId: '3',
    price: 7.49,
    date: '2025-05-01',
    notes: ''
  },
  {
    id: '12',
    productId: '6',
    supplierId: '1',
    price: 8.99,
    date: '2025-05-01',
    notes: ''
  },
  {
    id: '13',
    productId: '7',
    supplierId: '1',
    price: 3.99,
    date: '2025-05-01',
    notes: ''
  },
  {
    id: '14',
    productId: '7',
    supplierId: '2',
    price: 3.79,
    date: '2025-05-01',
    notes: ''
  }
];

export const notifications: Notification[] = [
  {
    id: '1',
    message: 'Price drop alert: Smartphone Charger from GlobalMart',
    type: 'info',
    date: '2025-05-01T09:15:00',
    read: false
  },
  {
    id: '2',
    message: 'New supplier added: Valley Distributors',
    type: 'success',
    date: '2025-04-28T14:30:00',
    read: true
  },
  {
    id: '3',
    message: 'Price increase: Rice (25kg) from City Wholesalers',
    type: 'warning',
    date: '2025-04-25T11:45:00',
    read: true
  }
];

// Helper function to get product name by ID
export const getProductNameById = (id: string): string => {
  const product = products.find(p => p.id === id);
  return product ? product.name : 'Unknown Product';
};

// Helper function to get supplier name by ID
export const getSupplierNameById = (id: string): string => {
  const supplier = suppliers.find(s => s.id === id);
  return supplier ? supplier.name : 'Unknown Supplier';
};

// Helper function to get category name by ID
export const getCategoryNameById = (id: string): string => {
  const category = categories.find(c => c.id === id);
  return category ? category.name : 'Unknown Category';
};