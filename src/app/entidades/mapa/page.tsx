import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { EntityMap } from "@/components/EntityMap";

export default async function MapaPage() {
  const supabase = await createClient();

  const { data: entities } = await supabase
    .from("entities")
    .select("id, name, latitude, longitude")
    .not("latitude", "is", null)
    .not("longitude", "is", null);

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <Link
            href="/entidades"
            className="text-sm text-stone-500 hover:text-stone-700"
          >
            ← Voltar à lista
          </Link>
          <h1 className="mt-2 text-2xl font-semibold text-stone-900">
            Mapa de instituições
          </h1>
          <p className="mt-1 text-stone-600">
            {(entities || []).length} instituições com localização
          </p>
        </div>
      </header>

      <div className="h-[calc(100vh-12rem)]">
        <EntityMap
          entities={(entities || []).filter(
            (e) => e.latitude != null && e.longitude != null
          )}
        />
      </div>
    </div>
  );
}
