"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
const pendingCount = bookings.filter(
  (b) => b.status === "pending"
).length;

const contactedCount = bookings.filter(
  (b) => b.status === "contacted"
).length;

const confirmedCount = bookings.filter(
  (b) => b.status === "confirmed"
).length;
  useEffect(() => {
    async function loadBookings() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      const { data: boats } = await supabase
        .from("boats")
        .select("id,name")
        .eq("user_id", user.id);

      if (!boats || boats.length === 0) {
        setLoading(false);
        return;
      }

      const boatIds = boats.map(
        (boat) => boat.id
      );

      const { data: bookingsData, error } =
        await supabase
          .from("bookings")
          .select("*")
          .in("boat_id", boatIds)
          .order("created_at", {
            ascending: false,
          });

      if (error) {
        console.error(error);
      }

      const bookingsWithBoatNames =
        bookingsData?.map((booking) => ({
          ...booking,
          boatName:
            boats.find(
              (boat) =>
                boat.id === booking.boat_id
            )?.name || "Unknown Boat",
        })) || [];

      setBookings(bookingsWithBoatNames);
      setLoading(false);
    }

    loadBookings();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Loading...
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold mb-8">
  Bookings
</h1>

<div className="grid md:grid-cols-3 gap-4 mb-8">

  <div className="bg-yellow-500 text-black p-6 rounded-2xl">
    <p className="text-sm font-semibold">
      Pending
    </p>

    <p className="text-4xl font-bold">
      {pendingCount}
    </p>
  </div>

  <div className="bg-green-600 p-6 rounded-2xl">
    <p className="text-sm font-semibold">
      Contacted
    </p>

    <p className="text-4xl font-bold">
      {contactedCount}
    </p>
  </div>

  <div className="bg-blue-600 p-6 rounded-2xl">
    <p className="text-sm font-semibold">
      Confirmed
    </p>

    <p className="text-4xl font-bold">
      {confirmedCount}
    </p>
  </div>

</div>

        {bookings.length === 0 ? (
          <div className="bg-slate-900 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold">
              No bookings yet
            </h2>
          </div>
        ) : (
          <div className="grid gap-6">

            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-slate-900 p-6 rounded-2xl"
              >
                <h2 className="text-2xl font-bold">
                  {booking.boatName}
                </h2>

                <p className="mt-3">
  <strong>Customer:</strong>{" "}
  {booking.customer_name}
</p>

<div className="mt-3">
  <span
    className={`px-3 py-1 rounded-full text-sm font-semibold ${
      booking.status === "pending"
        ? "bg-yellow-500 text-black"
        : booking.status === "contacted"
        ? "bg-green-600 text-white"
        : "bg-gray-600 text-white"
    }`}
  >
    {booking.status.toUpperCase()}
  </span>
</div>

<p className="mt-2">
  <strong>Phone:</strong>{" "}
  {booking.customer_phone}
</p>

<p className="mt-2">
  <strong>Message:</strong>{" "}
  {booking.message}
</p>

<p className="mt-2">
  <strong>Status:</strong>{" "}
  {booking.status}
</p>

<div className="flex gap-3 mt-4">

  <button
    onClick={async () => {
      const { error } = await supabase
        .from("bookings")
        .update({
          status: "contacted",
        })
        .eq("id", booking.id);

      if (error) {
        alert(error.message);
        return;
      }

      setBookings(
        bookings.map((b) =>
          b.id === booking.id
            ? {
                ...b,
                status: "contacted",
              }
            : b
        )
      );
    }}
    className="bg-green-600 px-4 py-2 rounded-lg"
  >
    Mark Contacted
  </button>

  <button
    onClick={async () => {
      const { error } = await supabase
        .from("bookings")
        .update({
          status: "confirmed",
        })
        .eq("id", booking.id);

      if (error) {
        alert(error.message);
        return;
      }

      setBookings(
        bookings.map((b) =>
          b.id === booking.id
            ? {
                ...b,
                status: "confirmed",
              }
            : b
        )
      );
    }}
    className="bg-blue-600 px-4 py-2 rounded-lg"
  >
    Confirm Booking
  </button>

  <button
    onClick={async () => {
      const confirmed = window.confirm(
        "Delete this booking?"
      );

      if (!confirmed) return;

      const { error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", booking.id);

      if (error) {
        alert(error.message);
        return;
      }

      setBookings(
        bookings.filter(
          (b) => b.id !== booking.id
        )
      );
    }}
    className="bg-red-600 px-4 py-2 rounded-lg"
  >
    Delete
  </button>

</div>

                <p className="mt-2 text-gray-400">
                  {new Date(
                    booking.created_at
                  ).toLocaleString()}
                </p>
              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}