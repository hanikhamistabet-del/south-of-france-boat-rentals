import { supabase } from "@/lib/supabase";
import BookingForm from "@/app/components/BookingForm";

export default async function BoatDetailsPage({
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

  const { data: images } = await supabase
    .from("boat_images")
    .select("*")
    .eq("boat_id", id)
    .order("id", { ascending: true });

  if (!boat) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1 className="text-4xl font-bold">
          Boat Not Found
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <a
        href="/boats"
        className="text-blue-500"
      >
        ← Back to Boats
      </a>

      <div className="max-w-6xl mx-auto mt-8">

        {images && images.length > 0 && (
          <>
            <img
              src={images[0].image_url}
              alt={boat.name}
              className="w-full h-[500px] object-cover rounded-2xl mb-4"
            />

            <div className="grid grid-cols-3 gap-4 mb-8">
              {images.map((image) => (
                <img
                  key={image.id}
                  src={image.image_url}
                  alt={boat.name}
                  className="h-40 w-full object-cover rounded-xl"
                />
              ))}
            </div>
          </>
        )}

        <div className="bg-slate-900 p-8 rounded-2xl">

          <h1 className="text-5xl font-bold">
            {boat.name}
          </h1>

          <p className="mt-4 text-xl text-gray-400">
            {boat.location}
          </p>

          <p className="mt-6 text-lg">
            {boat.description}
          </p>

          <div className="mt-8 grid md:grid-cols-2 gap-6">

            <div className="bg-slate-800 p-6 rounded-xl">
              <p className="text-gray-400">
                Price Per Day
              </p>

              <p className="text-3xl font-bold">
                €{boat.price_per_day}
              </p>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl">
              <p className="text-gray-400">
                Capacity
              </p>

              <p className="text-3xl font-bold">
                {boat.capacity} Guests
              </p>
            </div>

          </div>

          <div className="mt-8 bg-slate-800 p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">
              Owner Information
            </h2>

            <p>
              <strong>Name:</strong> {boat.owner_name}
            </p>

            <p>
              <strong>Phone:</strong> {boat.phone}
            </p>

            <p>
              <strong>WhatsApp:</strong> {boat.whatsapp}
            </p>

            <p>
              <strong>Email:</strong> {boat.email}
            </p>
          </div>

          <BookingForm
            boatId={boat.id}
            ownerEmail={boat.email}
            boatName={boat.name}
          />

        </div>
      </div>
    </main>
  );
}