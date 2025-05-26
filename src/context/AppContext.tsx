import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  Supplier, 
  Product, 
  PriceEntry, 
  Category, 
  Notification 
} from '../types';
import { 
  suppliers as initialSuppliers, 
  products as initialProducts,
  priceEntries as initialPriceEntries,
  categories as initialCategories,
  notifications as initialNotifications
} from '../data/mockData';

interface AppContextType {
  suppliers: Supplier[];
  products: Product[];
  priceEntries: PriceEntry[];
  categories: Category[];
  notifications: Notification[];
  addSupplier: (supplier: Omit<Supplier, 'id'>) => void;
  updateSupplier: (supplier: Supplier) => void;
  deleteSupplier: (id: string) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addPriceEntry: (entry: Omit<PriceEntry, 'id'>) => void;
  updatePriceEntry: (entry: PriceEntry) => void;
  deletePriceEntry: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [priceEntries, setPriceEntries] = useState<PriceEntry[]>(initialPriceEntries);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const addSupplier = (supplier: Omit<Supplier, 'id'>) => {
    const newSupplier = {
      ...supplier,
      id: Date.now().toString(),
    };
    setSuppliers([...suppliers, newSupplier]);
  };

  const updateSupplier = (supplier: Supplier) => {
    setSuppliers(suppliers.map(s => s.id === supplier.id ? supplier : s));
  };

  const deleteSupplier = (id: string) => {
    setSuppliers(suppliers.filter(s => s.id !== id));
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (product: Product) => {
    setProducts(products.map(p => p.id === product.id ? product : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addPriceEntry = (entry: Omit<PriceEntry, 'id'>) => {
    const newEntry = {
      ...entry,
      id: Date.now().toString(),
    };
    setPriceEntries([...priceEntries, newEntry]);
  };

  const updatePriceEntry = (entry: PriceEntry) => {
    setPriceEntries(priceEntries.map(e => e.id === entry.id ? entry : e));
  };

  const deletePriceEntry = (id: string) => {
    setPriceEntries(priceEntries.filter(e => e.id !== id));
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory = {
      ...category,
      id: Date.now().toString(),
    };
    setCategories([...categories, newCategory]);
  };

  const updateCategory = (category: Category) => {
    setCategories(categories.map(c => c.id === category.id ? category : c));
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <AppContext.Provider
      value={{
        suppliers,
        products,
        priceEntries,
        categories,
        notifications,
        addSupplier,
        updateSupplier,
        deleteSupplier,
        addProduct,
        updateProduct,
        deleteProduct,
        addPriceEntry,
        updatePriceEntry,
        deletePriceEntry,
        addCategory,
        updateCategory,
        deleteCategory,
        markNotificationAsRead,
        clearNotifications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};