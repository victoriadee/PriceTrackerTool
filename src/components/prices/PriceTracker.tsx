import React, { useState } from 'react';
import { Plus, DollarSign, Calendar, FileText } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../ui/Card';
import Button from '../ui/Button';
import { useAppContext } from '../../context/AppContext';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Badge from '../ui/Badge';

const PriceTracker: React.FC = () => {
  const { products, suppliers, priceEntries, addPriceEntry, deletePriceEntry } = useAppContext();
  const [isAddingPrice, setIsAddingPrice] = useState(false);
  const [filterProduct, setFilterProduct] = useState('');
  const [filterSupplier, setFilterSupplier] = useState('');
  
  const [formData, setFormData] = useState({
    productId: '',
    supplierId: '',
    price: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddPriceEntry = () => {
    if (formData.productId && formData.supplierId && formData.price) {
      addPriceEntry({
        ...formData,
        price: parseFloat(formData.price)
      });
      
      setFormData({
        productId: '',
        supplierId: '',
        price: '',
        date: new Date().toISOString().split('T')[0],
        notes: ''
      });
      
      setIsAddingPrice(false);
    }
  };
  
  const handleCancelAdd = () => {
    setIsAddingPrice(false);
    setFormData({
      productId: '',
      supplierId: '',
      price: '',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });
  };
  
  const filteredPriceEntries = priceEntries.filter(entry => {
    const matchesProduct = !filterProduct || entry.productId === filterProduct;
    const matchesSupplier = !filterSupplier || entry.supplierId === filterSupplier;
    
    return matchesProduct && matchesSupplier;
  });
  
  // Sort by date (newest first)
  const sortedPriceEntries = [...filteredPriceEntries].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  
  const getProductName = (id: string) => {
    const product = products.find(p => p.id === id);
    return product ? product.name : 'Unknown Product';
  };
  
  const getSupplierName = (id: string) => {
    const supplier = suppliers.find(s => s.id === id);
    return supplier ? supplier.name : 'Unknown Supplier';
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <Select
            options={[
              { value: '', label: 'All Products' },
              ...products.map(product => ({
                value: product.id,
                label: product.name
              }))
            ]}
            value={filterProduct}
            onChange={setFilterProduct}
            className="w-full sm:w-48 mb-0"
          />
          <Select
            options={[
              { value: '', label: 'All Suppliers' },
              ...suppliers.map(supplier => ({
                value: supplier.id,
                label: supplier.name
              }))
            ]}
            value={filterSupplier}
            onChange={setFilterSupplier}
            className="w-full sm:w-48 mb-0"
          />
        </div>
        <Button 
          onClick={() => setIsAddingPrice(true)}
          className="flex items-center"
        >
          <Plus size={18} className="mr-1" /> Add Price Update
        </Button>
      </div>
      
      {isAddingPrice && (
        <Card className="border border-blue-200 bg-blue-50">
          <CardHeader className="bg-blue-100">
            <h3 className="text-lg font-medium text-blue-800">Add Price Update</h3>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Product"
                options={products.map(product => ({
                  value: product.id,
                  label: product.name
                }))}
                value={formData.productId}
                onChange={handleSelectChange('productId')}
                required
              />
              <Select
                label="Supplier"
                options={suppliers.map(supplier => ({
                  value: supplier.id,
                  label: supplier.name
                }))}
                value={formData.supplierId}
                onChange={handleSelectChange('supplierId')}
                required
              />
              <Input
                label="Price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
              />
              <Input
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-800 focus:border-blue-800"
                  placeholder="Optional notes about this price update"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4 space-x-3">
              <Button variant="outline" onClick={handleCancelAdd}>
                Cancel
              </Button>
              <Button 
                onClick={handleAddPriceEntry}
                disabled={!formData.productId || !formData.supplierId || !formData.price}
              >
                Add Price Update
              </Button>
            </div>
          </CardBody>
        </Card>
      )}
      
      <Card>
        <CardHeader className="bg-gray-50">
          <h3 className="text-lg font-medium">Price History</h3>
        </CardHeader>
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Supplier
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notes
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedPriceEntries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {getProductName(entry.productId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getSupplierName(entry.supplierId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <DollarSign size={16} className="mr-1 text-green-600" />
                        {entry.price.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        {formatDate(entry.date)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {entry.notes ? (
                        <div className="flex items-start">
                          <FileText size={16} className="mr-1 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-2">{entry.notes}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => deletePriceEntry(entry.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
                {sortedPriceEntries.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-500">
                      No price entries found matching your filters.
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

export default PriceTracker;