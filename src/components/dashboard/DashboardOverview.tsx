import React from 'react';
import { BarChart2, DollarSign, ShoppingBag, TrendingDown, Users } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../ui/Card';
import { useAppContext } from '../../context/AppContext';
import Button from '../ui/Button';

interface DashboardOverviewProps {
  onNavChange?: (nav: string) => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavChange }) => {
  const { suppliers, products, priceEntries } = useAppContext();

  // Calculate price changes
  const priceChangeMap = new Map<string, { product: string, oldPrice: number, newPrice: number, supplier: string, change: number }>();
  
  priceEntries.forEach(entry => {
    const key = `${entry.productId}-${entry.supplierId}`;
    if (!priceChangeMap.has(key)) {
      priceChangeMap.set(key, {
        product: entry.productId,
        oldPrice: entry.price,
        newPrice: entry.price,
        supplier: entry.supplierId,
        change: 0
      });
    } else {
      const existing = priceChangeMap.get(key)!;
      const currentDate = new Date(entry.date);
      const existingDate = new Date(entry.date);
      
      if (currentDate > existingDate) {
        const change = ((entry.price - existing.oldPrice) / existing.oldPrice) * 100;
        priceChangeMap.set(key, {
          ...existing,
          newPrice: entry.price,
          change
        });
      }
    }
  });
  
  const priceChanges = Array.from(priceChangeMap.values()).filter(change => change.change !== 0);
  
  // Find products with significant price drops
  const priceDrop = priceChanges
    .filter(change => change.change < 0)
    .sort((a, b) => a.change - b.change)
    .slice(0, 5);
    
  // Get today's date in ISO format (YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0];
  
  // Count today's price updates
  const todayUpdates = priceEntries.filter(entry => entry.date === today).length;

  // Handle quick action clicks
  const handleQuickAction = (action: string) => {
    if (onNavChange) {
      switch (action) {
        case 'add-product':
          onNavChange('products');
          break;
        case 'add-supplier':
          onNavChange('suppliers');
          break;
        case 'record-price':
          onNavChange('prices');
          break;
        case 'compare-prices':
          onNavChange('compare');
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardBody className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-800 mr-4">
              <ShoppingBag size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-2xl font-semibold">{products.length}</p>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-800 mr-4">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Suppliers</p>
              <p className="text-2xl font-semibold">{suppliers.length}</p>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-800 mr-4">
              <BarChart2 size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Price Entries</p>
              <p className="text-2xl font-semibold">{priceEntries.length}</p>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-800 mr-4">
              <DollarSign size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Today's Updates</p>
              <p className="text-2xl font-semibold">{todayUpdates}</p>
            </div>
          </CardBody>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="bg-blue-50">
            <h3 className="text-lg font-medium text-blue-800 flex items-center">
              <TrendingDown className="mr-2" /> Price Drop Opportunities
            </h3>
          </CardHeader>
          <CardBody>
            {priceDrop.length > 0 ? (
              <div className="space-y-4">
                {priceDrop.map((item, index) => {
                  const product = products.find(p => p.id === item.product);
                  const supplier = suppliers.find(s => s.id === item.supplier);
                  
                  return (
                    <div key={index} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">{product?.name || 'Unknown Product'}</p>
                        <p className="text-sm text-gray-600">{supplier?.name || 'Unknown Supplier'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-600 font-medium">
                          ${item.newPrice.toFixed(2)} 
                          <span className="ml-1 text-sm">
                            ({item.change.toFixed(1)}%)
                          </span>
                        </p>
                        <p className="text-sm text-gray-500 line-through">${item.oldPrice.toFixed(2)}</p>
                      </div>
                    </div>
                  );
                })}
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="w-full mt-2"
                  onClick={() => handleQuickAction('compare-prices')}
                >
                  View All Price Changes
                </Button>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No recent price drops detected</p>
            )}
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader className="bg-blue-50">
            <h3 className="text-lg font-medium text-blue-800">Quick Actions</h3>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button 
                className="flex justify-center items-center"
                onClick={() => handleQuickAction('add-product')}
              >
                <ShoppingBag className="mr-2" size={18} /> Add Product
              </Button>
              <Button 
                variant="secondary" 
                className="flex justify-center items-center"
                onClick={() => handleQuickAction('add-supplier')}
              >
                <Users className="mr-2" size={18} /> Add Supplier
              </Button>
              <Button 
                variant="outline" 
                className="flex justify-center items-center"
                onClick={() => handleQuickAction('record-price')}
              >
                <DollarSign className="mr-2" size={18} /> Record Price
              </Button>
              <Button 
                variant="outline" 
                className="flex justify-center items-center"
                onClick={() => handleQuickAction('compare-prices')}
              >
                <BarChart2 className="mr-2" size={18} /> Compare Prices
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;