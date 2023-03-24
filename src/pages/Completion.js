// import {useEffect, useState} from 'react';

// function Completion(props) {
//   const [ messageBody, setMessageBody ] = useState('');
//   const { stripePromise } = props;

//   useEffect(() => {
//     debugger
//     if (!stripePromise) return;

//     stripePromise.then(async (stripe) => {
//       const url = new URL(window.location);
//       const clientSecret = url.searchParams.get('payment_intent_client_secret');
//       const { error, paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

//       setMessageBody(error ? `> ${error.message}` : (
//         <>&gt; Payment {paymentIntent.status}: <a href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`} target="_blank" rel="noreferrer">{paymentIntent.id}</a></>
//       ));
//     });
//   }, [stripePromise]);

//   return (
//     <>
//       <h1>Thank you!</h1>
//       <a href="/">home</a>
//       <div id="messages" role="alert" style={messageBody ? {display: 'block'} : {}}>{messageBody}</div>
//     </>
//   );
// }

// export default Completion;


import React, { useState, useEffect } from 'react';
import { useStripe } from '@stripe/react-stripe-js';

const Completion = () => {
  const stripe = useStripe();
  const [message, setMessage] = useState(null);
  const [paymentIntentInfo, setPaymentIntent] = useState("");

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // Retrieve the "payment_intent_client_secret" query parameter appended to
    // your return_url by Stripe.js
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    // Retrieve the PaymentIntent
    if(clientSecret==null) return

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }) => {
        // Inspect the PaymentIntent `status` to indicate the status of the payment
        // to your customer.
        //
        // Some payment methods will [immediately succeed or fail][0] upon
        // confirmation, while others will first enter a `processing` state.
        //
        // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
        switch (paymentIntent.status) {
          case 'succeeded':
            setMessage('Success! Payment received.');
            break;

          case 'processing':
            setMessage("Payment processing. We'll update you when payment is received.");
            break;

          case 'requires_payment_method':
            // Redirect your user back to your payment page to attempt collecting
            // payment again
            setMessage('Payment failed. Please try another payment method.');
            break;

          default:
            setMessage('Something went wrong.');
            break;
        }
        setPaymentIntent(paymentIntent)
        console.log(paymentIntent)

      });
  }, [stripe]);

  return (
    <>
      <h1 className='mt-3 text-center'>Thank you!</h1>
      <div id="messages" role="alert" style={message ? { display: 'block' } : {}}>
        <div>{message}</div>
        <div>id: {paymentIntentInfo?.id}</div>
        <div>amount: &#8377; {parseInt(paymentIntentInfo?.amount)/100} </div>
        <div>{paymentIntentInfo?.status}</div>
      </div>
      <a href="/">Navigate to Home</a>
    </>
  );
};

export default Completion;
