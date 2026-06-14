"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AddBoatPage() {
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");

  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");

  const [photos, setPhotos] = useState<FileList | null>(null);
const [photoCount, setPhotoCount] = useState(0);

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      setLoading(false);
    }

    checkUser();
  }, []);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
  alert("Please log in first.");
  return;
}

// Prevent duplicate boat names for same user
const { data: duplicateBoat } = await supabase
  .from("boats")
  .select("id")
  .eq("user_id", user.id)
  .eq("name", name.trim())
  .maybeSingle();

if (duplicateBoat) {
  alert(
    "You already have a boat with this name."
  );
  return;
}

// Free account = 1 boat
const { data: existingBoats } = await supabase
  .from("boats")
  .select("id")
  .eq("user_id", user.id);

if (
  existingBoats &&
  existingBoats.length >= 1
) {
  alert(
    "Free accounts can only list one boat. Upgrade to Premium for unlimited listings."
  );
  return;
}

const { data: boatData, error: boatError } =
  await supabase
    .from("boats")
    .insert([
          {
            user_id: user.id,
            name,
            location,
            price_per_day: Number(pricePerDay),
            capacity: Number(capacity),
            description,
            owner_name: ownerName,
            phone,
            whatsapp,
            email,
          },
        ])
        .select()
        .single();

    if (boatError) {
      alert(
        "Boat Error: " +
          boatError.message
      );
      return;
    }

    const boatId = boatData.id;

    if (photos && photos.length > 5) {
  alert("Maximum 5 photos allowed");
  return;
}

if (photos && photos.length > 0) {

  const files = Array.from(photos).slice(0, 5);

  for (const photo of files) {
        const safeFileName =
          `${Date.now()}-${photo.name}`.replace(
            /[^a-zA-Z0-9.-]/g,
            "_"
          );

        const {
          error: uploadError,
        } = await supabase.storage
          .from("boat-photos")
          .upload(
            safeFileName,
            photo
          );

        if (uploadError) {
          alert(
            "Upload Error: " +
              uploadError.message
          );
          return;
        }

        const { data: publicData } =
          supabase.storage
            .from("boat-photos")
            .getPublicUrl(
              safeFileName
            );

        const {
          error: imageError,
        } = await supabase
          .from("boat_images")
          .insert([
            {
              boat_id: boatId,
              image_url:
                publicData.publicUrl,
            },
          ]);

        if (imageError) {
          alert(
            "Image Insert Error: " +
              imageError.message
          );
          return;
        }
      }
    }

    alert(
      "Boat saved successfully!"
    );

    window.location.href =
      "/dashboard";
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
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Add Your Boat
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            type="text"
            placeholder="Boat Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full p-4 rounded-lg bg-white text-black"
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            className="w-full p-4 rounded-lg bg-white text-black"
          />

          <input
            type="number"
            placeholder="Price Per Day (€)"
            value={pricePerDay}
            onChange={(e) =>
              setPricePerDay(e.target.value)
            }
            className="w-full p-4 rounded-lg bg-white text-black"
          />

          <input
            type="number"
            placeholder="Capacity"
            value={capacity}
            onChange={(e) =>
              setCapacity(e.target.value)
            }
            className="w-full p-4 rounded-lg bg-white text-black"
          />

          <input
            type="text"
            placeholder="Owner Name"
            value={ownerName}
            onChange={(e) =>
              setOwnerName(e.target.value)
            }
            className="w-full p-4 rounded-lg bg-white text-black"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            className="w-full p-4 rounded-lg bg-white text-black"
          />

          <input
            type="text"
            placeholder="WhatsApp Number"
            value={whatsapp}
            onChange={(e) =>
              setWhatsapp(e.target.value)
            }
            className="w-full p-4 rounded-lg bg-white text-black"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-4 rounded-lg bg-white text-black"
          />

          <div className="space-y-2">

  <label className="block text-lg font-semibold">
    Photos ({photoCount}/5)
  </label>

  <input
    type="file"
    multiple
    accept="image/*"
    onChange={(e) => {
      const files = e.target.files;

      if (!files) return;

      if (files.length > 5) {
        alert("Maximum 5 photos allowed.");
        e.target.value = "";
        setPhotos(null);
        setPhotoCount(0);
        return;
      }

      setPhotos(files);
      setPhotoCount(files.length);
    }}
    className="w-full p-4 rounded-lg bg-slate-800"
  />

  <p className="text-sm text-gray-400">
    Maximum 5 photos. The first photo will be used as the cover image.
  </p>

</div>

          <textarea
            rows={5}
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="w-full p-4 rounded-lg bg-white text-black"
          />

          <button
            type="submit"
            className="bg-blue-600 px-6 py-3 rounded-lg"
          >
            Save Boat
          </button>

        </form>

      </div>
    </main>
  );
}