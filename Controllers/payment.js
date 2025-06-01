import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51RLkPGQewoVc3PzjqNie7cct3lSCLzBGRs8QYY5bQCIY3EK8QgF8TA5cgxSTqtPbJzuIxsPTsDw1VRkhyfr9M8lQ006uYhqtLY');

export const createPaymentSession = async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [{
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: req.body.description,
                    },
                    unit_amount: req.body.amount * 100, // Convert to paise
                },
                quantity: 1,
            }],
            metadata: req.body.metadata,
            success_url: 'http://localhost:3000/payment/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:3000/payment/cancel',
        });

        res.json({ sessionId: session.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Payment session creation failed' });
    }
}
