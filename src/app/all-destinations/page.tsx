"use client";

import React, { useEffect, useState } from "react";
import { Star, MapPin, ArrowUpRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Link from "next/link";

interface Destination {
  id?: string;
  _id?: string;
  destinationName: string;
  country: string;
  category: string;
  price: string | number;
  duration: string;
  imageUrl: string;
  rating?: number;
  description?: string;
}

const CATEGORIES = ["All", "Beach", "Mountain", "City", "Adventure"];
const PRICE_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Under $1000", value: "under-1000" },
  { label: "$1000 - $2000", value: "1000-2000" },
  { label: "$2000 - $3000", value: "2000-3000" },
  { label: "Over $3000", value: "over-3000" },
];
const SORT_OPTIONS = [
  { label: "Popular", value: "popular" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

export default function AllDestinationsPage() {
  const [data, setData] = useState<Destination[]>(mockDestinations);
  const [loading, setLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortOption, setSortOption] = useState("popular");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:5000/destinations");
        if (res.ok) {
          const json = await res.json();
          const arr = Array.isArray(json) ? json : json.destinations || json.data || [];
          setData(arr.map((d: Destination) => ({ ...d, rating: d.rating ?? 4.6 })));
        } else {
          throw new Error("Fetch failed");
        }
      } catch {
        setData(mockDestinations);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = data.filter((d) => {
    const catMatch = categoryFilter === "All" || d.category?.toLowerCase() === categoryFilter.toLowerCase();
    if (!catMatch) return false;

    const priceNum = typeof d.price === "number" ? d.price : parseFloat(String(d.price).replace(/[^0-9.]/g, "")) || 0;
    if (priceFilter === "under-1000") return priceNum < 1000;
    if (priceFilter === "1000-2000") return priceNum >= 1000 && priceNum <= 2000;
    if (priceFilter === "2000-3000") return priceNum >= 2000 && priceNum <= 3000;
    if (priceFilter === "over-3000") return priceNum > 3000;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortOption === "price-asc") {
      const pa = typeof a.price === "number" ? a.price : parseFloat(String(a.price).replace(/[^0-9.]/g, "")) || 0;
      const pb = typeof b.price === "number" ? b.price : parseFloat(String(b.price).replace(/[^0-9.]/g, "")) || 0;
      return pa - pb;
    }
    if (sortOption === "price-desc") {
      const pa = typeof a.price === "number" ? a.price : parseFloat(String(a.price).replace(/[^0-9.]/g, "")) || 0;
      const pb = typeof b.price === "number" ? b.price : parseFloat(String(b.price).replace(/[^0-9.]/g, "")) || 0;
      return pb - pa;
    }
    return 0;
  });

  return (
    <main className="min-h-screen bg-[#f7fbff] px-4 py-10 font-sans md:px-12 md:py-16">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-5xl">Explore All Destinations</h1>
          <p className="mt-3 text-sm text-gray-500 md:text-base">Find your perfect travel experience from our curated collection</p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-3 md:gap-4">
          <div className="relative">
            <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v || "All")}>
              <SelectTrigger className="w-48 rounded-full border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-[#15A1BF]/20">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c} className="rounded-lg text-sm">
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <Select value={priceFilter} onValueChange={(v) => setPriceFilter(v || "all")}>
              <SelectTrigger className="w-48 rounded-full border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-[#15A1BF]/20">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                {PRICE_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value} className="rounded-lg text-sm">
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <Select value={sortOption} onValueChange={(v) => setSortOption(v || "popular")}>
              <SelectTrigger className="w-48 rounded-full border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-[#15A1BF]/20">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                {SORT_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value} className="rounded-lg text-sm">
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-4 text-xs text-gray-400">
          Showing {sorted.length} {sorted.length === 1 ? "destination" : "destinations"}
        </div>

        {/* Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-3xl bg-white shadow-md">
                <div className="aspect-[4/3] animate-pulse bg-gray-200" />
                <div className="p-5">
                  <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                  <div className="mt-3 h-6 w-3/4 animate-pulse rounded bg-gray-200" />
                  <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sorted.map((item) => (
              <Link key={item.id || item._id || item.destinationName} href={`/all-destinations/${item.id || item._id || item.destinationName}`} className="group block overflow-hidden rounded-3xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.imageUrl || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"}
                    alt={item.destinationName}
                    height={400}
                    width={400}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Rating Badge */}
                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-gray-800 shadow-sm backdrop-blur-sm">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span>{item.rating ?? 4.6}</span>
                  </div>
                </div>

                <div className="p-5">
                  {/* Location */}
                  <div className="flex items-center gap-1 text-xs font-medium text-gray-400">
                    <MapPin className="h-3.5 w-3.5 text-[#15A1BF]" />
                    <span>{item.country || item.destinationName}</span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-1 text-lg font-semibold text-gray-900 group-hover:text-[#15A1BF] transition-colors">
                    {item.destinationName}
                  </h3>

                  {/* Duration */}
                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                    <span className="rounded-md bg-gray-50 px-1.5 py-0.5 text-[11px] font-medium text-gray-600">{item.duration}</span>
                  </div>

                  {/* Price + CTA */}
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <span className="text-xs text-gray-400">Starting from</span>
                      <div className="text-xl font-bold text-gray-900">${typeof item.price === "number" ? item.price.toLocaleString() : String(item.price).replace(/[^0-9.]/g, "") || 0}<span className="text-sm font-normal text-gray-400">/Person</span></div>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#15A1BF]/10 px-3 py-1.5 text-xs font-semibold text-[#15A1BF] transition-colors hover:bg-[#15A1BF] hover:text-white">
                      Book Now
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {sorted.length === 0 && !loading && (
          <div className="py-20 text-center">
            <p className="text-gray-400">No destinations match your filters.</p>
          </div>
        )}
      </div>
    </main>
  );
}

const mockDestinations: Destination[] = [
  {
    id: "1",
    destinationName: "Bali Paradise",
    country: "Nepal",
    category: "Beach",
    price: 2700,
    duration: "7 Days/6 Nights",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    rating: 4.6,
  },
  {
    id: "2",
    destinationName: "Bali Paradise",
    country: "Nepal",
    category: "Beach",
    price: 2700,
    duration: "7 Days/6 Nights",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    rating: 4.5,
  },
  {
    id: "3",
    destinationName: "Bali Paradise",
    country: "Nepal",
    category: "Mountain",
    price: 2700,
    duration: "7 Days/6 Nights",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    rating: 4.6,
  },
  {
    id: "4",
    destinationName: "Bali Paradise",
    country: "Nepal",
    category: "Mountain",
    price: 2700,
    duration: "7 Days/6 Nights",
    imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
    rating: 4.5,
  },
  {
    id: "5",
    destinationName: "Bali Paradise",
    country: "Nepal",
    category: "Beach",
    price: 2700,
    duration: "7 Days/6 Nights",
    imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    rating: 4.5,
  },
  {
    id: "6",
    destinationName: "Bali Paradise",
    country: "Nepal",
    category: "City",
    price: 2700,
    duration: "7 Days/6 Nights",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    rating: 4.5,
  },
];
