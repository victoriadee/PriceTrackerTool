import React, { useState } from 'react';
import { Edit, Phone, Mail, MapPin, Trash2, Plus } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../ui/Card';
import Button from '../ui/Button';
import { useAppContext } from '../../context/AppContext';
import Input from '../ui/Input';

const SuppliersList: React.FC = () => {
  const { suppliers, addSupplier, updateSupplier, deleteSupplier } = useAppContext();
  const [isAddingSupplier, setIsAddingSupplier] = useState(false);
  const [editingSupplierId, setEditingSupplierId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddSupplier = () => {
    addSupplier(formData);
    setFormData({
      name: '',
      contact: '',
      phone: '',
      email: '',
      address: '',
      notes: ''
    });
    setIsAddingSupplier(false);
  };
  
  const handleEditSupplier = (supplier: any) => {
    setFormData(supplier);
    setEditingSupplierId(supplier.id);
  };
  
  const handleUpdateSupplier = () => {
    if (editingSupplierId) {
      updateSupplier({ ...formData, id: editingSupplierId });
      setEditingSupplierId(null);
      setFormData({
        name: '',
        contact: '',
        phone: '',
        email: '',
        address: '',
        notes: ''
      });
    }
  };
  
  const handleCancelEdit = () => {
    setEditingSupplierId(null);
    setIsAddingSupplier(false);
    setFormData({
      name: '',
      contact: '',
      phone: '',
      email: '',
      address: '',
      notes: ''
    });
  };
  
  const filteredSuppliers = suppliers.filter(supplier => 
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search suppliers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64"
          />
        </div>
        <Button 
          onClick={() => setIsAddingSupplier(true)}
          className="flex items-center"
        >
          <Plus size={18} className="mr-1" /> Add New Supplier
        </Button>
      </div>
      
      {isAddingSupplier && (
        <Card className="border border-blue-200 bg-blue-50">
          <CardHeader className="bg-blue-100">
            <h3 className="text-lg font-medium text-blue-800">Add New Supplier</h3>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Supplier Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                label="Contact Person"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
              />
              <Input
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <div className="md:col-span-2">
                <Input
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
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
              <Button onClick={handleAddSupplier}>
                Add Supplier
              </Button>
            </div>
          </CardBody>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.map(supplier => (
          <Card key={supplier.id} className={editingSupplierId === supplier.id ? 'border-2 border-blue-400' : ''}>
            {editingSupplierId === supplier.id ? (
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
                    <Input
                      label="Contact Person"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                    />
                    <Input
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <Input
                      label="Address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Notes
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-800 focus:border-blue-800"
                      />
                    </div>
                    <div className="flex justify-end space-x-3 pt-2">
                      <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                      <Button size="sm" onClick={handleUpdateSupplier}>
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </>
            ) : (
              <>
                <CardHeader className="flex justify-between items-start">
                  <h3 className="text-lg font-medium">{supplier.name}</h3>
                  <div className="flex space-x-1">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="p-1"
                      onClick={() => handleEditSupplier(supplier)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      className="p-1"
                      onClick={() => deleteSupplier(supplier.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="space-y-3">
                    <p className="text-sm">{supplier.contact}</p>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone size={16} className="mr-2" />
                      <span>{supplier.phone}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail size={16} className="mr-2" />
                      <span>{supplier.email}</span>
                    </div>
                    <div className="flex items-start text-sm text-gray-600">
                      <MapPin size={16} className="mr-2 mt-1 flex-shrink-0" />
                      <span>{supplier.address}</span>
                    </div>
                    {supplier.notes && (
                      <div className="mt-2 pt-2 border-t text-sm text-gray-600">
                        <p className="font-medium mb-1">Notes:</p>
                        <p>{supplier.notes}</p>
                      </div>
                    )}
                  </div>
                </CardBody>
              </>
            )}
          </Card>
        ))}
        
        {filteredSuppliers.length === 0 && !isAddingSupplier && (
          <div className="col-span-full">
            <Card>
              <CardBody className="text-center py-8">
                <p className="text-gray-500 mb-4">No suppliers found matching your search.</p>
                <Button onClick={() => setIsAddingSupplier(true)}>
                  Add Your First Supplier
                </Button>
              </CardBody>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuppliersList;