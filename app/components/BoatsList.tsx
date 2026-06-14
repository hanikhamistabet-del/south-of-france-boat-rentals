"use client";

import { useMemo, useState } from "react";

export default function BoatsList({
  boats,
}: {
  boats: any[];
}) {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [location, setLocation] = useState("");

  const locations = [
    ...new Set(
      boats
        .map((boat) => boat.location)
        .filter(Boolean)
    ),
  ];

  const filteredBoats = useMemo(() => {
    let result = [...boats];

    if (search) {
      result = result.filter(
        (boat) =>
          boat.name
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          boat.location
            ?.toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    if (location) {
      result = result.filter(
        (boat) => boat.location === location
      );
    }

    if (minPrice) {
      result = result.filter(
        (boat) =>
          boat.price_per_day >= Number(minPrice)
      );
    }

    if (maxPrice) {
      result = result.filter(
        (boat) =>
          boat.price_per_day <= Number(maxPrice)
      );
    }

    if (capacity) {
      result = result.filter(
        (boat) =>
          boat.capacity >= Number(capacity)
      );
    }

    if (sortBy === "price-low") {
      result.sort(
        (a, b) =>
          a.price_per_day - b.price_per_day
      );
    }

    if (sortBy === "price-high") {
      result.sort(
        (a, b) =>
          b.price_per_day - a.price_per_day
      );
    }

    if (sortBy === "newest") {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [
    boats,
    search,
    location,
    minPrice,
    maxPrice,
    capacity,
    sortBy,
  ]);

  return (
    <>
      <div className="grid md:grid-cols-5 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="p-4 rounded-xl bg-white text-black"
        />

        <select
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
          className="p-4 rounded-xl bg-white text-black"
        >
          <option value="">
            All Locations
          </option>

          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min €"
          value={minPrice}
          onChange={(e) =>
            setMinPrice(e.target.value)
          }
          className="p-4 rounded-xl bg-white text-black"
        />

        <input
          type="number"
          placeholder="Max €"
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(e.target.value)
          }
          className="p-4 rounded-xl bg-white text-black"
        />

        <input
          type="number"
          placeholder="Guests"
          value={capacity}
          onChange={(e) =>
            setCapacity(e.target.value)
          }
          className="p-4 rounded-xl bg-white text-black"
        />
      </div>

      <div className="mb-8">
        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
          className="p-4 rounded-xl bg-white text-black"
        >
          <option value="newest">
            Newest
          </option>

          <option value="price-low">
            Price Low → High
          </option>

          <option value="price-high">
            Price High → Low
          </option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBoats.map((boat) => (
          <div
            key={boat.id}
            className="bg-slate-900 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition"
          >
            {boat.image_url && (
              <img
                src={boat.image_url}
                alt={boat.name}
                className="w-full h-64 object-cover"
              />
            )}

            <div className="p-6">
              <h2 className="text-2xl font-bold">
                {boat.name}
              </h2>

              <p className="mt-2 text-gray-400">
                📍 {boat.location}
              </p>

              <p className="mt-2">
                👥 {boat.capacity} Guests
              </p>

              <p className="mt-3 text-xl font-bold">
                💶 €{boat.price_per_day}/day
              </p>

              <a
                href={`/boats/${boat.id}`}
                className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
              >
                View Yacht
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}