
// import React from 'react';
// import { Product } from '../types/Product';

// interface ProductModalProps {
//   product: Product;
//   onClose: () => void;
//   onEdit: (product: Product) => void;
//   onDelete: (id: string) => void;
// }

// const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onEdit, onDelete }) => {
//   const defaultImage = "https://e7.pngegg.com/pngimages/19/751/png-clipart-item-lot-online-shopping-will-be-networking-online-shopping-infographic-computer-network-thumbnail.png";
  
//   const handleEditClick = () => {
//     onEdit(product);
//     onClose();
//   };

//   const handleDeleteClick = () => {
//     if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
//       onDelete(product._id);
//       onClose();
//     }
//   };

//   const handleOverlayClick = (e: React.MouseEvent) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   const handleAddToCart = () => {
//     alert(`Added ${product.name} to cart!`);
//   };

//   return (
//     <div className="modal-overlay" onClick={handleOverlayClick}>
//       <div className="product-modal">
//         <button className="modal-close" onClick={onClose}>
//           <i className="fas fa-times"></i>
//         </button>
        
//         <div className="modal-content">
//           <div className="modal-image-container">
//             <div className="modal-main-image">
//               <img 
//                 src={product.image || defaultImage} 
//                 alt={product.name}
//                 onError={(e) => {
//                   (e.target as HTMLImageElement).src = defaultImage;
//                 }}
//               />
//             </div>
//           </div>
          
//           <div className="modal-details">
//             <h1>{product.name}</h1>
//             <p className="modal-category">{product.category}</p>
//             <p className="modal-price">₹{product.price.toFixed(2)}</p>
            
//             <div className="product-specs">
//               <h3>Product Details</h3>
//               <p className="modal-description">{product.description}</p>
//             </div>
            
//             <div className="ecommerce-actions">
//               <button className="btn-add-to-cart" onClick={handleAddToCart}>
//                 <i className="fas fa-shopping-cart"></i> Add to Cart
//               </button>
//               <button className="btn-buy-now">
//                 <i className="fas fa-bolt"></i> Buy Now
//               </button>
//             </div>
            
//             <div className="modal-actions">
//               <button className="btn-edit" onClick={handleEditClick}>
//                 <i className="fas fa-edit"></i> Edit Product
//               </button>
//               <button className="btn-delete" onClick={handleDeleteClick}>
//                 <i className="fas fa-trash"></i> Delete Product
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductModal



import React from 'react';
import { Product } from '../types/Product';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onEdit, onDelete }) => {
  const defaultImage = "https://e7.pngegg.com/pngimages/19/751/png-clipart-item-lot-online-shopping-will-be-networking-online-shopping-infographic-computer-network-thumbnail.png";
  
  const handleEditClick = () => {
    onEdit(product);
    onClose();
  };

  const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      onDelete(product._id);
      onClose();
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="product-modal">
        <button className="modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        
        <div className="modal-content">
          <div className="modal-image-container">
            <div className="modal-main-image">
              <img 
                src={product.image || defaultImage} 
                alt={product.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = defaultImage;
                }}
                style={{ 
                  objectFit: 'contain',
                  width: '100%',
                  height: '100%'
                }}
              />
            </div>
          </div>
          
          <div className="modal-details">
            <h1>{product.name}</h1>
            <p className="modal-category">{product.category}</p>
            <p className="modal-price">{product.price.toFixed(2)}</p>
            
            <div className="product-specs">
              <h3>Product Details</h3>
              <p className="modal-description">{product.description}</p>
            </div>
            
            <div className="modal-actions">
              <button className="btn-edit" onClick={handleEditClick}>
                <i className="fas fa-edit"></i> Edit Product
              </button>
              <button className="btn-delete" onClick={handleDeleteClick}>
                <i className="fas fa-trash"></i> Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;