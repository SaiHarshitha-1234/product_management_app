export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  name: string;
  price: string;
  description: string;
  category: string;
  image: string;
}

export interface ProductUpdateData {
  price: number;
  description: string;
  image: string;
}