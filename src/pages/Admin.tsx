import React, { useState, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { Plus, Upload, Image as ImageIcon } from 'lucide-react';
import { uploadImage } from '../utils/firebase';
import toast from 'react-hot-toast';

export function Admin() {
  const { products, categories, addProduct, deleteProduct, addCategory, addSubCategory } = useStore();
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newSubCategory, setNewSubCategory] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    categoryId: '',
    subCategoryId: '',
  });

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.trim()) {
      addCategory(newCategory);
      setNewCategory('');
    }
  };

  const handleAddSubCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategory && newSubCategory.trim()) {
      addSubCategory(selectedCategory, newSubCategory);
      setNewSubCategory('');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsUploading(true);
        const imageUrl = await uploadImage(file);
        setNewProduct({ ...newProduct, image: imageUrl });
        toast.success('Image uploaded successfully');
      } catch (error) {
        toast.error('Failed to upload image');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.title && newProduct.price && newProduct.categoryId) {
      addProduct({
        ...newProduct,
        price: parseFloat(newProduct.price),
      });
      setNewProduct({
        title: '',
        description: '',
        price: '',
        image: '',
        categoryId: '',
        subCategoryId: '',
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const selectedCategoryData = categories.find((c) => c.id === newProduct.categoryId);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Category Form */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <h2 className="text-xl font-semibold">Add Category</h2>
          <form onSubmit={handleAddCategory} className="space-y-4">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category name"
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5" />
              <span>Add Category</span>
            </button>
          </form>
        </div>

        {/* Subcategory Form */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <h2 className="text-xl font-semibold">Add Subcategory</h2>
          <form onSubmit={handleAddSubCategory} className="space-y-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={newSubCategory}
              onChange={(e) => setNewSubCategory(e.target.value)}
              placeholder="Subcategory name"
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5" />
              <span>Add Subcategory</span>
            </button>
          </form>
        </div>

        {/* Product Form */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <h2 className="text-xl font-semibold">Add Product</h2>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <input
              type="text"
              value={newProduct.title}
              onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
              placeholder="Product title"
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              placeholder="Product description"
              className="w-full p-2 border rounded"
              rows={3}
              required
            />
            <input
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              placeholder="Price"
              className="w-full p-2 border rounded"
              min="0"
              step="0.01"
              required
            />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Product Image
                </label>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-2 text-sm text-indigo-600 hover:text-indigo-500"
                >
                  <ImageIcon className="h-4 w-4" />
                  <span>Choose file</span>
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {newProduct.image && (
                <img
                  src={newProduct.image}
                  alt="Preview"
                  className="h-32 w-full object-cover rounded"
                />
              )}
            </div>
            <select
              value={newProduct.categoryId}
              onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value, subCategoryId: '' })}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {selectedCategoryData && (
              <select
                value={newProduct.subCategoryId}
                onChange={(e) => setNewProduct({ ...newProduct, subCategoryId: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Subcategory (Optional)</option>
                {selectedCategoryData.subCategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            )}
            <button
              type="submit"
              disabled={isUploading}
              className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full justify-center disabled:opacity-50"
            >
              <Upload className="h-5 w-5" />
              <span>{isUploading ? 'Uploading...' : 'Add Product'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {categories.find((c) => c.id === product.categoryId)?.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${product.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}