// ProductCard.js
import React from 'react';

const ProductCard = ({ product, handleCheckout }) => {
  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        style={{ width: '100%', height: 'auto' }}
      />
      <h2>{product.name}</h2>
      <p>
        {(product.price / 100).toLocaleString("en-US", {
          style: "currency",
          currency: product.currency.toUpperCase(),
        })}
      </p>
      <button
        className="buy-now-button" // New class name for product button
        onClick={() => handleCheckout(product)}
      >
        Buy Now
      </button>
    </div>
  );
};

export default ProductCard;