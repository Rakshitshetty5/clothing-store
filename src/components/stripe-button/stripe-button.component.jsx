import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_4EXVKH1iaRWyyQS64eJ9IIDY005ySywqax'

    const onToken = token => {
        console.log(token);
        alert('Payment Sucessfull')
    }

    return(
        <StripeCheckout 
            label = 'Pay Now'
            name = 'CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image = 'https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount = {priceForStripe}
            panelLabel = 'Pay Now'
            token = {onToken} //on payment completion
            stripeKey = {publishableKey}

        />
    );
};

export default StripeCheckoutButton;