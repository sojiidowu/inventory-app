import React from "react";

import useProduct from "@/hooks/useProduct";
import { useParams, Link, useNavigate } from "react-router-dom";
import Spinner from "@/components/Spinner";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, isError, error } = useProduct(id);

  if (isLoading) return <Spinner loading={true} />;
  if (isError) return <div>Error loading product: {error.message}</div>;
  if (!product) return <div>Product not found.</div>;

  const currentStock = product.stock_quantity ?? 0;
  const isLowStock = currentStock <= 5;

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      {/* Back Button */}
      <div>
        <Link
          to="/products"
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
        </Link>
      </div>

      {/* Product Card */}
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <CardTitle className="text-2xl font-bold">
                {product.name}
              </CardTitle>
              {isLowStock && (
                <Badge variant="destructive" className="text-xs">
                  LowStock
                </Badge>
              )}
            </div>

            <CardDescription className="mt-1">
              SKU: {product.sku || "N/A"}
            </CardDescription>
          </div>

          <div>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-1" /> Edit
            </Button>
            <Button variant="destructive" size="sm">
              <Trash2 className="w-4 h-4 mr-1" /> Delete
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 pt-2">
            <div className="bg-muted/50 p-4 rounded-lg">
              <span className="text-sm text-muted-foreground block">Price</span>
              <span className="text-2xl font-semibold">
                {product.price ? `$${product.price}` : "N/A"}
              </span>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <span className="text-sm text-muted-foreground block">
                Stock Quantity
              </span>
              <span className="text-2xl font-semibold">{currentStock}</span>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <span className="text-sm text-muted-foreground block">
                Last Updated
              </span>
              <span className="text-sm font-medium mt-1 block">
                {product.updated_at
                  ? new Date(product.updated_at).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Description
            </h3>
            <p className="text-sm leading-relaxed">
              {product.description ||
                "No description provided for this product."}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Supplier Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Supplier Information</CardTitle>
          <CardDescription>
            Associated vendor details for reordering.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {product.supplier ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground block">
                  Supplier Name
                </span>
                <span className="font-medium text-base">
                  {product.supplier.name}
                </span>
              </div>

              <div>
                <span className="text-muted-foreground block">
                  Contact Email
                </span>
                <span className="font-medium">
                  {product.supplier.contact_email || "N/A"}
                </span>
              </div>

              <div>
                <span className="text-muted-foreground block">
                  Phone Number
                </span>
                <span className="font-medium">
                  {product.supplier.phone_number || "N/A"}
                </span>
              </div>

              <div>
                <span className="text-muted-foreground block">Address</span>
                <span className="font-medium">
                  {product.supplier.address || "N/A"}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No supplier assigned to this product.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductPage;
