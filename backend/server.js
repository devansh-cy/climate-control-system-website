const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Security, Compression & JSON Middleware
app.use(helmet());
app.use(compression());
app.use(express.json());

// CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : [FRONTEND_URL, 'http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per windowMs
  message: { success: false, message: 'Too many requests from this IP, please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(apiLimiter);

// Stricter rate limiting for B2B RFQ / contact form submissions to prevent spam
const formSubmitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 form submissions per windowMs
  message: { success: false, message: 'Too many quote requests or inquiries submitted from this IP. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/orders', formSubmitLimiter);
app.use('/api/inquiries', formSubmitLimiter);
app.use('/api/contact', formSubmitLimiter);

// MongoDB Connection
(async () => {
  let dbUri = process.env.MONGODB_URI;
  const isProduction = process.env.NODE_ENV === 'production';

  const isPlaceholderUri = !dbUri || 
    dbUri.includes('cluster.mongodb.net') || 
    dbUri.includes('user:password') || 
    dbUri === '';

  if (isPlaceholderUri) {
    if (isProduction) {
      console.error('FATAL ERROR: MONGODB_URI is not configured or is a placeholder in production mode.');
      process.exit(1);
    } else {
      console.log('Detected placeholder or missing MONGODB_URI. Starting in-memory MongoDB server for development...');
      try {
        const { MongoMemoryServer } = require('mongodb-memory-server');
        const mongoServer = await MongoMemoryServer.create();
        dbUri = mongoServer.getUri();
        console.log(`In-memory MongoDB server started at: ${dbUri}`);
        process.env.MONGODB_URI = dbUri;
      } catch (err) {
        console.error('Failed to start MongoMemoryServer:', err);
        process.exit(1);
      }
    }
  }

  mongoose.connect(dbUri)
    .then(() => {
      console.log('Connected to MongoDB');
      
      // Auto-seeding is only allowed in non-production environments to avoid write collisions in horizontal clusters
      if (!isProduction) {
        const Product = require('./models/Product');
        const { seedDatabase } = require('./seed');
        Product.find()
          .then(async (products) => {
            const hasUnsplash = products.some(p => p.images && p.images[0] && p.images[0].includes('unsplash.com'));
            const { sampleProducts } = require('./seed');
            if (products.length !== sampleProducts.length || hasUnsplash) {
              console.log('Seeding/Re-seeding database with PDF catalog in development...');
              await seedDatabase(false);
              console.log('Database seeding completed successfully.');
            } else {
              console.log(`Database already seeded with ${products.length} catalog items.`);
            }
          })
          .catch((err) => console.error('Failed to check product count for seeding:', err));
      } else {
        console.log('Running in production mode. Automatic database seeding bypassed.');
      }
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    });
})();

// Routes
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const inquiryRoutes = require('./routes/inquiries');
const contactRoutes = require('./routes/contact');

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/contact', contactRoutes);

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'CCSI API Server is running.' });
});

// Error handling middleware
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
