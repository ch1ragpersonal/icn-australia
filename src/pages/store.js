/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);

const StorePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/.netlify/functions/get-products")
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => console.error("Error loading products", err));
  }, []);

  const handleCheckout = async (product) => {
    const stripe = await stripePromise;

    const response = await fetch("/.netlify/functions/create-checkout", {
      method: "POST",
      body: JSON.stringify(product),
    });

    const { id } = await response.json();

    await stripe.redirectToCheckout({ sessionId: id });
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Merch Store</h1>
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {products.length === 0 && <p>Loading products...</p>}
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              maxWidth: "300px",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              width="100%"
              style={{ marginBottom: "1rem" }}
            />
            <h2>{product.name}</h2>
            <p>
              {(product.price / 100).toLocaleString("en-US", {
                style: "currency",
                currency: product.currency.toUpperCase(),
              })}
            </p>
            <button onClick={() => handleCheckout(product)}>Buy Now</button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default StorePage;
