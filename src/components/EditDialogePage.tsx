
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Save, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Destination = {
  _id?: string;
  destination_id?: string;
  destinationName?: string;
  country?: string;
  category?: string;
  price?: string | number;
  duration?: string;
  departureDate?: string;
  imageUrl?: string;
  description?: string;
};

type Props = {
  data: Destination;
};

const EditDialogePage = ({ data }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    destinationName: "",
    country: "",
    category: "",
    price: "",
    duration: "",
    departureDate: "",
    imageUrl: "",
    description: "",
  });

  // Initialize form once when component mounts or when dialog opens
  useEffect(() => {
    if (open && data) {
      setForm({
        destinationName: data.destinationName ?? "",
        country: (data.country ?? "").toLowerCase(),
        category: (data.category ?? "").toLowerCase(),
        price: String(data.price ?? ""),
        duration: data.duration ?? "",
        departureDate: data.departureDate
          ? String(data.departureDate).slice(0, 10)
          : "",
        imageUrl: data.imageUrl ?? "",
        description: data.description ?? "",
      });
    }
  }, [open]);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    // Reset the form from the selected destination when opening
    if (nextOpen && data) {
      setForm({
        destinationName: data.destinationName ?? "",
        country: (data.country ?? "").toLowerCase(),
        category: (data.category ?? "").toLowerCase(),
        price: String(data.price ?? ""),
        duration: data.duration ?? "",
        departureDate: data.departureDate
          ? String(data.departureDate).slice(0, 10)
          : "",
        imageUrl: data.imageUrl ?? "",
        description: data.description ?? "",
      });
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const destinationId = data?._id ?? data?.destination_id;

    if (!destinationId) {
      console.error("Destination ID is missing:", data);
      alert("Destination ID পাওয়া যায়নি!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/destinations/${destinationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            price: form.price === "" ? "" : Number(form.price),
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.message || "Destination update failed"
        );
      }

      console.log("Updated successfully:", result);
      setOpen(false);
    } catch (error) {
      console.error("Failed to update destination:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button variant="outline" type="button">
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
        }
      />

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Destination</DialogTitle>
          <DialogDescription>
            Update your travel package details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="destinationName">
              Destination Name
            </Label>
            <Input
              id="destinationName"
              placeholder="Bali Paradise"
              value={form.destinationName}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  destinationName: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select
                value={form.country}
                onValueChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    country: value ?? "",
                  }))
                }
              >
                <SelectTrigger id="country" className="w-full">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="indonesia">Indonesia</SelectItem>
                  <SelectItem value="japan">Japan</SelectItem>
                  <SelectItem value="switzerland">
                    Switzerland
                  </SelectItem>
                  <SelectItem value="thailand">Thailand</SelectItem>
                  <SelectItem value="france">France</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={form.category}
                onValueChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    category: value ?? "",
                  }))
                }
              >
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beach">Beach</SelectItem>
                  <SelectItem value="mountain">Mountain</SelectItem>
                  <SelectItem value="city">City</SelectItem>
                  <SelectItem value="adventure">Adventure</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                placeholder="e.g. 1299"
                value={form.price}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    price: e.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                placeholder="7 Days/6 Nights"
                value={form.duration}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    duration: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="departureDate">Departure Date</Label>
            <Input
              id="departureDate"
              type="date"
              value={form.departureDate}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  departureDate: e.target.value,
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={form.imageUrl}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  imageUrl: e.target.value,
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the travel experience..."
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={4}
              className="resize-none"
            />
          </div>

          <DialogFooter>
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  disabled={loading}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              }
            />

            <Button
              type="submit"
              disabled={loading}
              className="bg-[#15A1BF] text-white hover:bg-[#118ba5]"
            >
              <Save className="mr-2 h-4 w-4" />
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialogePage;
