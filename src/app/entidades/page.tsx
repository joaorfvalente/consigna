import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { EntityFilters } from "@/components/EntityFilters";
import { EntityCard } from "@/components/EntityCard";

interface SearchParams {
  q?: string;
  county?: string;
  type?: string;
  year?: string;
}

export default async function EntidadesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("entities")
    .select("*")
    .eq("year", params.year ? parseInt(params.year, 10) : new Date().getFullYear())
    .order("name");

  if (params.q?.trim()) {
    query = query.ilike("name", `%${params.q.trim()}%`);
  }
  if (params.county?.trim()) {
    query = query.eq("county", params.county.trim());
  }
  if (params.type?.trim()) {
    query = query.eq("type", params.type.trim());
  }

  const { data: entities } = await query.limit(100);

  const { data: counties } = await supabase
    .from("entities")
    .select("county")
    .not("county", "is", null)
    .order("county");

  const { data: types } = await supabase
    .from("entities")
    .select("type")
    .not("type", "is", null)
    .order("type");

  const uniqueCounties = [...new Set((counties || []).map((c) => c.county).filter(Boolean))];
  const uniqueTypes = [...new Set((types || []).map((t) => t.type).filter(Boolean))];

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <Link href="/" className="text-sm text-stone-500 hover:text-stone-700">
            ← Voltar
          </Link>
          <h1 className="mt-2 text-2xl font-semibold text-stone-900">
            Instituições elegíveis
          </h1>
          <p className="mt-1 text-stone-600">
            Pesquise e filtre para encontrar a instituição ideal
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <EntityFilters
          search={params.q}
          county={params.county}
          type={params.type}
          year={params.year}
          counties={uniqueCounties as string[]}
          types={uniqueTypes as string[]}
        />

        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href="/entidades/mapa"
            className="text-sm font-medium text-emerald-600 hover:underline"
          >
            Ver no mapa
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {(entities || []).map((entity) => (
            <EntityCard key={entity.id} entity={entity} />
          ))}
        </div>

        {(entities || []).length === 0 && (
          <p className="py-12 text-center text-stone-500">
            Nenhuma instituição encontrada. Tente ajustar os filtros.
          </p>
        )}
      </div>
    </div>
  );
}
