import { supabase } from "@/lib/supabase";

export default async function TestDbPage() {
  const { data, error } = await supabase
    .from("boats")
    .select("*");

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-4xl font-bold mb-8">
        Database Test
      </h1>

      {error ? (
        <pre>{JSON.stringify(error, null, 2)}</pre>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </main>
  );
}