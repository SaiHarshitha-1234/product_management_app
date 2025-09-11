import React, { useState } from 'react';
import { Product } from '../types/Product';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: { price: number; description: string; image: string }) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete, onUpdate }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (products.length === 0) {
    return <div className="no-products">No products found. Add some products to get started!</div>;
  }

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300); // Wait for animation to complete
  };

  const handleEditFromModal = (product: Product) => {
    onEdit(product);
    handleCloseModal();
  };

  const handleDeleteFromModal = (id: string) => {
    onDelete(id);
    handleCloseModal();
  };

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h2>Product Catalog ({products.length} items)</h2>
      </div>

      <div className="products-grid">
        {products.map(product => (
          <div 
            key={product._id} 
            className="product-card-wrapper"
            onClick={() => handleProductClick(product)}
          >
            <ProductCard 
              product={product} 
              onEdit={onEdit}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          </div>
        ))}
      </div>

      {isModalOpen && selectedProduct && (
        <ProductModal 
          product={selectedProduct}
          onClose={handleCloseModal}
          onEdit={handleEditFromModal}
          onDelete={handleDeleteFromModal}
        />
      )}
    </div>
  );
};

export default ProductList;
