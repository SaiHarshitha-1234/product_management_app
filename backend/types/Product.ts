import { Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  category: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductInput {
  name: string;
  price: number;
  description: string;
  category: string;
  image?: string;
}