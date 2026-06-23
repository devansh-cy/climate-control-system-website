const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Inquiry = require('../models/Inquiry');
const Product = require('../models/Product');
const { validateInquiry } = require('../middleware/validation');

// Helper to validate email format
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// POST /api/inquiries - Submit a new inquiry
router.post('/', validateInquiry, async (req, res, next) => {
  try {
    const {
      productId,
      productName,
      customerName,
      companyName,
      email,
      phone,
      quantityNeeded,
      application,
      budgetRange,
      timeline,
      message
    } = req.body;

    const qty = parseInt(quantityNeeded, 10);

    // 2. Resolve Product Name if ID is provided but productName is missing
    let resolvedProductName = productName;
    if (productId && !resolvedProductName) {
      if (mongoose.Types.ObjectId.isValid(productId)) {
        const dbProduct = await Product.findById(productId);
        if (dbProduct) {
          resolvedProductName = dbProduct.name;
        }
      }
    }

    // 3. Create Inquiry
    const newInquiry = new Inquiry({
      productId: (productId && mongoose.Types.ObjectId.isValid(productId)) ? productId : undefined,
      productName: resolvedProductName,
      customerName,
      companyName,
      email,
      phone,
      quantityNeeded: qty,
      application,
      budgetRange,
      timeline,
      message
    });

    const savedInquiry = await newInquiry.save();

    // 4. Simulate Email
    console.log(`[EMAIL SIMULATOR] Sending inquiry acknowledgment to ${email} for Inquiry Number: ${savedInquiry.inquiryNumber}`);

    res.status(201).json({
      success: true,
      data: savedInquiry,
      message: 'Inquiry submitted'
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/inquiries - Get all inquiries (Admin route)
router.get('/', async (req, res, next) => {
  try {
    const { status, email, page = 1, limit = 10 } = req.query;

    const query = {};

    if (status) {
      query.status = status;
    }

    if (email) {
      query.email = email;
    }

    // Pagination
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    const total = await Inquiry.countDocuments(query);
    const inquiries = await Inquiry.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);
    
    const pages = Math.ceil(total / limitNum);

    res.json({
      success: true,
      data: inquiries,
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

// GET /api/inquiries/:id - Get a single inquiry details (Admin route)
router.get('/:id', async (req, res, next) => {
  try {
    let inquiry;
    
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      inquiry = await Inquiry.findById(req.params.id);
    }
    
    if (!inquiry) {
      inquiry = await Inquiry.findOne({ inquiryNumber: req.params.id });
    }

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    res.json({
      success: true,
      data: inquiry
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/inquiries/:id/respond - Add response to an inquiry (Admin route)
router.put('/:id/respond', async (req, res, next) => {
  try {
    const { response, respondedBy } = req.body;
    if (!response) {
      return res.status(400).json({ success: false, message: 'Response field is required' });
    }

    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    inquiry.response = response;
    inquiry.respondedBy = respondedBy || 'Admin';
    inquiry.respondedAt = new Date();
    inquiry.status = 'quoted';

    const updatedInquiry = await inquiry.save();

    console.log(`[EMAIL SIMULATOR] Sending inquiry quote response to ${inquiry.email} for Inquiry Number: ${inquiry.inquiryNumber}`);

    res.json({
      success: true,
      data: updatedInquiry
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    next(error);
  }
});

// PUT /api/inquiries/:id/status - Update inquiry status (Admin route)
router.put('/:id/status', async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ["new", "contacted", "quoted", "converted", "closed"];
    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: `Invalid status. Must be one of: ${allowedStatuses.join(', ')}` });
    }

    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    inquiry.status = status;
    const updatedInquiry = await inquiry.save();

    res.json({
      success: true,
      data: updatedInquiry
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    next(error);
  }
});

// DELETE /api/inquiries/:id - Delete an inquiry (Admin route)
router.delete('/:id', async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid inquiry ID' });
    }

    const deletedInquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!deletedInquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    res.json({
      success: true,
      message: 'Inquiry deleted'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
