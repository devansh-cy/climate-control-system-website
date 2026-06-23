const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateOrder = (req, res, next) => {
  const { products, customer, shippingAddress } = req.body;

  if (!customer || !customer.name || !customer.email || !customer.phone) {
    return res.status(400).json({ success: false, message: 'Validation error: customer name, email, and phone are required' });
  }

  if (!emailRegex.test(customer.email)) {
    return res.status(400).json({ success: false, message: 'Validation error: invalid customer email format' });
  }

  const phoneDigits = customer.phone.replace(/\D/g, '');
  if (phoneDigits.length < 10) {
    return res.status(400).json({ success: false, message: 'Validation error: customer phone length must be at least 10 digits' });
  }

  if (!shippingAddress || !shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zip) {
    return res.status(400).json({ success: false, message: 'Validation error: complete shipping address is required (street, city, state, zip)' });
  }

  if (!products || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ success: false, message: 'Validation error: order must contain at least one product' });
  }

  for (let i = 0; i < products.length; i++) {
    const item = products[i];
    if (!item.productId) {
      return res.status(400).json({ success: false, message: `Validation error: product at index ${i} is missing productId` });
    }
    const qty = parseInt(item.quantity, 10);
    if (isNaN(qty) || qty < 1) {
      return res.status(400).json({ success: false, message: `Validation error: product at index ${i} must have quantity >= 1` });
    }
  }

  next();
};

const validateInquiry = (req, res, next) => {
  const {
    customerName,
    companyName,
    email,
    phone,
    quantityNeeded,
    application,
    budgetRange,
    timeline
  } = req.body;

  if (!customerName || !companyName || !email || !phone || !quantityNeeded || !application || !budgetRange || !timeline) {
    return res.status(400).json({ success: false, message: 'Validation error: customerName, companyName, email, phone, quantityNeeded, application, budgetRange, and timeline are required' });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Validation error: invalid email format' });
  }

  const qty = parseInt(quantityNeeded, 10);
  if (isNaN(qty) || qty < 1) {
    return res.status(400).json({ success: false, message: 'Validation error: quantityNeeded must be >= 1' });
  }

  next();
};

const validateContact = (req, res, next) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'Validation error: name, email, subject, and message are required' });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Validation error: invalid email format' });
  }

  next();
};

const validateProduct = (req, res, next) => {
  const { name, category } = req.body;

  if (!name || !category) {
    return res.status(400).json({ success: false, message: 'Validation error: name and category are required' });
  }

  const allowedCategories = ["Panel AC", "Chiller", "Air Dryer", "Dehumidifier", "Fan Tray"];
  if (!allowedCategories.includes(category)) {
    return res.status(400).json({ success: false, message: `Validation error: category must be one of: ${allowedCategories.join(', ')}` });
  }

  next();
};

module.exports = {
  validateOrder,
  validateInquiry,
  validateContact,
  validateProduct
};
