const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { User } = require('../models');
const { authenticate } = require('../middleware/auth');

// Create a payment intent
router.post('/create-payment-intent', authenticate, async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1999, // $19.99
      currency: 'usd',
      metadata: {
        userId: req.user.id
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Handle successful payment
router.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const userId = paymentIntent.metadata.userId;

    try {
      await User.update(
        { isPremium: true },
        { where: { id: userId } }
      );
    } catch (error) {
      console.error('Error updating user premium status:', error);
    }
  }

  res.json({ received: true });
});

module.exports = router; 