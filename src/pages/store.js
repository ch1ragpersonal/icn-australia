/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import ProductCard from '../components/ProductCard'; // Import ProductCard

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
    console.log('test 3')

    const { id } = await response.json();

    await stripe.redirectToCheckout({ sessionId: id });
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Merch Store</h1>
      <style>
        {`
          .product-card {
            border: 1px solid #ccc; /* Or your desired border style */
            border-radius: 8px;
            padding: 1rem;
            max-width: 300px;
            text-align: center;
            transition: transform 0.3s ease-in-out;
          }
          .product-card:hover {
            transform: scale(1.05);
          }
          .buy-now-button { /* Style for the "Buy Now" button */
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            font-size: 16px;
            border-radius: 8px;
            border: 2px solid #004225; /* Example style, adjust as needed */
            background-color: #fff;
            color: #FFB000; /* Example style, adjust as needed */
            cursor: pointer;
            font-weight: bold;
            transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
          }
          .buy-now-button:hover {
            background-color: #004225;
            color: white;
          }
        `}
      </style>
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {products.length === 0 && <p>Loading products...</p>}
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product} // Pass product data
            handleCheckout={handleCheckout} // Pass handleCheckout function
          />
        ))}
      </div>
    </main>
  );
};

export default StorePage;