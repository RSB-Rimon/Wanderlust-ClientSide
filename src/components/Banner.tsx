
"use client";

import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";

const searchFields = [
  { id: "location", label: "Location", placeholder: "Address, City Or Zip" },
  { id: "date", label: "Date/Duration", placeholder: "Anywhere / 5 days" },
  { id: "budget", label: "Budget", placeholder: "$1-5000" },
  { id: "people", label: "People", placeholder: "0-10" },
] as const;

export default function Banner() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-3.5rem)] w-full flex-col overflow-hidden font-sans">
      <Image
        src="/images/Banner.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-16 pt-20 text-center">
        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.1] text-white sm:text-5xl md:text-6xl">
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/85 md:text-base">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md bg-[#2563eb] px-6 py-3 text-[13px] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#1d4ed8]"
          >
            Explore Now
            <ArrowRightIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="rounded-md border border-white/50 bg-white/10 px-6 py-3 text-[13px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            View Destination
          </button>
        </div>
      </div>

      <form
        className="relative z-10 flex w-full flex-col bg-white shadow-lg md:flex-row md:items-stretch"
        onSubmit={(event) => event.preventDefault()}
      >
        {searchFields.map((field, index) => (
          <div
            key={field.id}
            className={[
              "flex-1 px-6 py-3 text-left",
              index > 0
                ? "border-t border-gray-200 md:border-t-0 md:border-l"
                : "",
            ].join(" ")}
          >
            <label
              htmlFor={field.id}
              className="block text-[13px] font-semibold text-gray-900"
            >
              {field.label}
            </label>
            <input
              id={field.id}
              name={field.id}
              type="text"
              placeholder={field.placeholder}
              className="mt-1 w-full border-0 bg-transparent p-0 text-[13px] text-gray-700 placeholder:text-gray-400 focus:outline-none"
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-[#15A1BF] px-12 py-4 text-[15px] font-medium text-white transition-colors hover:bg-[#118ba5] md:w-[180px]"
        >
          Search
        </button>
      </form>
    </section>
  );
}
