const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Middleware
app.use(cors({
  origin: [FRONTEND_URL, 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

// MongoDB Connection & Startup Seeding
const Product = require('./models/Product');
const { seedDatabase } = require('./seed');
const { MongoMemoryServer } = require('mongodb-memory-server');

(async () => {
  let dbUri = process.env.MONGODB_URI;
  if (!dbUri || dbUri.includes('cluster.mongodb.net') || dbUri.includes('user:password')) {
    console.log('Detected placeholder MONGODB_URI. Starting in-memory MongoDB server...');
    try {
      const mongoServer = await MongoMemoryServer.create();
      dbUri = mongoServer.getUri();
      console.log(`In-memory MongoDB server started at: ${dbUri}`);
      process.env.MONGODB_URI = dbUri;
    } catch (err) {
      console.error('Failed to start MongoMemoryServer:', err);
    }
  }

  mongoose.connect(dbUri)
    .then(() => {
      console.log('Connected to MongoDB');
      // Check if products exist, or if they contain placeholder images, if so re-seed
      Product.find()
        .then(async (products) => {
          const hasUnsplash = products.some(p => p.images && p.images[0] && p.images[0].includes('unsplash.com'));
          if (products.length === 0 || hasUnsplash) {
            console.log('Seeding/Re-seeding database with PDF catalog...');
            await seedDatabase(false);
            console.log('Database seeding completed successfully.');
          } else {
            console.log(`Database already seeded with ${products.length} catalog items.`);
          }
        })
        .catch((err) => console.error('Failed to check product count for seeding:', err));
    })
    .catch((err) => console.error('MongoDB connection error:', err));
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
