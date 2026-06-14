import { supabase } from "@/lib/supabase";
import BoatsList from "@/app/components/BoatsList";

export const dynamic = "force-dynamic";

export default async function BoatsPage() {
  const { data: boats, error } = await supabase
    .from("boats")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1 className="text-4xl font-bold">
          Error Loading Boats
        </h1>

        <p className="mt-4">
          {error.message}
        </p>
      </main>
    );
  }

  const boatsWithImages = await Promise.all(
    (boats || []).map(async (boat) => {
      const { data: image } = await supabase
        .from("boat_images")
        .select("image_url")
        .eq("boat_id", boat.id)
        .order("id", { ascending: true })
        .limit(1)
        .single();

      return {
        ...boat,
        image_url: image?.image_url || null,
      };
    })
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-4xl font-bold mb-8">
        Available Boats
      </h1>

      <BoatsList boats={boatsWithImages} />
    </main>
  );
}