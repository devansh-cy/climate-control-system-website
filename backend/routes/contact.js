const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Contact = require('../models/Contact');
const { validateContact } = require('../middleware/validation');

// Helper to validate email format
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// POST /api/contact - Submit contact form
router.post('/', validateContact, async (req, res, next) => {
  try {
    const { name, email, company, subject, message } = req.body;

    // 2. Save to database
    const newContact = new Contact({
      name,
      email,
      company,
      subject,
      message
    });

    await newContact.save();

    // 3. Simulate Email Notification to admin
    console.log(`[EMAIL SIMULATOR] Notifying Admin of contact form submission from ${email} regarding subject: "${subject}"`);

    res.status(201).json({
      success: true,
      message: "Message received, we'll contact you soon"
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/contact - Get all contact messages (Admin route with pagination & status filter)
router.get('/', async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query = {};
    if (status) {
      query.status = status;
    }

    // Pagination setup
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    const total = await Contact.countDocuments(query);
    const messages = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);
    
    const pages = Math.ceil(total / limitNum);

    res.json({
      success: true,
      data: messages,
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

// GET /api/contact/:id - Get a single contact message details (Admin route)
router.get('/:id', async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid message ID' });
    }

    const message = await Contact.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    res.json({
      success: true,
      data: message
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/contact/:id - Update message status and response (Admin route)
router.put('/:id', async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid message ID' });
    }

    const { status, response } = req.body;
    const allowedStatuses = ["new", "read", "responded"];
    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: `Invalid status. Must be one of: ${allowedStatuses.join(', ')}` });
    }

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    if (status) contact.status = status;
    if (response !== undefined) contact.response = response;

    // Set respondedAt dynamically if status becomes "responded" or response is provided
    if (status === 'responded' || response) {
      contact.respondedAt = new Date();
      contact.status = 'responded';
    }

    const updatedContact = await contact.save();

    res.json({
      success: true,
      data: updatedContact
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/contact/:id - Delete a message (Admin route)
router.delete('/:id', async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid message ID' });
    }

    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    res.json({
      success: true,
      message: 'Message deleted'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
