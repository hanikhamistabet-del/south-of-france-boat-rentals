import { supabase } from "@/lib/supabase";

export default async function BoatBookingsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: boat } = await supabase
    .from("boats")
    .select("*")
    .eq("id", id)
    .single();

  const { data: bookings, error } =
    await supabase
      .from("bookings")
      .select("*")
      .eq("boat_id", id)
      .order("created_at", {
        ascending: false,
      });

  if (error) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1 className="text-4xl font-bold">
          Error Loading Bookings
        </h1>

        <p className="mt-4">
          {error.message}
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto">

        <a
          href="/dashboard"
          className="text-blue-500"
        >
          ← Back to Dashboard
        </a>

        <h1 className="text-5xl font-bold mt-6 mb-8">
          {boat?.name} Bookings
        </h1>

        {bookings?.length === 0 && (
          <div className="bg-slate-900 p-6 rounded-2xl">
            No bookings yet.
          </div>
        )}

        <div className="grid gap-6">

          {bookings?.map((booking) => (
            <div
              key={booking.id}
              className="bg-slate-900 p-6 rounded-2xl"
            >
              <p>
                <strong>Name:</strong>{" "}
                {booking.customer_name}
              </p>

              <p className="mt-2">
                <strong>Email:</strong>{" "}
                {booking.customer_email}
              </p>

              <p className="mt-2">
                <strong>Phone:</strong>{" "}
                {booking.customer_phone}
              </p>

              <p className="mt-2">
                <strong>Status:</strong>{" "}
                {booking.status}
              </p>

              <p className="mt-4">
                <strong>Message:</strong>
              </p>

              <p className="mt-2 text-gray-300">
                {booking.message}
              </p>
            </div>
          ))}

        </div>
      </div>
    </main>
  );
}