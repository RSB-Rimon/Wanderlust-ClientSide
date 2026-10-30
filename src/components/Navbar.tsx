"use client";

import Image from "next/image";
import Link from "next/link";
import { UserIcon, Menu, X } from "lucide-react";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Destinations", href: "/all-destinations" },
  { name: "Add-Destination", href: "/add-destination" },
  { name: "My Bookings", href: "/my-bookings" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user);

  // signOut code here

  const handleSignOut = () => {
    authClient.signOut();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white font-sans">
      <nav className="relative mx-auto flex h-14 max-w-[1600px] items-center justify-between px-4 md:px-6">
        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={
                  link.name === "Home"
                    ? "block rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-[#15A1BF] transition-colors hover:bg-gray-200"
                    : "block rounded-lg px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                }
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="relative z-20 rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>

        {/* Logo */}
        <Link
          href="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          aria-label="Wanderlust home"
        >
          <Image
            src="/images/Wanderlast.png"
            alt="Wanderlust"
            width={162}
            height={24}
            className="h-6 w-auto"
            priority
          />
        </Link>

        {/* User Actions */}
        <div className="flex items-center gap-3 text-sm text-gray-600 sm:gap-4 md:gap-5">
          <Link
            href="/profile"
            className="flex items-center gap-1.5 transition-colors hover:text-gray-900"
          >
            <UserIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </Link>

          {user ? (
            <Popover>
              <PopoverTrigger
                render={
                  <Avatar>
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={user?.image as string}
                    />
                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                }
              >
                Open Popover
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>{user?.name}</PopoverTitle>
                  <PopoverDescription>
                    <p>{user?.email}</p>
                  </PopoverDescription>

                  <Button onClick={handleSignOut} variant={"destructive"}>
                    SignOut
                  </Button>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="transition-colors hover:text-gray-900"
              >
                SignIn
              </Link>

              <Link
                href="/sign-up"
                className="transition-colors hover:text-gray-900"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-4 pb-6 pt-4 shadow-lg md:hidden">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={
                    link.name === "Home"
                      ? "block rounded-lg bg-gray-100 px-4 py-3 text-sm font-medium text-[#15A1BF] hover:bg-gray-200"
                      : "block rounded-lg px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
