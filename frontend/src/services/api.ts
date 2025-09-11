import axios, { AxiosResponse } from 'axios';
import { Product, ProductFormData, ProductUpdateData } from '../types/Product';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
});
// Request interceptor to add auth token if needed
api.interceptors.request.use(
  (config) => {
    // You can add authentication tokens here if needed
    console.log('Making API request to:', config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const getProducts = (params: { search?: string; sort?: string } = {}): Promise<AxiosResponse<Product[]>> => {
  return api.get('/products', { params });
};

export const createProduct = (productData: ProductFormData): Promise<AxiosResponse<Product>> => {
  return api.post('/products', productData);
};

export const updateProduct = (id: string, productData: ProductUpdateData): Promise<AxiosResponse<Product>> => {
  return api.put(`/products/${id}`, productData);
};

export const deleteProduct = (id: string): Promise<AxiosResponse> => {
  return api.delete(`/products/${id}`);
};

export const getProductById = (id: string): Promise<AxiosResponse<Product>> => {
  return api.get(`/products/${id}`);
};
