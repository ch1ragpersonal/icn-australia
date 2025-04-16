import React, { useState } from "react";

const ProductCard = ({ product, updateCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    updateCart(product, quantity);
  };

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", height: "auto" }}
      />
      <h2>{product.name}</h2>
      <p>
        {(product.price / 100).toLocaleString("en-US", {
          style: "currency",
          currency: product.currency.toUpperCase(),
        })}
      </p>
      <input
  type="number"
  min="1"
  value={quantity}
  onChange={(e) => setQuantity(Number(e.target.value))}
  style={{
    width: "80px",
    padding: "8px 12px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    backgroundColor: "#fff",
    color: "#333",
    marginTop: "0.5rem",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease"
  }}
  onFocus={(e) =>
    (e.target.style.boxShadow = "0 0 0 3px rgba(74, 144, 226, 0.2)")
  }
  onBlur={(e) => (e.target.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.05)")}
/>

      <br></br>
      <button className="buy-now-button" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
