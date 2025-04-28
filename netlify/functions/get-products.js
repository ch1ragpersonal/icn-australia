// netlify/functions/get-products.js

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async () => {
  try {
    // 1. Fetch active products and expand their default_price object
    const productsResponse = await stripe.products.list({
      active: true,
      expand: ["data.default_price"], // Get default price details efficiently
      limit: 100, // Adjust as needed
    });

    // Filter out products without a valid, active default_price object right away
    const productsWithDefaultPrice = productsResponse.data.filter(
      (product) =>
        product.default_price &&
        typeof product.default_price === "object" &&
        product.default_price.active &&
        product.default_price.unit_amount !== null &&
        product.default_price.unit_amount !== undefined
    );

    // 2. For each product, fetch ALL its active prices and compare
    const productPromises = productsWithDefaultPrice.map(async (product) => {
      const defaultPrice = product.default_price; // The currently active default price

      try {
        // Fetch ALL active prices associated with this product
        const allActivePricesResponse = await stripe.prices.list({
          product: product.id,
          active: true,
          limit: 100, // Fetch up to 100 prices per product
        });

        const allActivePrices = allActivePricesResponse.data;

        // Find the maximum unit_amount among all active prices
        let maxAmount = 0;
        if (allActivePrices.length > 0) {
          maxAmount = Math.max(...allActivePrices.map(p => p.unit_amount));
        } else {
          // Should not happen if default_price is active, but handle defensively
          console.warn(`Product ${product.id} has an active default price but no prices listed? Defaulting to non-discounted.`);
          maxAmount = defaultPrice.unit_amount; // Set max to default price
        }

        // 3. Construct the final product object based on the comparison
        const productData = {
          productId: product.id,
          name: product.name,
          description: product.description,
          image: product.images?.[0] || null,
          category: product.metadata?.category || null,
          currency: defaultPrice.currency,

          // Initialize price fields
          regularPriceId: null,
          regularPriceAmount: null,
          discountPriceId: null,
          discountPriceAmount: null,
        };

        // 4. Determine if discounted based on default price vs max price
        // If default price is the highest (or only price), it's not considered discounted for display.
        if (defaultPrice.unit_amount >= maxAmount) {
          // --- Regular price is effectively active ---
          productData.regularPriceId = defaultPrice.id;
          productData.regularPriceAmount = defaultPrice.unit_amount;
          // discount fields remain null
        } else {
          // --- Discount is effectively active ---
          productData.discountPriceId = defaultPrice.id; // Active price is the discount one
          productData.discountPriceAmount = defaultPrice.unit_amount;
          productData.regularPriceAmount = maxAmount; // Highest price found is shown as "original"
          // productData.regularPriceId remains null (we don't easily know ID of max price)
        }

        return productData;

      } catch (priceError) {
        console.error(`Failed to fetch or process prices for product ${product.id}:`, priceError);
        // Return null or a default structure if prices fail, to avoid breaking Promise.all
        return null;
      }
    });

    // Wait for all the price comparisons to complete
    const productsForFrontend = (await Promise.all(productPromises))
                                  .filter(p => p !== null); // Filter out any errors

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productsForFrontend),
    };
  } catch (err) {
    console.error("Error fetching Stripe products:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch product data." }),
    };
  }
};