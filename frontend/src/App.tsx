// import React, { useState, useEffect } from 'react';
// import ProductList from './components/ProductList';
// import ProductForm from './components/ProductForm';
// import SearchBar from './components/SearchBar';
// import SortOptions from './components/SortOptions';
// import { getProducts, createProduct, deleteProduct } from './services/api';
// import { Product, ProductFormData, ProductUpdateData } from './types/Product';
// import './App.css';

// function App() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [editingProduct, setEditingProduct] = useState<Product | null>(null);
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [sortOption, setSortOption] = useState<string>('');
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [showAddForm, setShowAddForm] = useState<boolean>(false);
//   const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

//   useEffect(() => {
//     fetchProducts();
//   }, [searchTerm, sortOption, refreshTrigger]);

//   const fetchProducts = async (): Promise<void> => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const params: { search?: string; sort?: string } = {};
//       if (searchTerm) params.search = searchTerm;
//       if (sortOption) params.sort = sortOption;
      
//       const response = await getProducts(params);
//       setProducts(response.data);
//     } catch (error: any) {
//       console.error('Error fetching products:', error);
//       setError('Failed to fetch products. Please check your connection and try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCreateProduct = async (productData: ProductFormData): Promise<void> => {
//     try {
//       const response = await createProduct(productData);
//       setProducts(prev => [...prev, response.data]);
//       setShowAddForm(false);
//       alert('Product created successfully!');
//     } catch (error: any) {
//       console.error('Error creating product:', error);
//       alert(`Failed to create product: ${error.response?.data?.message || error.message}`);
//     }
//   };

//   const handleUpdateProduct = async (id: string, updates: ProductUpdateData): Promise<void> => {
//     try {
//       setProducts(prev => prev.map(product => 
//         product._id === id 
//           ? { ...product, ...updates, updatedAt: new Date().toISOString() }
//           : product
//       ));
//     } catch (error: any) {
//       console.error('Error updating product:', error);
//       throw error;
//     }
//   };

//   const handleDeleteProduct = async (id: string): Promise<void> => {
//     try {
//       await deleteProduct(id);
//       setProducts(prev => prev.filter(product => product._id !== id));
//       alert('Product deleted successfully!');
//     } catch (error: any) {
//       console.error('Error deleting product:', error);
//       alert(`Failed to delete product: ${error.response?.data?.message || error.message}`);
//     }
//   };

//   const handleEditProduct = (product: Product): void => {
//     setEditingProduct(product);
//     setShowAddForm(false);
//   };

//   const handleCancelEdit = (): void => {
//     setEditingProduct(null);
//   };

//   const toggleAddForm = (): void => {
//     setShowAddForm(!showAddForm);
//     setEditingProduct(null);
//   };

//   const handleCancelAdd = (): void => {
//     setShowAddForm(false);
//   };

//   const handleRefresh = (): void => {
//     setRefreshTrigger(prev => prev + 1);
//     setSearchTerm('');
//     setSortOption('');
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>🛍️ Product Management System</h1>
//         <p>Manage your product inventory with real-time API integration</p>
//       </header>
//       <main className="App-main">
//         <div className="controls">
//           <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//           <SortOptions sortOption={sortOption} setSortOption={setSortOption} />
//           <div className="action-buttons">
//             <button 
//               className="btn-refresh"
//               onClick={handleRefresh}
//               disabled={isLoading}
//             >
//               {isLoading ? 'Refreshing...' : 'Refresh Products'}
//             </button>
//             <button 
//               className="btn-add-product"
//               onClick={toggleAddForm}
//             >
//               {showAddForm ? 'Cancel Add Product' : 'Add New Product'}
//             </button>
//           </div>
//         </div>
        
//         {error && (
//           <div className="error-banner">
//             {error}
//             <button onClick={handleRefresh}>Try Again</button>
//           </div>
//         )}
        
//         {isLoading && products.length === 0 ? (
//           <div className="loading">Loading products...</div>
//         ) : (
//           <div className="content">
//             {(showAddForm || editingProduct) && (
//               <ProductForm 
//                 onSubmit={showAddForm ? handleCreateProduct : () => {}}
//                 editingProduct={editingProduct}
//                 onCancel={showAddForm ? handleCancelAdd : handleCancelEdit}
//               />
//             )}
//              <div className="products-grid-container">
//             <ProductList 
//               products={products}
//               onEdit={handleEditProduct}
//               onDelete={handleDeleteProduct}
//               onUpdate={handleUpdateProduct}
//             />
//           </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import SearchBar from './components/SearchBar';
import SortOptions from './components/SortOptions';
import { getProducts, createProduct, deleteProduct } from './services/api';
import { Product, ProductFormData, ProductUpdateData } from './types/Product';
import './App.css';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, sortOption, refreshTrigger]);

  const fetchProducts = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const params: { search?: string; sort?: string } = {};
      if (searchTerm) params.search = searchTerm;
      if (sortOption) params.sort = sortOption;
      
      const response = await getProducts(params);
      setProducts(response.data);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProduct = async (productData: ProductFormData): Promise<void> => {
    try {
      const response = await createProduct(productData);
      setProducts(prev => [...prev, response.data]);
      setShowAddForm(false);
      setIsFormVisible(false);
      alert('Product created successfully!');
    } catch (error: any) {
      console.error('Error creating product:', error);
      alert(`Failed to create product: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleUpdateProduct = async (id: string, updates: ProductUpdateData): Promise<void> => {
    try {
      setProducts(prev => prev.map(product => 
        product._id === id 
          ? { ...product, ...updates, updatedAt: new Date().toISOString() }
          : product
      ));
      setEditingProduct(null);
      setIsFormVisible(false);
    } catch (error: any) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  const handleDeleteProduct = async (id: string): Promise<void> => {
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(product => product._id !== id));
      alert('Product deleted successfully!');
    } catch (error: any) {
      console.error('Error deleting product:', error);
      alert(`Failed to delete product: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleEditProduct = (product: Product): void => {
    setEditingProduct(product);
    setShowAddForm(false);
    setIsFormVisible(true);
  };

  const handleCancelEdit = (): void => {
    setEditingProduct(null);
    setIsFormVisible(false);
  };

  const toggleAddForm = (): void => {
    setShowAddForm(!showAddForm);
    setEditingProduct(null);
    setIsFormVisible(!isFormVisible);
  };

  const handleCancelAdd = (): void => {
    setShowAddForm(false);
    setIsFormVisible(false);
  };

  const handleRefresh = (): void => {
    setRefreshTrigger(prev => prev + 1);
    setSearchTerm('');
    setSortOption('');
    setIsFormVisible(false);
    setEditingProduct(null);
    setShowAddForm(false);
  };

  const handleFormSubmit = (productData: ProductFormData): void => {
    if (showAddForm) {
      handleCreateProduct(productData);
    } else if (editingProduct) {
      handleUpdateProduct(editingProduct._id, {
        price: parseFloat(productData.price),
        description: productData.description,
        image: productData.image
      });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🛍️ Product Management System</h1>
        <p>Manage your product inventory with real-time API integration</p>
      </header>
      <main className="App-main">
        <div className="controls">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <SortOptions sortOption={sortOption} setSortOption={setSortOption} />
          <div className="action-buttons">
            <button 
              className="btn-refresh"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              {isLoading ? 'Refreshing...' : '🔄 Refresh'}
            </button>
            <button 
              className={`btn-add-product ${isFormVisible ? 'active' : ''}`}
              onClick={toggleAddForm}
            >
              {isFormVisible ? '✕ Close Form' : '➕ Add Product'}
            </button>
          </div>
        </div>
        
        {error && (
          <div className="error-banner">
            {error}
            <button onClick={handleRefresh}>Try Again</button>
          </div>
        )}
        
        <div className="main-content">
          {(isFormVisible) && (
            <div className="form-sidebar">
              <ProductForm 
                onSubmit={handleFormSubmit}
                editingProduct={editingProduct}
                onCancel={showAddForm ? handleCancelAdd : handleCancelEdit}
              />
            </div>
          )}
          
          <div className={`products-container ${isFormVisible ? 'with-sidebar' : 'full-width'}`}>
            {isLoading && products.length === 0 ? (
              <div className="loading">Loading products...</div>
            ) : (
              <ProductList 
                products={products}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
                onUpdate={handleUpdateProduct}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;