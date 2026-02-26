import { createClient } from "@/lib/supabase/server";
import { EntityMap } from "@/components/EntityMap";

interface MapEntity { id: string; name: string; latitude: number; longitude: number; }

export default async function MapaPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("entities").select("id, name, latitude, longitude").not("latitude", "is", null).not("longitude", "is", null);

  const entities = (data ?? []).filter((item) => item.latitude != null && item.longitude != null) as MapEntity[];

  return (
    <main className="mx-auto w-full max-w-6xl space-y-4 px-4 py-8 sm:py-10">
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Mapa de instituições</h1>
        <p className="text-slate-600">{entities.length} entidades com localização</p>
      </div>
      <div className="h-[calc(100vh-13rem)] min-h-[360px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <EntityMap entities={entities} />
      </div>
    </main>
  );
}
