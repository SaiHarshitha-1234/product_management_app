import express, { Request, Response, Router } from 'express';
import Product from '../models/Product';
import { IProduct, ProductInput } from '../types/Product';

const router: Router = express.Router();

// GET all products
router.get('/', async (req: Request, res: Response) => {
  try {
    const { sort, search } = req.query;
    let query: any = {};
    
    if (search) {
      query.name = { $regex: search as string, $options: 'i' };
    }
    
    let sortOption: any = {};
    if (sort === 'price_asc') {
      sortOption = { price: 1 };
    } else if (sort === 'price_desc') {
      sortOption = { price: -1 };
    }
    
    const products: IProduct[] = await Product.find(query).sort(sortOption);
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single product by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product: IProduct | null = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new product
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, price, description, category, image }: ProductInput = req.body;
    
    // Basic validation
    if (!name || !price || !description || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    if (isNaN(price) || parseFloat(price as any) < 0) {
      return res.status(400).json({ message: 'Price must be a valid positive number' });
    }
    
    const product: IProduct = new Product({
      name,
      price: parseFloat(price as any),
      description,
      category,
      image
    });
    
    const newProduct: IProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a product
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const product: IProduct | null = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE a product
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { price, description, image }: Partial<ProductInput> = req.body;
    
    // Validation for price if provided
    if (price && (isNaN(price) || parseFloat(price as any) < 0)) {
      return res.status(400).json({ message: 'Price must be a valid positive number' });
    }
    
    const updateData: any = {};
    if (price !== undefined) updateData.price = parseFloat(price as any);
    if (description !== undefined) updateData.description = description;
    if (image !== undefined) updateData.image = image;
    
    const updatedProduct: IProduct | null = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(updatedProduct);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
