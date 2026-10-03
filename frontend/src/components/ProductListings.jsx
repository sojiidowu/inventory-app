import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import useProducts from "../hooks/useProducts";

import React from "react";

const ProductListings = ({ isHome = false }) => {
  const { data, isLoading, isError, error } = useProducts();
  console.log(data);

  if (isLoading) return <Spinner loading={true} />;
  if (isError) return <div>Error loading products: {error.message}</div>;

  const productsList = data?.results || [];
  const displayedProducts = isHome ? productsList.slice(0, 5) : productsList;

  console.log(productsList);

  return (
    <div>
      <h3>Product Listings</h3>
      <ul>
        {displayedProducts.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListings;
