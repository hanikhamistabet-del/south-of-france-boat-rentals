"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import DeleteBoatButton from "@/app/components/DeleteBoatButton";

export default function DashboardPage() {
  const [boats, setBoats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      const { data, error } = await supabase
        .from("boats")
        .select("*")
        .eq("user_id", user.id)
        .order("id", {
          ascending: false,
        });

      if (error) {
        console.error(error);
      } else {
        setBoats(data || []);
      }

      setLoading(false);
    }

    loadDashboard();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();

    window.location.href = "/";
  }

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

      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-5xl font-bold">
            Dashboard
          </h1>

          <div className="flex gap-4">

  <a
    href="/add-boat"
    className="bg-blue-600 px-4 py-2 rounded-lg"
  >
    Add Boat
  </a>

  <a
    href="/bookings"
    className="bg-purple-600 px-4 py-2 rounded-lg"
  >
    Bookings
  </a>

            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded-lg"
            >
              Logout
            </button>

          </div>

        </div>

        {boats.length === 0 ? (
          <div className="bg-slate-900 p-8 rounded-2xl text-center">

            <h2 className="text-2xl font-bold">
              No Boats Yet
            </h2>

            <p className="text-gray-400 mt-3">
              Add your first boat listing.
            </p>

          </div>
        ) : (
          <div className="grid gap-6">

            {boats.map((boat) => (
              <div
                key={boat.id}
                className="bg-slate-900 p-6 rounded-2xl"
              >
                <h2 className="text-3xl font-bold">
                  {boat.name}
                </h2>

                <p className="mt-2 text-gray-400">
                  {boat.location}
                </p>

                <p className="mt-2">
                  €{boat.price_per_day}/day
                </p>

                <div className="flex gap-4 mt-6">

                  <a
                    href={`/boats/${boat.id}`}
                    className="bg-blue-600 px-4 py-2 rounded-lg"
                  >
                    View
                  </a>

                  <a
                    href={`/edit-boat/${boat.id}`}
                    className="bg-green-600 px-4 py-2 rounded-lg"
                  >
                    Edit
                  </a>

                  <DeleteBoatButton
                    boatId={boat.id}
                  />

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </main>
  );
}