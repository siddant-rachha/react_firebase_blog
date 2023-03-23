import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { Container } from 'react-bootstrap';

function Payment() {

    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState('');


    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_SERVER}/public-pay-key`).then(async (r) => {
            if (!(r.status >= 200 && r.status < 300)) {
                throw "fetch failed"
            }
            const { publicKey } = await r.json();
            console.log(publicKey)
            setStripePromise(loadStripe(publicKey));
        });
    }, [])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_SERVER}/create-payment-intent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [stripePromise]);

    return (
        <>
            <Container className=''>
                <h1 className='mt-3 text-center'>Pay &#8377; 0.5 INR</h1>
                {clientSecret && stripePromise && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <CheckoutForm />
                    </Elements>
                )}
            </Container>

        </>
    )
}

export default Payment