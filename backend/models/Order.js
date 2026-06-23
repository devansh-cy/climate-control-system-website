const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true
  },
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    productName: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    },
    subtotal: {
      type: Number
    }
  }],
  customer: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    company: {
      type: String
    }
  },
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, default: "India" }
  },
  billingAddress: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    country: { type: String }
  },
  totalAmount: {
    type: Number
  },
  taxAmount: {
    type: Number
  },
  subtotalAmount: {
    type: Number
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"],
    default: "pending"
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending"
  },
  notes: {
    type: String
  },
  gstin: {
    type: String,
    trim: true
  },
  timeline: {
    type: String,
    enum: ["ASAP", "1-3 months", "3-6 months", "6+ months"]
  },
  application: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
});

// Calculate subtotals, tax, and total amount
orderSchema.methods.calculateTotals = function() {
  let subtotal = 0;
  if (this.products && this.products.length > 0) {
    this.products.forEach(p => {
      p.subtotal = (p.price || 0) * (p.quantity || 1);
      subtotal += p.subtotal;
    });
  }
  this.subtotalAmount = subtotal;
  this.taxAmount = Math.round((subtotal * 0.18) * 100) / 100;
  this.totalAmount = Math.round((subtotal + this.taxAmount) * 100) / 100;
};

// Generate a unique order number in format CCSI-RFQ-YYYY-XXXXXX
orderSchema.methods.generateOrderNumber = async function() {
  const currentYear = new Date().getFullYear();
  const lastOrder = await mongoose.model('Order')
    .findOne({}, {}, { sort: { 'createdAt': -1 } });
  
  let nextNum = 1;
  if (lastOrder && lastOrder.orderNumber) {
    const parts = lastOrder.orderNumber.split('-');
    if (parts.length === 3) {
      const lastNum = parseInt(parts[2], 10);
      if (!isNaN(lastNum)) {
        nextNum = lastNum + 1;
      }
    } else if (parts.length === 4) {
      const lastNum = parseInt(parts[3], 10);
      if (!isNaN(lastNum)) {
        nextNum = lastNum + 1;
      }
    }
  }
  return `CCSI-RFQ-${currentYear}-${String(nextNum).padStart(6, '0')}`;
};

// Instance method toJSON to format output
orderSchema.methods.toJSON = function() {
  const obj = this.toObject();
  obj.id = obj._id;
  return obj;
};

// Pre-save hook
orderSchema.pre('save', async function(next) {
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  
  // Auto-calculate totals before save
  this.calculateTotals();
  
  // Auto-generate orderNumber if not already set
  if (!this.orderNumber) {
    this.orderNumber = await this.generateOrderNumber();
  }
  
  next();
});

// Static methods
orderSchema.statics.findByEmail = function(email) {
  return this.find({ 'customer.email': email });
};

orderSchema.statics.getRecentOrders = function(days = 30) {
  const dateLimit = new Date();
  dateLimit.setDate(dateLimit.getDate() - days);
  return this.find({ createdAt: { $gte: dateLimit } });
};

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
