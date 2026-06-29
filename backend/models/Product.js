const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  category: {
    type: String,
    required: true,
    enum: ["Panel AC", "Chiller", "Air Dryer", "Dehumidifier", "Fan Tray"],
    index: true
  },
  description: {
    type: String
  },
  specifications: {
    coolingCapacity: { type: Number },
    power: { type: Number },
    refrigerant: { type: String },
    dimensions: { type: String },
    weight: { type: Number },
    maxAmbientTemp: { type: Number },
    workingTempRange: { type: String },
    starRating: { type: String },
    capacity: { type: String },
    voltage: { type: String },
    coolingType: { type: String }
  },
  images: {
    type: [String],
    default: []
  },
  price: {
    type: Number,
    default: null,
    index: true
  },
  inStock: {
    type: Boolean,
    default: true
  },
  applications: {
    type: [String],
    default: []
  },
  features: {
    type: [String],
    default: []
  },
  material: {
    type: String
  },
  relatedProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
});

// Pre-save middleware to auto-generate/update createdAt and updatedAt
productSchema.pre('save', function(next) {
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

// Indexing on fields explicitly
productSchema.index({ name: 'text' });

// Instance methods: toJSON() to format response
productSchema.methods.toJSON = function() {
  const obj = this.toObject();
  obj.id = obj._id;
  return obj;
};

// Static methods
productSchema.statics.findByCategory = function(category) {
  return this.find({ category });
};

productSchema.statics.searchByName = function(keyword) {
  return this.find({ name: { $regex: keyword, $options: 'i' } });
};

productSchema.statics.getFeatured = function() {
  return this.find({ featured: true });
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
