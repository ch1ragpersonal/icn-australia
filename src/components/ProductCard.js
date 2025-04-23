import React, { useState } from "react";

// Helper function for currency formatting
const formatCurrency = (amount, currency) => {
  if (amount === null || amount === undefined || !currency) {
    return "N/A"; // Or some placeholder
  }
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  });
};


const ProductCard = ({ product, updateCart }) => {
  const [quantityInput, setQuantityInput] = useState("1");

  const handleAddToCart = () => {
    const quantity = parseInt(quantityInput, 10);
    if (!isNaN(quantity) && quantity > 0) {
      // Pass the whole product object, StorePage's updateCart handles the logic
      updateCart(product, quantity);
      setQuantityInput("1"); // Reset input after adding
    }
  };

  // Input change/blur handlers remain the same
   const handleInputChange = (e) => {
    const val = e.target.value;
    if (val === "" || /^[1-9]\d*$/.test(val)) {
      setQuantityInput(val);
    } else if (val === "0") {
      setQuantityInput("");
    }
  };

  const handleInputBlur = () => {
    const parsed = parseInt(quantityInput, 10);
    if (isNaN(parsed) || parsed <= 0) {
      setQuantityInput("1");
    } else {
      setQuantityInput(String(parsed));
    }
  };

  // Determine if there's a valid discount
  const hasDiscount = product.discountPriceAmount !== null && product.discountPriceAmount < product.regularPriceAmount;
  const savings = hasDiscount ? product.regularPriceAmount - product.discountPriceAmount : 0;

  return (
    <div className="product-card">
      <img
        src={product.image || 'https://via.placeholder.com/200'}
        alt={product.name}
        // Style controlled by CSS class .product-card img
      />
      <h2>{product.name || 'Product Name'}</h2>

      {/* --- Price Display Logic --- */}
      <div className="price-section" style={{ marginBottom: '0.75rem', minHeight: '3.5em' /* Reserve space */ }}>
        {hasDiscount ? (
          <>
            <p style={{ margin: 0, color: 'red', textDecoration: 'line-through', fontSize: '0.9em' }}>
              {formatCurrency(product.regularPriceAmount, product.currency)}
            </p>
            <p style={{ margin: '0.1em 0', color: 'green', fontWeight: 'bold', fontSize: '1.1em' }}>
              {formatCurrency(product.discountPriceAmount, product.currency)}
            </p>
            <p style={{ margin: 0, color: '#e67e22', fontSize: '0.85em', fontWeight: 'bold' }}>
              You save {formatCurrency(savings, product.currency)}!
            </p>
          </>
        ) : (
          // Only show regular price if no valid discount
          <p style={{ margin: '0.1em 0', color: '#555', fontWeight: 'bold', fontSize: '1.1em' }}>
            {formatCurrency(product.regularPriceAmount, product.currency)}
          </p>
        )}
      </div>
      {/* --- End Price Display --- */}


      {/* Input and Button */}
      <div style={{ display: 'inline-block', marginBottom: '0.75rem' }}>
          <input
            type="text"
            inputMode="numeric"
            pattern="[1-9][0-9]*"
            value={quantityInput}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            aria-label={`Quantity for ${product.name}`}
            style={{
              width: "60px",
              padding: "8px 10px",
              fontSize: "15px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              backgroundColor: "#fff",
              color: "#333",
              textAlign: 'center',
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
              outline: "none",
              transition: "border-color 0.2s ease, box-shadow 0.2s ease",
            }}
            onFocus={(e) => (e.target.style.boxShadow = "0 0 0 3px rgba(74, 144, 226, 0.2)")}
            onBlurCapture={(e) => (e.target.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.05)")}
          />
      </div>
      <br />
      <button className="buy-now-button" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;