/**
 * Netlify Function: Stripe Webhook Handler
 * Path: /.netlify/functions/webhook
 *
 * Handles Stripe events: checkout.session.completed, subscription updates, etc.
 * Verifies webhook signature and processes payment confirmations.
 *
 * Setup:
 * 1. Add to Stripe Dashboard → Settings → Webhooks
 * 2. Endpoint URL: https://your-site.netlify.app/.netlify/functions/webhook
 * 3. Events to listen: checkout.session.completed, customer.subscription.created, customer.subscription.updated
 * 4. Copy Signing Secret → Netlify env: STRIPE_WEBHOOK_SECRET
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

  const sig = event.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET not set');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Webhook secret not configured' })
    };
  }

  try {
    // Verify webhook signature
    const stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      webhookSecret
    );

    console.log(`✓ Webhook signature verified. Event type: ${stripeEvent.type}`);

    // Handle different event types
    switch (stripeEvent.type) {
      // One-time payment completed (Pro tier)
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(stripeEvent.data.object);
        break;

      // Subscription created (Business tier)
      case 'customer.subscription.created':
        await handleSubscriptionCreated(stripeEvent.data.object);
        break;

      // Subscription updated
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(stripeEvent.data.object);
        break;

      // Payment intent succeeded (additional confirmation)
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(stripeEvent.data.object);
        break;

      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`);
    }

    // Return success to Stripe
    return {
      statusCode: 200,
      body: JSON.stringify({ received: true })
    };

  } catch (error) {
    console.error('Webhook error:', error.message);

    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message })
    };
  }
};

// ============= EVENT HANDLERS =============

/**
 * Handle checkout session completed (Pro - one-time payment)
 */
async function handleCheckoutSessionCompleted(session) {
  console.log(`
    ✓ Checkout session completed
    Session ID: ${session.id}
    Customer Email: ${session.customer_email}
    Amount: ${session.amount_total / 100} ${session.currency.toUpperCase()}
    Payment Status: ${session.payment_status}
  `);

  // TODO: Update your database to mark user as Pro
  // - Store session.customer_email
  // - Mark user as tier: 'pro'
  // - Grant Pro features (SVG export, 2048px)
  // - Send confirmation email

  // Example database update (implement based on your backend):
  // await updateUserTier(session.customer_email, 'pro', session.id);

  return true;
}

/**
 * Handle subscription created (Business - recurring payment)
 */
async function handleSubscriptionCreated(subscription) {
  console.log(`
    ✓ Subscription created
    Subscription ID: ${subscription.id}
    Customer ID: ${subscription.customer}
    Price ID: ${subscription.items.data[0].price.id}
    Status: ${subscription.status}
  `);

  // TODO: Update your database to mark user as Business
  // - Store subscription.customer
  // - Mark user as tier: 'business'
  // - Grant Business features (dynamic QR, analytics)
  // - Send welcome email with Business features

  // Example database update:
  // await updateUserTier(subscription.customer, 'business', subscription.id);

  return true;
}

/**
 * Handle subscription updated
 */
async function handleSubscriptionUpdated(subscription) {
  console.log(`
    ✓ Subscription updated
    Subscription ID: ${subscription.id}
    Status: ${subscription.status}
  `);

  // Handle status changes (paused, canceled, reactivated, etc.)
  if (subscription.status === 'active') {
    // Subscription is active, ensure user has Business access
    console.log(`  → Subscription is active for customer: ${subscription.customer}`);
  } else if (subscription.status === 'past_due') {
    // Payment failed, notify user
    console.log(`  → Subscription past due for customer: ${subscription.customer}`);
  } else if (subscription.status === 'canceled') {
    // Subscription canceled, revoke Business access
    console.log(`  → Subscription canceled for customer: ${subscription.customer}`);
    // TODO: Revoke Business tier, downgrade to Free
  }

  return true;
}

/**
 * Handle payment intent succeeded
 */
async function handlePaymentIntentSucceeded(paymentIntent) {
  console.log(`
    ✓ Payment intent succeeded
    Payment Intent ID: ${paymentIntent.id}
    Amount: ${paymentIntent.amount / 100} ${paymentIntent.currency.toUpperCase()}
    Status: ${paymentIntent.status}
  `);

  // Additional confirmation for one-time payments
  // Usually checkout.session.completed is sufficient, but this is a backup

  return true;
}
