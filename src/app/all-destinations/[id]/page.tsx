import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Check, Star, Clock, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import EditDialogePage from "@/components/EditDialogePage";
import DeleteDestinationsDialog from "@/components/DeleteDestinationsDialog";
import BookingCard from "@/components/booking/BookingCard";

export default async function DestinationDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) {
    return (
      <main className="min-h-screen bg-[#f7fbff] font-sans">
        <div className="mx-auto max-w-6xl px-4 pt-10 text-center md:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Invalid Destination</h1>
          <p className="mt-4 text-gray-500">No destination ID was provided.</p>
          <Link href="/all-destinations" className="mt-6 inline-block rounded-full bg-[#15A1BF] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#118ba5]">
            Back to Destinations
          </Link>
        </div>
      </main>
    );
  }

  let data = null;
  try {
    const res = await fetch(`http://localhost:5000/destinations/${encodeURIComponent(id)}`, {
      cache: "no-store",
    });
    if (res.ok) {
      data = await res.json();
    }
  } catch {
    data = null;
  }

  interface RawDestination {
    id?: string;
    _id?: string;
    title?: string;
    destinationName?: string;
    name?: string;
    country?: string;
    location?: string;
    image?: string;
    imageUrl?: string;
    image_url?: string;
    rating?: number;
    reviews?: number;
    reviewCount?: number;
    duration?: string;
    price?: string | number;
    date?: string;
    departureDate?: string;
    overview?: string;
    description?: string;
    highlights?: string[];
  }

  // Normalize API response fields to details page fields
  function normalizeDestination(raw: RawDestination | null) {
    if (!raw) return null;
    return {
      id: raw.id || raw._id || id,
      title: raw.title || raw.destinationName || raw.name || "Unknown Destination",
      country: raw.country || raw.location || "Unknown",
      image: raw.image || raw.imageUrl || raw.image_url || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=600&fit=crop&q=80",
      rating: typeof raw.rating === "number" ? raw.rating : 4.6,
      reviews: raw.reviews || raw.reviewCount || 0,
      duration: raw.duration || "7 Days / 6 Nights",
      price: typeof raw.price === "number" ? raw.price : parseFloat(String(raw.price || 1299).replace(/[^0-9.]/g, "")) || 1299,
      date: raw.date || raw.departureDate || "05/15/2026",
      overview: raw.overview || raw.description || "Discover the beauty of this amazing destination with unforgettable experiences, vibrant culture, and stunning landscapes.",
      highlights: Array.isArray(raw.highlights) && raw.highlights.length > 0 ? raw.highlights : [
        "Luxury accommodation",
        "Local guided tours",
        "Free cancellation",
        "24/7 customer support",
        "Ticket insurance included",
      ],
    };
  }

  const normalizedData = normalizeDestination(data);

  // Fallback demo data matching image
  const destination = normalizedData || {
    id,
    title: "Bali Paradise",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&h=600&fit=crop&q=80",
    rating: 4.9,
    reviews: 234,
    duration: "7 Days / 6 Nights",
    price: 1299,
    date: "05/15/2026",
    overview:
      "Discover the magic of Bali with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets.",
    highlights: [
      "Luxury beachfront accommodation",
      "Visit Uluwatu Temple at sunset",
      "Traditional Balinese spa treatment",
      "Private beach dinner experience",
      "Sunrise trek to Mount Batur",
      "Ticket insurance included",
      "24/7 customer support",
    ],
  };

  return (
    <main className="min-h-screen bg-[#f7fbff] font-sans">
      {/* Top Bar */}
      <div className="mx-auto max-w-6xl px-4 pt-6 md:px-8 md:pt-8">
        <div className="flex items-center justify-between">
          <Link
            href="/all-destinations"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-100 transition-colors hover:text-[#15A1BF] hover:ring-[#15A1BF]/20"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Destinations
          </Link>
          <div className="flex gap-2">
         
            <EditDialogePage
              data={{
                _id: data?._id ?? data?.id ?? id,
                destination_id: data?.destination_id ?? data?.id ?? data?._id ?? id,
                destinationName:
                  data?.destinationName ??
                  data?.name ??
                  data?.title ??
                  destination.title ??
                  "",
                country: (
                  data?.country ??
                  data?.location ??
                  destination.country ??
                  ""
                ).toLowerCase(),
                category: (data?.category ?? "").toLowerCase(),
                price:
                  data?.price !== undefined && data?.price !== null
                    ? data.price
                    : destination.price ?? "",
                duration:
                  data?.duration ??
                  destination.duration ??
                  "",
                departureDate:
                  data?.departureDate
                    ? String(data.departureDate).slice(0, 10)
                    : data?.date
                      ? String(data.date).slice(0, 10)
                      : destination.date ?? "",
                imageUrl:
                  data?.imageUrl ??
                  data?.image_url ??
                  data?.image ??
                  destination.image ??
                  "",
                description:
                  data?.description ??
                  data?.overview ??
                  destination.overview ??
                  "",
              }}
            />
       <DeleteDestinationsDialog id={id} />
            
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <section className="mx-auto mt-6 max-w-6xl px-4 md:mt-8 md:px-8">
        <div className="relative overflow-hidden rounded-3xl shadow-lg">
          <Image
            src={destination.image}
            alt={destination.title}
            width={1200}
            height={600}
            className="h-[320px] w-full object-cover md:h-[420px]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-12">
          {/* Left Column */}
          <div>
            {/* Title Area */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#15A1BF]/10 px-2.5 py-0.5 text-xs font-semibold text-[#15A1BF]">
                {destination.country}
              </span>
            </div>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              {destination.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="inline-flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <strong className="text-gray-900">{destination.rating}</strong>
                <span>({destination.reviews} reviews)</span>
              </span>
              <span className="hidden h-4 w-px bg-gray-300 md:block" />
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{destination.duration}</span>
              </span>
            </div>

            <Separator className="my-8 bg-gray-200" />

            {/* Overview */}
            <h2 className="text-xl font-semibold text-gray-900">Overview</h2>
            <p className="mt-3 leading-relaxed text-gray-600">{destination.overview}</p>

            {/* Highlights */}
            <h2 className="mt-10 text-xl font-semibold text-gray-900">Highlights</h2>
            <ul className="mt-5 grid gap-3 md:grid-cols-2">
              {destination.highlights.map((item: string) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Sidebar */}
         <BookingCard destination={destination} />
        </div>
      </section>
    </main>
  );
}
