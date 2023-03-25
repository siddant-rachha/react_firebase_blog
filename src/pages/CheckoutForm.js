import {
    PaymentElement,
    LinkAuthenticationElement
} from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'
import { useStripe, useElements } from '@stripe/react-stripe-js';

import { Button } from "react-bootstrap";


export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/payment/completion`,
            }
        });

        console.log(error)

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occured.");
        }



        setIsLoading(false);
    }

    useEffect(() => {
        let timeout;
        if (message != null) {
            timeout = setTimeout(() => {

                setMessage(null)
            }, 3000);
        }
        return () => {
            clearTimeout(timeout)
        }
    }, [message])

    return (
        <>
            <h3 className='mt-3 text-center'>Pay &#8377; 0.5 INR</h3>

            <form id="payment-form" onSubmit={handleSubmit}>
                {/* <LinkAuthenticationElement id="link-authentication-element"
          // Access the email value like so:
          // onChange={(event) => {
          //  setEmail(event.value.email);
          // }}
          //
          // Prefill the email field like so:
          options={{defaultValues: {email: 'siddhant.rachha@gmail.com'}}}
          /> */}
                <PaymentElement id="payment-element" />
                <Button onClick={handleSubmit} className="mt-3 mb-3" disabled={isLoading || !stripe || !elements} id="submit">
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner">Loading...</div> : "Pay now"}
                    </span>
                </Button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
        </>
    )
}
