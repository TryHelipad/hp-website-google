document.addEventListener('DOMContentLoaded', async () => {
    const stripe = Stripe('pk_live_51PLd8T2LIKsfGjNtTLRNJb1W4hEqkMooAqwwmyZe9fe8IwgIYp1OMoZaSCIrel33RPWm226N9wPM4v10vX1wEZay00Zn82ZDXh'); // Replace with your actual publishable key

    try {
        const response = await fetch('https://hp-stripe-backend-new-d5589f9679e0.herokuapp.com/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const { clientSecret } = await response.json();

        if (!clientSecret) {
            throw new Error('Failed to retrieve client secret');
        }

        const elements = stripe.elements({ clientSecret });

        const paymentElement = elements.create('payment', {
            style: {
                base: {
                    fontSize: '16px',
                    color: '#333333',
                },
            },
        });
        paymentElement.mount('#payment-element');

        const paymentForm = document.getElementById('payment-form');
        paymentForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: 'https://your-website.com/checkout-success',
                },
            });

            if (error) {
                document.getElementById('error-message').textContent = error.message;
            }
        });

        // Setup Payment Request Button
        const paymentRequest = stripe.paymentRequest({
            country: 'US',
            currency: 'usd',
            total: {
                label: 'Total',
                amount: 10000, // Amount in cents ($100)
            },
            requestPayerName: true,
            requestPayerEmail: true,
        });

        const prButton = elements.create('paymentRequestButton', {
            paymentRequest: paymentRequest,
        });

        // Check the availability of the Payment Request API first.
        paymentRequest.canMakePayment().then((result) => {
            if (result) {
                prButton.mount('#payment-request-button');
            } else {
                document.getElementById('payment-request-button').style.display = 'none';
            }
        });
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('error-message').textContent = error.message;
    }
});
