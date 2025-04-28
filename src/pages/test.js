// src/pages/catalogue.js

import React, { useState } from "react";

const mockProducts = [
  { id: 1, name: "Red Shirt", category: "Clothing" },
  { id: 2, name: "Blue Jeans", category: "Clothing" },
  { id: 3, name: "Cooking Pot", category: "Kitchen" },
  { id: 4, name: "Sneakers", category: "Shoes" },
  { id: 5, name: "Toaster", category: "Kitchen" },
  // Add more if you want to test scroll
];

const categories = ["All", "Clothing", "Kitchen", "Shoes"];

const ProductCard = ({ product }) => (
  <div
    style={{
      padding: "16px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      textAlign: "center",
      backgroundColor: "#fff",
    }}
  >
    <h3>{product.name}</h3>
    <p style={{ fontSize: "14px", color: "#777" }}>{product.category}</p>
  </div>
);

const CataloguePage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = mockProducts.filter((product) => {
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;
    const matchesSearch =
      activeCategory !== "All" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "sans-serif",
        padding: "1rem",
        boxSizing: "border-box",
      }}
    >
      {/* Tabs + Search */}
      <div
        style={{
          marginBottom: "1rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          alignItems: "center",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: activeCategory === cat ? "#333" : "#eee",
              color: activeCategory === cat ? "#fff" : "#333",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}

        {activeCategory === "All" && (
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              marginLeft: "auto",
              padding: "8px 12px",
              fontSize: "14px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              flex: "1 1 200px",
            }}
          />
        )}
      </div>

      {/* Scrollable Product Grid */}
      <div
        style={{
          flex: "1 1 auto",
          overflowY: "auto",
          paddingRight: "4px", // space for scrollbar
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Fixed Bottom Stuff */}
      <div
        style={{
          marginTop: "1rem",
          padding: "1rem",
          borderTop: "1px solid #ddd",
          textAlign: "center",
          backgroundColor: "#f9f9f9",
        }}
      >
        <button
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: "#333",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Go to Cart
        </button>
      </div>
    </div>
  );
};

export default CataloguePage;
