const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

// Import database and models
const { sequelize } = require('./models');

// Import routes
const authRoutes = require('./routes/auth');
const storyRoutes = require('./routes/stories');
const adminRoutes = require('./routes/admin');
const leaderboardRoutes = require('./routes/leaderboard');
const paymentRoutes = require('./routes/payments');
const quizRoutes = require('./routes/quiz');
const stripeRoutes = require('./routes/stripe');

// Import middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());

// Configure Helmet with custom CSP for Stripe
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://*.stripe.com", "'unsafe-inline'"],
        frameSrc: ["'self'", "https://*.stripe.com"],
        connectSrc: ["'self'", "https://*.stripe.com"],
        imgSrc: ["'self'", "https://*.stripe.com", "data:"],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    },
  })
);

app.use(morgan('dev'));

// Handle Stripe webhook raw body
app.use('/api/webhook', express.raw({ type: 'application/json' }));

// Parse JSON for other routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api', stripeRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Initialize database and start server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Sync database models
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('Database models synchronized.');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app; 