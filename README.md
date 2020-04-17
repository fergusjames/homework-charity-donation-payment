# Stripe PaymentIntent integration example

This is a sample Stripe PaymentIntent integration for the web. Built to
fulfill the requirements of a Stripe Product Management homework exercise

The integration was built following the [Stripe Docs on how to Accept a
Payment for the web](https://stripe.com/docs/payments/accept-a-payment#web)


Table of contents
=================

<!--ts-->
   * [User Experience](#user-experience)
   * [Architecture](#architecture)
   * [Installing](#installing)
   * [Running](#running)
<!--te-->

<a name="user-experience"></a>
## User Experience
We will build a simple one-time payment for a donation of a fixed amount to a charity.
This charity will use the funds to donate personal protective equipment to
care homes for the elderly.

The design of the UI came initially from the [Stripe React examples](https://github.com/stripe/react-stripe-js)

The web UX that is built in this example integration looks like this:
<p align="center">
<img src="https://raw.githubusercontent.com/fergusjames/stripe-pm-exercise/master/docs/app-form-blank.png?token=APCPWGE63UTR7R5TQLNE37S6TIH6I" width=500 alt="UX of the donation form" align="center">
</p>

When a payment has been successful the customer is informed.
<p align="center">
<img src="https://github.com/fergusjames/stripe-pm-exercise/blob/master/docs/app-form-blank.png?raw=true" width=300 alt="UX of the blank donation form" align="center">
</p>

When a payment has been successful the customer is informed.
<p align="center">
<img src="https://github.com/fergusjames/stripe-pm-exercise/blob/master/docs/app-form-success.png?raw=true" width=300 alt="UX showing a successfully completed payment" align="center">
</p>

And if any errors occur either when filling out the payment form or after trying the payment through the Stripe service then the customer will be told and prompted to correct them where possible.
<p align="center">
<img src="https://github.com/fergusjames/stripe-pm-exercise/blob/master/docs/app-form-error.png?raw=true" width=300 alt="UX showing a failed payment" align="center">
<img src="https://github.com/fergusjames/stripe-pm-exercise/blob/master/docs/app-form-missing-field.png?raw=true" width=300 alt="UX showing a incomplete payment form" align="center">
</p>

<a name="architecture"></a>
## Architecture

How the demo app is designed

<a name="installing"></a>
## Installing

Installation instructions

<a name="running"></a>
## Running

Running instructions
