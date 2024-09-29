// src/App.js
import React, { useEffect, useState } from "react";
import { fetchProducts } from "./api";
import ProductList from "./components/ProductList";
import ProductFilter from "./components/ProductFilter";
import Pagination from "./components/Pagination";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]); // All products fetched from the API
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products based on search and filters
  const [searchQuery, setSearchQuery] = useState(""); // User's search query
  const [filterParams, setFilterParams] = useState({ category: "" }); // Filter parameters
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [productsPerPage] = useState(10); // Number of products per page

  // Fetch products when the component mounts
  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts();
      setProducts(products);
      setFilteredProducts(products); // Initialize filtered products
    };
    getProducts();
  }, []);

  // Filter products based on search query and selected category
  useEffect(() => {
    const results = products.filter(
      (product) =>
        (product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase())) &&
        (filterParams.category
          ? product.category === filterParams.category
          : true)
    );
    setFilteredProducts(results); // Update filtered products
  }, [searchQuery, filterParams, products]);

  // Calculate current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Function to reset filters
  const resetFilters = () => {
    setSearchQuery(""); // Clear search query
    setFilterParams({ category: "" }); // Reset category filter
    setFilteredProducts(products); // Show all products again
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div className="app">
      <h1>Product List</h1>
      <ProductFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterParams={filterParams}
        setFilterParams={setFilterParams}
        resetFilters={resetFilters}
      />
      <ProductList products={currentProducts} />
      <p className="total-products">
        Total Products: {filteredProducts.length}
      </p>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
        paginate={setCurrentPage} // Pass pagination function
      />
    </div>
  );
};

export default App;
