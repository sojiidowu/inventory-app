import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import useSuppliers from "../hooks/useSuppliers";

import React from "react";

const SupplierListings = ({ isHome = false }) => {
  // Data from cache/hook
  const { data, isLoading, isError, error } = useSuppliers();

  if (isLoading) return <Spinner loading={true} />;
  if (isError) return <div>Error loading suppliers: {error.message}</div>;

  const suppliersList = data?.results || [];
  const displayedSuppliers = isHome ? suppliersList.slice(0, 5) : suppliersList;

  console.log(suppliersList);

  return (
    <>
      <div>SupplierListings</div>
      <ul>
        {Array.isArray(displayedSuppliers) &&
          displayedSuppliers.map((supplier) => (
            <li key={supplier.id}>{supplier.name}</li>
          ))}
      </ul>
    </>
  );
};

export default SupplierListings;
