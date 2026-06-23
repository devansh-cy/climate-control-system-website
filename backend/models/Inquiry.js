const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  inquiryNumber: {
    type: String,
    unique: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: false
  },
  productName: {
    type: String,
    required: false
  },
  customerName: {
    type: String,
    required: true
  },
  companyName: {
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
  quantityNeeded: {
    type: Number,
    required: true,
    min: 1
  },
  application: {
    type: String,
    required: true
  },
  budgetRange: {
    type: String,
    enum: ["<50K", "50K-100K", "100K-500K", "500K+"],
    required: false
  },
  timeline: {
    type: String,
    enum: ["ASAP", "1-3 months", "3-6 months", "6+ months"],
    required: false
  },
  message: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ["new", "contacted", "quoted", "converted", "closed"],
    default: "new"
  },
  response: {
    type: String,
    required: false
  },
  respondedAt: {
    type: Date,
    required: false
  },
  respondedBy: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
});

// Generate a unique inquiry number in format CCSI-INQ-YYYY-XXXXXX
inquirySchema.methods.generateInquiryNumber = async function() {
  const currentYear = new Date().getFullYear();
  const lastInquiry = await mongoose.model('Inquiry')
    .findOne({}, {}, { sort: { 'createdAt': -1 } });
  
  let nextNum = 1;
  if (lastInquiry && lastInquiry.inquiryNumber) {
    const parts = lastInquiry.inquiryNumber.split('-');
    if (parts.length === 4) {
      const lastNum = parseInt(parts[3], 10);
      if (!isNaN(lastNum)) {
        nextNum = lastNum + 1;
      }
    }
  }
  return `CCSI-INQ-${currentYear}-${String(nextNum).padStart(6, '0')}`;
};

// Instance method to update status to contacted
inquirySchema.methods.markAsContacted = function() {
  this.status = 'contacted';
  return this.save();
};

// Instance method toJSON to format output
inquirySchema.methods.toJSON = function() {
  const obj = this.toObject();
  obj.id = obj._id;
  return obj;
};

// Pre-save hook
inquirySchema.pre('save', async function(next) {
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  
  // Auto-generate inquiryNumber if not already set
  if (!this.inquiryNumber) {
    this.inquiryNumber = await this.generateInquiryNumber();
  }
  
  next();
});

// Static methods
inquirySchema.statics.findNew = function() {
  return this.find({ status: 'new' });
};

inquirySchema.statics.findByEmail = function(email) {
  return this.find({ email });
};

inquirySchema.statics.findByStatus = function(status) {
  return this.find({ status });
};

const Inquiry = mongoose.model('Inquiry', inquirySchema);

module.exports = Inquiry;
