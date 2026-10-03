import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

import React from "react";

const MaunLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto p-6"></main>
      <Outlet />
    </div>
  );
};

export default MaunLayout;
