const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async () => {
  try {
    const prices = await stripe.prices.list({
      expand: ["data.product"],
      active: true,
    });

    const products = prices.data.map((price) => ({
      id: price.id,
      name: price.product.name,
      image: price.product.images?.[0] || "",
      price: price.unit_amount,
      currency: price.currency,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
