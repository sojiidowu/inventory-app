import { Link, useLocation } from "react-router-dom";
import { buttonVariants } from "./ui/button";
import {
  Package,
  Users,
  PlusCircle,
  LayoutDashboard,
  Boxes,
} from "lucide-react";

import React from "react";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6">
        {/* Brand / Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <Boxes className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg tracking-tight">
            Inventory Hub
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-2 text-sm font-medium">
          <Link
            to="/"
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${isActive("/") ? "bg-secondary text-secondary-foreground font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"}`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>

          <Link
            to="/suppliers"
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
              isActive("/suppliers")
                ? "bg-secondary text-secondary-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }`}
          >
            <Users className="h-4 w-4" />
            Suppliers
          </Link>

          <Link
            to="/products"
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
              isActive("/products")
                ? "bg-secondary text-secondary-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }`}
          >
            <Package className="h-4 w-4" />
            Products
          </Link>
        </nav>

        {/* Qucik Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/suppliers/add"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Supplier
          </Link>

          <Link
            to="/products/add"
            className={buttonVariants({ variant: "default", size: "sm" })}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </div>
      </div>
    </header>

    // <nav>
    // <a href="/">Home</a>

    // <a href="">Add Suppliers</a>

    // <a href="">Add Products</a>
    // </nav>
  );
};

export default Navbar;
