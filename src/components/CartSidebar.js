// CartSidebar.js
import React from "react";

const CartSidebar = ({ cart, removeFromCart, handleCheckout }) => {
  const cartItems = Object.values(cart);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cartItems.map((item) => (
              <li key={item.id} style={{ marginBottom: "1rem" }}>
                <strong>{item.name}</strong> x {item.quantity} ={" "}
                {(item.price * item.quantity / 100).toFixed(2)}
                <br />
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <p>Total: ${(total / 100).toFixed(2)}</p>
          <button onClick={handleCheckout}>Proceed to Payment</button>
        </>
      )}
    </div>
  );
};

export default CartSidebar;
