// // ProductCard.tsx
// import React, { useState } from 'react';
// import { Product } from '../types/Product';
// import { updateProduct } from '../services/api';

// interface ProductCardProps {
//   product: Product;
//   onEdit: (product: Product) => void;
//   onDelete: (id: string) => void;
//   onUpdate: (id: string, updates: { price: number; description: string; image: string }) => void;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete, onUpdate }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedPrice, setEditedPrice] = useState(product.price.toString());
//   const [editedDescription, setEditedDescription] = useState(product.description);
//   const [editedImage, setEditedImage] = useState(product.image);
//   const [isLoading, setIsLoading] = useState(false);

//   const defaultImage = "https://e7.pngegg.com/pngimages/19/751/png-clipart-item-lot-online-shopping-will-be-networking-online-shopping-infographic-computer-network-thumbnail.png";

//   const handleSave = async () => {
//     if (!editedPrice || isNaN(parseFloat(editedPrice)) || parseFloat(editedPrice) < 0) {
//       alert('Please enter a valid price');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       // Call the API to update the product
//       const response = await updateProduct(product._id, {
//         price: parseFloat(editedPrice),
//         description: editedDescription,
//         image: editedImage
//       });
      
//       // Update local state with the updated product
//       onUpdate(product._id, {
//         price: parseFloat(editedPrice),
//         description: editedDescription,
//         image: editedImage
//       });
      
//       setIsEditing(false);
//       alert('Product updated successfully!');
//     } catch (error: any) {
//       console.error('Error updating product:', error);
//       alert('Failed to update product. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     setEditedPrice(product.price.toString());
//     setEditedDescription(product.description);
//     setEditedImage(product.image);
//     setIsEditing(false);
//   };

//   const handleDelete = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
//       onDelete(product._id);
//     }
//   };

//   const handleEdit = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setIsEditing(true);
//   };

//   const handleUseDefaultImage = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setEditedImage(defaultImage);
//   };
  
//   return (
//     <div className="product-card" onClick={(e) => e.stopPropagation()}>
//       <div className="product-image">
//         <img 
//           src={isEditing ? editedImage : (product.image || defaultImage)} 
//           alt={product.name}
//           onError={(e) => {
//             (e.target as HTMLImageElement).src = defaultImage;
//           }}
//         />
//       </div>
//       <div className="product-info">
//         <h3>{product.name}</h3>
//         <p className="product-category">{product.category}</p>
        
//         {isEditing ? (
//           <>
//             <div className="edit-form">
//               <div className="form-group">
//                 <label>Price (₹)</label>
//                 <div className="price-input">
//                   <input
//                     type="number"
//                     step="0.01"
//                     min="0"
//                     value={editedPrice}
//                     onChange={(e) => setEditedPrice(e.target.value)}
//                     disabled={isLoading}
//                     onClick={(e) => e.stopPropagation()}
//                   />
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label>Description</label>
//                 <textarea
//                   value={editedDescription}
//                   onChange={(e) => setEditedDescription(e.target.value)}
//                   rows={3}
//                   disabled={isLoading}
//                   onClick={(e) => e.stopPropagation()}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Image URL</label>
//                 <div className="image-url-input">
//                   <input
//                     type="url"
//                     value={editedImage}
//                     onChange={(e) => setEditedImage(e.target.value)}
//                     disabled={isLoading}
//                     placeholder="https://example.com/image.jpg"
//                     onClick={(e) => e.stopPropagation()}
//                   />
//                   <button 
//                     type="button" 
//                     className="btn-default-image"
//                     onClick={handleUseDefaultImage}
//                     disabled={isLoading}
//                   >
//                     Use Default
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="edit-actions">
//               <button 
//                 className="btn-save" 
//                 onClick={handleSave}
//                 disabled={isLoading}
//               >
//                 {isLoading ? 'Saving...' : 'Update'}
//               </button>
//               <button 
//                 className="btn-cancel" 
//                 onClick={handleCancel}
//                 disabled={isLoading}
//               >
//                 Cancel
//               </button>
//             </div>
//           </>
//         ) : (
//           <>
//             <p className="product-price">₹{product.price.toFixed(2)}</p>
//             <p className="product-description">{product.description}</p>
//             <div className="product-actions">
//               <button 
//                 className="btn-edit"
//                 onClick={handleEdit}
//               >
//                 Edit
//               </button>
//               <button 
//                 className="btn-delete"
//                 onClick={handleDelete}
//               >
//                 Delete
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductCard;


import React, { useState } from 'react';
import { Product } from '../types/Product';
import { updateProduct } from '../services/api';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: { price: number; description: string; image: string }) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrice, setEditedPrice] = useState(product.price.toString());
  const [editedDescription, setEditedDescription] = useState(product.description);
  const [editedImage, setEditedImage] = useState(product.image);
  const [isLoading, setIsLoading] = useState(false);

  const defaultImage = "https://e7.pngegg.com/pngimages/19/751/png-clipart-item-lot-online-shopping-will-be-networking-online-shopping-infographic-computer-network-thumbnail.png";

  const handleSave = async () => {
    if (!editedPrice || isNaN(parseFloat(editedPrice)) || parseFloat(editedPrice) < 0) {
      alert('Please enter a valid price');
      return;
    }

    setIsLoading(true);
    try {
      await updateProduct(product._id, {
        price: parseFloat(editedPrice),
        description: editedDescription,
        image: editedImage
      });
      
      onUpdate(product._id, {
        price: parseFloat(editedPrice),
        description: editedDescription,
        image: editedImage
      });
      
      setIsEditing(false);
      alert('Product updated successfully!');
    } catch (error: any) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedPrice(product.price.toString());
    setEditedDescription(product.description);
    setEditedImage(product.image);
    setIsEditing(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      onDelete(product._id);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleUseDefaultImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditedImage(defaultImage);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent click propagation when editing or clicking buttons
    if (isEditing || (e.target as HTMLElement).closest('button')) {
      e.stopPropagation();
    }
  };
  
  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-image">
        <img 
          src={isEditing ? editedImage : (product.image || defaultImage)} 
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
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-category">{product.category}</p>
        
        {isEditing ? (
          <>
            <div className="edit-form">
              <div className="form-group">
                <label>Price (₹)</label>
                <div className="price-input">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={editedPrice}
                    onChange={(e) => setEditedPrice(e.target.value)}
                    disabled={isLoading}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  rows={3}
                  disabled={isLoading}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <div className="image-url-input">
                  <input
                    type="url"
                    value={editedImage}
                    onChange={(e) => setEditedImage(e.target.value)}
                    disabled={isLoading}
                    placeholder="https://example.com/image.jpg"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button 
                    type="button" 
                    className="btn-default-image"
                    onClick={handleUseDefaultImage}
                    disabled={isLoading}
                  >
                    Use Default
                  </button>
                </div>
              </div>
            </div>
            <div className="edit-actions">
              <button 
                className="btn-save" 
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Update'}
              </button>
              <button 
                className="btn-cancel" 
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="product-price">₹{product.price.toFixed(2)}</p>
            <p className="product-description">{product.description}</p>
            <div className="product-actions">
              <button 
                className="btn-edit"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button 
                className="btn-delete"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;