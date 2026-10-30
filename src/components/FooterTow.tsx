"use client";
import { ArrowRight } from "lucide-react";

export default function FooterTow() {
  return (
    <footer className="w-full bg-[#0a0a0a] px-6 py-14 text-white font-sans md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + Newsletter */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold tracking-tight">Wanderlast</h2>
            <p className="mt-2 text-xs text-gray-400 leading-relaxed">
              Your gateway to extraordinary travel experiences around the world.
            </p>
            <div className="mt-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">NEWSLETTER</h3>
              <p className="mt-2 text-[11px] text-gray-500">Subscribe for exclusive offers and trip inspiration</p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-3 flex items-center rounded-md border border-gray-700 bg-[#141414] px-3 py-2"
              >
                <input
                  type="email"
                  placeholder="Enter email"
                  className="flex-1 bg-transparent text-xs text-white placeholder:text-gray-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="ml-2 text-white hover:text-[#15A1BF] transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">QUICK LINKS</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-gray-300">
              {["Home", "Destinations", "My Bookings", "My Profile"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-[13px] hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">SUPPORT</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-gray-300">
              {["Help Center", "Terms of Service", "Privacy Policy"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-[13px] hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">CONTACT US</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-gray-300">
              <li className="text-[13px]">760 901 9122</li>
              <li>
                <a href="#" className="text-[13px] hover:text-white transition-colors">info@wanderlast.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-6 md:flex-row md:gap-0">
          <p className="text-[11px] text-gray-500">© 2020 wanderlust. All rights reserved.</p>
          <div className="flex gap-4">
            {["X", "in", "ig"].map((social) => (
              <a
                key={social}
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-700 text-xs text-gray-400 hover:border-white hover:text-white transition-colors"
                aria-label={social}
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
