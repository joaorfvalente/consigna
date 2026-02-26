"use client";

import Link from "next/link";
import { Suspense } from "react";
import { Button, Card, CardBody, CardHeader, Chip } from "@heroui/react";
import { MapPin } from "lucide-react";
import { EntityFilters } from "@/components/EntityFilters";
import { CopyNifButton } from "@/components/CopyNifButton";

type EntityItem = { id: string; name: string; nif: string; county: string | null; type: string | null };

export function EntidadesPageClient({ entities, totalCount, search, county, type, year, counties, types }: { entities: EntityItem[]; totalCount: number; search?: string; county?: string; type?: string; year: string; counties: string[]; types: string[]; }) {
  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 sm:py-10">
      <Card shadow="sm" className="border border-slate-200/70 bg-white/90">
        <CardBody className="gap-2 p-6 sm:p-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Instituicoes elegiveis</h1>
          <p className="max-w-3xl text-slate-600">Pesquise entidades para consignar o seu IRS de forma simples e segura.</p>
        </CardBody>
      </Card>

      <Suspense fallback={<div className="h-14 w-full animate-pulse rounded-xl bg-slate-200" />}>
        <EntityFilters search={search} county={county} type={type} year={year} counties={counties} types={types} />
      </Suspense>

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          {totalCount === entities.length ? `${totalCount} instituicoes encontradas` : `A mostrar ${entities.length} de ${totalCount} instituicoes`}
        </p>
        <Button as={Link} href="/entidades/mapa" variant="bordered" size="md" radius="full">
          <MapPin className="size-4" />
          Ver mapa
        </Button>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {entities.map((entity) => (
          <Card key={entity.id} shadow="sm" className="border border-slate-200/70 transition-transform duration-200 hover:-translate-y-0.5">
            <CardHeader className="flex items-start justify-between">
              <div>
                <Link href={`/entidades/${entity.id}`} className="text-base font-semibold text-slate-900 hover:underline">
                  {entity.name}
                </Link>
                <p className="mt-1 text-sm text-slate-500">{entity.county ?? "Localidade nao indicada"}</p>
              </div>
              {entity.type && <Chip variant="flat">{entity.type}</Chip>}
            </CardHeader>
            <CardBody className="pt-0">
              <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                <span className="font-mono text-sm text-slate-500">NIF {entity.nif}</span>
                <div className="flex items-center gap-2">
                  <CopyNifButton nif={entity.nif} compact />
                  <Button as={Link} href={`/entidades/${entity.id}`} variant="light" size="sm">
                    Ver
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </section>
    </main>
  );
}
