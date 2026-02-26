import { createClient } from "@/lib/supabase/server";
import { EntidadesPageClient } from "@/components/pages/EntidadesPageClient";

interface SearchParams { q?: string; county?: string; type?: string; year?: string; }
interface EntityPreview { id: string; name: string; nif: string; county: string | null; type: string | null; }

export default async function EntidadesPage({ searchParams }: { searchParams: Promise<SearchParams>; }) {
  const params = await searchParams;
  const year = params.year ? parseInt(params.year, 10) : new Date().getFullYear();
  const supabase = await createClient();

  let query = supabase.from("entities").select("*").eq("year", year).order("name");
  if (params.q?.trim()) query = query.ilike("name", `%${params.q.trim()}%`);
  if (params.county?.trim()) query = query.eq("county", params.county.trim());
  if (params.type?.trim()) query = query.eq("type", params.type.trim());

  let countQuery = supabase.from("entities").select("*", { count: "exact", head: true }).eq("year", year);
  if (params.q?.trim()) countQuery = countQuery.ilike("name", `%${params.q.trim()}%`);
  if (params.county?.trim()) countQuery = countQuery.eq("county", params.county.trim());
  if (params.type?.trim()) countQuery = countQuery.eq("type", params.type.trim());

  const [{ data: entities }, { count: totalCount }] = await Promise.all([query.limit(100), countQuery]);

  const { data: counties } = await supabase.from("entities").select("county").not("county", "is", null).order("county");
  const { data: types } = await supabase.from("entities").select("type").not("type", "is", null).order("type");

  return (
    <EntidadesPageClient
      entities={(entities ?? []) as EntityPreview[]}
      totalCount={totalCount ?? 0}
      search={params.q}
      county={params.county}
      type={params.type}
      year={String(year)}
      counties={[...new Set((counties ?? []).map((item) => item.county).filter(Boolean))] as string[]}
      types={[...new Set((types ?? []).map((item) => item.type).filter(Boolean))] as string[]}
    />
  );
}
