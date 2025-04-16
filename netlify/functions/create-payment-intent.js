const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const { lineItems } = JSON.parse(event.body);

    const session = await stripe.paymentIntents.create({
      amount: await calculateTotal(lineItems),
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: session.client_secret }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

async function calculateTotal(lineItems) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  const prices = await stripe.prices.list({ expand: ["data.product"] });

  let total = 0;
  for (const item of lineItems) {
    const price = prices.data.find((p) => p.id === item.price);
    if (price) {
      total += price.unit_amount * item.quantity;
    }
  }

  return total;
}
