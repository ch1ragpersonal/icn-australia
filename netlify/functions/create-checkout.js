const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const { id } = JSON.parse(event.body);
    const baseUrl = process.env.BASE_URL || "http://localhost:8888"; // fallback just in case

    success = "http://"+baseUrl+"/success"
    cancel  ="http://"+baseUrl+"/store"
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price: id,
          quantity: 1,
        },
      ],
      success_url: success,
      cancel_url: cancel,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
