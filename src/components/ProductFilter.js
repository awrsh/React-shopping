// src/components/ProductFilter.js
import React from 'react';

const ProductFilter = ({ searchQuery, setSearchQuery, filterParams, setFilterParams, resetFilters }) => {
  return (
    <div className="product-filter">
      <input
        type="text"
        placeholder="Search by name or description"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select
        value={filterParams.category}
        onChange={(e) => setFilterParams({ ...filterParams, category: e.target.value })}
      >
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelery</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="women's clothing">Women's Clothing</option>
      </select>
      <button onClick={resetFilters}>Reset Filters</button>
    </div>
  );
};

export default ProductFilter;
