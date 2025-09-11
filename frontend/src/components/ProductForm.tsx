import React, { useState, useEffect } from 'react';
import { Product, ProductFormData } from '../types/Product';

interface ProductFormProps {
  onSubmit: (productData: ProductFormData) => void;
  editingProduct: Product | null;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, editingProduct, onCancel }) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });
  const [errors, setErrors] = useState<Partial<ProductFormData>>({});
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultImage = "https://e7.pngegg.com/pngimages/19/751/png-clipart-item-lot-online-shopping-will-be-networking-online-shopping-infographic-computer-network-thumbnail.png";
  const categories = ['Electronics', 'Clothing', 'Home', 'Sports', 'Books', 'Other'];

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        price: editingProduct.price.toString(),
        description: editingProduct.description,
        category: editingProduct.category,
        image: editingProduct.image
      });
      
      if (!categories.includes(editingProduct.category)) {
        setIsCustomCategory(true);
      }
    } else {
      setFormData({
        name: '',
        price: '',
        description: '',
        category: '',
        image: ''
      });
      setIsCustomCategory(false);
    }
    setErrors({});
  }, [editingProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof ProductFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCategorySelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'custom') {
      setIsCustomCategory(true);
      setFormData(prev => ({ ...prev, category: '' }));
    } else {
      setIsCustomCategory(false);
      setFormData(prev => ({ ...prev, category: value }));
    }
  };

  const handleUseDefaultImage = () => {
    setFormData(prev => ({
      ...prev,
      image: defaultImage
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ProductFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!formData.price || isNaN(Number(formData.price)) || parseFloat(formData.price) < 0) {
      newErrors.price = 'Valid price is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const submitData: ProductFormData = {
          ...formData,
          image: formData.image.trim() === '' ? defaultImage : formData.image.trim()
        };
        
        await onSubmit(submitData);
        
        if (!editingProduct) {
          setFormData({
            name: '',
            price: '',
            description: '',
            category: '',
            image: ''
          });
          setIsCustomCategory(false);
        }
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="product-form">
      <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
      
      {editingProduct && (
        <div className="edit-notice">
          <p>⚠️ You can edit the price, description, and image of existing products.</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
            placeholder="Enter product name"
            disabled={!!editingProduct}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="price">Price (₹) *</label>
          <div className="price-input">
            <input
              type="number"
              id="price"
              name="price"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleChange}
              className={errors.price ? 'error' : ''}
              placeholder="0.00"
            />
          </div>
          {errors.price && <span className="error-text">{errors.price}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Category *</label>
          {!isCustomCategory ? (
            <>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleCategorySelectChange}
                className={errors.category ? 'error' : ''}
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
                <option value="custom">+ Add Custom Category</option>
              </select>
              {errors.category && <span className="error-text">{errors.category}</span>}
            </>
          ) : (
            <div className="custom-category-input">
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={errors.category ? 'error' : ''}
                placeholder="Enter custom category"
              />
              <button 
                type="button" 
                className="btn-cancel-category"
                onClick={() => setIsCustomCategory(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? 'error' : ''}
            rows={4}
            placeholder="Enter product description"
          />
          {errors.description && <span className="error-text">{errors.description}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="image">Image URL *</label>
          <div className="image-url-input">
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className={errors.image ? 'error' : ''}
              placeholder="https://example.com/image.jpg"
            />
            <button 
              type="button" 
              className="btn-default-image"
              onClick={handleUseDefaultImage}
            >
              Use Default
            </button>
          </div>
          {errors.image && <span className="error-text">{errors.image}</span>}
          <p className="image-help-text">Use the button to set the default product image</p>
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="btn-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : (editingProduct ? 'Update Product' : 'Add Product')}
          </button>
          <button 
            type="button" 
            className="btn-cancel" 
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
