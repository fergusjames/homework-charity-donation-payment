# Stripe PaymentIntent integration example

This is a sample Stripe PaymentIntent integration for the web. Built to
fulfill the requirements of a Stripe Product Management homework exercise.

The integration was built following the [Stripe Docs on how to Accept a
Payment for the web](https://stripe.com/docs/payments/accept-a-payment#web).


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
<img src="https://github.com/fergusjames/stripe-pm-exercise/blob/master/docs/app-form-blank.png?raw=true" width=300 alt="UX of the donation form" align="center">
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

The example payment integration is built using [Node.js](https://nodejs.org) and split into two parts:
1. The customer payment user experience which is built as a single-page web application using [React](https://reactjs.org).
2. A webstore server backend for the charity which is built as a web application using the [Express](https://expressjs.com) framework.

These two elements both communicate with the Stripe service using the [Stripe APIs](https://stripe.com/docs/api).

Successful donations to the charity are logged to a flat text file in [JSON format](https://www.json.org).

### Simplified view of the flow among the components
<p align="center">
<img src="https://github.com/fergusjames/stripe-pm-exercise/blob/master/docs/architecture-sequence-diagram.png?raw=true" width=500 alt="High-level sequence diagram showing flow among components" align="center">
</p>

* The React app loads the user experience for the donation form from the charity's server and the logic runs in the customer's browser.
* Note that the part of the form that captures the customer's credit card details
is served within a iFrame directly from the Stripe service. This protects the customer's
credit card details. The customer's credit card details never touch the charity's servers.
This means that the Charity's server can more easily maintain compliance with the [Payment Card Industry Data Security Standards](https://www.pcisecuritystandards.org/pci_security/) (PCI DSS).
* As the customer fills out the payment form, some basic error checking is performed and the customer is guided to complete the form correctly.
* When ready, the customer submits the form to pay the donation.
* The React app calls the charity's webstore server to request that it initiate a *PaymentIntent* for this payment. This is only done on the charity's server and not in the React app logic running in the customer's browser because we wish to protect the security credentials of the charity. Payments can only be initiated using these credentials.
* The webstore server contacts the Stripe service through the Stripe APIs to create the *PaymentIntent*. When successful, this is returned to the server in the reply from Stripe. The server extracts a *client secret* from the reply and sends this back in turn to the React app in the customer's browser.
* The React app can now confirm this payment directly to Stripe.
* Upon a successful confirmation the React app displays a confirmation to the customer that the payment has been processed.
* Additionally we configure a [Stripe webhook](https://stripe.com/docs/webhooks) so that our charity's webstore server is called and can take action whenever we have received a successful payment. This is important in case the customer's browser or Internet connection has a problem between the time they submitted the payment form and until we display the confirmation to them that the payment succeeded. Relying on the webhook callback means that we can more reliably ensure that we record all payment events and take action to fulfill the service related to the donation.
* In this example we do not actually perform any fulfillment, we just log the successful payment to a log file.


<a name="installing"></a>
## Installing

1. You will need to setup a Stripe account to execute the code in this example integration. [Start with Stripe here](https://stripe.com/en-fr/get-started).
2. The code here is built and managed in the [Node.js](https://nodejs.org) framework along with the [npm](https://www.npmjs.com) package manager. If you do not already have these installed then do so by following [the instructions to install Node.js](https://nodejs.org/en/download/) for your local machine environment. Installing Node.js should also install the npm package manager.
3. Use [GitHub](https://help.github.com) (where this code repository is located) and the related tools like [GitHub Desktop](https://help.github.com/desktop) to clone and download this repository to the local machine where you will be executing the example integration.
4. Stripe provides a command-line interpreter (CLI) that we will use to connect our local machine environment  to stripe and in particular to easily relay the Stripe server webhook callbacks to our local machine while we are testing. Install the Stripe CLI to your local machine by [following these instructions](https://stripe.com/docs/stripe-cli#install).
5. Next [link the Stripe CLI](https://stripe.com/docs/stripe-cli#link-account) to your Stripe account.
6. Now you will need to customize two different `.env` files and load into them your secure keys from your Stripe account.
7. Go to your [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys) to lookup your developer API keys. Make sure you are viewing the test data keys, not your live keys for production. You should see two tokens for *Publishable key* and *Secret key*. Note these tokens.
8. Run the Stripe CLI using the command [`stripe listen`](https://stripe.com/docs/stripe-cli#listen-for-events) which will reveal your *webhook signing secret*. Note this token too.
9. Use a text-editor to edit the `.env` file in the directory `webstore-server-backend`. Replace the entries for both the *Publishable key* and the *Secret key* with the tokens you obtained from your Stripe Dashboard. And replace the entry for the *webhook signing secret* with the one you got from the Stripe CLI tool.
10. Now move to the directory `client-ux` directory and use a text-editor to edit the separate `.env` file in there. Replace the entries for the *Publishable key*  with the token you obtained from your Stripe Dashboard.
11. Now we are going to properly install the full Node.js packages required to run both the React app for the Customer User Experience and the Express app for the Webstore backend server.
12. In a terminal window on your local machine, change to the `webstore-server-backend` directory and run the command
    npm install

13. Then change to the `client-ux` directory and similarly run the command:
    npm install

That completes the installation.

<a name="running"></a>
## Running

Running instructions
