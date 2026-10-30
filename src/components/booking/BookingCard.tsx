
'use client';

import { ArrowLeft, CalendarDays, Check } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "@base-ui/react";
import { authClient } from "@/lib/auth-client";
import { email } from "better-auth";

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

const BookingCard = ({
  destination,
}: {
  destination: RawDestination;
}) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user,'user')
const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const departureDate = formData.get("departureDate");

  console.log("departureDate:", departureDate);

  const data = {
    username: user?.name,
    email: user?.email,
    image : user?.image,
    ...destination,
    departureDate : departureDate,
    bookingData : new Date()
    
}
const res = await fetch("http://localhost:5000/booking", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});
  const bookingData = await res.json()
  console.log(bookingData)
};

  return (
    <div>
      <aside className="rounded-3xl bg-white p-6 shadow-[0_4px_24px_rgba(16,24,40,0.06)] ring-1 ring-gray-100 lg:p-8">
        <div className="flex items-baseline gap-2">
          <span className="text-xs font-medium text-gray-400">
            Starting from
          </span>
          <span className="text-3xl font-extrabold text-[#15A1BF]">
            ${destination.price}
          </span>
          <span className="text-xs text-gray-400">per person</span>
        </div>

        <form onSubmit={handleBooking}>
          <div className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="date"
                className="mb-1.5 block text-xs font-semibold text-gray-500"
              >
                Select Departure Date
              </label>

              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <input
                  name="departureDate"
                  id="date"
                  type="date"
                  defaultValue={destination.departureDate}
                  required
                  className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm text-gray-700 outline-none transition-colors focus:border-[#15A1BF] focus:ring-2 focus:ring-[#15A1BF]/10"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="mt-6 h-11 w-full rounded-xl bg-[#15A1BF] text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#118ba5]"
          >
            Book Now
            <ArrowLeft className="ml-1.5 h-4 w-4 rotate-180" />
          </Button>
        </form>

        <Separator className="my-6 bg-gray-100" />

        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Perks
          </h3>

          <ul className="space-y-2.5">
            {[
              "Free cancellation up to 7 days",
              "Ticket insurance included",
              "24/7 customer support",
            ].map((perk) => (
              <li
                key={perk}
                className="flex items-center gap-2 text-xs text-gray-500"
              >
                <Check className="h-3.5 w-3.5 text-emerald-500" />
                {perk}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default BookingCard;
