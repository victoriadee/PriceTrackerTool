import React, { useState } from 'react';
import { ArrowDownCircle, BarChart2, DollarSign } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../ui/Card';
import Button from '../ui/Button';
import { useAppContext } from '../../context/AppContext';
import Select from '../ui/Select';
import Badge from '../ui/Badge';

const PriceComparison: React.FC = () => {
  const { products, suppliers, priceEntries, categories } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  
  // Filter products by category
  const filteredProducts = selectedCategory 
    ? products.filter(product => product.category === selectedCategory)
    : products;
  
  // Get the most recent price for each product-supplier combination
  const getLatestPrices = (productId: string) => {
    const supplierPrices: Record<string, { price: number, date: string }> = {};
    
    // Get all price entries for this product
    const productPrices = priceEntries.filter(entry => entry.productId === productId);
    
    // For each supplier, find the most recent price
    suppliers.forEach(supplier => {
      const supplierEntries = productPrices.filter(entry => entry.supplierId === supplier.id);
      
      if (supplierEntries.length > 0) {
        // Sort by date (newest first)
        const sortedEntries = [...supplierEntries].sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        
        // Get the most recent entry
        const latestEntry = sortedEntries[0];
        
        supplierPrices[supplier.id] = {
          price: latestEntry.price,
          date: latestEntry.date
        };
      }
    });
    
    return supplierPrices;
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // If a product is selected, get comparison data for just that product
  // Otherwise, get data for all filtered products
  const comparisonData = selectedProduct
    ? [{ 
        id: selectedProduct,
        name: products.find(p => p.id === selectedProduct)?.name || 'Unknown Product',
        prices: getLatestPrices(selectedProduct)
      }]
    : filteredProducts.map(product => ({
        id: product.id,
        name: product.name,
        prices: getLatestPrices(product.id)
      }));
  
  // Find the best (lowest) price for each product
  const getBestPrice = (prices: Record<string, { price: number, date: string }>) => {
    let bestSupplierId = '';
    let bestPrice = Infinity;
    
    Object.entries(prices).forEach(([supplierId, { price }]) => {
      if (price < bestPrice) {
        bestPrice = price;
        bestSupplierId = supplierId;
      }
    });
    
    return { bestSupplierId, bestPrice };
  };
  
  const getCategoryName = (id: string) => {
    const category = categories.find(c => c.id === id);
    return category ? category.name : 'Uncategorized';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Select
          options={[
            { value: '', label: 'All Categories' },
            ...categories.map(category => ({
              value: category.id,
              label: category.name
            }))
          ]}
          value={selectedCategory}
          onChange={setSelectedCategory}
          className="w-full sm:w-48 mb-0"
        />
        <Select
          options={[
            { value: '', label: 'All Products' },
            ...filteredProducts.map(product => ({
              value: product.id,
              label: product.name
            }))
          ]}
          value={selectedProduct}
          onChange={setSelectedProduct}
          className="w-full sm:w-64 mb-0"
        />
      </div>
      
      <Card>
        <CardHeader className="bg-blue-50 flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-lg font-medium text-blue-800 flex items-center">
            <BarChart2 className="mr-2" /> Price Comparison
          </h3>
          <Button 
            variant="secondary" 
            size="sm" 
            className="flex items-center"
          >
            <ArrowDownCircle size={16} className="mr-1" /> Export Data
          </Button>
        </CardHeader>
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  {suppliers.map(supplier => (
                    <th key={supplier.id} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {supplier.name}
                    </th>
                  ))}
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Best Deal
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {comparisonData.map((item) => {
                  const { bestSupplierId, bestPrice } = getBestPrice(item.prices);
                  const product = products.find(p => p.id === item.id);
                  const hasAnyPrice = Object.keys(item.prices).length > 0;
                  
                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        {product && (
                          <div className="text-xs text-gray-500 mt-1">
                            <Badge variant="primary" className="mr-1">
                              {getCategoryName(product.category)}
                            </Badge>
                          </div>
                        )}
                      </td>
                      
                      {suppliers.map(supplier => {
                        const priceData = item.prices[supplier.id];
                        const isBestPrice = bestSupplierId === supplier.id;
                        
                        return (
                          <td key={supplier.id} className="px-6 py-4 whitespace-nowrap">
                            {priceData ? (
                              <div className={`text-sm font-medium ${isBestPrice ? 'text-green-600' : 'text-gray-900'}`}>
                                <div className="flex items-center">
                                  {isBestPrice && <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded mr-1">Best</span>}
                                  <DollarSign size={16} className="mr-0.5" />
                                  {priceData.price.toFixed(2)}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  Updated: {formatDate(priceData.date)}
                                </div>
                              </div>
                            ) : (
                              <span className="text-sm text-gray-400">—</span>
                            )}
                          </td>
                        );
                      })}
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        {hasAnyPrice ? (
                          <div className="text-sm">
                            <div className="font-medium text-green-600">
                              <div className="flex items-center">
                                <DollarSign size={16} className="mr-0.5" />
                                {bestPrice.toFixed(2)}
                              </div>
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                              {suppliers.find(s => s.id === bestSupplierId)?.name}
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">No data</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
                
                {comparisonData.length === 0 && (
                  <tr>
                    <td colSpan={suppliers.length + 2} className="px-6 py-10 text-center text-sm text-gray-500">
                      No products found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default PriceComparison;