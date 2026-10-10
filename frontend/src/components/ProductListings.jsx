import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import useProducts from "../hooks/useProducts";
import { Link } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            {isHome
              ? "Recent inventory additions."
              : "Full inventory catalog and stock levels."}
          </CardDescription>
        </div>

        {isHome && (
          <Link
            to="/products"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            View All
          </Link>
        )}
      </CardHeader>

      <CardContent>
        {displayedProducts.length == 0 ? (
          <p className="py-6 text-center text-muted-foreground text-sm">
            No products found.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product sName</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock Level</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {displayedProducts.map((product) => {
                const currentStock = product.stock_quantity ?? 0;
                const threshold = 5;
                const isLowStock = currentStock <= threshold;

                return (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>{product.sku || "N/A"}</TableCell>
                    <TableCell>{product.price || "N/A"}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{currentStock}</span>
                        {isLowStock && (
                          <Badge
                            variant="destructive"
                            className="text-xs px-1.5 py-0"
                          >
                            Low Stock
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductListings;
