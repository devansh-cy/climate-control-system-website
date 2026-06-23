const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { validateOrder } = require('../middleware/validation');

// Helper to validate email format
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// POST /api/orders - Create a new order
router.post('/', validateOrder, async (req, res, next) => {
  try {
    const { products, customer, shippingAddress, billingAddress, notes } = req.body;

    // Fetch prices and names from Database to prevent pricing spoofing
    const enrichedProducts = [];
    for (const item of products) {
      if (!mongoose.Types.ObjectId.isValid(item.productId)) {
        return res.status(400).json({ success: false, message: `Invalid product ID: ${item.productId}` });
      }

      const dbProduct = await Product.findById(item.productId);
      if (!dbProduct) {
        return res.status(400).json({ success: false, message: `Product not found: ${item.productId}` });
      }

      enrichedProducts.push({
        productId: dbProduct._id,
        productName: dbProduct.name,
        quantity: parseInt(item.quantity, 10),
        price: dbProduct.price || 0, // default to 0 for quote-only items
        subtotal: (dbProduct.price || 0) * parseInt(item.quantity, 10)
      });
    }

    // 3. Construct billing address (fallback to shipping if not specified)
    const finalBillingAddress = (billingAddress && billingAddress.street) 
      ? billingAddress 
      : shippingAddress;

    // 4. Create order instance (pre-save hook will compute totals and generate order number)
    const newOrder = new Order({
      products: enrichedProducts,
      customer,
      shippingAddress,
      billingAddress: finalBillingAddress,
      notes
    });

    const savedOrder = await newOrder.save();

    // 5. Simulate Email Notification
    console.log(`[EMAIL SIMULATOR] Sending order confirmation email to ${customer.email} for Order Number: ${savedOrder.orderNumber}`);

    res.status(201).json({
      success: true,
      data: savedOrder,
      message: 'Order created'
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/orders/:id - Get a single order by ID or orderNumber
router.get('/:id', async (req, res, next) => {
  try {
    let order;
    
    // Try by ObjectId first if valid
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      order = await Order.findById(req.params.id);
    }

    // Try by orderNumber if not found by ID
    if (!order) {
      order = await Order.findOne({ orderNumber: req.params.id });
    }

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/orders - Get all orders (Admin route with filters & pagination)
router.get('/', async (req, res, next) => {
  try {
    const { status, email, page = 1, limit = 10 } = req.query;

    const query = {};

    if (status) {
      query.status = status;
    }

    if (email) {
      query['customer.email'] = email;
    }

    // Pagination setup
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    const total = await Order.countDocuments(query);
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);
    
    const pages = Math.ceil(total / limitNum);

    res.json({
      success: true,
      data: orders,
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

// PUT /api/orders/:id - Update an order by ID (Admin route)
router.put('/:id', async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid order ID' });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Merge updates
    const allowedUpdates = ['status', 'paymentStatus', 'notes', 'shippingAddress', 'billingAddress'];
    allowedUpdates.forEach(key => {
      if (req.body[key] !== undefined) {
        order[key] = req.body[key];
      }
    });

    // If products are updated, copy them over and trigger recalculate
    if (req.body.products && Array.isArray(req.body.products)) {
      const enrichedProducts = [];
      for (const item of req.body.products) {
        const dbProduct = await Product.findById(item.productId);
        if (!dbProduct) {
          return res.status(400).json({ success: false, message: `Product not found: ${item.productId}` });
        }
        enrichedProducts.push({
          productId: dbProduct._id,
          productName: dbProduct.name,
          quantity: parseInt(item.quantity, 10),
          price: dbProduct.price || 0,
          subtotal: (dbProduct.price || 0) * parseInt(item.quantity, 10)
        });
      }
      order.products = enrichedProducts;
    }

    const updatedOrder = await order.save();

    res.json({
      success: true,
      data: updatedOrder
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/orders/:id - Delete an order by ID (Admin route)
router.delete('/:id', async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid order ID' });
    }

    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({
      success: true,
      message: 'Order deleted'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
