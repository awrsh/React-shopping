// src/components/ProductList.js
import React from "react";

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
          <h2 className="product-title">{product.title}</h2>
          <p className="product-price">Price: ${product.price}</p>
          <p className="product-category">Category: {product.category}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
