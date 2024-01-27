const express = require("express");
const connectDB = require("./config/Database");
const dotenv = require("dotenv").config();
const cors = require("cors");
const Stripe = require('stripe');
const axios = require('axios'); 
const bodyParser = require('body-parser');

const stripe = Stripe('sk_test_51O4FYADW2E7orgGCQN9J11MX0tKIO5rxIJZit9L6NwUcFMWpPqCAXE4NT11Jmw2j6sfpk2t7ximsUWoSUeGyuw4s00A5mrMW5B');
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const PORT = process.env.PORT || 5000;
const app = express();
connectDB();

// Middleware to log raw request bodies for debugging
// app.use((req, res, next) => {
//   let data = '';
//   req.on('data', chunk => {
//     data += chunk;
//   });
//   req.on('end', () => {
//     if (data) {
//       console.log('Raw body:', data);
//     }
//     next();
//   });
// });

// Built-in middleware for parsing JSON and urlencoded form data
app.use(express.json({ limit: '1mb' })); // Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies (as sent by HTML forms)
app.use(cors());

// Middleware to handle errors thrown by JSON parsing
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    console.error('Bad JSON error:', error);
    return res.status(400).send({ error: "Invalid JSON payload format." });
  }
  next();
});

app.use("/stripe", express.raw({ type: "*/*" }));

app.set("view engine", "ejs");

app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;

    const exchangeRateResponse = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
    const exchangeRate = exchangeRateResponse.data.rates.LKR;

    // Convert the amount from LKR to USD
    const amountInUSD = amount / exchangeRate;

    const amounttoadd = Math.round(amountInUSD * 100);
    // console.log(amounttoadd);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amounttoadd,
      currency: 'usd',
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


// Routes File
app.use("/api/admin", require('./Admin/routes/adminRoutes'));
app.use("/api/driver", require('./Admin/routes/driverRoutes'));
app.use("/api/order", require('./Admin/routes/orderRoutes'));
app.use("/api/reviews", require('./Admin/routes/reviewRoutes'));
app.use("/api/user", require('./Admin/routes/user'));
app.use("/api/product", require('./Admin/routes/productRoutes'));
app.use("/api/category", require('./Admin/routes/categoryRoutes'));
app.use("/api/setting", require('./Admin/routes/settingsRoutes'));
app.use("/api/subcategory", require('./Admin/routes/subcategoryRoutes'));

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});