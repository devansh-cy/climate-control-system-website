const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { validateProduct } = require('../middleware/validation');

// GET /api/products - Get all products with filters, sorting, and pagination
router.get('/', async (req, res, next) => {
  try {
    const { category, minPrice, maxPrice, capacity, search, sort, page = 1, limit = 10 } = req.query;

    const query = {};

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (capacity) {
      query['specifications.coolingCapacity'] = Number(capacity);
    }

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    // Sorting options
    let sortOption = {};
    if (sort) {
      if (sort === 'priceAsc') sortOption.price = 1;
      else if (sort === 'priceDesc') sortOption.price = -1;
      else if (sort === 'nameAsc') sortOption.name = 1;
      else if (sort === 'nameDesc') sortOption.name = -1;
      else if (sort === 'newest') sortOption.createdAt = -1;
      else sortOption[sort] = 1;
    } else {
      sortOption.createdAt = -1;
    }

    // Pagination
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);
    
    const pages = Math.ceil(total / limitNum);

    res.json({
      success: true,
      data: products,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages
      }
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/products/featured - Get top 6 featured products
router.get('/featured', async (req, res, next) => {
  try {
    const featuredProducts = await Product.find({ featured: true }).limit(6);
    res.json({
      success: true,
      data: featuredProducts
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/products/:id - Get a single product by ID
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    next(error);
  }
});

// POST /api/products - Create a new product (Admin option)
router.post('/', validateProduct, async (req, res, next) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json({
      success: true,
      data: savedProduct
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Product name must be unique' });
    }
    next(error);
  }
});

// PUT /api/products/:id - Update product fields by ID (Admin option)
router.put('/:id', async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({
      success: true,
      data: updatedProduct
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Product name must be unique' });
    }
    next(error);
  }
});

// DELETE /api/products/:id - Delete product by ID (Admin option)
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({
      success: true,
      message: 'Product deleted'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    next(error);
  }
});

module.exports = router;
