import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterContextProvider,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";

import { useState } from "react";
import ProductListings from "./components/ProductListings";
import SupplierListings from "./components/SupplierListings";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/suppliers" element={<SupplierListings />} />
        <Route path="/products" element={<ProductListings />} />
      </Route>,
    ),
  );

  return (
    <>
      <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
        <RouterProvider router={router} />;
      </div>
    </>
  );
}

//  <>
//       <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
//         <h1>Inventra Inventory</h1>

//         <ProductListings />
//       </div>
//     </>

export default App;
