"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function EditBoatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [boatId, setBoatId] = useState("");

  const [images, setImages] = useState<any[]>([]);
const [newPhotos, setNewPhotos] =
  useState<FileList | null>(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [pricePerDay, setPricePerDay] =
    useState("");
  const [capacity, setCapacity] =
    useState("");
  const [description, setDescription] =
    useState("");

  const [ownerName, setOwnerName] =
    useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] =
    useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function loadBoat() {
      const { id } = await params;

      setBoatId(id);

      const { data } = await supabase
        .from("boats")
        .select("*")
        .eq("id", id)
        .single();

      if (!data) return;

      setName(data.name || "");
      setLocation(data.location || "");
      setPricePerDay(
        String(data.price_per_day || "")
      );
      setCapacity(
        String(data.capacity || "")
      );
      setDescription(
        data.description || ""
      );

      setOwnerName(
        data.owner_name || ""
      );
      setPhone(data.phone || "");
      setWhatsapp(
        data.whatsapp || ""
      );
      setEmail(data.email || "");

      const { data: imageData } =
        await supabase
          .from("boat_images")
          .select("*")
          .eq("boat_id", id)
          .order("id", {
            ascending: true,
          });

      setImages(imageData || []);
    }

    loadBoat();
  }, [params]);

  async function handleSave(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const { error } = await supabase
      .from("boats")
      .update({
        name,
        location,
        price_per_day:
          Number(pricePerDay),
        capacity:
          Number(capacity),
        description,
        owner_name: ownerName,
        phone,
        whatsapp,
        email,
      })
      .eq("id", boatId);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Boat updated!");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Edit Boat
        </h1>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">
  Current Photos
</h2>

<p className="text-gray-400 mb-4">
  Photos: {images.length}/5
</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
  {images.map((image) => (
    <div key={image.id}>

      <img
        src={image.image_url}
        alt="Boat"
        className="w-full h-40 object-cover rounded-xl"
      />

      <button
        type="button"
        onClick={async () => {
          const confirmed =
            window.confirm(
              "Delete this photo?"
            );

          if (!confirmed) return;

          const { error } =
            await supabase
              .from("boat_images")
              .delete()
              .eq("id", image.id);

          if (error) {
            alert(error.message);
            return;
          }

          setImages(
            images.filter(
              (img) =>
                img.id !== image.id
            )
          );

          alert("Photo deleted!");
        }}
        className="w-full mt-2 bg-red-600 py-2 rounded-lg"
      >
        Delete Photo
      </button>

    </div>
  ))}
</div>
        </div>

        <div className="mb-8 bg-slate-900 p-6 rounded-xl">

  <h2 className="text-2xl font-bold mb-2">
    Upload New Photos
  </h2>

  <p className="text-gray-400 mb-4">
    You can upload up to 5 photos.
  </p>

  <div className="bg-slate-800 p-6 rounded-xl">
  <div className="space-y-3">

  <label className="cursor-pointer inline-block bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg">
    📸 Select Photos

    <input
      type="file"
      multiple
      accept="image/*"
      onChange={(e) => {
        setNewPhotos(e.target.files);
      }}
      className="hidden"
    />
  </label>

  <p className="text-gray-400">
    {newPhotos
      ? `${newPhotos.length} photo(s) selected`
      : "No photos selected"}
  </p>

</div>

  <button
    type="button"
    onClick={async () => {
      if (!newPhotos) {
        alert("Please select photos.");
        return;
      }

      if (
        images.length +
          newPhotos.length >
        5
      ) {
        alert(
          `Maximum 5 photos allowed. You currently have ${images.length}.`
        );
        return;
      }

      for (const photo of Array.from(
        newPhotos
      )) {
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
          alert(uploadError.message);
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
              boat_id: Number(boatId),
              image_url:
                publicData.publicUrl,
            },
          ]);

        if (imageError) {
          alert(imageError.message);
          return;
        }
      }

      alert("Photos uploaded!");
      window.location.reload();
    }}
    className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
  >
    Upload Photos
    </button>

</div>

</div>

<form
          onSubmit={handleSave}
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
            placeholder="Price"
            value={pricePerDay}
            onChange={(e) =>
              setPricePerDay(
                e.target.value
              )
            }
            className="w-full p-4 rounded-lg bg-white text-black"
          />

          <input
            type="number"
            placeholder="Capacity"
            value={capacity}
            onChange={(e) =>
              setCapacity(
                e.target.value
              )
            }
            className="w-full p-4 rounded-lg bg-white text-black"
          />

          <input
            type="text"
            placeholder="Owner Name"
            value={ownerName}
            onChange={(e) =>
              setOwnerName(
                e.target.value
              )
            }
            className="w-full p-4 rounded-lg bg-white text-black"
          />

          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }
            className="w-full p-4 rounded-lg bg-white text-black"
          />

          <input
            type="text"
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={(e) =>
              setWhatsapp(
                e.target.value
              )
            }
            className="w-full p-4 rounded-lg bg-white text-black"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full p-4 rounded-lg bg-white text-black"
          />

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
            className="bg-green-600 px-6 py-3 rounded-lg"
          >
            Save Changes
          </button>

        </form>
      </div>
    </main>
  );
}