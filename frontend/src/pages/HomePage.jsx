import { Link } from "react-router-dom";
import HomeCards from "../components/HomeCards";
import SupplierListings from "../components/SupplierListings";
import ProductListings from "@/components/ProductListings";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "lucide-react";

import React from "react";

const HomePage = () => {
  return (
    <>
      <HomeCards />
      <div style={{ padding: "20px" }}>
        <h1>Dashboard Overview</h1>
      </div>

      <div>
        HomePage
        <p>Sinppet of products running low</p>
      </div>

      <SupplierListings isHome={true} />

      <ProductListings isHome={true} />
    </>
  );
};

export default HomePage;
