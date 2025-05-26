import React, { useState } from 'react';
import { Edit, Trash2, Plus, Search, Tag } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../ui/Card';
import Button from '../ui/Button';
import { useAppContext } from '../../context/AppContext';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Badge from '../ui/Badge';

const ProductsList: React.FC = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useAppContext();
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    sku: '',
    description: '',
    unit: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddProduct = () => {
    addProduct(formData);
    setFormData({
      name: '',
      category: '',
      sku: '',
      description: '',
      unit: ''
    });
    setIsAddingProduct(false);
  };
  
  const handleEditProduct = (product: any) => {
    setFormData(product);
    setEditingProductId(product.id);
  };
  
  const handleUpdateProduct = () => {
    if (editingProductId) {
      updateProduct({ ...formData, id: editingProductId });
      setEditingProductId(null);
      setFormData({
        name: '',
        category: '',
        sku: '',
        description: '',
        unit: ''
      });
    }
  };
  
  const handleCancelEdit = () => {
    setEditingProductId(null);
    setIsAddingProduct(false);
    setFormData({
      name: '',
      category: '',
      sku: '',
      description: '',
      unit: ''
    });
  };
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
                         
    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryName = (id: string) => {
    const category = categories.find(c => c.id === id);
    return category ? category.name : 'Uncategorized';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-8"
            />
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <Select
            options={[
              { value: '', label: 'All Categories' },
              ...categories.map(category => ({
                value: category.id,
                label: category.name
              }))
            ]}
            value={categoryFilter}
            onChange={setCategoryFilter}
            className="w-full sm:w-48 mb-0"
          />
        </div>
        <Button 
          onClick={() => setIsAddingProduct(true)}
          className="flex items-center"
        >
          <Plus size={18} className="mr-1" /> Add New Product
        </Button>
      </div>
      
      {isAddingProduct && (
        <Card className="border border-blue-200 bg-blue-50">
          <CardHeader className="bg-blue-100">
            <h3 className="text-lg font-medium text-blue-800">Add New Product</h3>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Select
                label="Category"
                options={categories.map(category => ({
                  value: category.id,
                  label: category.name
                }))}
                value={formData.category}
                onChange={handleSelectChange('category')}
              />
              <Input
                label="SKU/Product Code"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
              />
              <Input
                label="Unit (e.g., piece, kg, box)"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
              />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-800 focus:border-blue-800"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4 space-x-3">
              <Button variant="outline" onClick={handleCancelEdit}>
                Cancel
              </Button>
              <Button onClick={handleAddProduct}>
                Add Product
              </Button>
            </div>
          </CardBody>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <Card key={product.id} className={editingProductId === product.id ? 'border-2 border-blue-400' : ''}>
            {editingProductId === product.id ? (
              <>
                <CardHeader className="bg-blue-50">
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="font-medium"
                    required
                  />
                </CardHeader>
                <CardBody>
                  <div className="space-y-3">
                    <Select
                      label="Category"
                      options={categories.map(category => ({
                        value: category.id,
                        label: category.name
                      }))}
                      value={formData.category}
                      onChange={handleSelectChange('category')}
                    />
                    <Input
                      label="SKU/Product Code"
                      name="sku"
                      value={formData.sku}
                      onChange={handleChange}
                    />
                    <Input
                      label="Unit"
                      name="unit"
                      value={formData.unit}
                      onChange={handleChange}
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-800 focus:border-blue-800"
                      />
                    </div>
                    <div className="flex justify-end space-x-3 pt-2">
                      <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                      <Button size="sm" onClick={handleUpdateProduct}>
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </>
            ) : (
              <>
                <CardHeader className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium">{product.name}</h3>
                    <div className="flex items-center mt-1">
                      <Badge variant="primary" className="mr-2">
                        {getCategoryName(product.category)}
                      </Badge>
                      <span className="text-xs text-gray-500">{product.unit}</span>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="p-1"
                      onClick={() => handleEditProduct(product)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      className="p-1"
                      onClick={() => deleteProduct(product.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Tag size={16} className="mr-2" />
                      <span>{product.sku}</span>
                    </div>
                    {product.description && (
                      <p className="text-sm text-gray-600">{product.description}</p>
                    )}
                  </div>
                </CardBody>
              </>
            )}
          </Card>
        ))}
        
        {filteredProducts.length === 0 && !isAddingProduct && (
          <div className="col-span-full">
            <Card>
              <CardBody className="text-center py-8">
                <p className="text-gray-500 mb-4">No products found matching your search.</p>
                <Button onClick={() => setIsAddingProduct(true)}>
                  Add Your First Product
                </Button>
              </CardBody>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;