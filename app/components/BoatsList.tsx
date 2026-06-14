"use client";

import { useMemo, useState } from "react";

export default function BoatsList({
  boats,
}: {
  boats: any[];
}) {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] =
    useState("");
  const [maxPrice, setMaxPrice] =
    useState("");
  const [capacity, setCapacity] =
    useState("");
  const [sortBy, setSortBy] =
    useState("newest");

  const locations = [
    ...new Set(
      boats
        .map((boat) => boat.location)
        .filter(Boolean)
    ),
  ];

  const [location, setLocation] =
    useState("");

  const filteredBoats = useMemo(() => {
    let result = [...boats];

    if (search) {
      result = result.filter(
        (boat) =>
          boat.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          boat.location
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }

    if (location) {
      result = result.filter(
        (boat) =>
          boat.location === location
      );
    }

    if (minPrice) {
      result = result.filter(
        (boat) =>
          boat.price_per_day >=
          Number(minPrice)
      );
    }

    if (maxPrice) {
      result = result.filter(
        (boat) =>
          boat.price_per_day <=
          Number(maxPrice)
      );
    }

    if (capacity) {
      result = result.filter(
        (boat) =>
          boat.capacity >=
          Number(capacity)
      );
    }

    if (sortBy === "price-low") {
      result.sort(
        (a, b) =>
          a.price_per_day -
          b.price_per_day
      );
    }

    if (sortBy === "price-high") {
      result.sort(
        (a, b) =>
          b.price_per_day -
          a.price_per_day
      );
    }

    if (sortBy === "newest") {
      result.sort(
        (a, b) => b.id - a.id
      );
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
      <div className="grid