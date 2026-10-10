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
import SuppliersPage from "./pages/SuppliersPage";
import ProductsPage from "./pages/ProductsPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductPage from "./pages/ProductPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/suppliers" element={<SuppliersPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductPage />} />

        <Route path="*" element={<NotFoundPage />} />
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
