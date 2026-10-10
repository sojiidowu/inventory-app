import React from "react";

import { useState } from "react";
import useCreateSupplier from "@/hooks/useCreateSupplier";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { Plus } from "lucide-react";

const AddSupplierForm = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact_email: "",
    phone_number: "",
    address: "",
  });

  const {
    mutate: addSupplier,
    isLoading,
    isError,
    error,
  } = useCreateSupplier();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addSupplier(formData, {
      onSuccess: () => {
        setFormData({
          name: "",
          contact_email: "",
          phone_number: "",
          address: "",
        });
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <PlusCircle className="mr-2 w-4 h-4" />
          Add Supplier
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Supplier</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="">
          {isError && (
            <div className="p-2 text-xs text-red-600 bg-red-50 rounded border border-red-200">
              {error?.response?.data
                ? JSON.stringify(error.response.data)
                : "Failed to create supplier. Please try again."}
            </div>
          )}

          <div className="space-y-1">
            <Label htmlFor="name">Supplier Name *</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Adigun Consolidation"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="contact_email">Email</Label>
            <Input
              id="contact_email"
              name="contact_email"
              type="email"
              placeholder="supplier@example.com"
              value={formData.contact_email}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="phone_number">Phone Number</Label>
            <Input
              id="phone_number"
              name="phone_number"
              type="text"
              placeholder="+234..."
              value={formData.phone_number}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              type="text"
              placeholder="Street address or city"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Supplier"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSupplierForm;
