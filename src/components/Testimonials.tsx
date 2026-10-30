"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const testimonials = [
  {
    quote: `"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."`,
    name: "Michael Chen",
    location: "Singapore",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&q=80",
  },
  {
    quote: `"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"`,
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face&q=80",
  },
  {
    quote: `"Japan Cherry Blossom Tour Was A Dream Come True. The Itinerary Was Perfect And The Local Guides Made Every Moment Special."`,
    name: "David Park",
    location: "Seoul, Korea",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&q=80",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full bg-gradient-to-b from-[#f0f7fc] via-[#f7fbff] to-[#edf5fd] px-6 py-16 font-sans md:py-20">
      <div className="mx-auto max-w-5xl">
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <div className="relative flex items-start justify-between mb-4 md:mb-2">
            <div>
              <h2 className="text-3xl font-semibold text-gray-900 md:text-4xl">What Travelers Say</h2>
              <p className="mt-2 text-sm text-gray-500 md:text-base">Real experiences from our happy travelers</p>
            </div>
            <div className="flex gap-2 relative z-10">
              <CarouselPrevious className="static translate-y-0 rotate-0 rounded-full h-9 w-9 shadow-md bg-white hover:bg-gray-50 border border-gray-200" />
              <CarouselNext className="static translate-y-0 rotate-0 rounded-full h-9 w-9 shadow-md bg-white hover:bg-gray-50 border border-gray-200" />
            </div>
          </div>

          <div className="rounded-2xl border-2 border-dashed border-[#15A1BF]/40 bg-white/60 p-6 md:p-8">
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((t) => (
                <CarouselItem key={t.name} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/2">
                  <div className="flex h-full gap-6 rounded-xl bg-white p-6 shadow-[0_4px_24px_rgba(16,24,40,0.06)] md:p-8 md:flex-row md:items-center md:gap-10">
                    <div className="flex-1 min-w-0">
                      <blockquote className="text-sm font-medium leading-relaxed text-gray-800 md:text-base">
                        {t.quote}
                      </blockquote>
                      <div className="mt-5 flex items-center gap-3">
                        <a href="#" className="text-sm font-semibold text-[#15A1BF] hover:underline">
                          — {t.name}
                        </a>
                      </div>
                      <p className="text-xs text-gray-400">{t.location}</p>
                    </div>
                    <div className="shrink-0">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="h-28 w-28 rounded-lg object-cover shadow-md md:h-36 md:w-36"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
        </Carousel>
      </div>
    </section>
  );
}
