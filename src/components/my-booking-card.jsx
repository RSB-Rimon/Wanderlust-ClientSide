'use client'
import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';
import { redirect } from 'next/navigation';

const MyBookingCard = ({ item }) => {
  // Default to Confirmed if no status in data
  const status = item.status || 'Confirmed';
  const statusColor = status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                      status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700';


  const handleCancelBooking = async ()=>{
    const res = await fetch(`http://localhost:5000/my-bookings/${item._id}`,{
      method:"DELETE",
    });
    const data = await res.json();
    console.log(data);
    redirect("/my-bookings")
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 bg-white border rounded-2xl p-4 shadow-sm w-full max-w-4xl mb-6">
      {/* Image */}
      <div className="w-full md:w-72 h-48 rounded-xl overflow-hidden shrink-0">
       <Image
  src={
    item.image ||
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop"
  }
  alt={item.title || "Image"}
  width={400}
  height={300}
  className="w-full h-full object-cover"
  unoptimized
/>



      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Status */}
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${statusColor}`}>
            {status}
          </span>

          {/* Title */}
          <h2 className="text-2xl font-bold text-slate-800 mb-3">{item.title}</h2>

          {/* Details */}
          <div className="space-y-1 text-sm text-slate-500 mb-4">
            <div className="flex items-center gap-2">
              <span>📅</span>
              <span>Departure: {item.departureDate || item.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span>Booking ID: {item.bookingId || item.id || item._id}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>👤</span>
              <span>User: {item.username || item.email}</span>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-extrabold text-cyan-600">${item.price}</span>
          <div className="flex gap-2">
            <Button 
            variant='outline'
            onClick={handleCancelBooking}
            className="px-4 py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 text-sm font-medium transition">

              ❌ Cancel
            </Button>
            
            <button className="px-4 py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 text-sm font-medium transition">
              👁️ View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookingCard;
