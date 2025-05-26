import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import NavBar from './components/layout/NavBar';
import DashboardOverview from './components/dashboard/DashboardOverview';
import SuppliersList from './components/suppliers/SuppliersList';
import ProductsList from './components/products/ProductsList';
import PriceTracker from './components/prices/PriceTracker';
import PriceComparison from './components/compare/PriceComparison';

function App() {
  const [currentNav, setCurrentNav] = useState('dashboard');

  const renderContent = () => {
    switch (currentNav) {
      case 'dashboard':
        return <DashboardOverview onNavChange={setCurrentNav} />;
      case 'suppliers':
        return <SuppliersList />;
      case 'products':
        return <ProductsList />;
      case 'prices':
        return <PriceTracker />;
      case 'compare':
        return <PriceComparison />;
      default:
        return <DashboardOverview onNavChange={setCurrentNav} />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <NavBar onNavChange={setCurrentNav} currentNav={currentNav} />
        
        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {currentNav === 'dashboard' && 'Dashboard'}
              {currentNav === 'suppliers' && 'Supplier Management'}
              {currentNav === 'products' && 'Product Catalog'}
              {currentNav === 'prices' && 'Price Tracking'}
              {currentNav === 'compare' && 'Price Comparison'}
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              {currentNav === 'dashboard' && 'Overview of your price tracking data'}
              {currentNav === 'suppliers' && 'Manage your suppliers and their contact information'}
              {currentNav === 'products' && 'Manage your product catalog and categories'}
              {currentNav === 'prices' && 'Track price changes over time'}
              {currentNav === 'compare' && 'Compare prices across different suppliers'}
            </p>
          </div>
          
          {renderContent()}
        </main>
        
        <footer className="bg-white border-t border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} PriceTracker for Retailers. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </AppProvider>
  );
}

export default App;