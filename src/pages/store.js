/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import ProductCard from "../components/ProductCard";

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);

const StorePage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    fetch("/.netlify/functions/get-products")
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => console.error("Error loading products", err));
  }, []);

  const updateCart = (product, quantity) => {
    setCart((prev) => ({
      ...prev,
      [product.id]: {
        ...product,
        quantity,
      },
    }));
  };

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const lineItems = Object.values(cart).map((item) => ({
      price: item.id,
      quantity: item.quantity,
    }));

    const response = await fetch("/.netlify/functions/create-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lineItems }),
    });

    const { id } = await response.json();
    await stripe.redirectToCheckout({ sessionId: id });
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Merch Store</h1>
      <style>
        {`
          .product-card {
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 1rem;
            max-width: 300px;
            text-align: center;
            transition: transform 0.3s ease-in-out;
          }
          .product-card:hover {
            transform: scale(1.05);
          }
          .buy-now-button {
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            font-size: 16px;
            border-radius: 8px;
            border: 2px solid #004225;
            background-color: #fff;
            color: #FFB000;
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
            product={product}
            updateCart={updateCart}
          />
        ))}
      </div>

      {Object.keys(cart).length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <button className="buy-now-button" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      )}
    </main>
  );
};

export default StorePage;
