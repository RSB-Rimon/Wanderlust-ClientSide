"use client";
import Image from "next/image";

export default function HeroTow() {
  return (
    <section className="relative isolate flex w-full flex-col overflow-hidden font-sans">
      <Image
        src="/images/Banner.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center md:py-32">
        <div className="rounded-lg border-2 border-dashed border-[#15A1BF]/50 bg-white/5 px-8 py-10 backdrop-blur-sm md:px-16 md:py-14">
          <h2 className="text-3xl font-semibold text-white md:text-5xl lg:text-6xl">
            Ready To Start Your Journey?
          </h2>
          <p className="mt-4 text-sm text-white/80 md:text-base">
            Join thousands of travelers who have discovered the world with us
          </p>
          <a
            href="#"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-lg transition-colors hover:bg-gray-100"
          >
            BOOK YOUR TRIP TODAY
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
