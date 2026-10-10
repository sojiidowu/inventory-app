import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import useSuppliers from "../hooks/useSuppliers";
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
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle>Suppliers</CardTitle>
          <CardDescription>
            {isHome
              ? "Recent suppliers added to system."
              : "All registered suppliers and contact details."}
          </CardDescription>
        </div>

        {isHome && (
          <Link
            to="/suppliers"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            View All
          </Link>
        )}
      </CardHeader>

      <CardContent>
        {displayedSuppliers.length == 0 ? (
          <p className="py-6 text-center text-muted-foreground text-sm">
            No Suppliers found.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {displayedSuppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell className="font-medium">{supplier.name}</TableCell>
                  <TableCell>{supplier.contact_email || "N/A"}</TableCell>
                  <TableCell>{supplier.phone_number || "N/A"}</TableCell>
                  <TableCell>{supplier.address || "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default SupplierListings;
