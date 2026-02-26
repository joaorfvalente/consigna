import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Suspense } from "react";
import { EntityFilters } from "@/components/EntityFilters";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageTemplate } from "@/components/templates/PageTemplate";
import { CopyNifButton } from "@/components/CopyNifButton";
import { MapPin } from "lucide-react";

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
    .eq(
      "year",
      params.year ? parseInt(params.year, 10) : new Date().getFullYear()
    )
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

  let countQuery = supabase
    .from("entities")
    .select("*", { count: "exact", head: true })
    .eq(
      "year",
      params.year ? parseInt(params.year, 10) : new Date().getFullYear()
    );

  if (params.q?.trim()) {
    countQuery = countQuery.ilike("name", `%${params.q.trim()}%`);
  }
  if (params.county?.trim()) {
    countQuery = countQuery.eq("county", params.county.trim());
  }
  if (params.type?.trim()) {
    countQuery = countQuery.eq("type", params.type.trim());
  }

  const [{ data: entities }, { count: totalCount }] = await Promise.all([
    query.limit(100),
    countQuery,
  ]);

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

  const uniqueCounties = [
    ...new Set((counties || []).map((c) => c.county).filter(Boolean)),
  ];
  const uniqueTypes = [
    ...new Set((types || []).map((t) => t.type).filter(Boolean)),
  ];

  const year = params.year ?? String(new Date().getFullYear());

  return (
    <PageTemplate
      title="Instituições elegíveis"
      description="Pesquise e filtre para encontrar a instituição ideal para consignar o seu IRS"
      className="min-h-screen bg-muted/30"
      width="default"
      bodyClassName="py-6"
      withDivider
    >
      <Suspense
        fallback={
          <div className="mt-6 h-14 w-full animate-pulse rounded-lg bg-primary/10" />
        }
      >
        <EntityFilters
          search={params.q}
          county={params.county}
          type={params.type}
          year={year}
          counties={uniqueCounties as string[]}
          types={uniqueTypes as string[]}
          variant="hero"
        />
      </Suspense>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {totalCount === (entities || []).length
            ? `${totalCount ?? 0} instituição(ões) encontrada(s)`
            : `A mostrar ${(entities || []).length} de ${totalCount ?? 0} instituições`}
        </p>
        <Button variant="outline" size="sm" asChild>
          <Link href="/entidades/mapa">
            <MapPin className="size-4" />
            Ver no mapa
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {(entities || []).map((entity) => (
          <Card key={entity.id} variant="entity">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1.5">
                  <CardTitle className="leading-snug">
                    <Link
                      href={`/entidades/${entity.id}`}
                      className="transition-colors hover:text-foreground/90 hover:underline"
                    >
                      {entity.name}
                    </Link>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1.5">
                    <MapPin className="size-3.5" />
                    {entity.county || "Localidade não indicada"}
                  </CardDescription>
                </div>
                {entity.type && (
                  <Badge variant="outline" className="text-xs font-normal">
                    {entity.type}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between gap-3 border-t border-border/60 pt-3">
                <span className="font-mono text-sm text-muted-foreground">
                  NIF {entity.nif}
                </span>
                <div className="flex items-center gap-1.5">
                  <CopyNifButton nif={entity.nif} compact />
                  <Button asChild variant="ghost" size="xs" className="text-muted-foreground hover:text-foreground">
                    <Link href={`/entidades/${entity.id}`}>Ver</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(entities || []).length === 0 && (
        <div className="rounded-xl border bg-card py-16 text-center">
          <p className="text-muted-foreground">
            Nenhuma instituição encontrada. Tente ajustar os filtros.
          </p>
          <Button variant="outline" className="mt-4" asChild>
            <Link href="/entidades">Limpar filtros</Link>
          </Button>
        </div>
      )}
    </PageTemplate>
  );
}
