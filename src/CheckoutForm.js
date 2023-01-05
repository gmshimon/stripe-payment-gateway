import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
    const price = 100

    useEffect(()=>{
        fetch('http://localhost:5000/create-payment-intent',{
            method:"POST",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({price})
        })
        .then(res=>res.json())
        .then(data=>{
            if(data?.clientSecret)
            setClientSecret(data.clientSecret)
            // console.log(data.clientSecret)
        })
    },[])
    console.log(clientSecret)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    //return if the card details is empty
    if (card == null) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: card,
    });
    if (error) console.log(error);
    else console.log(paymentMethod);


    const {paymentIntent, error:intentError} = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: 'Jenny Rosen',
              email:'simon.rosedale99@gmail.com'
            },
          },
        },
      );
      if(intentError)
        console.log(intentError)
    else
        console.log('successful payment')
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button type="submit" disabled={!stripe || !clientSecret}>
          Pay
        </button>
      </form>
    </>
  );
};

export default CheckoutForm;
