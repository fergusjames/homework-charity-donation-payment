// This is a sample Stripe PaymentIntent integration for the web. Built to
// fulfill the requirements of a Stripe Product Management homework exercise
//
// The integration was built following the Stripe Docs
// https://stripe.com/docs/payments/accept-a-payment#web
//
// The design of the UI comes initially from the Stripe React examples here:
// https://github.com/stripe/react-stripe-js

import React from 'react';
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

import App from './App';

require("dotenv").config();

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

ReactDOM.render(
  <Elements stripe={stripePromise} >
    <App />
  </Elements>, document.getElementById('root'));
