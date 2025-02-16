import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);

const ProductPage = () => {
    const handleCheckout = async () => {
        try {
          const response = await fetch("/api/create-checkout-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const data = await response.json();
      
          if (!data.url) {
            throw new Error("Checkout session URL is undefined");
          }
      
          window.location.href = data.url;
        } catch (error) {
          console.error("Checkout Error:", error.message);
        }
      };
      

  return (
    <div>
      <h1>Product Name</h1>
      <p>Product description goes here.</p>
      <h2>$99.99</h2>
      <button onClick={handleCheckout}>Buy Now</button>
    </div>
  );
};

export default ProductPage;
