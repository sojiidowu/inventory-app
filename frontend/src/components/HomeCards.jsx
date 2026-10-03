import React from "react";
import useSuppliers from "../hooks/useSuppliers";
import useProducts from "../hooks/useProducts";
import { Link } from "react-router-dom";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "lucide-react";

const HomeCards = () => {
  const { data: supplierData, isLoading: loadingSuppliers } = useSuppliers();
  const { data: productData, isLoading: loadingProducts } = useProducts();

  return (
    <>
      <div className="p-8 space-y-6 bg-slate-950 text-white min-h-screen">
        {/* Stat Card Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Suppliers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                <p>{loadingSuppliers ? "..." : supplierData?.count || 0}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {loadingSuppliers ? "..." : productData?.count || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Low Stock Alerts
              </CardTitle>
              <Badge variant="destructive">Action Required</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">3</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold">Quick Actions</h2>
          <div className="flex gap-3">
            <Link
              to="/suppliers"
              className={buttonVariants({ Variant: "default" })}
            >
              Manage Suppliers
            </Link>

            <Link
              to="/products"
              className={buttonVariants({ variant: "outline" })}
            >
              Manage Products
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeCards;
