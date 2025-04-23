// src/pages/store.js

/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import ProductCard from "../components/ProductCard";

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);

const StorePage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("/.netlify/functions/get-products") // Fetch from your updated function
      .then((res) => {
          if (!res.ok) {
              // Handle HTTP errors (like 500 from the function)
              throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
      })
      .then((fetchedProducts) => {
        // Directly use the fetched products (which now include 'category')
        setProducts(fetchedProducts);

        // Dynamically generate categories from the real fetched products
        const uniqueCategories = [
          "All", // Ensure 'All' is always first
          ...new Set( // Create a Set to automatically handle duplicates
            fetchedProducts
              .map((p) => p.category) // Get the category from each product
              .filter(Boolean) // Filter out null, undefined, or empty string categories
          ),
        ];
        console.log("unique categories",uniqueCategories)
        setCategories(uniqueCategories);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error loading products:", err);
        // Consider setting an error state here to display a message to the user
        setIsLoading(false);
      });
  }, []); // Empty dependency array means this runs once on mount

  // --- updateCart, handleCheckout, filteredProducts, totalItemsInCart remain the same as the previous version ---
  // Note: The updateCart function below is simpler than the one in the original
  // description. It assumes the `product` object passed in has the correct
  // Price ID in `product.id` and doesn't handle discount vs regular price logic here.
  // This logic might now reside in how ProductCard calls updateCart.

  const updateCart = (product, quantity) => {
    setCart((prev) => {
      // Assume product.id is the Stripe Price ID
      console.log("product", product)
      const priceIdToAdd = product.regularPriceId;
      const existingItem = prev[priceIdToAdd];
      const newQuantity = (existingItem ? existingItem.quantity : 0) + quantity;
      console.log("to add",priceIdToAdd)
      if (newQuantity <= 0) {
        // Remove item if quantity is zero or less
        const { [priceIdToAdd]: _, ...rest } = prev; // eslint-disable-line no-unused-vars
        return rest;
      } else {
        // Add or update item using the Price ID as the key
        return {
          ...prev,
          [priceIdToAdd]: {
            // Store necessary info for checkout and potentially cart display
            id: priceIdToAdd,         // The actual Price ID
            name: product.name,       // Product Name
            image: product.image,     // Product Image
            price: product.price,     // The unit price (assuming it's passed correctly)
            currency: product.currency, // Currency
            // You might need productId if you fetch detailed product info elsewhere
            // productId: product.productId,
            quantity: newQuantity,     // Calculated new quantity
          },
        };
      }
    });
  };


  const handleCheckout = async () => {
    if (Object.keys(cart).length === 0) return; // Prevent checkout if cart is empty

    const stripe = await stripePromise;

    // Construct lineItems from the cart state
    const lineItems = Object.values(cart).map((item) => ({
      price: item.id, // Use the ID stored in the cart item (which is the Price ID)
      quantity: item.quantity,
    }));

     console.log("Line Items for Checkout:", lineItems); // Debugging

    try {
      const response = await fetch("/.netlify/functions/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lineItems }),
      });

      if (!response.ok) {
        // Attempt to read error message from function if available
        let errorBody = { message: `Checkout function failed: ${response.statusText} (${response.status})` };
        try {
            const body = await response.json();
            if (body.error) errorBody.message = body.error;
        } catch (e) { /* Ignore if response body is not JSON */ }
        throw new Error(errorBody.message);
      }

      const { id: sessionId } = await response.json();
       if (!sessionId) {
          throw new Error("Received invalid session ID from backend.");
      }
      // console.log("Redirecting to Stripe Checkout with Session ID:", sessionId); // Debugging
      await stripe.redirectToCheckout({ sessionId });

    } catch (error) {
      console.error("Checkout Error:", error);
      alert(`Checkout failed: ${error.message}`); // Show error to user
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;
    // Search should only apply when 'All' category is selected OR match the current category filter
    const matchesSearch =
      searchQuery === "" || // Always true if search is empty
      (product.name &&
        product.name.toLowerCase().includes(searchQuery.toLowerCase()));

    // If 'All' category is selected, both category (always true) and search must match
    // If a specific category is selected, both category and search must match
    return matchesCategory && matchesSearch;
  });


  const totalItemsInCart = Object.values(cart).reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // --- JSX Return structure remains the same ---
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "sans-serif",
        boxSizing: "border-box",
        backgroundColor: "#f4f4f4",
      }}
    >
      {/* Header Section (Tabs + Search + Checkout) */}
      <div
        style={{
          padding: "1rem",
          borderBottom: "1px solid #ddd",
          backgroundColor: "#fff",
          flexShrink: 0, // Prevent header from shrinking
        }}
      >
        <h1 style={{ marginTop: 0, marginBottom: "1rem", textAlign: "center" }}>
          Official Merchandise
        </h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap", // Allow items to wrap on smaller screens
            gap: "0.5rem",
            alignItems: "center", // Align items vertically
          }}
        >
          {/* Category Tabs */}
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                // Optionally clear search when changing category?
                // if (cat !== 'All') setSearchQuery('');
              }}
              style={{
                padding: "8px 16px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: activeCategory === cat ? "#333" : "#eee",
                color: activeCategory === cat ? "#fff" : "#333",
                cursor: "pointer",
                transition: "background-color 0.2s, color 0.2s",
              }}
            >
              {cat}
            </button>
          ))}
  
          {/* Push checkout + search to the right */}
          {totalItemsInCart > 0 && (
            <button
              onClick={handleCheckout}
              style={{
                marginLeft: "auto",
                padding: "8px 12px",
                fontSize: "14px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                backgroundColor: "#fff",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Checkout ({totalItemsInCart} item
              {totalItemsInCart !== 1 ? "s" : ""})
            </button>
          )}
  
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              marginLeft: totalItemsInCart !== 0 ? "0" : "auto",
              padding: "8px 12px",
              fontSize: "14px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              minWidth: "180px", // Ensure it doesn't get too small
              maxWidth: "300px", // Limit maximum width
            }}
          />
        </div>
      </div>
  
      {/* Scrollable Product Grid Area */}
      <div
        style={{
          flex: "1 1 auto", // Allow this area to grow and shrink
          overflowY: "auto", // Enable vertical scrolling
          padding: "1rem",
        }}
      >
        {isLoading ? (
          <p style={{ textAlign: "center", marginTop: "2rem" }}>
            Loading products...
          </p>
        ) : filteredProducts.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "1rem",
            }}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                updateCart={updateCart}
              />
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center", marginTop: "2rem" }}>
            No products found matching your criteria.
          </p>
        )}
      </div>
  
      {/* Fixed Bottom Section (Checkout Area) */}
  
      {/* --- Keep existing <style> tag --- */}
      <style>
        {`
          /* Using classes for better maintainability than pure inline styles */
          .product-card {
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 1rem;
            text-align: center;
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
            background-color: #fff;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            display: flex; /* Use flexbox for internal layout */
            flex-direction: column; /* Stack children vertically */
          }
          .product-card:hover {
            transform: translateY(-5px); /* Slight lift effect on hover */
            box-shadow: 0 6px 12px rgba(0,0,0,0.1); /* Enhanced shadow on hover */
          }
          .product-card img {
            max-width: 100%;
            height: 180px; /* Fixed height for image container */
            object-fit: contain; /* Scale image nicely within bounds */
            margin-bottom: 0.5rem;
          }
           .product-card h2 {
              font-size: 1.1rem;
              margin-bottom: 0.25rem;
              min-height: 2.4em; /* Reserve space for ~2 lines */
              line-height: 1.2em;
              margin-top: 0; /* Reset default margin */
              /* Flex properties to allow text to grow if needed */
              flex-grow: 0;
              flex-shrink: 0;
            }
          .product-card p {
              margin-bottom: 0.75rem;
              color: #555;
              font-weight: bold;
              /* Flex properties */
              flex-grow: 0;
              flex-shrink: 0;
          }
          .buy-now-button { /* Style for the Add to Cart button within the card */
            margin-top: auto; /* Push button to the bottom of the card */
            padding: 0.5rem 1rem;
            font-size: 15px;
            border-radius: 8px;
            border: 2px solid #004225;
            background-color: #fff; /* Match initial state of checkout button */
            color: #FFB000;      /* Match initial state of checkout button */
            cursor: pointer;
            font-weight: bold;
            transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
            /* Flex properties */
            flex-grow: 0;
            flex-shrink: 0;
          }
          .buy-now-button:hover {
            background-color: #004225; /* Match hover state of checkout button */
            color: white;           /* Match hover state of checkout button */
          }
  
          /* Optional: Custom Scrollbar Styles for Webkit browsers */
           div[style*="overflowY: auto"]::-webkit-scrollbar { width: 8px; }
           div[style*="overflowY: auto"]::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
           div[style*="overflowY: auto"]::-webkit-scrollbar-thumb { background: #ccc; border-radius: 10px; }
           div[style*="overflowY: auto"]::-webkit-scrollbar-thumb:hover { background: #aaa; }
        `}
      </style>
    </div>
  );
  
}
export default StorePage;