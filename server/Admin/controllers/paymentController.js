const stripe = require('stripe')('sk_test_51O4FYADW2E7orgGCQN9J11MX0tKIO5rxIJZit9L6NwUcFMWpPqCAXE4NT11Jmw2j6sfpk2t7ximsUWoSUeGyuw4s00A5mrMW5B');
// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

app.post('/payment-sheet', async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2023-10-16'}
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'eur',
    customer: customer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: 'pk_test_51O4FYADW2E7orgGC3g90wLz9NG9KFLYFWIwCKuyAGe7wVudSCJViGFNNbutvB21d5sTLI2Ju0ywXYVKsNdWdxIRD00CwurK05B'
  });
});