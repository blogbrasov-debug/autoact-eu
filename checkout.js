/**
 * Netlify Function: Stripe Checkout Session Handler
 * Path: /.netlify/functions/checkout
 *
 * Creates a Stripe Checkout session for one-time or recurring payments.
 * Frontend calls this with priceId, tier, and redirect URLs.
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { priceId, tier, successUrl, cancelUrl } = JSON.parse(event.body);

    // Validate inputs
    if (!priceId || !tier) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing priceId or tier' })
      };
    }

    if (priceId === 'price_') {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Price ID not configured. Please update STRIPE_PRICES in config.js'
        })
      };
    }

    // Build checkout session based on tier type
    const sessionConfig = {
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      success_url: successUrl || `${process.env.URL}/index.html?success=true`,
      cancel_url: cancelUrl || `${process.env.URL}/index.html?canceled=true`,
      mode: tier === 'business' ? 'subscription' : 'payment'
    };

    // For one-time payments (Pro), keep mode='payment'
    // For subscriptions (Business), Stripe automatically uses mode='subscription' with recurring prices

    // Create the Stripe Checkout session
    const session = await stripe.checkout.sessions.create(sessionConfig);

    // Return session ID to frontend
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sessionId: session.id
      })
    };

  } catch (error) {
    console.error('Stripe checkout error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message || 'Failed to create checkout session'
      })
    };
  }
};
