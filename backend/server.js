const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const morgan = require('morgan');
const { createServer } = require('http');
const { Server } = require('socket.io');
require('express-async-errors');
require('dotenv').config();

const connectDB = require('./config/db');
const { configureCloudinary } = require('./config/cloudinary');
const logger = require('./utils/logger');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

// Import routes
const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/items');
const swapRoutes = require('./routes/swaps');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');
const contactRoutes = require('./routes/contact');

const app = express();
const server = createServer(app);

// Trust proxy for rate limiting (fixes X-Forwarded-For header issue)
app.set('trust proxy', 1);

// Socket.io setup for real-time features
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Connect to MongoDB
connectDB();

// Configure Cloudinary
configureCloudinary();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// Compression middleware
app.use(compression());

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

// Handle frontend asset requests gracefully
app.get('/favicon.ico', (req, res) => {
  res.status(204).end(); // No content
});

app.get('/manifest.json', (req, res) => {
  res.status(204).end(); // No content
});

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'ReWear API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/swaps', swapRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);

// Socket.io connection handling
io.on('connection', (socket) => {
  logger.info(`User connected: ${socket.id}`);

  // Join user to their personal room
  socket.on('join-user', (userId) => {
    socket.join(`user-${userId}`);
    logger.info(`User ${userId} joined their room`);
  });

  // Handle swap requests
  socket.on('swap-request', (data) => {
    socket.to(`user-${data.receiverId}`).emit('new-swap-request', data);
  });

  // Handle swap status updates
  socket.on('swap-status-update', (data) => {
    socket.to(`user-${data.userId}`).emit('swap-status-changed', data);
  });

  // Handle new item notifications
  socket.on('new-item', (data) => {
    socket.broadcast.emit('item-added', data);
  });

  socket.on('disconnect', () => {
    logger.info(`User disconnected: ${socket.id}`);
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Make io accessible to routes
app.set('io', io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  logger.info(`🚀 ReWear API server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  logger.error(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error(`Error: ${err.message}`);
  process.exit(1);
});

module.exports = app; 