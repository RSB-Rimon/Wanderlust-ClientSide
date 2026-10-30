import { headers } from "next/headers";
import { auth } from "../lib/auth";
import MyBookingCard from "../../components/my-booking-card";

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  const res = await fetch(`http://localhost:5000/my-bookings/${user?.email}`);
  const bookingByUser = await res.json();

  console.log(bookingByUser, "this is booking by user data show in console");
  console.log(user);

  // Handle both array and single object responses
  const bookings = Array.isArray(bookingByUser) ? bookingByUser : bookingByUser ? [bookingByUser] : [];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-2">My Bookings</h1>
        <p className="text-slate-500 mb-8">Manage and view your upcoming travel plans</p>

        <div>
          {bookings.length > 0 ? (
            bookings.map((item) => (
              <MyBookingCard key={item._id || item.id} item={item} />
            ))
          ) : (
            <p className="text-slate-400">No bookings found.</p>
          )}
        </div>  
      </div>
    </div>
  );
};

export default MyBookingPage;
