"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function BookingForm({
  boatId,
  ownerEmail,
  boatName,
}: {
  boatId: number;
  ownerEmail: string;
  boatName: string;
}) {
  const [customerName, setCustomerName] =
    useState("");
  const [customerEmail, setCustomerEmail] =
    useState("");
  const [customerPhone, setCustomerPhone] =
    useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const { error } = await supabase
      .from("bookings")
      .insert([
        {
          boat_id: boatId,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
          message,
          status: "pending",
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    await fetch("/api/send-booking-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ownerEmail,
        boatName,
        customerName,
        customerEmail,
        customerPhone,
        message,
      }),
    });

    window.location.href = "/booking-success";
  }

  return (
    <div className="mt-8 bg-slate-800 p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-4">
        Request Booking
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Your Name"
          value={customerName}
          onChange={(e) =>
            setCustomerName(e.target.value)
          }
          className="w-full p-4 rounded-lg bg-white text-black"
        />

        <input
          type="email"
          placeholder="Your Email"
          value={customerEmail}
          onChange={(e) =>
            setCustomerEmail(e.target.value)
          }
          className="w-full p-4 rounded-lg bg-white text-black"
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={customerPhone}
          onChange={(e) =>
            setCustomerPhone(e.target.value)
          }
          className="w-full p-4 rounded-lg bg-white text-black"
        />

        <textarea
          rows={4}
          placeholder="Message"
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          className="w-full p-4 rounded-lg bg-white text-black"
        />

        <button
          type="submit"
          className="bg-blue-600 px-6 py-3 rounded-lg"
        >
          Send Request
        </button>
      </form>
    </div>
  );
}