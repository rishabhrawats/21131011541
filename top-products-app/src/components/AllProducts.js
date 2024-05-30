// AllProducts.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://20.244.56.144/test/corpanics/AMZ/categories/Laptop/products?top-10&minPrice=1&maxPrice=10000');
        setProducts(response.data); // Assuming the API response is an array of products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <h1>Top 10 Laptops Sold on AMZ</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <p>Product Name: {product.productName}</p>
            <p>Price: {product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Discount: {product.discount}</p>
            <p>Availability: {product.availability}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllProducts;
