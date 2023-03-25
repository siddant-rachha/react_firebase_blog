import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { Container } from 'react-bootstrap';
import Completion from './Completion';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Payment() {

    console.log("payment jsx loaded")

    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState('');

    const post = useSelector((state) => state.post)

    const { pathname } = useLocation()

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_SERVER}/public-pay-key`).then(async (r) => {
            if (!(r.status >= 200 && r.status < 300)) {
                throw "fetch failed"
            }
            const { publicKey } = await r.json();
            console.log(publicKey)
            setStripePromise(loadStripe(publicKey));
        });
        console.log(pathname)

       //get clientsecret to send to element
       //checkout and completion needs to be inside element 
        if (pathname == "/payment/completion") {

            // Retrieve the "payment_intent_client_secret" query parameter appended to
            // your return_url by Stripe.js
            const clientSecret = new URLSearchParams(window.location.search).get(
                'payment_intent_client_secret'
            );
            setClientSecret(clientSecret)

        }

    }, [])

    useEffect(() => {

        //prevent intent creation
        if (stripePromise == null) return
        if (post.title == "") return

        console.log("payment intent creeated")
        fetch(`${process.env.REACT_APP_BASE_SERVER}/create-payment-intent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...post }),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret)
                console.log(data)
                console.log(data.clientSecret)
            }
            );
    }, [stripePromise]);


    return (
        <>
            <Container className=''>
                {clientSecret && stripePromise && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>

                        {pathname == "/payment/completion" ?

                            <Routes>
                                <Route path="/completion" stripe={stripePromise} element={<Completion />} />
                            </Routes> :

                            <CheckoutForm stripe={stripePromise} />

                        }
                    </Elements>
                )}
            </Container>

        </>
    )
}

export default Payment