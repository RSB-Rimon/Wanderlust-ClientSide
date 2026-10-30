"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddDestination() {
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  const res = await fetch('http://localhost:5000/add-destination',{
    method :"POST",
     headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(form )
  });
  const data = await res.json()
  console.log('data',data)

   
  };
  // console.log(form)

  return (
    <main className="min-h-screen bg-[#f7fbff] px-6 py-10 font-sans md:px-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold text-gray-900 md:text-4xl">
          Add New Travel Package
        </h1>

        <form
          className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-[0_4px_24px_rgba(16,24,40,0.06)] md:p-10"
          onSubmit={handleSubmit}
        >
          <div className="space-y-6">
            {/* Destination Name */}
            <div className="space-y-2">
              <Label htmlFor="destinationName" className="text-sm font-semibold text-gray-800">
                Destination Name
              </Label>
              <Input
                id="destinationName"
                placeholder="Bali Paradise"
                value={form.destinationName}
                onChange={(e) => setForm({ ...form, destinationName: e.target.value })}
                className="rounded-lg bg-gray-50 text-sm text-gray-900 placeholder:text-gray-400"
              />
            </div>

            {/* Country + Category */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="country" className="text-sm font-semibold text-gray-800">Country</Label>
                <Select
                  value={form.country}
                  onValueChange={(v) => setForm({ ...form, country: v ?? "" })}
                >
                  <SelectTrigger id="country" className="w-full rounded-lg bg-gray-50 text-sm text-gray-900 placeholder:text-gray-400">
                    <SelectValue placeholder="Indonesia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="indonesia">Indonesia</SelectItem>
                    <SelectItem value="japan">Japan</SelectItem>
                    <SelectItem value="switzerland">Switzerland</SelectItem>
                    <SelectItem value="thailand">Thailand</SelectItem>
                    <SelectItem value="france">France</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-semibold text-gray-800">Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm({ ...form, category: v ?? "" })}
                >
                  <SelectTrigger id="category" className="w-full rounded-lg bg-gray-50 text-sm text-gray-900 placeholder:text-gray-400">
                    <SelectValue placeholder="Beach" />
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

            {/* Price + Duration */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm font-semibold text-gray-800">Price (USD)</Label>
                <Input
                  id="price"
                  placeholder="e.g. 1299"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="rounded-lg bg-gray-50 text-sm text-gray-900 placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-sm font-semibold text-gray-800">Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g. 7 Days/6 Nights"
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  className="rounded-lg bg-gray-50 text-sm text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Departure Date */}
            <div className="space-y-2">
              <Label htmlFor="departureDate" className="text-sm font-semibold text-gray-800">Departure Date</Label>
              <Input
                id="departureDate"
                type="date"
                value={form.departureDate}
                onChange={(e) => setForm({ ...form, departureDate: e.target.value })}
                className="rounded-lg bg-gray-50 text-sm text-gray-900 placeholder:text-gray-400"
              />
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label htmlFor="imageUrl" className="text-sm font-semibold text-gray-800">Image URL</Label>
              <Input
                id="imageUrl"
                placeholder="https://example.com/image.jpg"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                className="rounded-lg bg-gray-50 text-sm text-gray-900 placeholder:text-gray-400"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-semibold text-gray-800">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the travel experience..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={4}
                className="rounded-xl bg-gray-50 text-sm text-gray-900 placeholder:text-gray-400 resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex items-center justify-end gap-3">
            <Button
              variant="outline"
              type="button"
              className="h-10 rounded-xl border-red-200 px-5 text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="mr-1.5 h-4 w-4" />
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-10 rounded-xl bg-[#15A1BF] px-5 text-sm font-medium text-white hover:bg-[#118ba5]"
            >
              <Plus className="mr-1.5 h-4 w-4" />
              Add Travel Package
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
